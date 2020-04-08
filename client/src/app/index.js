import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import LoginPage from '../components/loginPage';

import './style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.LOGIN_PAGE} component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
