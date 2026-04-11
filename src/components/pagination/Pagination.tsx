import { PaginationProps } from "../../types/types";
import './Pagination.css';

export function Pagination({ page, modifyPage, disablePrev, disableNext }: PaginationProps) {
    const showPagination = !disablePrev || !disableNext;

    return (
        showPagination && (
            <div className='pagination'>
                <button
                    onClick={() => modifyPage(page - 1)}
                    className={`btn ${disablePrev ? 'disabled' : ''}`}
                    disabled={disablePrev}
                >
                    Anteriores
                </button>
                <button
                    onClick={() => modifyPage(page + 1)}
                    className={`btn ${disableNext ? 'disabled' : ''}`}
                    disabled={disableNext}
                >
                    Siguientes
                </button>
            </div>
        )
    );
}