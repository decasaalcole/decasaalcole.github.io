import './Results.css';
import { School } from '../types/types';
import { CardSchool } from './card/CardSchool';
import noResults from '../assets/icons/no_results.svg';
import { DownloadBtn } from './btns/DownloadBtn';
import { Pagination } from './pagination/Pagination';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 20;

export function Results({ schools }: { schools: School[] }) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [schools]);

    const totalPages = Math.ceil(schools.length / PAGE_SIZE);
    const schoolsPage = schools.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="results">
            <h2>Listado de centros ordenados por tiempo de viaje</h2>
            <div className="total">{schools.length} centros seleccionados</div>

            {schoolsPage.length === 0 ? (
                <div className="no-results">
                    <img src={noResults} alt="" />
                    <p>No se han encontrado colegios con los criterios seleccionados</p>
                </div>
            ) : (
                <>
                    <Pagination page={page} modifyPage={setPage} disablePrev={page === 1} disableNext={page === totalPages} />
                    {schoolsPage.map((school) => (
                        <CardSchool key={school.codigo} school={school} />
                    ))}
                    <Pagination page={page} modifyPage={setPage} disablePrev={page === 1} disableNext={page === totalPages} />
                </>
            )}
            {schools.length > 0 && (
                <div className="results-footer">
                    <DownloadBtn />
                </div>
            )}
        </div>
    )
}