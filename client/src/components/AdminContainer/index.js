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
          <div className="header-image">
            <img src={logo} alt="logo" />
          </div>
          <div className="header-btn">
            {buttonContent !== undefined && (
              <Button type="primary" danger>
                {buttonContent}
              </Button>
            )}
          </div>
        </Header>
        <div className="container">
          <div className="container-side">
            <div className="side-content">
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
              <div className="side-content-btn">
                <Button type="primary" danger>
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="container-content">{contentComponent}</div>
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
