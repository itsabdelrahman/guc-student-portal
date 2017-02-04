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

  componentWillMount() {
    this.fetchMidterms().then(({ data }) => {
        this.setState({
            midterms: data
        });
    });
  }

  render() {
    return (
      <div>
        <h3>Midterms grades:</h3>
        {this.state.midterms.map(({ course, percentage }, index) => (
            <h4 key={index}>{course}: {percentage}</h4>
        ))}
      </div>
    );
  }
}

export default Midterms;