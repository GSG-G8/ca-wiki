import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import './style.css';
import AdminContainer from '../AdminContainer';

const axios = require('axios');

class AddEditForm extends Component {
  state = {
    myData: {},
    // eslint-disable-next-line react/destructuring-assignment
    addOrEdit: this.props.addLink,
  };

  async componentDidMount() {
    const {
      formType,
      match: {
        params: { cohortId, studentId, projectId },
      },
    } = this.props;

    try {
      if (formType === 'cohort') {
        const fetchItems = await axios(`/api/v1/cohorts/${cohortId}`);

        const {
          data: { name, description, img_url: imgUrl, github_link: githubLink },
        } = fetchItems.data;

        this.setState({
          myData: { name, description, imgUrl, githubLink },
          addOrEdit: 'edit',
        });
      } else if (formType === 'student') {
        const fetchItems = await axios(`/api/v1/alumni/${studentId}`);

        const {
          data: { name, email, img_url: imgUrl, github_link: githubLink },
        } = fetchItems.data;

        this.setState({
          myData: { name, imgUrl, githubLink, email },
          addOrEdit: 'edit',
        });
      } else {
        const fetchItems = await axios(`/api/v1/projects/${projectId}`);

        const {
          data: {
            name,
            description,
            img_url: imgUrl,
            github_link: githubLink,
            website_link: websiteLink,
            project_type: projectType,
          },
        } = fetchItems.data;

        this.setState({
          myData: {
            name,
            description,
            imgUrl,
            githubLink,
            websiteLink,
            projectType,
          },
          addOrEdit: 'edit',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onFinish = async (values) => {
    const { formType, cohortId, addLink, editLink } = this.props;
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
      } else {
        message.error('internal error');
      }
    }
  };

  onFinishFailed = () => {
    message.error('please enter correct data');
  };

  render() {
    const { myData, addOrEdit } = this.state;
    const { formType, cohortId, addLink } = this.props;

    return (
      <AdminContainer>
        {addOrEdit ? (
          <Form
            className="add-data-form"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            name="basic"
            initialValues={myData}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            {formType === 'cohort' && addLink ? (
              <h1>Add Cohort</h1>
            ) : formType === 'cohort' ? (
              <h1>Edit Cohort</h1>
            ) : formType === 'student' && addLink ? (
              <h1>Add Student</h1>
            ) : formType === 'student' ? (
              <h1>Edit Student</h1>
            ) : formType === 'project' && addLink ? (
              <h1>Add Project</h1>
            ) : (
              <h1>Edit Project</h1>
            )}
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
                  {
                    required: true,
                    message: 'Please input cohort description!',
                  },
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
                {
                  required: true,
                  type: 'url',
                  message: 'Please input image url!',
                },
              ]}
            >
              <Input className="add-data-input" />
            </Form.Item>

            <Form.Item
              className="add-form-row"
              label="Github Link"
              name="githubLink"
              rules={[
                {
                  required: true,
                  type: 'url',
                  message: 'Please input github link!',
                },
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

            <Form.Item
              className="cohort-form"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                {addLink ? 'Add' : 'Edit'}
              </Button>
              {formType === 'cohort' && <Link to="/admin/cohorts">Cancel</Link>}
              {formType === 'student' && (
                <Link to={`/admin/cohorts/${cohortId}/students`}>Cancel</Link>
              )}
              {formType === 'project' && (
                <Link to="/admin/cohorts">Cancel</Link>
              )}
            </Form.Item>
          </Form>
        ) : (
          <div>looooooooading</div>
        )}
      </AdminContainer>
    );
  }
}

AddEditForm.defaultProps = {
  cohortId: undefined,
  addLink: undefined,
  editLink: undefined,
  match: undefined,
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      cohortId: PropTypes.string,
      studentId: PropTypes.string,
      projectId: PropTypes.string,
    }),
  }),
};

export default AddEditForm;
