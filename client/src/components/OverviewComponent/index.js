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
  isLeftImg,
  isHomePage,
  isDark,
  isRed,
}) => {
  return (
    <div className="overview-container">
      {isLeftImg && (
        <div className={isRed ? 'redGround' : 'whiteGround'}>
          <img className="home-photo" src={imageSource} alt="Home" />
        </div>
      )}
      <div className="container-content">
        <h1 className={isDark ? 'darkTitle' : 'redTitle'}>{firstTitle}</h1>
        <h1 className="secondTitle">{secondTitle}</h1>
        <p>{content}</p>
        {isHomePage ? (
          <a href={externalLink}>
            <Button type="button">{buttonText}</Button>
          </a>
        ) : (
          <Link to={btnLink}>
            <Button type="button">{buttonText}</Button>
          </Link>
        )}
      </div>
      {isRightImg && (
        <div className={isRed ? 'redGround' : 'whiteGround'}>
          <img className="home-photo" src={imageSource} alt="Home" />
        </div>
      )}
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
  isLeftImg: PropTypes.bool.isRequired,
  isHomePage: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
  isRed: PropTypes.bool.isRequired,
};

export default OverviewComponent;
