import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Button, Menu } from 'antd';
import logo from '../../assets/images/logo.png';
import './style.css';

const { Header } = Layout;

const AdminContainer = ({ buttonContent, contentComponent }) => {
  return (
    <>
      <Layout>
        <Header>
          <div className="admin-header-image">
            <img src={logo} alt="logo" />
          </div>
          <div className="admin-header-btn">
            {buttonContent !== undefined && (
              <Button type="primary" danger>
                {buttonContent}
              </Button>
            )}
          </div>
        </Header>
        <div className="admin-container">
          <div className="adin-container-side">
            <div className="admin-side">
              <Menu>
                <Menu.Item key="1">
                  <Link exact="true" to="/admin">
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link exact="true" to="/admin/cohorts">
                    Cohorts
                  </Link>
                </Menu.Item>
              </Menu>
              <div className="admin-side-btn">
                <Button type="primary" danger>
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="admin-content">{contentComponent}</div>
        </div>
      </Layout>
    </>
  );
};

AdminContainer.defaultProps = { buttonContent: 'add cohort' };

AdminContainer.propTypes = {
  buttonContent: PropTypes.string,
  contentComponent: PropTypes.element.isRequired,
};

export default AdminContainer;
