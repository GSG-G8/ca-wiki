import React from 'react';
import './style.css';
import { Form, Input, Button, message } from 'antd';

const axios = require('axios');

const AddCohortForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/v1/cohorts', values);
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

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input cohort description!' },
        ]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item className="cohort-form" wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <Button type="primary">Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default AddCohortForm;
