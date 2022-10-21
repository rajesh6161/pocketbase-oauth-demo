import { useEffect, useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import { useSelector } from 'react-redux';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './utils/config';

function App() {
  // useEffect(() => {
  //   client.realtime.subscribe('', function (e) {});
  //   return () => {
  //     client.realtime.unsubscribe();
  //   };
  // });

  const { user, loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />

      <AuthPage />
    </div>
  );
}

export default App;
