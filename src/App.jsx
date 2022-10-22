import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from './utils/config';

import PublicPage from './routes/PublicPage';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './routes/AuthPage';
import ProtectedRoute from './routes/ProtectedRoute';
import ProfilePage from './routes/ProfilePage';
import Redirect from './routes/Redirect';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserLoggedIn } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   client.realtime.subscribe('', function (e) {});
  //   return () => {
  //     client.realtime.unsubscribe();
  //   };
  // });

  useEffect(() => {
    dispatch(setUserLoggedIn());
  }, [loading]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
