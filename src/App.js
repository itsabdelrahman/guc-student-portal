import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Login from './Login';
import Midterms from './Midterms';
import logo from './guc-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  setCredentials = ({ username, password }) => {
    this.setState({
      username,
      password
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GUC Student Portal</h2>
        </div>
        <Router history={browserHistory}>
          <Route path='/' component={Login} setCredentials={this.setCredentials} />
          <Route path='/midterms' component={Midterms} credentials={{ username: this.state.username, password: this.state.password }} />
        </Router>
      </div>
    );
  }
}

export default App;
