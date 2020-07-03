import React from 'react';

const Input = ({name, type, value, handleChange, id, errors, labelRequired}) => {
    let labels
    if(labelRequired!=="false") 
        labels = name;
    return (         
        <div className="form-group">
            <label>{labels}</label>
            <input type={type} className="form-control" id={id} value={value} onChange={handleChange} placeholder={name}/>                        
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
     );
}
 
export default Input;