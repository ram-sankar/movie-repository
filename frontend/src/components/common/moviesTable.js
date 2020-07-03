import React,{Component} from 'react';
import Liked from './like';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    state = { 
     }
    
    handleSort = (col) => {
        const sortColumn = this.props.sortColumn;
        if(sortColumn.col===col)
            sortColumn.order = sortColumn.order==='asc'? 'desc' :'asc'
        else{
            sortColumn.col = col;
            sortColumn.order = 'asc'
        }
        this.props.handleSort(sortColumn)
    }

    renderSortIcon = col =>{
        const sortColumn = this.props.sortColumn;
        if(col!==sortColumn.col) return null;
        if("asc"===sortColumn.order) return <i className="fa fa-sort-asc"></i> 
        return <i className="fa fa-sort-desc"></i> ;
    }

    render() {  
        
        let {movies, changeHeart, handleDelete, user} = this.props;
        return ( 
            <table className="table">
            <thead>
                <tr>
                <th className="clickable" onClick={()=>this.handleSort('title')}>Title {this.renderSortIcon('title')}</th>
                <th className="clickable" onClick={()=>this.handleSort('genre.name')}>Genre {this.renderSortIcon('genre.name')}</th>
                <th className="clickable" onClick={()=>this.handleSort('numberInStock')}>Stock {this.renderSortIcon('numberInStock')}</th>
                <th className="clickable" onClick={()=>this.handleSort('dailyRentalRate')}>Price {this.renderSortIcon('dailyRentalRate')}</th>
                {user && <th></th>}
                {user && user.isAdmin && <th></th>}
                </tr>
            </thead>
            <tbody>                        
                    {                        
                        movies.map(movie=>{
                            return(
                            <tr key={movie._id}>
                                <td>
                                    <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
                                </td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                {user && <td><Liked like={movie.liked} change={() => changeHeart(movie)}/></td>}
                                {user && user.isAdmin && <td><button className="btn btn-danger" onClick={() => handleDelete(movie._id)}>Delete</button></td>}
                            </tr>
                            )}
                        )
                    }
            </tbody>
        </table>
         );
    }
}
 
export default MoviesTable;