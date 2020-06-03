import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { renderButton, checkSignedIn } from './authUtils';
import DayVisitsReport from '../components/Charts/dayVisitsReport';

function GoogleLogin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = async () => {
    const signedIn = await checkSignedIn();
    try {
      updateSignin(signedIn);
    } catch (error) {
      const { message } = error;
      notification.error({
        message: 'Error',
        description: message,
      });
    }
  };

  useEffect(() => {
    window.gapi.load('auth2', init);
  });
  return (
    <>
      {!isSignedIn ? (
        <div className="admin-chart">
          <h1>Sign in to request Google Analytics Report.</h1>
          <div id="signin-button" />
        </div>
      ) : (
        <DayVisitsReport metric="ga:users" title="Users" />
      )}
    </>
  );
}

export default GoogleLogin;
