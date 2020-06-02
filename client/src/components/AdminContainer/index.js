import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import './style.css';
import LogoutContext from '../../Contexts/LogoutContext';

const { Header } = Layout;

const AdminContainer = ({ children, buttonContent, buttonRoute }) => {
  const history = useHistory();
  const {
    location: { pathname },
    goBack,
  } = history;
  return (
    <>
      <Layout>
        <Header>
          <div className="admin-header-image">
            <img src={logo} alt="logo" />
          </div>
          <div className="admin-header-btn">
            {buttonContent !== undefined && (
              <NavLink to={`${buttonRoute}`} className="Add-Link">
                {buttonContent}
              </NavLink>
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
                    to="/admin/cohorts"
                    className="admin-menu-a"
                    activeClassName="admin-menu-active"
                  >
                    Cohorts
                  </NavLink>
                </li>
              </ul>
              <div className="admin-side-btn">
                {pathname !== '/admin' ? (
                  <Button
                    className="admin-back-btn"
                    type="primary"
                    onClick={goBack}
                  >
                    ❮ Back
                  </Button>
                ) : null}

                <LogoutContext.Consumer>
                  {({ logout }) => (
                    <Button
                      className="logout-btn"
                      type="primary"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  )}
                </LogoutContext.Consumer>
              </div>
            </div>
          </div>
          <div className="admin-content">{children}</div>
        </div>
      </Layout>
    </>
  );
};

AdminContainer.defaultProps = {
  buttonContent: undefined,
  buttonRoute: undefined,
};

AdminContainer.propTypes = {
  buttonContent: PropTypes.string,
  buttonRoute: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AdminContainer;
