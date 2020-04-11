import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import './style.css';
import AdminCohrtPage from '../containers/AdminCohortPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.COHORT_PAGE} component={AdminCohrtPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
