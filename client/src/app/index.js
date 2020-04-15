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
import AdminContainer from '../components/AdminContainer';

import './style.css';
import CohortPage from '../containers/CohortPage';

class App extends Component {
  state = {
    isAuth: false,
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
        this.setState({ isAuth: false });
      } else {
        this.setState({ isAuth: true });
      }
    } catch (error) {
      this.setState({ isAuth: true });
    }
  };

  render() {
    const { isAuth } = this.state;

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
              </>
            ) : (
              <Route render={() => <Redirect to={ROUTES.LOGIN_PAGE} />} />
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
