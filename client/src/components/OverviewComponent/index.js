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
  externalLink,
  isRightImg,
  isHomePage,
  titleIsDark,
  backgroundIsRed,
}) => {
  return (
    <div className="overview-container">
      <div
        className={`${isRightImg ? 'rightPart' : ''} ${
          backgroundIsRed ? 'redGround img-side' : 'whiteGround img-side'
        }`}
      >
        <img className="background-photo" src={imageSource} alt="Home" />
      </div>
      <div className="container-content">
        <h1 className={titleIsDark ? 'darkTitle' : 'redTitle'}>{firstTitle}</h1>
        <h1 className="secondTitle">{secondTitle}</h1>
        <p>{content}</p>
        {isHomePage ? (
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            <Button type="button">{buttonText}</Button>
          </a>
        ) : (
          <Link to={btnLink}>
            <Button type="button">{buttonText}</Button>
          </Link>
        )}
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
  externalLink: PropTypes.string.isRequired,
  isRightImg: PropTypes.bool.isRequired,
  isHomePage: PropTypes.bool.isRequired,
  titleIsDark: PropTypes.bool.isRequired,
  backgroundIsRed: PropTypes.bool.isRequired,
};

export default OverviewComponent;
