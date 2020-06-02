import React, { Component } from 'react';
import './style.css';
import HeaderWithMenu from '../HeaderWithMenu';
import logo from '../../assets/images/logo.png';

class UserContainer extends Component {
  state = {};

  render() {
    return (
      <HeaderWithMenu searchColor="black" menuColor="black" headerLogo={logo} />
    );
  }
}

export default UserContainer;
