import React, { Component } from 'react';
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GUC Student Portal</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={(event) => { this.setState({ username: event.target.value }) } } />
        <input type="text" onChange={(event) => { this.setState({ password: event.target.value }) } } />
      </div>
    );
  }
}

export default App;
