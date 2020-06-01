import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './style.css';

const OverviewComponent = ({
  firstTitle,
  secondTitle,
  content,
  buttonText,
  imageSource,
  btnLink,
}) => {
  return (
    <div className="overview-container">
      <div className="container-content">
        <h1 className="firstTitle">{firstTitle}</h1>
        <h1>{secondTitle}</h1>
        <p>{content}</p>
        <Link to={btnLink}>
          <Button type="button">{buttonText}</Button>
        </Link>
      </div>
      <div className="container-photo">
        <img src={imageSource} alt="Home" />
      </div>
    </div>
  );
};

OverviewComponent.propTypes = {
  firstTitle: PropTypes.string.isRequired,
  secondTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
  btnLink: PropTypes.string.isRequired,
};

export default OverviewComponent;
