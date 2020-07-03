import React, { Component } from 'react';
import { registerUser } from '../services/userService'
import {Link, Redirect} from 'react-router-dom'
import Input from './common/input';
import { toast } from 'react-toastify';
import auth from '../services/authService'


class Register extends Component {
    state = {  
        name : '',
        password : '',
        phone : '',
        email : ''
    }

    handleChange = e =>{
        this.setState({ [e.target.id]:e.target.value })
    }
    handleSubmit = async e =>{
        e.preventDefault();
        
        try{
            const res = await registerUser(this.state)
            auth.loginWithJwt(res);
            window.location = '/movies'
        }
        catch(e){
            if(e.response && e.response.status===400)
                toast.error("User already exsist")
        }
        
    }
    render() { 
        const {name, password, email, phone} = this.state;
        if(auth.getCurrentUser()) return <Redirect to='/movies'/>

        return ( 
            <React.Fragment>
                <div className="RegisterContainer">
                    <form>
                        <Input name="User Name"
                            type="text"
                            value={name}
                            handleChange={this.handleChange}
                            id="name"
                        />                           
                        <Input name="E-mail ID"
                            type="email"
                            value={email}
                            handleChange={this.handleChange}
                            id="email"
                        />                           
                        <Input name="Phone"
                            type="number"
                            value={phone}
                            handleChange={this.handleChange}
                            id="phone"
                        />                                         
                        <Input name="Password"
                            type="password"
                            value={password}
                            handleChange={this.handleChange}
                            id="password"
                        />

                        <div className="text-center"><button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button></div>
                    </form>
                    <p className="text-center">Have an account? <Link to="/login">Login</Link></p>
                </div>            
            </React.Fragment>
        );
    }
}
 
export default Register;