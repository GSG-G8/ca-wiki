import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, notification, Popover } from 'antd';
import './style.css';

class AdminCard extends Component {
  state = {
    students: [],
  };

  async componentDidMount() {
    this.getStudents();
  }

  componentDidUpdate(prevProps) {
    const { projectId } = this.props;
    if (projectId !== prevProps.projectId) {
      this.getStudents();
    }
  }

  async getStudents() {
    try {
      const { projectId } = this.props;
      if (projectId) {
        const result = await axios.get(`/api/v1/projects/${projectId}/alumni`);
        const {
          data: { data: students },
        } = result;
        this.setState({ students });
      }
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error 404',
        description: message,
      });
    }
  }

  render() {
    const { students } = this.state;
    const {
      imgUrl,
      name,
      description,
      email,
      githbUrl,
      student,
      websiteLink,
      projectId,
      cohortId,
      studentId,
      editCard,
      deleteCard,
      type,
    } = this.props;
    return (
      <div className={`admin-card ${type || ''}`}>
        <div className="name-img-card">
          <div className="img-card">
            <img src={imgUrl} alt="card" />
          </div>
          <div className="name">
            <h3>Name</h3>
            <p>{name}</p>
          </div>
        </div>
        {description && (
          <div className="description">
            <h3>Description</h3>
            {description.length > 40 ? (
              <Popover placement="bottom" content={description} trigger="click">
                <Button className="description-btn">Click</Button>
              </Popover>
            ) : (
              <p>{description}</p>
            )}
          </div>
        )}
        {email && (
          <div>
            <h3>Email</h3>
            <p>{email}</p>
          </div>
        )}
        <div>
          <h3>Github link</h3>
          <a className="admin-card-links" href={githbUrl} target="blank">
            Click
          </a>
        </div>
        {student && (
          <div>
            <h3>Student</h3>
            <Link
              className="admin-card-links"
              to={`/admin/cohorts/${student}/students`}
            >
              View
            </Link>
          </div>
        )}
        {websiteLink && (
          <div>
            <h3>Website</h3>
            <a className="admin-card-links" href={websiteLink} target="blank">
              View
            </a>
          </div>
        )}
        {projectId && (
          <div className="students">
            <h3>Student</h3>
            {students.map((studentName, index) => (
              <p style={studentName.length > 18 ? { fontSize: '9px' } : null}>
                {`${index + 1}-${studentName}`}{' '}
              </p>
            ))}
          </div>
        )}
        {cohortId && (
          <div>
            <h3>INTERNAL p</h3>
            <Link
              className="admin-card-links"
              to={`/admin/cohorts/${cohortId}/projects?type=internal`}
            >
              View
            </Link>
          </div>
        )}
        {cohortId && (
          <div>
            <h3>REMOTELY p</h3>
            <Link
              className="admin-card-links"
              to={`/admin/cohorts/${cohortId}/projects?type=remotely`}
            >
              View
            </Link>
          </div>
        )}
        <div className="card-btns">
          <Link to={editCard} className="card-btn edit">
            Edit
          </Link>
          <Button
            onClick={() =>
              projectId
                ? deleteCard(projectId)
                : studentId
                ? deleteCard(studentId, name)
                : deleteCard(cohortId, name)
            }
            className="card-btn"
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

AdminCard.defaultProps = {
  description: undefined,
  projectId: undefined,
  websiteLink: undefined,
  student: undefined,
  cohortId: undefined,
  studentId: undefined,
  email: undefined,
  type: undefined,
};

AdminCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  description: PropTypes.string,
  githbUrl: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  student: PropTypes.number,
  projectId: PropTypes.number,
  cohortId: PropTypes.number,
  studentId: PropTypes.number,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default AdminCard;
