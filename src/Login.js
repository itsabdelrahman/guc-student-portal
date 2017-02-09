import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false
    };
  }

  login = () => {
    this.setState({
      loading: true
    });

    const url = 'http://guc-api.herokuapp.com/api/login';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.state.username.concat(':').concat(this.state.password))}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if (json.data.authorized) {
          this.props.setCredentials(this.state);
          this.props.router.push('/midterms');
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Username"
          hintText="john.doe"
          onChange={event => this.setState({ username: event.target.value })}
          />
        <br />
        <TextField
          type="password"
          floatingLabelText="Password"
          hintText="12345"
          onChange={event => this.setState({ password: event.target.value })}
          />
        <br />
        <br />
        <RaisedButton primary label="Login" onClick={this.login} />
        <br />
        <br />
        {this.state.loading ? <CircularProgress /> : null}
      </div>
    );
  }
}

export default Login;