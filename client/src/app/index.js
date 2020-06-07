import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import * as ROUTES from '../constants/routes';
import LogoutContext from '../Contexts/LogoutContext';
import LoginPage from '../containers/loginPage';
import CohortPage from '../containers/CohortPage';
import StudentPage from '../containers/StudentPage';
import AddEditForm from '../components/Add-Edit-Form';
import Statistics from '../containers/statisticsPage';
import AdminProject from '../containers/AdminProjectPage';
import PageNotFound from '../containers/PageNotFound';
import ExamplePage from '../components/ExamplePage';
import ContactUS from '../containers/ContactUsPage';
import SearchPage from '../containers/SearchPage';

import './style.css';

class App extends Component {
  state = {
    isAuth: false,
    redirect: false,
    isUser: true,
  };

  async componentDidMount() {
    this.authFun();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuth } = this.state;
    if (isAuth !== prevState.isAuth) {
      this.authFun();
    }
  }

  authFun = async () => {
    try {
      const {
        data: { statusCode },
      } = await axios.get('/api/v1/is-auth');
      if (statusCode === 200) {
        this.setState({ isAuth: true, isUser: false });
      } else {
        this.setState({
          isAuth: false,
        });
      }
    } catch (error) {
      this.setState({
        isAuth: false,
        redirect: true,
      });
    }
  };

  updateAuth = () => {
    const { isAuth } = this.state;
    this.setState({ isAuth: !isAuth });
  };

  logout = async () => {
    try {
      const {
        data: { statusCode },
      } = await axios.get('/api/v1/logout');
      if (statusCode === 200) {
        this.setState({ isAuth: false, redirect: true, isUser: false });
      } else {
        this.setState({ isAuth: true });
      }
    } catch (error) {
      this.setState({ isAuth: true });
    }
  };

  render() {
    const { isAuth, redirect, isUser } = this.state;

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path={ROUTES.LOGIN_PAGE}
              render={(props) =>
                isAuth ? (
                  <Redirect to={ROUTES.STATISTICS_PAGE} />
                ) : (
                  <LoginPage {...props} updateAuth={this.updateAuth} />
                )
              }
            />
            <Route exact path={ROUTES.HOME_PAGE} component={ExamplePage} />
            <Route exact path={ROUTES.SEARCH_PAGE} component={SearchPage} />
            <Route path={ROUTES.CONTACT_US_PAGE} exact component={ContactUS} />
            {isAuth ? (
              <LogoutContext.Provider value={{ logout: this.logout }}>
                <Route
                  exact
                  path={ROUTES.STATISTICS_PAGE}
                  component={Statistics}
                />

                <Route
                  path={ROUTES.ADMIN_COHORT_PAGE}
                  exact
                  component={CohortPage}
                />

                <Route
                  path={ROUTES.ADMIN_COHORT_STUDENTS_PAGE}
                  exact
                  component={StudentPage}
                />

                <Route
                  path={ROUTES.ADMIN_COHORT_PROJECTS_PAGE}
                  exact
                  component={AdminProject}
                />
                <Route
                  path={ROUTES.ADD_COHORT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="cohort"
                      addLink="/api/v1/cohorts"
                    />
                  )}
                />

                <Route
                  path={ROUTES.EDIT_COHORT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="cohort"
                      editLink={`/api/v1/cohorts/${props.match.params.cohortId}`}
                    />
                  )}
                />

                <Route
                  path={ROUTES.ADD_STUDENT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="student"
                      addLink="/api/v1/alumni"
                      cohortId={props.match.params.cohortId}
                    />
                  )}
                />

                <Route
                  path={ROUTES.EDIT_STUDENT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="student"
                      editLink={`/api/v1/alumni/${props.match.params.studentId}`}
                      cohortId={props.match.params.cohortId}
                    />
                  )}
                />

                <Route
                  path={ROUTES.ADD_PROJECT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="project"
                      addLink="/api/v1/projects"
                      cohortId={props.match.params.cohortId}
                    />
                  )}
                />

                <Route
                  path={ROUTES.EDIT_PROJECT}
                  exact
                  render={(props) => (
                    <AddEditForm
                      {...props}
                      formType="project"
                      editLink={`/api/v1/projects/${props.match.params.projectId}`}
                      cohortId={props.match.params.cohortId}
                    />
                  )}
                />

                <Route component={PageNotFound} />
              </LogoutContext.Provider>
            ) : redirect ? (
              isUser ? (
                <Route component={PageNotFound} />
              ) : (
                <Route render={() => <Redirect to={ROUTES.LOGIN_PAGE} />} />
              )
            ) : null}
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
