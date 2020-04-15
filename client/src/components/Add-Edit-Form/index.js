import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import './style.css';

const axios = require('axios');

const AddEditForm = ({ formType, addLink, editLink, cohortId, inputData }) => {
  const onFinish = async (values) => {
    try {
      let sendValues = values;
      if (formType !== 'cohort') {
        sendValues = { ...sendValues, cohortId };
      }

      if (addLink) {
        const response = await axios.post(addLink, sendValues);
        const {
          data: {
            data: { message: resMessage },
          },
        } = response;
        message.success(resMessage);
      } else {
        const response = await axios.put(editLink, sendValues);
        const {
          data: {
            data: { message: resMessage },
          },
        } = response;
        message.success(resMessage);
      }
    } catch (err) {
      if (err.response.status) {
        const { message: errMessage } = err.response.data.data;
        message.error(errMessage);
      }
    }
  };

  const onFinishFailed = () => {
    message.error('please enter correct data');
  };
  return (
    <Form
      className="add-data-form"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      name="basic"
      initialValues={inputData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        className="add-form-row"
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input cohort name!',
          },
        ]}
      >
        <Input className="add-data-input" />
      </Form.Item>

      {formType !== 'student' && (
        <Form.Item
          className="add-form-row"
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input cohort description!' },
          ]}
        >
          <Input className="add-data-input" />
        </Form.Item>
      )}

      {formType === 'student' && (
        <Form.Item
          className="add-form-row"
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
          <Input className="add-data-input" />
        </Form.Item>
      )}

      <Form.Item
        className="add-form-row"
        label="Image URL"
        name="imgUrl"
        rules={[
          { required: true, type: 'url', message: 'Please input image url!' },
        ]}
      >
        <Input className="add-data-input" />
      </Form.Item>

      <Form.Item
        className="add-form-row"
        label="Github Link"
        name="githubLink"
        rules={[
          { required: true, type: 'url', message: 'Please input github link!' },
        ]}
      >
        <Input className="add-data-input" />
      </Form.Item>

      {formType === 'project' && (
        <>
          <Form.Item
            className="add-form-row"
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
            <Input className="add-data-input" />
          </Form.Item>

          <Form.Item
            className="add-form-row"
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
            <Input className="add-data-input" />
          </Form.Item>
        </>
      )}

      <Form.Item className="cohort-form" wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {addLink ? 'add' : 'submit'}
        </Button>
        <Link to="/admin/cohorts">Cancel</Link>
      </Form.Item>
    </Form>
  );
};

AddEditForm.defaultProps = {
  cohortId: undefined,
  addLink: undefined,
  editLink: undefined,
  inputData: undefined,
};

AddEditForm.propTypes = {
  formType: PropTypes.oneOf(['cohort', 'student', 'project']).isRequired,
  addLink: PropTypes.oneOf([
    '/api/v1/alumni',
    '/api/v1/projects',
    '/api/v1/cohorts',
  ]),
  editLink: PropTypes.string,
  cohortId: PropTypes.number,
  inputData: PropTypes.string,
};

export default AddEditForm;
