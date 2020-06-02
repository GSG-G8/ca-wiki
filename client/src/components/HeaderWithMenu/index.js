import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './style.css';
import logo from '../../assets/images/logo.png';

class HeaderWithMenu extends Component {
  state = { show: false };

  reverseShow = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const { show } = this.state;
    return (
      <div className="main-header">
        <div className="header-left">
          <img src={logo} alt="Code Academy" />
        </div>
        <div className="header-right">
          <SearchOutlined />
          <MenuOutlined onClick={this.reverseShow} />
        </div>
        {show ? (
          <div className="menu">
            <div className="menu-header">
              <div className="menu-header-right">
                <img src={logo} alt="Code Academy" />
              </div>
              <div className="menu-header-left">
                <CloseOutlined onClick={this.reverseShow} />
              </div>
            </div>
            <div className="menu-list">
              <NavLink
                to="/"
                exact
                activeClassName="header-list-active"
                className="header-list"
              >
                Home
              </NavLink>
              <NavLink
                to="/search"
                activeClassName="header-list-active"
                className="header-list"
              >
                Search
              </NavLink>
              <NavLink
                to="/Cohort"
                activeClassName="header-list-active"
                className="header-list"
              >
                Cohort
              </NavLink>
              <NavLink
                to="/Alumni"
                activeClassName="header-list-active"
                className="header-list"
              >
                Alumni
              </NavLink>
              <NavLink
                to="/internal-projects-overview"
                activeClassName="header-list-active"
                className="header-list"
              >
                Internal Projects
              </NavLink>
              <NavLink
                to="/clients-projects-overview"
                activeClassName="header-list-active"
                className="header-list"
              >
                Remotely Project
              </NavLink>
            </div>
            <div className="menu-social">
              <span>FACEBOOK</span>
              <span>INSTAGRAM</span>
              <span>TWITTER</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeaderWithMenu;
