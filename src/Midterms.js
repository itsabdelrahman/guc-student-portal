import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Midterms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midterms: []
    }
  }

  fetchMidterms = () => {
    const url = 'http://guc-api.herokuapp.com/api/midterms';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.props.credentials.username.concat(':').concat(this.props.credentials.password))}`
      }
    };

    return fetch(url, options)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  componentDidMount() {
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