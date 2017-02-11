import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Tabs, Tab } from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        loading: false,
        midterms: []
      },
      tabs: {
        value: 'MIDTERMS'
      },
      snackbar: {
        open: true
      }
    }
  }

  componentDidMount() {
    this.fetchMidterms().then(({ data }) => {
      this.setState({
        data: {
          loading: false,
          midterms: data
        }
      });
    });
  }

  fetchMidterms = () => {
    this.setState({ data: { ...this.state.data, loading: true } });

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

  handleTabChange = (value) => {
    this.setState({ tabs: { value } });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbar: { open: false } });
  };

  render() {
    return (
      <div>
        <div>
          <Tabs
            value={this.state.tabs.value}
            onChange={this.handleTabChange}
            >
            <Tab label="COURSEWORK" value="COURSEWORK">
              <h2>Coursework</h2>
            </Tab>
            <Tab label="MIDTERMS" value="MIDTERMS">
              <Table>
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Course</TableHeaderColumn>
                    <TableHeaderColumn>Percentage</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.data.midterms.map(({ course, percentage }, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>{course}</TableRowColumn>
                      <TableRowColumn>{percentage}%</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab label="ATTENDANCE" value="ATTENDANCE">
              <h2>Attendance</h2>
            </Tab>
            <Tab label="EXAMS" value="EXAMS">
              <h2>Exams</h2>
            </Tab>
          </Tabs>
        </div>
        <br />
        <div>
          {this.state.data.loading ? <CircularProgress /> : null}
        </div>
        <div>
          <Snackbar
            open={this.state.snackbar.open}
            message={'Welcome, ' + this.props.credentials.username + '!'}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarClose}
            />
        </div>
      </div>
    );
  }
}

export default Dashboard;