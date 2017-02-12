import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

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
      },
      snackbar: {
        open: false
      }
    };
  }

  login = () => {
    this.setState({ data: { loading: true } });

    const url = 'https://guc-api.herokuapp.com/api/login';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.state.credentials.username.concat(':').concat(this.state.credentials.password))}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: { loading: false } });

        if (json.data.authorized) {
          this.props.setCredentials(this.state.credentials);
          this.props.router.push('/dashboard');
        } else {
          this.setState({ snackbar: { open: true } });
        }
      })
      .catch(err => console.error(err));
  }

  handleSnackbarClose = () => {
    this.setState({ snackbar: { open: false } });
  };

  render() {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText="Username"
            hintText="john.doe"
            onChange={event => this.setState({ credentials: { ...this.state.credentials, username: event.target.value } })}
          />
        </div>
        <div>
          <TextField
            type="password"
            floatingLabelText="Password"
            hintText="12345"
            onChange={event => this.setState({ credentials: { ...this.state.credentials, password: event.target.value } })}
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
        <div>
          <Snackbar
            open={this.state.snackbar.open}
            message={'Invalid credentials!'}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarClose}
          />
        </div>
      </div>
    );
  }
}

export default Login;