import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './style.css';
import logo from '../../assets/images/logo.png';
import toolsImg from '../../assets/images/Group 2381.svg';
import treeImg from '../../assets/images/Group 2423.svg';

import * as ROUTES from '../../constants/routes';

class UserContainer extends Component {
  state = { show: false };

  reverseShow = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const { show } = this.state;
    const {
      rightPageColor,
      headerLogo,
      children,
      isCohortPages,
      isProjectsPage,
      toolsTreeImg,
      cohortId,
    } = this.props;

    const rightNavActive =
      rightPageColor === 'black'
        ? 'right-nav-active'
        : 'right-nav-active-white';

    const rightNav =
      rightPageColor === 'black' ? 'right-nav' : 'right-nav-white';

    return (
      <div>
        <div className="main-header">
          <div className="header-left">
            <Link to={ROUTES.HOME_PAGE}>
              <img src={headerLogo} alt="Code Academy" />
            </Link>
          </div>
          <div className="header-right">
            <SearchOutlined style={{ color: rightPageColor }} />
            <MenuOutlined
              style={{ color: rightPageColor }}
              onClick={this.reverseShow}
            />
          </div>
          {show ? (
            <div>
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
                    to={ROUTES.HOME_PAGE}
                    exact
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={ROUTES.SEARCH_PAGE}
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Search
                  </NavLink>
                  <NavLink
                    to={ROUTES.COHORTS_PAGE}
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Cohort
                  </NavLink>
                  <NavLink
                    to={ROUTES.ALUMNI_PAGE}
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Alumni
                  </NavLink>
                  <NavLink
                    to={ROUTES.INTERNAL_PROJECTS}
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Internal Projects
                  </NavLink>
                  <NavLink
                    to={ROUTES.REMOTELY_PROJECTS}
                    activeClassName="header-list-active"
                    className="header-list"
                    onClick={this.reverseShow}
                  >
                    Remotely Project
                  </NavLink>
                </div>
                <div className="menu-social">
                  <span>
                    <a
                      className="contact"
                      href="https://www.facebook.com/GazaSkyGeeks"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.reverseShow}
                    >
                      FACEBOOK
                    </a>
                  </span>
                  <span>
                    <a
                      className="contact"
                      href="https://instagram.com/gazaskygeeks"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.reverseShow}
                    >
                      INSTAGRAM
                    </a>
                  </span>
                  <span>
                    <a
                      className="contact"
                      href="https://twitter.com/GazaSkyGeeks"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.reverseShow}
                    >
                      TWITTER
                    </a>
                  </span>
                </div>
              </div>
              <div className="header-overlay" />
            </div>
          ) : null}
        </div>

        <ul className="right-nav-list">
          {!isCohortPages && !isProjectsPage ? (
            <>
              <li>
                <NavLink
                  exact
                  to={ROUTES.HOME_PAGE}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>C</div>
                  <div className="show-full-name">CODE ACADEMY</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={ROUTES.COHORTS_PAGE}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>Co</div>
                  <div className="show-full-name">COHORTS</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={ROUTES.INTERNAL_PROJECTS}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>IP</div>
                  <div className="show-full-name">INTERNAL PROJECTS</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={ROUTES.REMOTELY_PROJECTS}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>RP</div>
                  <div className="show-full-name">REMOTELY PROJECTS</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={ROUTES.CONTACT_US_PAGE}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>F</div>
                  <div className="show-full-name">FOLLOW US</div>
                  <div className="line" />
                </NavLink>
              </li>
            </>
          ) : null}

          {isCohortPages ? (
            <>
              <li>
                <NavLink
                  exact
                  to={`/cohorts/${cohortId}/projects?type=internal`}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>Ip</div>
                  <div className="show-full-name">INTERNAL PROJECTS PHASE</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={`/cohorts/${cohortId}/projects?type=remotely`}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>Rp</div>
                  <div className="show-full-name">REMOTELY PROJECTS PHASE</div>
                  <div className="line" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={ROUTES.COHORT_ALUMNI_PAGE}
                  className={rightNav}
                  activeClassName={rightNavActive}
                >
                  <div>A</div>
                  <div className="show-full-name">ALUMNI</div>
                  <div className="line" />
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
        {toolsTreeImg ? (
          <>
            <img className="tools-img" src={toolsImg} alt="tools" />
            <img className="tree-img" src={treeImg} alt="tree" />
          </>
        ) : null}

        {children}
      </div>
    );
  }
}

UserContainer.defaultProps = {
  rightPageColor: 'black',
  isCohortPages: false,
  isProjectsPage: false,
  toolsTreeImg: false,
  cohortId: 0,
};

UserContainer.propTypes = {
  rightPageColor: PropTypes.string,
  headerLogo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isCohortPages: PropTypes.bool,
  isProjectsPage: PropTypes.bool,
  toolsTreeImg: PropTypes.bool,
  cohortId: PropTypes.number,
};
export default UserContainer;
