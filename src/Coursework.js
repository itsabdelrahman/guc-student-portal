import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';

class Coursework extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        loading: false,
        coursework: []
      }
    }
  }

  componentDidMount() {
    this.fetchCoursework().then(({ data }) => {
      this.setState({
        data: {
          loading: false,
          coursework: data
        }
      });
    });
  }

  fetchCoursework = () => {
    this.setState({ data: { ...this.state.data, loading: true } });

    const url = 'http://guc-api.herokuapp.com/api/coursework';
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
                <TableHeaderColumn>Grades</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.data.coursework.map(({ course, grades }, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{course}</TableRowColumn>
                  <TableRowColumn>
                    <Table>
                      <TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableHeaderColumn>Module</TableHeaderColumn>
                          <TableHeaderColumn>Point</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        {grades.map(({ module, point, maxPoint }, index) => (
                          <TableRow key={index}>
                            <TableRowColumn>{module}</TableRowColumn>
                            <TableRowColumn>{point} out of {maxPoint}</TableRowColumn>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableRowColumn>
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

export default Coursework;