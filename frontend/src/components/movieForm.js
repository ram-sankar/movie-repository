import React, { Component } from 'react';
import Input from './common/input'
import Select from './common/select'
import { getMovie, editMovie, addMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Component {
    state = { 
        data:{
            _id:'',
            title:'',
            numberInStock:'',
            dailyRentalRate:'',
            genreId:''
        },
        genre:[],
        errors:{},
        displayText:''
    }

    validateInput = ({id, value}) =>{
        if(id==='title')
            if(value.trim()==='') return "Title Required"
        if(id==='numberInStock')
            if(value.trim()==='') return "Stock Required"
        if(id==='dailyRentalRate')
            if(value.trim()==='') return "Rate Required"
    }
    handleChange = e =>{    
        const errors = {...this.state.errors};
        const errorMessage = this.validateInput(e.target);
        if(errorMessage) errors[e.target.id] = errorMessage
        else delete errors[e.target.id]    

        const data = {...this.state.data}
        data[e.target.id] = e.target.value

        this.setState({data, errors})
    }    
    validate = () =>{
        const {title, numberInStock, dailyRentalRate, genreId} = this.state.data;
        const errors = {};
        if(title.trim()==='')
            errors.title = 'title Required';
        if(numberInStock==='')
            errors.numberInStock = 'numberInStock Required';
        if(dailyRentalRate==='')
            errors.numberInStock = 'numberInStock Required';
        if(genreId==='')
            errors.genreId = 'numberInStock Required';

        return Object.keys(errors).length===0 ? null : errors
        
    }
    saveChanges = async e =>{
        e.preventDefault()
        let errors = this.validate();        
        this.setState({errors:errors||{}})
        if(errors) return;
        if(this.state.data._id!=='')
            await editMovie(this.state.data);
        else
            try{await addMovie(this.state.data)}
            catch(e){console.log(e)}
        this.props.history.push('/movies')
    }

    populateGenres = async () =>{        
        const { data:allGenre } = await getGenres();
        this.setState({genre:allGenre});
    }

    populateMovies = async () =>{
        const movieId = this.props.match.params.id
        if(movieId==='new') {
            this.setState({ displayText : 'Add New Movie' });
            return;
        }

        try{
            const { data:movieDetails } = await getMovie(movieId)
            const data ={
                        _id:movieDetails._id,
                        title:movieDetails.title,
                        dailyRentalRate:movieDetails.dailyRentalRate,
                        numberInStock:movieDetails.numberInStock,
                        genreId:movieDetails.genre._id}

            this.setState({data, displayText : 'Edit Movie'})
        }
        catch(e){            
            if(e.response && e.response.status===404)
                this.props.history.replace('/not-found')
        }   
    }

    async componentDidMount(){
        await this.populateGenres();
        await this.populateMovies();         
    }

    render() { 
        const {title, dailyRentalRate, numberInStock, genreId} = this.state.data;
        const {genre, errors, displayText} = this.state;

        return ( 
            <div>
                <br/><br/>
                <div className="movieContainer">
                    <h3 className="text-center">{displayText}</h3>
                    <form>
                        <Input name="Title"
                            type="text"
                            value={title}
                            handleChange={this.handleChange}
                            id="title"
                            errors={errors.title}
                        />
                        <Select name="Genre"
                            value={genreId}
                            handleChange={this.handleChange}
                            id="genreId"
                            genre={genre}
                        />
                        <Input name="Rating"
                            type="number"
                            value={dailyRentalRate}
                            handleChange={this.handleChange}
                            id="dailyRentalRate"
                            errors={errors.dailyRentalRate}
                        />
                        <Input name="Stock"
                            type="number"
                            value={numberInStock}
                            handleChange={this.handleChange}
                            id="numberInStock"
                            errors={errors.numberInStock}
                        />
                    <button onClick={this.saveChanges} disabled={this.validate()} type="submit" className="btn btn-primary">Save</button>
                </form>
                </div>
            </div>
         );
    }
}
 
export default MovieForm;