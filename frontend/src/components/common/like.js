import React from 'react';

const Liked = ({like, change}) => {
    let heart;
    if(like)
        heart = "fa fa-heart"
    else
        heart = "fa fa-heart-o"
    return ( <i className={heart} onClick={change} aria-hidden="true"></i> );
}
 
export default Liked;