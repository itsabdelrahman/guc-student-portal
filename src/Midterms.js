import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { Tabs, Tab } from 'material-ui/Tabs';

class Midterms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midterms: [],
      loading: false,
      open: true,
      value: 'b'
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

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}>
          <Tab label="COURSEWORK" value="a">
            <h1>Hi</h1>
          </Tab>
          <Tab label="MIDTERMS" value="b">
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
          </Tab>
          <Tab label="ATTENDANCE" value="c">
            <h1>Sup</h1>
          </Tab>
          <Tab label="EXAMS SCHEDULE" value="d">
            <h1>Yoo</h1>
          </Tab>
        </Tabs>
        <Snackbar
          open={this.state.open}
          message={'Welcome, ' + this.props.credentials.username + '!'}
          autoHideDuration={4000} />
      </div>
    );
  }
}

export default Midterms;