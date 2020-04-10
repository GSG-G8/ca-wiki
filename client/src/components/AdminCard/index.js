import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.css';

const AdminCard = ({
  imgUrl,
  name,
  description,
  githbUrl,
  student,
  websiteLink,
  studentNames,
  internalProject,
  remotelyProject,
  editCard,
  deleteCard,
}) => {
  return (
    <div className="admin-card">
      <div className="name-img-card">
        <div className="img-card">
          <img src={imgUrl} alt="card" />
        </div>
        <div>
          <h3>Name</h3>
          <p>{name}</p>
        </div>
      </div>
      {description && (
        <div>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
      )}
      <div>
        <h3>Github link</h3>
        <a href={githbUrl} target="blank">
          Click
        </a>
      </div>
      {student && (
        <div>
          <h3>Student</h3>
          <Link to={`/admin/cohorts/${student}/students`}>View</Link>
        </div>
      )}
      {websiteLink && (
        <div>
          <h3>Website</h3>
          <a href={websiteLink} target="blank">
            View
          </a>
        </div>
      )}
      {studentNames && (
        <div>
          <h3>Student</h3>
          <p>{studentNames}</p>
        </div>
      )}
      {internalProject && (
        <div>
          <h3>Community p</h3>
          <Link to={`/admin/cohorts/${internalProject}/projects?type=internal`}>
            View
          </Link>
        </div>
      )}
      {remotelyProject && (
        <div>
          <h3>Clients p</h3>
          <Link to={`/admin/cohorts/${remotelyProject}/projects?type=remotely`}>
            View
          </Link>
        </div>
      )}
      <div>
        <Button onClick={editCard} className="card-btn edit">
          Edit
        </Button>
        <Button onClick={deleteCard} className="card-btn">
          Delete
        </Button>
      </div>
    </div>
  );
};

AdminCard.defaultProps = {
  description: undefined,
  studentNames: undefined,
  websiteLink: undefined,
  student: undefined,
  internalProject: undefined,
  remotelyProject: undefined,
};

AdminCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  description: PropTypes.string,
  githbUrl: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  student: PropTypes.number,
  studentNames: PropTypes.string,
  internalProject: PropTypes.number,
  remotelyProject: PropTypes.number,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default AdminCard;
