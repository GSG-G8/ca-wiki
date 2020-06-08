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
      this.setState({ data });
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
    const { data } = this.state;
    return (
      <UserContainer headerLogo={logo} isProjectsPage toolsTreeImg>
        <div className="projects-container">
          <h1>G8</h1>
          <h2>Internal Projects Phase</h2>

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
            </div>
          )}
        </div>
      </UserContainer>
    );
  }
}

ProjectDetails.propTypes = {
  match: PropTypes.func.isRequired,
};

export default ProjectDetails;
