import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';

class Login extends Component {
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
      .then(json => {
        if (json.data.authorized) this.props.route.setCredentials(this.state);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>Username:</h3>
        <input type="text" onChange={event => this.setState({ username: event.target.value })} />
        <h3>Password:</h3>
        <input type="password" onChange={event => this.setState({ password: event.target.value })} />
        <br />
        <br />
        <Link to="/midterms"><button onClick={this.login}>Log in</button></Link>
      </div>
    );
  }
}

export default Login;