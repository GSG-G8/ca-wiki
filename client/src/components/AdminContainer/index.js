import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import './style.css';
import LogoutContext from '../../Contexts/LogoutContext';

import * as ROUTES from '../../constants/routes';

const { Header } = Layout;

const AdminContainer = ({ children, buttonContent, buttonRoute }) => {
  const [prevPath, setPrevPath] = useState();
  const history = useHistory();
  const {
    location: { pathname },
    goBack,
    push,
  } = history;

  useEffect(() => {
    setPrevPath(pathname);
  }, []);

  const checkGoBack = () => {
    if (
      prevPath.includes('add/remotely') ||
      prevPath.includes('add/internal') ||
      prevPath.includes('edit')
    ) {
      goBack();
    } else if (
      prevPath.includes('students') ||
      prevPath.includes('add') ||
      prevPath.includes('projects')
    ) {
      push(ROUTES.ADMIN_COHORT_PAGE);
    } else if (prevPath.includes('cohorts')) {
      push('/admin/statistics');
    } else {
      goBack();
    }
  };
  return (
    <>
      <Layout>
        <Header>
          <div className="admin-header-image">
            <Link to={ROUTES.HOME_PAGE}>
              <img src={logo} alt="Code Academy" />
            </Link>
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
                    to="/admin/statistics"
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
                {pathname !== '/admin/statistics' ? (
                  <Button
                    className="admin-back-btn"
                    type="primary"
                    onClick={checkGoBack}
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
