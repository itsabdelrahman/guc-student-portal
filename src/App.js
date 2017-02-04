import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
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

  login = () => {
    const loginUrl = 'http://guc-api.herokuapp.com/api/login';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.state.username.concat(':').concat(this.state.password))}`
      }
    };

    fetch(loginUrl, options)
      .then(res => res.json())
      .then(json => alert(json.data.authorized))
      .catch(err => console.error(err));
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
          <input type="text" onChange={event => this.setState({ username: event.target.value })} />
          <h3>Password:</h3>
          <input type="password" onChange={event => this.setState({ password: event.target.value })} />
          <br />
          <br />
          <button onClick={() => this.login()}>Log in</button>
        </div>
      </div>
    );
  }
}

export default App;
