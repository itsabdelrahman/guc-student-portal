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
        <div>
          <h3>Username:</h3>
          <input type="text" onChange={(event) => { this.setState({ username: event.target.value }) } } />
          <h3>Password:</h3>
          <input type="password" onChange={(event) => { this.setState({ password: event.target.value }) } } />
          <br />
          <br />
          <button onClick={() => {/*TODO: Perform HTTP request*/ } }>Log in</button>
        </div>
      </div>
    );
  }
}

export default App;
