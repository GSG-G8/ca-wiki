import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import contactPhoto from '../../assets/images/Group 3036.svg';

import './style.css';

const ContactUS = () => {
  return (
    <div className="contact-container">
      <div className="content-container">
        <div className="info-container">
          <div className="child-container">
            <h4>FOLLOW US</h4>
            <p>Gaza Sky Geeks</p>
            <div className="icons-container">
              <a href="https://twitter.com/GazaSkyGeeks%22%3E">
                <FontAwesomeIcon icon={faTwitter} color="#636D73" size="2x" />
              </a>
              <a href="https://instagram.com/gazaskygeeks?igshid=11vk0nc0h1fyc">
                <FontAwesomeIcon icon={faInstagram} color="#636D73" size="2x" />
              </a>
              <a href="https://www.facebook.com/GazaSkyGeeks/">
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  color="#636D73"
                  size="2x"
                />
              </a>
            </div>
          </div>
          <div className="child-container">
            <h4>CONTACT US</h4>
            <p>Phone: +970 8282 6331</p>
            <p>Email: info@gazaskygeeks.com</p>
          </div>
          <div className="child-container">
            <h4>Sections of the site</h4>
            <div className="section-container-1">
              <Link to="/">
                <p>Home </p>
              </Link>
              -
              <Link to="/search">
                <p>Search</p>
              </Link>
            </div>
            <div className="section-container-2">
              <Link to="/alumni">
                <p>Alumni</p>
              </Link>
              -
              <Link to="/com">
                <p>Community Projects</p>
              </Link>
            </div>
            <Link to="/customer">
              <p className="text">Customer projects</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src={contactPhoto} alt="contact" />
      </div>
    </div>
  );
};

export default ContactUS;
