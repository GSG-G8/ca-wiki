import React, { useState, useEffect } from 'react';
import { notification, Carousel } from 'antd';
import { renderButton, checkSignedIn } from './authUtils';
import DayVisitsReport from '../components/Charts/dayVisitsReport';
import PageviewsReport from '../components/Charts/pageviewReport';
import './style.css';

function GoogleLogin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        const { message } = error;
        notification.error({
          message: 'Error',
          description: message,
        });
      });
  };

  useEffect(() => {
    window.gapi.load('auth2', init);
  });

  return (
    <div className="admin-chart">
      {!isSignedIn ? (
        <>
          <h1>Sign in to request Google Analytics Report.</h1>
          <div id="signin-button" />
        </>
      ) : (
        <Carousel>
          <div>
            <DayVisitsReport metric="ga:users" title="Users" />
          </div>
          <div>
            <DayVisitsReport metric="ga:sessions" title="Sessions" />
          </div>
          <div>
            <PageviewsReport />
          </div>
        </Carousel>
      )}
    </div>
  );
}

export default GoogleLogin;
