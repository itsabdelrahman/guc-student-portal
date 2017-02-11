import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';

class Midterms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        loading: false,
        midterms: []
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

  render() {
    return (
      <div className="App">
        <div>
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
        </div>
        <br />
        <div>
          {this.state.data.loading ? <CircularProgress /> : null}
        </div>
      </div>
    );
  }
}

export default Midterms;