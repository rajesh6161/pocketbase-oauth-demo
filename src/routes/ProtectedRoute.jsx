import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
