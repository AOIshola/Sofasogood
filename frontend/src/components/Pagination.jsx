import React from "react";
import { useProduct } from "../contexts/ProductContext";
import './pagination.css';

function Pagination() {
    const { numPages,
        page: currentPage,
        gotoPage,
        prevPage,
        nextPage, } = useProduct();
    let pageNumbers = []
    for (let i = 1; i <= numPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination-container">
            <button className="btn" onClick={prevPage} disabled={currentPage === 1}>Prev</button>
            <div className="page-numbers">
                {pageNumbers.map((page) => (
                    <button key={page} onClick={(e) => gotoPage(e, page)}
                        className={`btn page-number ${page === currentPage ? 'active' : ''}`}>
                        {page}
                    </button>
                ))}
            </div>
            <button className="btn" onClick={nextPage} disabled={currentPage === numPages}>Next</button>
        </div>
    )
}

export default Pagination