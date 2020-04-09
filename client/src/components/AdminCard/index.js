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
  project,
}) => {
  return (
    <>
      <section className="card-container">
        <ul>
          <li>
            <div>
              <div>
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
              <p>{githbUrl}</p>
            </div>
            {websiteLink && (
              <div>
                <h3>Website</h3>
                <p>{websiteLink}</p>
              </div>
            )}
            {student && (
              <div>
                <h3>Student</h3>
                <p>{student}</p>
              </div>
            )}
            {project && (
              <div>
                <h3>Student</h3>
                <p>{project}</p>
              </div>
            )}
            <div>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </li>

          <li>
            <div>
              <div>
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
              <p>{githbUrl}</p>
            </div>
            {websiteLink && (
              <div>
                <h3>Website</h3>
                <p>{websiteLink}</p>
              </div>
            )}
            {student && (
              <div>
                <h3>Student</h3>
                <p>{student}</p>
              </div>
            )}
            {project && (
              <div>
                <h3>Student</h3>
                <p>{project}</p>
              </div>
            )}
            <div>
              <Button>Edit</Button>
              <Button>Delete</Button>
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
  project: undefined,
};

AdminCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  description: PropTypes.string,
  githbUrl: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  student: PropTypes.string,
  project: PropTypes.string,
};

export default AdminCard;
