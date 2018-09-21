import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Signin from './auth/Signin';
import Jokes from './auth/Jokes';
import Register from './auth/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div>
             <button onClick={this.logout}>Logout</button>
          </div>
        </header> 
        
        <Route path="/signin" component ={Signin}></Route>
        <Route path="/jokes" component ={Jokes}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    );
  }
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
  }
}

export default withRouter(App);
