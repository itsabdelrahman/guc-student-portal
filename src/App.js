import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>GUC Student Portal</h2>
          </div>
          <Router history={browserHistory}>
            <Route path='/' component={(props) => <Login setCredentials={this.setCredentials} {...props} />} />
            <Route path='/midterms' component={(props) => <Midterms credentials={this.state} {...props} />} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
