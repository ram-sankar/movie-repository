import React, { Component } from 'react';
import _ from 'lodash'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getMovies, deleteMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './common/moviesTable';
import Pagination from './common/pagination';
import SideList from './common/sideList';
import {paginate} from './utils/paginate';
import SearchBox from './common/searchBox'

class Movies extends Component {
    state = { 
        movies:[],
        genre:[],
        pageSize:4,
        currentPage:1,
        selectedGenre:'all',
        sortColumn:{col:'', order:''},
        searchQuery:''
    }

    async componentDidMount() { 
        const movies = await getMovies()
        const genre = await getGenres()
        this.setState({ movies:movies.data, genre:genre.data }) }
    
    changeHeart = movie =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked
        this.setState({movies})
    }

    handleDelete = async id => {
        const preStateMovies = this.state.movies
        const movies = this.state.movies.filter(movie => id !== movie._id)
        this.setState({ movies });

        try{
            await deleteMovies(id)
        }
        catch(e){
            if(e.response && e.response.status===404)
                toast.error("This movie does not exsist")
            this.setState({ movies: preStateMovies });
        }
    }

    handlePageChange = page => this.setState({currentPage:page}) 

    handleGenreSelect = genre => this.setState({selectedGenre:genre, currentPage:1, searchQuery:""})   
    
    handleSort = sortColumn => this.setState({sortColumn})

    handleSearchQuery = e => this.setState({searchQuery:e.target.value, currentPage:1, selectedGenre:'all'})

    getPagedData = () =>{
        const { movies :allMovies, 
                pageSize, 
                currentPage, 
                selectedGenre, 
                sortColumn,
                searchQuery } = this.state; 

        let filteredMovies                                   
                                  
        if(searchQuery!=='')
            filteredMovies = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if(selectedGenre==='all')
            filteredMovies = allMovies
        else if(selectedGenre)
            filteredMovies = allMovies.filter(movie=>selectedGenre===movie.genre.name) 
                
        const sortedMovies = _.orderBy(filteredMovies,[sortColumn.col], [sortColumn.order])

        const movies = paginate(sortedMovies,pageSize,currentPage)

        return {filteredMovies, movies}
    }

    render() { 
        const { movies :allMovies, 
                pageSize, 
                currentPage, 
                genre, 
                selectedGenre, 
                sortColumn,
                searchQuery } = this.state; 
        
        const { filteredMovies, movies } = this.getPagedData()
        const { user } = this.props;
        
        if(allMovies.length)
            return <>              
                        <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <SideList 
                                    items={genre} 
                                    handleGenreSelect={this.handleGenreSelect}
                                    selectedGenre={selectedGenre}
                                />
                            </div>                    
                            <div className="col">
                                <p className="noOfMovies text-center">Showing {filteredMovies.length} Movies in DB</p>
                                {user && <Link to="movies/new" className="btn btn-primary newButton"> New Movie </Link>}
                                <SearchBox value={searchQuery} handleSearchQuery={this.handleSearchQuery}/>
                                <MoviesTable 
                                    movies={movies}
                                    sortColumn={sortColumn}
                                    changeHeart={this.changeHeart}
                                    handleDelete={this.handleDelete}
                                    handleSort={this.handleSort}
                                    user={user}
                                />
                                <Pagination 
                                    movieCount={filteredMovies.length} 
                                    pageSize={pageSize} 
                                    onPageChange={this.handlePageChange} 
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                </>
        else
            return <div className="noOfMovies text-center">Loading movies from DB...</div>
        
    }
}
 
export default Movies;