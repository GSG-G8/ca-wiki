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
  };

  async componentDidMount() {
    try {
      const {
        location: { search },
      } = this.props;
      const res = await axios.get(`/api/v1/projects${search}`);
      const { data } = res.data;
      const total = Math.ceil(data.length / 6) * 10;
      this.setState({ data, total });
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
    const { data, total, startPage, endPage } = this.state;
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const dataList = data.slice(startPage, endPage);
    const projectType = search.split('=')[1];
    return (
      <UserContainer headerLogo={logo} isProjectsPage toolsTreeImg>
        <div className="projects-container">
          {projectType === 'internal' ? (
            <h1>Internal Projects Phase</h1>
          ) : (
            <h1>Clients Projects Phase</h1>
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
  location: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
};

export default UserProject;
