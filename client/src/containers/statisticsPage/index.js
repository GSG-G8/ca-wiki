import React, { Component } from 'react';
import { Progress, notification } from 'antd';
import axios from 'axios';

import AdminContainer from '../../components/AdminContainer';
import GoogleLogin from '../../googleAuth/signIn';
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
      }
    }
  }

  render() {
    const { cohortsCount, studentsCount, projectsCount } = this.state;
    return (
      <div>
        <AdminContainer>
          <div className="state-container">
            <GoogleLogin />
            <div className="state">
              <h1>Control Panel Homepage</h1>
              <div className="titles">
                <h4>Number of Cohorts</h4>
                <p>{cohortsCount}</p>
              </div>
              <Progress percent={cohortsCount} size="small" showInfo={false} />
              <div className="titles">
                <h4>Number of Projects</h4>
                <p>{projectsCount}</p>
              </div>
              <Progress percent={projectsCount} size="small" showInfo={false} />
              <div className="titles">
                <h4>Number of Students</h4>
                <p>{studentsCount}</p>
              </div>
              <Progress percent={studentsCount} size="small" showInfo={false} />
            </div>
          </div>
        </AdminContainer>
      </div>
    );
  }
}

export default Statistics;
