import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';

class Exams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        loading: false,
        exams: []
      }
    }
  }

  componentDidMount() {
    this.fetchExams().then(({ data }) => {
      this.setState({
        data: {
          loading: false,
          exams: data
        }
      });
    });
  }

  fetchExams = () => {
    this.setState({ data: { ...this.state.data, loading: true } });

    const url = 'https://guc-api.herokuapp.com/api/exams';
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
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>Venue</TableHeaderColumn>
                <TableHeaderColumn>Seat</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.data.exams.map(({ course, dateTime, venue, seat }, index) => {
                const dateTimeUTC = moment(new Date(dateTime)).utc();
                return (<TableRow key={index}>
                  <TableRowColumn>{course}</TableRowColumn>
                  <TableRowColumn>{dateTimeUTC.format('dddd, MMMM Do YYYY')}</TableRowColumn>
                  <TableRowColumn>{dateTimeUTC.format('LT')}</TableRowColumn>
                  <TableRowColumn>{venue}</TableRowColumn>
                  <TableRowColumn>{seat}</TableRowColumn>
                </TableRow>);
              })}
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

export default Exams;