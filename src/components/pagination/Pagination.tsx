import { useState, useEffect } from "react";
import { PaginationProps } from "../../types/types";
import './Pagination.css';
export function Pagination({ page, modifyPage, disablePrev, disableNext }: PaginationProps) {

    const [showPagination, setShowPagination] = useState(true);

    useEffect(() => {
        setShowPagination(!disablePrev || !disableNext);
    }, [disablePrev, disableNext]);

    return (
        showPagination && (
            <div className='pagination'>
                <button 
                    onClick={() => !disablePrev && modifyPage(page - 1)} 
                    className={`btn ${disablePrev ? 'disabled' : ''}`}
            >
                Anteriores
            </button>
            <button 
                onClick={() => !disableNext && modifyPage(page + 1)} 
                className={`btn ${disableNext ? 'disabled' : ''}`}
                >
                    Siguientes
                </button>
            </div>
        )
    )
}