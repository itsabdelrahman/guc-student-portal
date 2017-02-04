import React, { Component } from 'react';
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
        <Login />
        <Midterms />
      </div>
    );
  }
}

export default App;
