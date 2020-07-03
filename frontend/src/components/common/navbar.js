import React from 'react';
import { Link, NavLink } from 'react-router-dom';
 
function Navbar({user}) {
  return (  
    <nav className="navbar navbar-expand-lg  navbar-dark bg-primary justify-content-between">
    <Link className="navbar-brand" to="/movies">Navbar</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
            <NavLink  className="nav-link" to="/movies">Movies</NavLink>
            <NavLink  className="nav-link" to="/customers">Customers</NavLink>
            <NavLink  className="nav-link" to="/rentals">Rentals</NavLink>                           
                    
            {!user && <React.Fragment>
                        <NavLink  className="nav-link" to="/login">Login</NavLink>      
                        <NavLink  className="nav-link" to="/register">Register</NavLink>                           
                    </React.Fragment>
            }
            {user && <React.Fragment>                        
                        <NavLink  className="nav-link" to="/profile">Profile</NavLink>     
                        <NavLink  className="nav-link" to="/logout">Logout</NavLink>   
            </React.Fragment>
            }
        </ul>
    </div>
    </nav>
    )
}
 
export default Navbar;