import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import AdminCard from '../../components/AdminCard';
import AdminContainer from '../../components/AdminContainer';

class AdminProject extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { cohortId },
        },
      } = this.props;
      const {
        location: { search },
      } = this.props;
      const res = await axios.get(
        `../../../api/v1/cohorts/${cohortId}/projects${search}`
      );
      const { data } = res.data;
      this.setState({ data });
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error 404',
        description: message,
      });
    }
  }

  render() {
    const { data } = this.state;
    const projects = data.map((project) => {
      const {
        id,
        img_url: imgUrl,
        name,
        description,
        github_link: githubUrl,
        website_link: websiteLink,
      } = project;

      return (
        <li key={id} className="admin-list-card">
          <AdminCard
            imgUrl={imgUrl}
            name={name}
            description={description}
            githbUrl={githubUrl}
            websiteLink={websiteLink}
            projectId={id}
          />
        </li>
      );
    });
    return (
      <div className="App">
        <AdminContainer buttonContent="Add Cohort">
          <ul className="cohorts">{projects} </ul>
        </AdminContainer>
      </div>
    );
  }
}

AdminProject.propTypes = {
  match: PropTypes.isRequired,
  location: PropTypes.isRequired,
};

export default AdminProject;
