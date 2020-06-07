import React from 'react';
import './style.css';
import UserContainer from '../UserContainer';
import logo from '../../assets/images/logo.png';

const ExamplePage = (props) => {
  return (
    <UserContainer
      rightPageColor="black"
      headerLogo={logo}
      isCohortPages={false}
      {...props}
    >
      <div style={{ paddingTop: '250px', fontWeight: 'bold' }}>
        here you can add page content as childern
      </div>
    </UserContainer>
  );
};

export default ExamplePage;
