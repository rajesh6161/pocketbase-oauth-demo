import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="text-white flex items-center border rounded-lg p-5 space-x-10">
      <img
        src={user?.meta?.avatarUrl}
        alt="Avatar"
        className="w-28 h-28 rounded-full"
      />
      <div className="space-y-1">
        <p className="text-lg">
          Welcome, <span className="text-lime-400">{user?.meta?.name}</span>
        </p>
        <p>Email: {user?.meta?.email}</p>
        <Link to="/">
          <p className="text-lime-400 my-1">Back to root "/"</p>
        </Link>
        <button
          className="bg-gray-600 text-lime-400 p-2 rounded-md hover:bg-gray-700"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
