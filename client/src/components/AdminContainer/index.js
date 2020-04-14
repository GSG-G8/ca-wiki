import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import './style.css';

const { Header } = Layout;

const AdminContainer = ({
  children,
  buttonContent,
  buttonFunction,
  logout,
}) => {
  return (
    <>
      <Layout>
        <Header>
          <div className="admin-header-image">
            <img src={logo} alt="logo" />
          </div>
          <div className="admin-header-btn">
            {buttonContent !== undefined && (
              <Button onClick={buttonFunction} type="primary" danger>
                {buttonContent}
              </Button>
            )}
          </div>
        </Header>
        <div className="admin-container">
          <div className="admin-container-side">
            <div className="admin-side">
              <ul className="admin-menu">
                <li>
                  <NavLink
                    exact
                    to="/admin"
                    className="admin-menu-a"
                    activeClassName="admin-menu-active"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/admin/cohorts"
                    className="admin-menu-a"
                    activeClassName="admin-menu-active"
                  >
                    Cohorts
                  </NavLink>
                </li>
              </ul>
              <div className="admin-side-btn">
                <Button
                  className="logout-btn"
                  type="primary"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="admin-content">{children}</div>
        </div>
      </Layout>
    </>
  );
};

AdminContainer.defaultProps = { buttonContent: undefined };

AdminContainer.propTypes = {
  buttonContent: PropTypes.string,
  buttonFunction: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AdminContainer;
