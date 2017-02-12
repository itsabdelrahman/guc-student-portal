import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';

class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        loading: false,
        attendance: []
      }
    }
  }

  componentDidMount() {
    this.fetchAttendance().then(({ data }) => {
      this.setState({
        data: {
          loading: false,
          attendance: data
        }
      });
    });
  }

  fetchAttendance = () => {
    this.setState({ data: { ...this.state.data, loading: true } });

    const url = 'https://guc-api.herokuapp.com/api/attendance';
    const options = {
      headers: {
        'Authorization': `Basic ${btoa(this.props.credentials.username.concat(':').concat(this.props.credentials.password))}`
      }
    };

    return fetch(url, options)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <div>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Course</TableHeaderColumn>
                <TableHeaderColumn>Level</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.data.attendance.map(({ course, level }, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{course}</TableRowColumn>
                  <TableRowColumn>{level}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <br />
        <div>
          {this.state.data.loading ? <CircularProgress /> : null}
        </div>
      </div>
    );
  }
}

export default Attendance;