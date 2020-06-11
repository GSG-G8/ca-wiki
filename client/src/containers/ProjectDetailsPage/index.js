import React, { Component } from 'react';
import { notification, Empty } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import UserContainer from '../../components/UserContainer';
import './style.css';

class ProjectDetails extends Component {
  state = {
    data: [],
    cohortData: {},
    students: [],
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { projectId },
        },
      } = this.props;
      const res = await axios.get(`/api/v1/projects/${projectId}`);
      const { data } = res.data;
      const cohort = await axios.get(`/api/v1/cohorts/${data.cohort_id}`);
      const {
        data: { data: cohortData },
      } = cohort;
      this.setState({ data, cohortData });
      this.getStudents();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
  }

  async getStudents() {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;
    try {
      if (projectId) {
        const result = await axios.get(`/api/v1/projects/${projectId}/alumni`);
        const {
          data: { data: students },
        } = result;
        this.setState({ students });
      }
    } catch (err) {
      notification.error({
        message: 'Error 404',
        description: err.message,
      });
    }
  }

  render() {
    const { data, cohortData, students } = this.state;
    const {
      match: {
        params: { cohortId },
      },
    } = this.props;
    const projectType = data.project_type;
    return (
      <UserContainer headerLogo={logo} isProjectsPage toolsTreeImg>
        <div className="projects-container">
          {cohortId ? (
            <>
              <h1>{cohortData.name}</h1>
              {projectType === 'internal' ? (
                <h2>Internal Projects Phase</h2>
              ) : (
                <h2>Remotely Projects Phase</h2>
              )}
            </>
          ) : projectType === 'internal' ? (
            <h1>Internal Projects Phase</h1>
          ) : (
            <h1>Remotely Projects Phase</h1>
          )}
          {data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div className="project-details">
              <div
                className="project-image"
                style={{
                  background: `url(${data.img_url}) center center / cover no-repeat`,
                }}
              />
              <div className="project-desc">
                <h3>{data.name}</h3>
                <p>{data.description}</p>
                <h3>Project Information</h3>
                <ul>
                  <li>{cohortData.name}</li>
                  <li>
                    <a href={data.github_link} target="blank">
                      Github Link
                    </a>
                  </li>
                  <li>
                    <a href={data.website_link} target="blank">
                      Website Link
                    </a>
                  </li>
                  <li>
                    Students
                    <ol>
                      {students.map((row) => (
                        <li>{row}</li>
                      ))}
                    </ol>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </UserContainer>
    );
  }
}

ProjectDetails.propTypes = {
  match: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
};

export default ProjectDetails;
