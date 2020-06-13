import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, message, Spin, Select } from 'antd';
import toolsImg from '../../assets/images/Group 2381.svg';
import './style.css';
import AdminContainer from '../AdminContainer';

const { Option } = Select;
const axios = require('axios');

class AddEditForm extends Component {
  state = {
    myData: {},
    studentInCohort: [],
    selectOption: [],
    // eslint-disable-next-line react/destructuring-assignment
    addOrEdit: this.props.addLink,
    typeOfProject: '',
    oldStudent: [],
  };

  async componentDidMount() {
    const {
      history: { push },
      editLink,
      formType,
    } = this.props;

    try {
      if (editLink) {
        if (formType === 'cohort') {
          this.getCohort();
        } else if (formType === 'student') {
          this.getStudents();
        } else {
          this.getProject();
        }
      }
      if (formType === 'project') {
        const {
          match: {
            params: { cohortId },
          },
        } = this.props;
        const studentInCohort = await axios(
          `/api/v1/cohorts/${cohortId}/alumni`
        );
        const { data } = studentInCohort.data;
        this.setState({ studentInCohort: data });
      }
    } catch (err) {
      push('/not-found');
    }
  }

  async getCohort() {
    const {
      match: {
        params: { cohortId },
      },
    } = this.props;
    const fetchItems = await axios(`/api/v1/cohorts/${cohortId}`);
    const {
      data: { name, description, img_url: imgUrl, github_link: githubLink },
    } = fetchItems.data;

    this.setState({
      myData: { name, description, imgUrl, githubLink },
      addOrEdit: 'edit',
    });
  }

  async getStudents() {
    const {
      match: {
        params: { studentId },
      },
    } = this.props;
    const fetchItems = await axios(`/api/v1/alumni/${studentId}`);
    const {
      data: { name, email, img_url: imgUrl, github_link: githubLink },
    } = fetchItems.data;

    this.setState({
      myData: { name, imgUrl, githubLink, email },
      addOrEdit: 'edit',
    });
  }

