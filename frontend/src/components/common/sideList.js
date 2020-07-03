import React from 'react';

const SideList = ({items, handleGenreSelect, selectedGenre}) => {
    
    return (
        <div>
            <ul className="list-group sideList">
                <li className={selectedGenre==='all'?"list-group-item active":"list-group-item"} onClick={() => handleGenreSelect('all')}>All Genre</li>
                {
                    items.map(item => 
                        <li className={selectedGenre===item.name?"list-group-item active":"list-group-item"} 
                        onClick={() => handleGenreSelect(item.name)} 
                        key={item._id}>
                                {item.name}
                        </li> )
                }
            </ul>
        </div>
     );
}
 
export default SideList;