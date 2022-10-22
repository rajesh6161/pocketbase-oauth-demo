import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authService from '../features/auth/authService';
import { oAuthLogin, setUserLoggedIn } from '../features/auth/authSlice';

const Redirect = () => {
  let navigate = useNavigate();
  window.addEventListener('load', function () {
    const provider = JSON.parse(localStorage.getItem('provider'));
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state && state === provider.state) {
      document.getElementById('content').innerText =
        'Authentication successful! You can close this window now.';
    } else {
      document.getElementById('content').innerText =
        'Authentication failed! You can close this window now.';
    }
  });
  const redirectUrl = 'http://localhost:3000/redirect';
  const params = new URL(window.location).searchParams;
  const provider = JSON.parse(localStorage.getItem('provider'));
  if (provider.state !== params.get('state')) {
    throw "State parameters don't match.";
  }
  provider.redirectUrl = redirectUrl;
  provider.code = params.get('code');

  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .oAuthLogin(provider)
      .then((data) => {
        if (data) {
          localStorage.setItem('userData', JSON.stringify(data));
          return navigate('/profile');
        }
      })
      .catch((err) => {
        dispatch(setUserLoggedIn(err));
        console.log(err);
      });
  }, []);

  return <div id="content">Authenticating...</div>;
};

export default Redirect;