  async getProject() {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;
    const fetchItems = await axios(`/api/v1/projects/${projectId}`);
    const {
      data: {
        data: {
          name,
          description,
          img_url: imgUrl,
          github_link: githubLink,
          website_link: websiteLink,
          project_type: projectType,
        },
      },
    } = fetchItems;

    const getStudentsForProject = await axios.get(
      `/api/v1/projects/${projectId}/alumni`
    );

    const {
      data: { data: selectOption },
    } = getStudentsForProject;

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
      typeOfProject: projectType,
      selectOption,
      oldStudent: selectOption,
    });
  }

  onFinish = async (values) => {
    const {
      formType,
      cohortId,
      addLink,
      editLink,
      match: {
        params: { projectId },
      },
    } = this.props;
    const { selectOption, oldStudent, studentInCohort } = this.state;
    try {
      let sendValues = values;
      if (formType !== 'cohort') {
        sendValues = { ...sendValues, cohortId };
      }

      if (addLink) {
        const projectTypeLower = sendValues.projectType || 'Not Require';
        sendValues.projectType = projectTypeLower.toLowerCase();

        const response = await axios.post(addLink, sendValues);
        const {
          data: {
            data: { message: resMessage, projectId: resProjectId },
          },
        } = response;
        const newStudentsId = this.getStudentIdFromName(
          selectOption,
          studentInCohort
        );

        if (newStudentsId.length !== 0) {
          const studentsName = this.studentFucntion(newStudentsId);
          const responseProjects = await axios.post(
            '/api/v1/alumni/projects/assign',
            { projectId: resProjectId, ...studentsName }
          );
          const {
            data: {
              data: { message: assignStudentMessage },
            },
          } = responseProjects;
          message.success(assignStudentMessage);
        }
        message.success(
          `${resMessage}, you can add student for this project any time`
        );
        this.redirectFunc(sendValues.projectType);
      } else {
        const projectTypeLower = sendValues.projectType || 'Not Require';
        sendValues.projectType = projectTypeLower.toLowerCase();

        const deletedStudent = oldStudent.filter(
          (selectName) => !selectOption.includes(selectName)
        );
        const newStudent = selectOption.filter(
          (selectName) => !oldStudent.includes(selectName)
        );

        const deleteStudentsId = this.getStudentIdFromName(
          deletedStudent,
          studentInCohort
        );

        const newStudentsId = this.getStudentIdFromName(
          newStudent,
          studentInCohort
        );

        const response = await axios.put(editLink, sendValues);
        const {
          data: {
            data: { message: resMessage },
          },
        } = response;

        if (deleteStudentsId.length !== 0) {
          const deleteStudentProject = await axios.put(
            '/api/v1/alumni/projects/assign',
            {
              projectId,
              deletedStudent: deleteStudentsId,
            }
          );
          const {
            data: {
              data: { message: deleteStudentProjectMessage },
            },
          } = deleteStudentProject;
          message.success(deleteStudentProjectMessage);
        }

        if (newStudentsId.length !== 0) {
          const sendStudentsId = this.studentFucntion(newStudentsId);
          const addStudentProject = await axios.post(
            '/api/v1/alumni/projects/assign',
            {
              projectId,
              ...sendStudentsId,
            }
          );
          const {
            data: {
              data: { message: addStudentProjectMessage },
            },
          } = addStudentProject;
          message.success(addStudentProjectMessage);
        }

        message.success(resMessage);
        this.redirectFunc(sendValues.projectType);
      }
    } catch (err) {
      if (err.response.status) {
        const { message: errMessage } = err.response.data.data;
        if (errMessage[0] !== 'student1Id is a required field') {
          message.error(errMessage);
        }
        this.redirectFunc(values.projectType);
      } else {
        message.error('internal error');
      }
    }
  };

  getStudentIdFromName = (studentNameArray, allStudentData) => {
    const studentId = studentNameArray.map((studentName) => {
      const filer = allStudentData.filter(
        (student) => student.name === studentName
      );
      return filer[0].id;
    });
    return studentId;
  };

  studentFucntion = (selectOption) => {
    const studentName = {};
    selectOption.map((studentId, index) => {
      const sendStudentId = `student${index + 1}Id`;
      studentName[sendStudentId] = studentId;
      return null;
    });
    return studentName;
  };

  onFinishFailed = () => {
    message.error('please enter correct data');
  };

  handleStudentChange = (value) => {
    this.setState({ selectOption: value });
  };

  redirectFunc(projectType) {
    const {
      formType,
      cohortId,
      history: { push },
    } = this.props;

    if (formType === 'cohort') {
      push('/admin/cohorts');
    } else if (formType === 'student') {
      push(`/admin/cohorts/${cohortId}/students`);
    } else {
      push(`/admin/cohorts/${cohortId}/projects?type=${projectType}`);
    }
  }

  render() {
    const {
      myData,
      addOrEdit,
      typeOfProject,
      studentInCohort,
      selectOption,
    } = this.state;
    const {
      formType,
      cohortId,
      addLink,
      match: {
        params: { projectType },
      },
    } = this.props;

    return (
      <AdminContainer>
        {addOrEdit ? (
          <div className="form-container">
            <Form
              className={`add-data-form ${
                formType === 'project' ? 'project-form' : ''
              }`}
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
                  <div className="add-form-select">
                    <span className="select-lable">
                      {' '}
                      &nbsp; Select Student:
                    </span>
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder=""
                      title="Add Students For This Project"
                      onChange={this.handleStudentChange}
                      defaultValue={selectOption}
                      showArrow
                    >
                      {studentInCohort.map((student) => (
                        <Option key={student.name}>{student.name}</Option>
                      ))}
                    </Select>
                  </div>

                  <Form.Item
                    className="add-form-row"
                    label="Project Type"
                    name="projectType"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                        enum: ['internal', 'remotely', 'INTERNAL', 'REMOTELY'],
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

                {formType === 'cohort' && (
                  <Link to="/admin/cohorts">Cancel</Link>
                )}
                {formType === 'student' && (
                  <Link to={`/admin/cohorts/${cohortId}/students`}>Cancel</Link>
                )}
                {formType === 'project' && (
                  <Link
                    to={`/admin/cohorts/${cohortId}/projects?type=${
                      projectType || typeOfProject
                    }`}
                  >
                    Cancel
                  </Link>
                )}
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Spin size="large" />
        )}

        <img className="tools-img" src={toolsImg} alt="tools" />
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
      projectType: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default AddEditForm;
