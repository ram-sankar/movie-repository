import React from 'react';

const Select = ({name, value, handleChange, id, genre}) => {
    
    const selectGenre = genre.length===0 ? null : 
    genre.map(item => (<option key={item._id} value={item._id}>{item.name}</option>))

    return ( 
        <div className="form-group">
            <label>{name}</label>
            <select className="form-control" id={id} value={value} onChange={handleChange}>
            <option>Select genre</option>
            {selectGenre}
            </select>
        </div> );
}
 
export default Select;