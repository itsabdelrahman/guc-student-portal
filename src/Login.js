import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      data: {
        loading: false
      }
    };
  }

  login = () => {
    this.setState({ data: { loading: true } });

    console.log(this.state)

    const url = 'http://guc-api.herokuapp.com/api/login';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.state.credentials.username.concat(':').concat(this.state.credentials.password))}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if (json.data.authorized) {
          this.props.setCredentials(this.state);
          this.props.router.push('/dashboard');
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText="Username"
            hintText="john.doe"
            onChange={event => this.setState({ credentials: { username: event.target.value } })}
            />
        </div>
        <div>
          <TextField
            type="password"
            floatingLabelText="Password"
            hintText="12345"
            onChange={event => this.setState({ credentials: { password: event.target.value } })}
            />
        </div>
        <br />
        <div>
          <RaisedButton primary label="Login" onClick={this.login} />
        </div>
        <br />
        <div>
          {this.state.data.loading ? <CircularProgress /> : null}
        </div>
      </div>
    );
  }
}

export default Login;