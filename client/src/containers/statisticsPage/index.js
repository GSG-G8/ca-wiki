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
      // const { result } = res.data;
      // console.log('data is', result);
      this.setState({ data: res.data });
    } catch (err) {
      console.log('There is no data');
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <AdminContainer>
          <div className="state">
            <h1>Control Panel Homepage</h1>
            <div className="titles">
              <h4>NumberOfCohorts</h4>
              <p>{cohortsCount}</p>
            </div>
            <Progress percent={cohortsCount} size="small" status="active" />
            <div className="titles">
              <h4>NumberOfProjects</h4>
              <p>{projectsCount}</p>
            </div>
            <Progress
              percent={projectsCount / cohortsCount}
              size="small"
              status="active"
            />
            <div className="titles">
              <h4>NumberOfStudents</h4>
              <p>{studentsCount}</p>
            </div>
            <Progress
              percent={studentsCount / cohortsCount}
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
