import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

class Midterms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midterms: [],
      loading: false,
      open: true
    }
  }

  fetchMidterms = () => {
    this.setState({
      loading: true
    });

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
        midterms: data,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
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
            {this.state.loading ? <CircularProgress /> : null}
            {this.state.midterms.map(({ course, percentage }, index) => (
              <TableRow key={index}>
                <TableRowColumn>{course}</TableRowColumn>
                <TableRowColumn>{percentage}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          open={this.state.open}
          message={'Welcome, ' + this.props.credentials.username + '!'}
          autoHideDuration={4000} />
      </div>
    );
  }
}

export default Midterms;