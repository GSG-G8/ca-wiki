import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import './style.css';
import AdminCohrtPage from '../containers/AdminCohortPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.COHORT_PAGE} component={AdminCohrtPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
