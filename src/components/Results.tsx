import './Results.css';
import { School } from '../types/types';
import { CardSchool } from './card/CardSchool';
import noResults from '../assets/icons/no_results.svg';
import { DownloadBtn } from './btns/DownloadBtn';
import { Pagination } from './pagination/Pagination';
import { useState, useEffect } from 'react';

export function Results({ schools }: { schools: School[] }) {

    const pageSize = 20;

    const [page, setPage] = useState(1);
    const [schoolsPage, setSchoolsPage] = useState<School[]>([]);

    useEffect(() => {
        setPage(1);
    }, [schools]);

    useEffect(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        setSchoolsPage(schools.slice(start, end));
    }, [page, schools]);

    return (
        <>
        <div className="results">            
            <h2>Listado de centros ordenados por tiempo de viaje</h2>
            <div className="total">{schools.length} centros selecionados</div>
            
            {schoolsPage.length === 0 ? (
                <div className="no-results">
                    <img src={noResults} alt="" />
                    <p>No se han encontrado colegios con los criterios seleccionados</p>
                </div>
            ) : (
                <>
                    <Pagination page={page} modifyPage={setPage} disablePrev={page === 1} disableNext={page === Math.ceil(schools.length / pageSize)} />
                    {schoolsPage.map((school) => (
                        <CardSchool key={school.codigo} school={school} />
                    ))}
                    <Pagination page={page} modifyPage={setPage} disablePrev={page === 1} disableNext={page === Math.ceil(schools.length / pageSize)} />
                </>
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