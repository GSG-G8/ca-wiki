import getSecrets from './getSecrets';

const initAuth = async () => {
  const { REACT_APP_CLIENT_ID } = await getSecrets();
  return window.gapi.auth2.init({
    client_id: REACT_APP_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
  });
};

export const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth()
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        resolve(auth.isSignedIn.get());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const renderButton = () => {
  window.gapi.signin2.render('signin-button', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
  });
};
