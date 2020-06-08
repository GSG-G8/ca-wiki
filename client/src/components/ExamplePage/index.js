import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import UserContainer from '../UserContainer';
import logo from '../../assets/images/logo.png';

const ExamplePage = () => {
  return (
    <UserContainer
      rightPageColor="black"
      headerLogo={logo}
      isCohortPages={false}
    >
      <div style={{ paddingTop: '250px', fontWeight: 'bold' }}>
        here you can add page content as childern
        <Link to="/cohorts/1/projects/7">See Internal Projects Phase</Link>
      </div>
    </UserContainer>
  );
};

export default ExamplePage;
