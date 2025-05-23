import { useEffect, useRef } from 'react';

import maplibregl, { LngLatLike } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';

import { moreInfo } from './card/CardSchool';
import schools from '../assets/data/schools.json';

import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

export function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const lng = -0.3;
    const lat = 39.44;
    const zoom = 7;
    // Map style URL depends on the theme of the browser
    // For example, if the browser is in dark mode, use the dark theme
    // If the browser is in light mode, use the light theme

    const mapStyleTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'fiord'
        : 'positron';

    const mapStyle = `https://maps.black/styles/openstreetmap-openmaptiles/openfreemap/${mapStyleTheme}/style.json`;


    const mapColor = (mapStyleTheme: 'fiord' | 'positron'): ExpressionSpecification => {
        const styles: { fiord: (string | number)[]; positron: (string | number)[] } = {
            'fiord': [
                'PÚBLICO', '#ccebc5',
                'PRIVADO', '#fbb4ae',
                'PRIVADO - CONCERTADO', '#b3cde3',
                '#FF0000'
            ],
            'positron': [
                'PÚBLICO', '#66c2a5',
                'PRIVADO', '#8da0cb',
                'PRIVADO - CONCERTADO', '#fc8d62',
                '#FF0000'
            ]
        };

        return [
            'match',
            ['get', 'reg'],
            ...styles[mapStyleTheme]
        ] as unknown as ExpressionSpecification;
    }

    useEffect(() => {
        if (!mapContainer.current) return; // wait until ref is set

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom
        });

        // When ready, load the schools data
        map.on('load', () => {
            const schoolsData: GeoJSON.FeatureCollection<GeoJSON.Point, {
                id: string;
                cp: string;
                reg: string;
                deno: string;
                muni: string;
                tel?: string;
            }> = {
                type: 'FeatureCollection',
                features: schools.map((school) => ({
                    type: 'Feature',
                    properties: {
                        id: school.codigo,
                        cp: school.cp,
                        reg: school.reg,
                        deno: school.deno,
                        muni: school.muni,
                        tel: school.tel,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [Number(school.long), Number(school.lat)]
                    }
                }))
            };

            // Sort the schools by regimen,
            // first PRIVADO, then PRIVADO - CONCERTADO, and finally PÚBLICO
            // This is done to highilght the public schools first, damn it.
            schoolsData.features.sort((a, b) => {
                const toNum = (reg: string) => {
                    if (reg === 'PRIVADO') return 0;
                    if (reg === 'PRIVADO - CONCERTADO') return 1;
                    if (reg === 'PÚBLICO') return 2;
                    return 3;
                };
                const numA = toNum(a.properties.reg);
                const numB = toNum(b.properties.reg);
                if (numA < numB) return -1;
                if (numA > numB) return 1;
                return 0;
            });


            map.addSource('schools', {
                type: 'geojson',
                data: schoolsData,
            }).addLayer({
                id: 'schools',
                type: 'circle',
                source: 'schools',
                paint: {
                    'circle-opacity': 0.8,
                    'circle-color': mapColor(mapStyleTheme),
                    'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 3, 15, 10]
                },
            });
        });

        // Change cursor to pointer when over a school
        map.on('mouseenter', 'schools', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        // Change cursor back to default when not over a school
        map.on('mouseleave', 'schools', () => {
            map.getCanvas().style.cursor = '';
        });


        // Add a popup on click
        map.on('click', 'schools', (e) => {
            if (e !== undefined && e.features &&
                e.features.length > 0 && e.features[0].geometry &&
                e.features[0].geometry.type === 'Point') {
                const coordinates = e.features[0].geometry.coordinates.slice() as LngLatLike;
                const properties = e.features[0].properties;

                // Create a popup
                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
                        <h3>${properties.deno}</h3>
                        <ul>
                            <li><strong>Municipio:</strong> ${properties.muni}</li>
                            <li><strong>Regimen:</strong> ${properties.reg}</li>
                            <li><strong>Telefono:</strong> <a href="tel:${properties.tel}">${properties.tel}</a></li>
                        </ul>
                        <button class="more-info" onclick="window.open('${moreInfo(properties.id)}')">Más info</button>
                    `)
                    .addTo(map);
            }
        });
    }, [mapContainer.current]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
