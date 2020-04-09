import React from 'react';
import './style.css';
import { Form, Input, Button, message } from 'antd';
import postData from '../postData';

const Demo = () => {
  const onFinish = async (values) => {
    const response = await postData('/api/v1/cohorts', values);
    const { message: resMessage } = response.data.data;
    if (response.status === 201) {
      message.success(resMessage);
    } else {
      message.error(resMessage);
    }
  };

  const onFinishFailed = () => {
    message.error('please enter correct data');
  };
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button style={{ color: 'white' }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
