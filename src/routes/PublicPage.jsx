import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PublicPage = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="text-white max-w-3xl flex flex-col space-y-3">
      <h1 className="text-xl">PocketBase oAuth Demo</h1>
      <p>
        Currently:{' '}
        <span
          className={`
          ${loggedIn ? 'text-green-400' : 'text-red-400'}
        `}
        >
          {loggedIn ? 'Logged In 🎉' : 'Not logged in 😔'}
        </span>
      </p>
      <code className="bg-gray-600 p-1 text-lime-400">
        currently you are on "/" viz., a public page and if you try to access
        profile page you will be redirected to login page if you aren't logged
        in, as it is a protected route.
      </code>
      <Link to="/profile">
        <i className="fa-regular fa-hand-point-right"></i>
        <code className="text-blue-300"> Go to Profile "/profile"</code>
      </Link>
      <hr />
      <div className="flex space-x-3">
        <a
          href="https://github.com/pocketbase/pocketbase"
          target="_blank"
          className="hover:text-blue-300"
        >
          <i className="fa-brands fa-github pr-1"></i>
          PocketBase
        </a>
        <a
          href="https://github.com/rajesh6161/pocketbase-oauth-demo"
          target="_blank"
          className="hover:text-blue-300"
        >
          <i className="fa-brands fa-github pr-1"></i>
          Clone it!
        </a>
      </div>
    </div>
  );
};

export default PublicPage;
