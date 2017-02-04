import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Midterms extends Component {
  constructor() {
    super();

    this.state = {
        username: '',
        password: '',
        midterms: []
    }
  }

  fetchMidterms = () => {
    const midtermsUrl = 'http://guc-api.herokuapp.com/api/midterms';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.state.username.concat(':').concat(this.state.password))}`
      }
    };

    return fetch(midtermsUrl, options)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>Midterms grades:</h3>
      </div>
    );
  }

  componentDidMount() {
    this.fetchMidterms().then(json => {
        this.setState({
            midterms: json.data
        });
    });
  }
}

export default Midterms;