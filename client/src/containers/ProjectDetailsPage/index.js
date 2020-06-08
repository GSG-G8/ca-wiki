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
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error',
        description: message,
      });
    }
  }

  render() {
    const { data, cohortData } = this.state;
    const projectType = data.project_type;
    return (
      <UserContainer headerLogo={logo} isProjectsPage toolsTreeImg>
        <div className="projects-container">
          {projectType === 'internal' || projectType === 'Internal' ? (
            <h1>Internal Projects Phase</h1>
          ) : (
            <h1>Clients Projects Phase</h1>
          )}
          {data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div className="Project-details">
              <div
                className="project-img"
                style={{
                  background: `url(${data.img_url}) center center / cover no-repeat`,
                  width: '200px',
                  height: '200px',
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
