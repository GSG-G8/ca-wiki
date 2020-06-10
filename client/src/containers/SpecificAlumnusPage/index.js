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
        <div className="projects-container">
          <h1>ALUMNI</h1>
          <h2>Welcome to {studentData.name} page</h2>
          {studentData.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div className="alumni-details">
              <div
                className="alumni-img"
                style={{
                  background: `url(${studentData.img_url}) center center / cover no-repeat`,
                }}
              />
              <div className="alumni-desc">
                <h3>{studentData.name}</h3>
                <h3>{cohortData.name}</h3>
                <h3>
                  <a href={studentData.github_link} target="blank">
                    Github Link
                  </a>
                </h3>
                <h3>
                  <a href={`mailto:${studentData.email}`}>Email</a>
                </h3>
                {studentProjects ? (
                  <>
                    <h3>Projects</h3>
                    <div className="alumni_projects">
                      {studentProjects.map((project) => (
                        <div key={project.id}>
                          <h4>Project Name: {project.name}</h4>
                          <ul>
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
                            <li>Project Type: {project.project_type}</li>
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
