import React from 'react';
import { Button } from 'antd';

import notFoundImg from '../../assets/images/notFoundImg.jpg';
import './style.css';

const PageNotFound = () => {
  return (
    <div className="container">
      <img src={notFoundImg} alt="notFound" />
      <div>
        <h1>Page Not Found</h1>
        <p>
          We are sorry, the page you requested could not be found.
          <br /> Please go back to the HomePage
        </p>
        <Button>HomePage</Button>
      </div>
    </div>
  );
};

export default PageNotFound;