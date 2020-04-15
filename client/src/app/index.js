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
import AddEditForm from '../components/Add-Edit-Form';

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
        this.setState({ isAuth: false, redirect: false });
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
                  <Redirect path={ROUTES.HOME_PAGE} />
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
                  exact
                  path={ROUTES.ADD_STUDENT}
                  render={() => (
                    <AddEditForm
                      formType="project"
                      editLink="/api/v1/projects/2"
                      cohortId="1"
                      inputData={{
                        name: 'Mohammed Alghazali',
                        description: 'test methods',
                        projectType: 'internal',
                        imgUrl:
                          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alroeya.com%2F9-21%2F2097601-%25D8%25B4%25D9%2581%25D8%25B1%25D9%2588%25D9%2584%25D9%258A%25D9%2587-%25D8%25AA%25D8%25B7%25D9%2584%25D9%2582-3-%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA-%25D8%25AE%25D9%2584%25D8%25A7%25D9%2584-%25D9%2585%25D8%25B9%25D8%25B1%25D8%25B6-%25D8%25AF%25D8%25A8%25D9%258A-%25D8%25A7%25D9%2584%25D8%25AF%25D9%2588%25D9%2584%25D9%258A-%25D9%2584%25D9%2584%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA&psig=AOvVaw0go-hQUFf3u0NzkcB1TqHZ&ust=1586539085592000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCJtOfs2-gCFQAAAAAdAAAAABAD',
                        websiteLink:
                          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alroeya.com%2F9-21%2F2097601-%25D8%25B4%25D9%2581%25D8%25B1%25D9%2588%25D9%2584%25D9%258A%25D9%2587-%25D8%25AA%25D8%25B7%25D9%2584%25D9%2582-3-%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA-%25D8%25AE%25D9%2584%25D8%25A7%25D9%2584-%25D9%2585%25D8%25B9%25D8%25B1%25D8%25B6-%25D8%25AF%25D8%25A8%25D9%258A-%25D8%25A7%25D9%2584%25D8%25AF%25D9%2588%25D9%2584%25D9%258A-%25D9%2584%25D9%2584%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA&psig=AOvVaw0go-hQUFf3u0NzkcB1TqHZ&ust=1586539085592000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCJtOfs2-gCFQAAAAAdAAAAABAD',
                        githubLink:
                          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alroeya.com%2F9-21%2F2097601-%25D8%25B4%25D9%2581%25D8%25B1%25D9%2588%25D9%2584%25D9%258A%25D9%2587-%25D8%25AA%25D8%25B7%25D9%2584%25D9%2582-3-%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA-%25D8%25AE%25D9%2584%25D8%25A7%25D9%2584-%25D9%2585%25D8%25B9%25D8%25B1%25D8%25B6-%25D8%25AF%25D8%25A8%25D9%258A-%25D8%25A7%25D9%2584%25D8%25AF%25D9%2588%25D9%2584%25D9%258A-%25D9%2584%25D9%2584%25D8%25B3%25D9%258A%25D8%25A7%25D8%25B1%25D8%25A7%25D8%25AA&psig=AOvVaw0go-hQUFf3u0NzkcB1TqHZ&ust=1586539085592000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCJtOfs2-gCFQAAAAAdAAAAABAD',
                      }}
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
