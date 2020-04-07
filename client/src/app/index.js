import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import * as ROUTES from '../constants/routes';
import AdminHomePage from '../containers/AdminHomePage';
import AdminCohortPage from '../containers/ AdminCohortPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.HOME_PAGE} exact component={AdminHomePage} />
          <Route path={ROUTES.COHORT_PAGE} exact component={AdminCohortPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
