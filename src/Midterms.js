import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
      <Table>
        <TableHeader
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Course</TableHeaderColumn>
            <TableHeaderColumn>Percentage</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {this.state.midterms.map(({ course, percentage }, index) => (
            <TableRow key={index}>
              <TableRowColumn>{course}</TableRowColumn>
              <TableRowColumn>{percentage}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Midterms;