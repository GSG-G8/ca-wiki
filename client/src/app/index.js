import React from 'react';
import './style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AddDataForm from '../components/AddDataForm';

function App() {
  return (
    <Router>
      <div className="App">
        <AddDataForm formType="student" apiLink="/api/v1/alumni" cohortId={1} />
      </div>
    </Router>
  );
}

export default App;
