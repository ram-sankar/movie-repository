import React from 'react';
import Input from './input'

const SearchBox = ({value, handleSearchQuery}) => {     
    return ( 
        <div className="searchBox">
            <Input name="Search Movies"
                type="text"
                value={value}
                handleChange={handleSearchQuery}
                id="search"
                labelRequired="false"
            />
        </div>
    );    
}
 
export default SearchBox;