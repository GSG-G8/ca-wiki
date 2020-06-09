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
    currentPage: 1,
  };

  async componentDidMount() {
    try {
      const {
        location: { search },
      } = this.props;
      if (search) {
        const res = await axios.get(`/api/v1/projects${search}`);
        const { data } = res.data;
        const total = Math.ceil(data.length / 6) * 10;
        this.setState({ data, total });
      }
    } catch (err) {
      const {
        history: { push },
      } = this.props;
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error',
        description: message,
      });
      push('/projects');
    }
  }

  render() {
    const { data, total, startPage, endPage, currentPage } = this.state;
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
          {search ? (
            <>
              {projectType === 'internal' ? (
                <h1>Internal Projects Phase</h1>
              ) : (
                <h1>Remotely Projects Phase</h1>
              )}
              {data.length === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
              ) : (
                dataList.map((item) => (
                  <>
                    <Link to={`/projects/${item.id}`}>
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
                      current={currentPage}
                      defaultCurrent={1}
                      showQuickJumper
                      onChange={(page) => {
                        this.setState({
                          currentPage: page,
                          startPage: page * 6 - 6,
                          endPage: page * 6,
                        });
                      }}
                      total={total}
                    />
                  </>
                ))
              )}
            </>
          ) : (
            <div className="project-page">
              <div className="project-page-link">
                <h2>Internal Projects</h2>
                <a href="/projects?type=internal">
                  <img
                    src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"
                    alt="internal projects"
                  />
                </a>
              </div>
              <div className="project-page-link">
                <h2>Remotely Projects</h2>
                <a href="/projects?type=remotely">
                  <img
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt="remotely projects  "
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </UserContainer>
    );
  }
}

UserProject.propTypes = {
  location: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
};

export default UserProject;
