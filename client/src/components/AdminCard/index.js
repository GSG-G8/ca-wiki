import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'antd';
import './style.css';

const AdminCard = ({
  imgUrl,
  name,
  description,
  githbUrl,
  websiteLink,
  student,
  ComProject,
  CliProject,
  editCard,
  deleteCard,
}) => {
  return (
    <>
      <section className="card-container">
        <ul>
          <li>
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
              <a href={githbUrl}>Click</a>
            </div>
            {websiteLink && (
              <div>
                <h3>Website</h3>
                <a href={websiteLink}>View</a>
              </div>
            )}
            {student && (
              <div>
                <h3>Student</h3>
                <a href={student}>View</a>
              </div>
            )}
            {ComProject && (
              <div>
                <h3>Community p</h3>
                <a href={ComProject}>View</a>
              </div>
            )}
            {CliProject && (
              <div>
                <h3>Clients p</h3>
                <a href={CliProject}>View</a>
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
          </li>
        </ul>
      </section>
      <Pagination defaultCurrent={1} total={50} />
    </>
  );
};

AdminCard.defaultProps = {
  description: undefined,
  websiteLink: undefined,
  student: undefined,
  ComProject: undefined,
  CliProject: undefined,
};

AdminCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  description: PropTypes.string,
  githbUrl: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  student: PropTypes.string,
  ComProject: PropTypes.string,
  CliProject: PropTypes.string,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default AdminCard;
