import React, { Component } from 'react';
import { Pagination, notification, Empty } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import UserContainer from '../../components/UserContainer';
import './style.css';

class UserProject extends Component {
  state = {
    data: [],
    startPage: 0,
    endPage: 6,
    total: 0,
    cohortName: '',
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { cohortId },
        },
        location: { search },
      } = this.props;
      const res = await axios.get(
        `/api/v1/cohorts/${cohortId}/projects${search}`
      );
      const { data } = res.data;
      const cohorts = await axios.get('/api/v1/cohorts/');
      const { data: allCohorts } = cohorts.data;
      const cohortName = allCohorts.filter(
        (cohort) => cohort.id === parseInt(cohortId, 10)
      )[0].name;
      const total = Math.ceil(data.length / 6) * 10;
      this.setState({ data, total, cohortName });
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
    const { data, total, startPage, endPage, cohortName } = this.state;
    const {
      location: { search },
    } = this.props;
    const dataList = data.slice(startPage, endPage);
    const projectType = search.split('=')[1];
    return (
      <UserContainer headerLogo={logo} isCohortPages toolsTreeImg>
        <div className="projects-container">
          <h1>{cohortName}</h1>
          {projectType === 'internal' ? (
            <h2>Internal Projects Phase</h2>
          ) : (
            <h2>Clients Projects Phase</h2>
          )}
          {data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            dataList.map((item) => (
              <>
                <Link to="/projects?type=internal">
                  <div
                    className="project"
                    style={{
                      background: `url(${item.img_url}) center center / cover no-repeat`,
                    }}
                  >
                    <div className="project-name">
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                </Link>
                <Pagination
                  className="pagination"
                  defaultCurrent={0}
                  showQuickJumper
                  onChange={(page) => {
                    this.setState({
                      startPage: page * 6 - 6,
                      endPage: page * 6,
                    });
                  }}
                  total={total}
                />
              </>
            ))
          )}
        </div>
      </UserContainer>
    );
  }
}

UserProject.propTypes = {
  match: PropTypes.func.isRequired,
  location: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
};

export default UserProject;
