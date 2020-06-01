import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import notFoundImg from '../../assets/images/notFoundImg.jpg';
import './style.css';

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImg} alt="notFound" />
      <div>
        <h1>Page Not Found</h1>
        <p>
          We are sorry, the page you requested could not be found.
          <br /> Please go back to the HomePage
        </p>
        <Link to={ROUTES.HOME_PAGE}>
          <Button>HomePage</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
