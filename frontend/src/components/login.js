import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Input from './common/input';
import { toast } from 'react-toastify';
import auth from '../services/authService';


class Login extends Component {
    state = {  
        credential:{
            username : '',
            password : ''
        },
        noMatch : <div className="beforeNoMatch"></div>,
        errors:{}
    }
    
    validateInput = ({id, value}) =>{
        if(id==='password')
            if(value.trim()==='') return "User Name Required"
            else if(value.length<6) return "Minimum 6 Character Required"
        if(id==='username')
            if(value.trim()==='') return "Password Required"
            else if(value.length<8) return "Minimum 8 Character Required"
    }

    handleChange = e =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateInput(e.target);
        if(errorMessage) errors[e.target.id] = errorMessage
        else delete errors[e.target.id]

        let temp = {...this.state.credential}
        temp[e.target.id] = e.target.value
        this.setState({ credential:temp,errors })
    }
    validate = () =>{
        const {username,password} = this.state.credential;
        const errors = {};
        if(username.trim()==='')
            errors.username = 'Username Required';
        if(password.trim()==='')
            errors.password = 'Password Required';

        return Object.keys(errors).length===0 ? null : errors
        
    }
    handleSubmit = async e =>{
        e.preventDefault();
        let errors = this.validate();
        
        this.setState({errors:errors||{}})
        if(errors) return;

        try{
            await auth.loginUser(this.state.credential)

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/movies'
        }
        catch(e){
            if(e.response && e.response.status===400){
                toast.error("User and password does not match")
                console.log(e.response)
            }
        }

    }
    render() { 
        const {username, password} = this.state.credential;
        const {errors} = this.state;
        if(auth.getCurrentUser()) return <Redirect to='/movies'/>
        
        return ( 
            <React.Fragment>
                <div className="LoginContainer">
                    <form>
                        <Input name="User Name"
                            type="text"
                            value={username}
                            handleChange={this.handleChange}
                            id="username"
                            errors={errors.username}
                        />                        
                        <Input name="Password"
                            type="password"
                            value={password}
                            handleChange={this.handleChange}
                            id="password"
                            errors={errors.password}
                        />
                        {this.state.noMatch}
                        <div className="text-center">
                            <button 
                            type="submit" 
                            onClick={this.handleSubmit}
                            disabled={this.validate()} 
                            className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <p className="text-center">Doesn't have an account? <Link to="/register">Register</Link></p>
                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default Login;