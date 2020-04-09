import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import * as ROUTES from '../constants/routes';
import CohortPage from '../components/CohortPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.COHORT_PAGE} exact component={CohortPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
