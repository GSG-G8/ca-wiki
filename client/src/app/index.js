import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import * as ROUTES from '../constants/routes';
import LoginPage from '../containers/loginPage';
import CohortPage from '../containers/CohortPage';
import StudentPage from '../containers/StudentPage';
import AdminContainer from '../components/AdminContainer';
import AddEditForm from '../components/Add-Edit-Form';

import AdminProject from '../containers/AdminProjectPage';
import './style.css';

class App extends Component {
  state = {
    isAuth: false,
    redirect: false,
  };

  async componentDidMount() {
    try {
      const {
        data: { statusCode },
      } = await axios.get('/api/v1/is-auth');
      if (statusCode === 200) {
        this.setState({ isAuth: true });
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
  }

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
        this.setState({ isAuth: false, redirect: true });
      } else {
        this.setState({ isAuth: true });
      }
    } catch (error) {
      this.setState({ isAuth: true });
    }
  };

  render() {
    const { isAuth, redirect } = this.state;

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path={ROUTES.LOGIN_PAGE}
              render={(props) =>
                isAuth ? (
                  <Redirect to={ROUTES.HOME_PAGE} />
                ) : (
                  <LoginPage {...props} updateAuth={this.updateAuth} />
                )
              }
            />
            {isAuth ? (
              <>
                <Route
                  exact
                  path={ROUTES.HOME_PAGE}
                  render={(props) => (
                    <AdminContainer {...props} logout={this.logout} />
                  )}
                />
                <Route
                  path={ROUTES.COHORT_PAGE}
                  exact
                  render={() => <CohortPage logout={this.logout} />}
                />
                <Route
                  path={ROUTES.COHORT_STUDENTS_PAGE}
                  exact
                  render={(props) => (
                    <StudentPage {...props} logout={this.logout} />
                  )}
                />

                <Route
                  path={ROUTES.COHORT_PROJECTS_PAGE}
                  exact
                  render={(props) => (
                    <AdminProject {...props} logout={this.logout} />
                  )}
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
                    />
                  )}
                />
              </>
            ) : redirect ? (
              <Route render={() => <Redirect to={ROUTES.LOGIN_PAGE} />} />
            ) : null}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
