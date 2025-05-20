import '../index.css';
import './About.css';

// Import metadata files
import {timestamp as travelTimesTimestamp, postal_codes, travel_times} from '../assets/data/travel_times.metadata.json';
import { total_schools, timestamp as schoolTimestamp} from '../assets/data/schools.metadata.json';

export function About() {
  const formattedSchools = total_schools.toLocaleString("es-ES");
  const formattedTravelTimes = travel_times.toLocaleString("es-ES");
  const formattedPostalCodes = postal_codes.toLocaleString("es-ES");

  return (
    <div className="about-container">
      <h2>Sobre Decasaalcole</h2>
      <p>
        Proyecto desarrollado por un grupo de colegas con el objetivo de ayudar a familias
        y profesionales de la educación a encontrar el colegio más cercano a su domicilio.
      </p>
      <h3>Metadatos</h3>
      <ul>
        <li>Escuelas:
            <ul>
                <li> Número de centros: <strong>{formattedSchools}</strong></li>
                <li> Ultima actualización : <strong>{new Date(schoolTimestamp).toLocaleDateString('es-ES')}</strong></li>
            </ul>
        </li>
        <li>Tiempos de viaje
            <ul>
                <li>Última actualización: <strong>{new Date(travelTimesTimestamp).toLocaleDateString('es-ES')}</strong></li>
                <li>Rutas: <strong>{formattedTravelTimes}</strong></li>
                <li>Códigos postales: <strong>{formattedPostalCodes}</strong></li>
            </ul>
        </li>
      </ul>
      <h3>Fuentes</h3>
      <ul>
        <li>Datos de las escuelas extraídos de la <a href='https://ceice.gva.es/es/web/centros-docentes/guia-de-centros-docentes'>Guia de Centres Docents</a> de la Conselleria d'Educacio, Cultura, Universitats, i Ocupació de la Generalitat Valenciana</li>
        <li>Códigos postales derivados del juego de datos de direcciones postales del proyecto <a href='https://www.cartociudad.es/web/portal'>Cartociudad</a>, disponibles en el <a href='https://centrodedescargas.cnig.es/CentroDescargas/cartociudad'>Centro de descargas del CNIG</a></li>
        <li>Tiempos de viaje calculados utilizando el motor de rutas <a href='https://github.com/Project-OSRM/osrm-backend'>OSRM</a> a partir de la red de carreteras extraída de <a href='https://osm.org'>OpenStreetMap</a> publicado por <a href='https://download.geofabrik.de/europe/spain/valencia.html'>Geofabrik</a></li>
      </ul>
      <h3>Contacto</h3>
      <p>
        Para sugerencias, correcciones o dudas, puedes contactar con el equipo en <a href="mailto:info@decasaalcole.es">info@decasaalcole.es</a>.
      </p>
      <h3>Créditos</h3>
      <p>
        Idea original:
      </p>
      <ul>
        <li>Alicia Rodrigo Valero</li>
      </ul>
      <p>
        Proyecto desarrollado en <a href='https://github.com/decasaalcole/'>abierto</a> por:
      </p>
      <ul>
        <li><a href='https://www.linkedin.com/in/vsanjaime/'>Vicent Sanjaime</a></li>
        <li><a href='https://www.linkedin.com/in/pedrojuanferrer/'>Pedro-Juan Ferrer</a></li>
        <li><a href='https://jorgesanz.net'>Jorge Sanz</a></li>
        <li><a href='https://www.linkedin.com/in/raolbal/'>Rafael Oliete</a></li>
        <li><a href='https://www.linkedin.com/in/danigaston/'>Daniel Gastón</a></li>
      </ul>
      <p>
        Docentes colaboradores:
      </p>
      <ul>
        <li>Alicia Rodrigo Valero</li>
        <li>Enrique Perez Monzó</li>
        <li>Laura Martínez Torres</li>
      </ul>
    </div>
  );
}
