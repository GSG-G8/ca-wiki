import React from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

import logo from '../../assets/images/login-logo.png';
import loginImg from '../../assets/images/Group 369.svg';

import './style.css';

const LoginPage = () => {
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post('/api/v1/login', values);
      console.log('data', data);
    } catch (err) {}
  };

  return (
    <div className="login-container">
      <div className="login-left-side">
        <div className="login-logo">
          <img src={logo} alt="logo" />
          <h1>Login</h1>
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
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
                prefix={<LockOutlined className="site-form-item-icon" />}
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
        <img src={loginImg} alt="login" />
      </div>
    </div>
  );
};

export default LoginPage;
