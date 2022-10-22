import React, { useEffect, useState } from 'react';
import { getoAuthProviders, setUserLoggedIn } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { Link, Navigate } from 'react-router-dom';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { loggedIn, authProviders, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getoAuthProviders());
  }, []);

  useEffect(() => {
    dispatch(setUserLoggedIn());
  }, [loading]);

  if (loggedIn) {
    return <Navigate to="/profile" />;
  }

  const oAuthHandler = (provider) => {
    localStorage.setItem('provider', JSON.stringify(provider));
  };

  const redirectUrl = 'http://localhost:3000/redirect';
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      {loading ? (
        <p className="text-white">Authenticating...</p>
      ) : (
        <div className="w-full max-w-md">
          <>
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.clipartmax.com/png/full/111-1112912_go-gopher-go-programming-language-logo.png"
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Login to your account
            </h2>
            <Link to="/">
              <p className="text-lime-400 text-center pt-3">Back to root "/"</p>
            </Link>
          </>
          <div className="mt-5">
            <p className="text-center">Available Providers:</p>
            {authProviders?.length > 0 &&
              authProviders.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.authUrl + redirectUrl}
                  className="group relative flex w-full justify-center  rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5 cursor-pointer"
                  onClick={() => oAuthHandler(provider)}
                >
                  Login via {provider.name}{' '}
                </a>
              ))}

            {authProviders?.length === 0 && (
              <p className="text-center">No login methods available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
