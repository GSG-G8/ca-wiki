import React, { Component } from 'react';
import { Progress } from 'antd';
import axios from 'axios';
import AdminContainer from '../../components/AdminContainer';
import './style.css';

class Statistics extends Component {
  state = {
    data: {
      cohortsCount: '',
      projectsCount: '',
      studentsCount: '',
    },
  };

  async componentDidMount() {
    try {
      const {
        data: { data },
      } = await axios.get('/api/v1/stats');
      this.setState({ data });
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
              <p>{data.cohortsCount}</p>
            </div>
            <Progress
              percent={data.cohortsCount}
              size="small"
              status="active"
            />
            <div className="titles">
              <h4>NumberOfProjects</h4>
              <p>{data.projectsCount}</p>
            </div>
            <Progress
              percent={data.projectsCount / data.cohortsCount}
              size="small"
              status="active"
            />
            <div className="titles">
              <h4>NumberOfStudents</h4>
              <p>{data.studentsCount}</p>
            </div>
            <Progress
              percent={data.studentsCount / data.cohortsCount}
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
