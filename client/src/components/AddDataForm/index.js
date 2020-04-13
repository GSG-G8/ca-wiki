import React from 'react';
import './style.css';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const axios = require('axios');

const AddDataForm = ({ formType, apiLink, cohortId }) => {
  const onFinish = async (values) => {
    try {
      const sendValues = values;
      sendValues.cohortId = cohortId;
      const response = await axios.post(apiLink, sendValues);
      const { message: resMessage } = response.data.data;
      message.success(resMessage);
    } catch (err) {
      const { message: errMessage } = err.response.data.data;
      message.error(errMessage);
    }
  };

  const onFinishFailed = () => {
    message.error('please enter correct data');
  };
  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input cohort name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {formType !== 'student' && (
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input cohort description!' },
          ]}
        >
          <Input />
        </Form.Item>
      )}

      {formType === 'student' && (
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input student email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label="Image URL"
        name="imgUrl"
        rules={[
          { required: true, type: 'url', message: 'Please input image url!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Github Link"
        name="githubLink"
        rules={[
          { required: true, type: 'url', message: 'Please input github link!' },
        ]}
      >
        <Input />
      </Form.Item>

      {formType === 'project' && (
        <>
          <Form.Item
            label="Website Link"
            name="websiteLink"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Please input website link!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project Type"
            name="projectType"
            rules={[
              {
                required: true,
                type: 'string',
                enum: ['internal', 'remotely'],
                message: 'Please input project type!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item className="cohort-form" wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <Link to="/admin/cohorts">Cancel</Link>
      </Form.Item>
    </Form>
  );
};

AddDataForm.propTypes = {
  formType: PropTypes.oneOf(['cohort', 'student', 'project']).isRequired,
  apiLink: PropTypes.oneOf([
    '/api/v1/alumni',
    '/api/v1/projects',
    '/api/v1/cohorts',
  ]).isRequired,
  cohortId: PropTypes.number.isRequired,
};

export default AddDataForm;
