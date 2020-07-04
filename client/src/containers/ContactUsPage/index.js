import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import contactPhoto from '../../assets/images/Group 3036.svg';
import logo from '../../assets/images/logo.png';
import * as ROUTES from '../../constants/routes';
import UserContainer from '../../components/UserContainer';

import './style.css';

const ContactUS = () => {
  return (
    <UserContainer
      rightPageColor="white"
      headerLogo={logo}
      isCohortPages={false}
    >
      <div className="contact-container">
        <div className="img-container">
          <img src={contactPhoto} alt="contact" />
        </div>
        <div className="contact-page-container">
          <div className="content-parent">
            <div className="contact-child-container">
              <h4>FOLLOW US</h4>
              <p>Gaza Sky Geeks</p>
              <div className="icons-container">
                <a
                  href="https://twitter.com/GazaSkyGeeks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} color="#636D73" size="2x" />
                </a>
                <a
                  href="https://instagram.com/gazaskygeeks?igshid=11vk0nc0h1fyc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="#636D73"
                    size="2x"
                  />
                </a>
                <a
                  href="https://www.facebook.com/GazaSkyGeeks/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    color="#636D73"
                    size="2x"
                  />
                </a>
              </div>
            </div>
            <div className="contact-child-container">
              <h4>CONTACT US</h4>
              <p>Phone: +970 8282 6331</p>
              <p>
                Email:
                <a href="mailto:info@gazaskygeeks.com">
                  {' '}
                  info@gazaskygeeks.com
                </a>
              </p>
            </div>
            <div className="contact-child-container">
              <h4>Sections of the site</h4>
              <div className="section-container-1">
                <Link to={ROUTES.HOME_PAGE}>
                  <p>Home </p>
                </Link>
                -
                <Link to="/search">
                  <p>Search</p>
                </Link>
              </div>
              <div className="section-container-2">
                <Link to={ROUTES.ALUMNI_PAGE}>
                  <p>Alumni</p>
                </Link>
                -
                <Link to={ROUTES.INTERNAL_PROJECTS}>
                  <p>Internal Projects</p>
                </Link>
              </div>
              <Link to={ROUTES.REMOTELY_PROJECTS}>
                <p className="text">REMOTELY projects</p>
              </Link>
            </div>
          </div>
          <div className="rights">
            <div className="end-line" />
            <div className="copy-right">
              All rights reserved. Gaza Sky Geeks.Code Academy © 2020
            </div>
          </div>
        </div>
      </div>
    </UserContainer>
  );
};

export default ContactUS;
