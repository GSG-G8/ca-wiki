const initAuth = () => {
  return window.gapi.auth2.init({
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
  });
};
