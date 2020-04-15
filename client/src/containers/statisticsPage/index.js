import React, { Component } from 'react';
import { Progress, notification } from 'antd';
import axios from 'axios';
import AdminContainer from '../../components/AdminContainer';
import './style.css';

class Statistics extends Component {
  state = {
    cohortsCount: '',
    projectsCount: '',
    studentsCount: '',
  };

  async componentDidMount() {
    try {
      const {
        data: {
          data: { cohortsCount, studentsCount, projectsCount },
        },
      } = await axios.get('/api/v1/stats');
      this.setState({ cohortsCount, studentsCount, projectsCount });
    } catch (err) {
      const {
        response: { status },
      } = err;

      if (status === 500) {
        const {
          response: { statusText },
        } = err;
        notification.error({
          message: statusText,
        });
      } else if (status === 400) {
        const {
          response: {
            data: { message },
          },
        } = err;
        if (Array.isArray(message)) {
          notification.error({
            message: message[0],
          });
        } else {
          notification.error({
            message,
          });
        }
      }
    }
  }

  render() {
    const { cohortsCount, studentsCount, projectsCount } = this.state;
    return (
      <div>
        <AdminContainer>
          <div className="state">
            <h1>Control Panel Homepage</h1>
            <div className="titles">
              <h4>NumberOfCohorts</h4>
              <p>{cohortsCount}</p>
            </div>
            <Progress percent={cohortsCount} size="small" showInfo={false} />
            <div className="titles">
              <h4>NumberOfProjects</h4>
              <p>{projectsCount}</p>
            </div>
            <Progress percent={projectsCount} size="small" showInfo={false} />
            <div className="titles">
              <h4>NumberOfStudents</h4>
              <p>{studentsCount}</p>
            </div>
            <Progress percent={studentsCount} size="small" showInfo={false} />
          </div>
        </AdminContainer>
      </div>
    );
  }
}

export default Statistics;
