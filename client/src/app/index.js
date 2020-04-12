import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import './style.css';
import AdminProject from '../containers/AdminProjectPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path={ROUTES.COHORT_PROJECTS_PAGE}
              component={AdminProject}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
