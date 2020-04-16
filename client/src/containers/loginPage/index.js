import React from 'react';

import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';

import logo from '../../assets/images/login-logo.jpeg';
import loginImg from '../../assets/images/Group 369.svg';

import './style.css';

const LoginPage = ({ updateAuth, history }) => {
  const onFinish = async (values) => {
    const { push } = history;
    try {
      const {
        data: { statusCode, message },
      } = await axios.post('/api/v1/login', values);
      if (statusCode === 200) {
        updateAuth();
        notification.success({
          message,
        });
        push(ROUTES.HOME_PAGE);
      }
    } catch (err) {
      const {
        response: { status },
      } = err;

      if (status === 500) {
        const {
          response: { statusText },
        } = err;
        notification.error({
          message: statusText,
        });
      } else if (status === 400) {
        const {
          response: {
            data: { message },
          },
        } = err;
        if (Array.isArray(message)) {
          notification.error({
            message: message[0],
          });
        } else {
          notification.error({
            message,
          });
        }
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-left-side">
        <div className="login-logo">
          <img src={logo} className="logo" alt="logo" />
          <h3>Login</h3>
          <p>Please sign in to continue</p>
          <div className="login-form" />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input className="form-input" placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                className="form-input"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div />
        </div>
      </div>
      <div className="login-right-side">
        <img className="right-side-img" src={loginImg} alt="login" />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LoginPage;
