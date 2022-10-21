import React, { useEffect, useState } from 'react';
import {
  login,
  register,
  setUserLoggedIn,
} from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';
import authService from '../../features/auth/authService';

const AuthPage = () => {
  const dispatch = useDispatch();

  const [authProviders, setAuthProviders] = useState([]);
  const callback = (data) => {
    if (data.length > 0) {
      setAuthProviders(data);
    }
  };
  useEffect(() => {
    authService.oAuthMethods(callback);
  }, []);

  const oAuthHandler = () => {};

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <>
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.clipartmax.com/png/full/111-1112912_go-gopher-go-programming-language-logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm"></div>

          <div>
            {authProviders.map((method) => (
              <a
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
                onClick={oAuthHandler}
              >
                Login via {method.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
