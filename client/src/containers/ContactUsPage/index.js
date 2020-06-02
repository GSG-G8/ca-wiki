import React from 'react';
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
              <a href="https://twitter.com/explore">
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
            <p>Home - Search</p>
            <p>Alumni - Community Projects</p>
            <p>Customer projects</p>
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
