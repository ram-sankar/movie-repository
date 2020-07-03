import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Login from './components/login';
import Register from './components/register';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import NotFound from './components/notFound';
import Navbar from './components/common/navbar';
import Logout from './components/common/logout';
import auth from './services/authService'
import ProtectedRoute from './components/common/protectedRoute'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {  }

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() { 
    return ( 
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user}/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <ProtectedRoute path="/movies/:id" component={MovieForm}/>  
          <Route 
              path="/movies" 
              render = {props => <Movies {...props} user={this.state.user}/> } 
          />   
          <Route path="/logout" component={Logout}/>  
          <Redirect exact from="/" to="/movies"/>
          <Route path="*" component={NotFound}/>    
        </Switch>
      </React.Fragment>
     );
  }
}

export default App;
