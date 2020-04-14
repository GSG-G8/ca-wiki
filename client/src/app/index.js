import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './style.css';
import * as ROUTES from '../constants/routes';
import Statistics from '../containers/statisticsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.HOME_PAGE} exact component={Statistics} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
