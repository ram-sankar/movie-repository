import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';

const Pagination = ({pageSize, movieCount, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(movieCount/pageSize);

    if(pageCount===0) return null;
    const pages = _.range(1, pageCount+1);
    
    return ( 
        <nav aria-label="Page navigation example">
        <ul className="pagination">
            {
                pages.map(page => {
                    let active = "page-item"
                    if (page===currentPage) active = "page-item active"
                    return <li key={page} className={active}>
                        <div className="page-link" onClick={()=>onPageChange(page)}>{page}</div>
                    </li>
                })
            }
            
        </ul>
        </nav>
     );
}
 
Pagination.propTypes = {
    pageSize : propTypes.number.isRequired, 
    movieCount : propTypes.number.isRequired, 
    onPageChange : propTypes.func.isRequired, 
    currentPage :propTypes.number.isRequired
}
export default Pagination;