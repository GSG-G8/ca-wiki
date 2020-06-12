import React, { Component } from 'react';
import { notification, Empty } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import UserContainer from '../../components/UserContainer';
import './style.css';

class AlumnusDetails extends Component {
  state = {
    studentData: [],
    studentProjects: [],
    cohortData: [],
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { alumniId },
        },
      } = this.props;
      const alumni = await axios.get(`/api/v1/alumni/${alumniId}`);
      const {
        data: { data: studentData },
      } = alumni;
      const { cohort_id: cohortId } = studentData;
      const projects = await axios.get(`/api/v1/alumni/${alumniId}/projects`);
      const {
        data: { data: studentProjects },
      } = projects;
      const cohort = await axios.get(`/api/v1/cohorts/${cohortId}`);
      const {
        data: { data: cohortData },
      } = cohort;
      this.setState({ studentData, studentProjects, cohortData });
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
  }

  render() {
    const { studentData, studentProjects, cohortData } = this.state;
    return (
      <UserContainer headerLogo={logo} isProjectsPage toolsTreeImg>
        <div className="project-detail-container">
          <h1>ALUMNI</h1>
          <h2>Welcome to {studentData.name} page</h2>
          {studentData.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div className="project-detail">
              <div
                className="project-image"
                style={{
                  background: `url(${studentData.img_url}) center center / cover no-repeat`,
                }}
              />
              <div className="project-desc">
                <ul>
                  <li>{studentData.name}</li>
                  <li>{cohortData.name}</li>
                  <li>
                    <a href={studentData.github_link} target="blank">
                      Github Link
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${studentData.email}`}>Email</a>
                  </li>
                </ul>
                {studentProjects ? (
                  <>
                    <div className="alumni_projects">
                      {studentProjects.map((project) => (
                        <div key={project.id}>
                          <h3>
                            {project.project_type[0].toUpperCase() +
                              project.project_type.slice(1)}{' '}
                            Project:
                          </h3>
                          <ul>
                            <li>Project Name: {project.name}</li>
                            <li>
                              <a href={project.github_link} target="blank">
                                Github Link
                              </a>
                            </li>
                            <li>
                              <a href={project.website_link} target="blank">
                                Website Link
                              </a>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </UserContainer>
    );
  }
}

AlumnusDetails.propTypes = {
  match: PropTypes.func.isRequired,
};

export default AlumnusDetails;
