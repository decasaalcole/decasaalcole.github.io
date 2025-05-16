import { useEffect, useRef } from 'react';
import maplibregl, { GeoJSONFeature } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

import schools from '../assets/data/schools.json';

export function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const lng = -0.3;
    const lat = 39.44;
    const zoom = 7;
    const mapStyle = 'https://maps.black/styles/openstreetmap-openmaptiles/openfreemap/fiord/style.json';

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
            map.addSource('schools', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: schools.map((school) => ({
                        type: 'Feature',
                        properties: {
                            id: school.codigo,
                            cp: school.cp,
                            reg: school.reg,
                            deno: school.deno
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [school.long, school.lat]
                        }
                    } as unknown as GeoJSONFeature))
                }
            }).addLayer({
                id: 'schools',
                type: 'circle',
                source: 'schools',
                paint: {
                    'circle-radius': 6,
                    'circle-opacity': 0.8,
                    'circle-color': [
                        'match',
                        ['get', 'reg'],
                        'PÚBLICO', '#ccff99',
                        'PRIVADO', '#FABADA',
                        'PRIVADO - CONCERTADO', '#9999ff',
                        '#FF0000'
                    ]
                }
            });
        });


        // Add a popup on click
        map.on('click', 'schools', (e) => {
            if (e !== undefined) {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;
    
                // Create a popup
                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
                        <h3>${properties.deno}</h3>
                        <p>Regimen: ${properties.reg}</p>
                        <p>Codigo Postal: ${properties.cp}</p>
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
