import React, { Component } from 'react';
import { Progress } from 'antd';
import axios from 'axios';
import AdminContainer from '../../components/AdminContainer';
import './style.css';

class Statistics extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/api/v1/stats');
      console.log('response', res);
      const { data } = res.data;
      console.log('data is', data);
      this.setState({ data });
    } catch (err) {
      console.log('There is no data');
    }
  }

  render() {
    const { numberOfCohorts, numberOfProjects, numberOfStudent } = this.state;
    return (
      <div>
        <AdminContainer>
          <div className="state">
            <h1>Control Panel Homepage</h1>
            <div className="titles">
              <h4>NumberOfCohorts</h4>
              <p>{numberOfCohorts}</p>
            </div>
            <Progress percent={numberOfCohorts} size="small" status="active" />
            <div className="titles">
              <h4>NumberOfProjects</h4>
              <p>{numberOfProjects}</p>
            </div>
            <Progress
              percent={numberOfProjects / numberOfCohorts}
              size="small"
              status="active"
            />
            <div className="titles">
              <h4>NumberOfStudents</h4>
              <p>{numberOfStudent}</p>
            </div>
            <Progress
              percent={numberOfStudent / numberOfCohorts}
              size="small"
              status="active"
            />
          </div>
        </AdminContainer>
      </div>
    );
  }
}

export default Statistics;
