import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Login from './Login';
import Midterms from './Midterms';
import logo from './guc-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      authorized: false
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GUC Student Portal</h2>
        </div>
        <Router history={browserHistory}>
          <Route path='/login' component={Login} />
          <Route path='/midterms' component={Midterms} />
        </Router>
      </div>
    );
  }
}

export default App;
