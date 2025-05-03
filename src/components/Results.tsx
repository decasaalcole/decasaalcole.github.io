import './Results.css';
import { School } from '../types/types';
import { CardSchool } from './card/CardSchool';
import noResults from '../assets/icons/no_results.svg';
import { DownloadBtn } from './btns/DownloadBtn';

export function Results({ schools }: { schools: School[] }) {
    return (
        <>
        <div className="results">            
            <h2>Listado de colegios ordenados</h2>
            <div className="total">{schools.length} colegios selecionados</div>
            {schools.length === 0 ? (
                <div className="no-results">
                    <img src={noResults} alt="" />
                    <p>No se han encontrado colegios con los criterios seleccionados</p>
                </div>
            ) : (
                
                schools.slice(0, 50).map((school) => (
                    <CardSchool key={school.codigo} school={school} />
                ))
            )}
            {schools.length > 0 && (
                <div className="results-footer">
                    <DownloadBtn />
                </div>
            )}
        </div>
        </>
    )
}