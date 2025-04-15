import PropTypes from 'prop-types';
import {useUser} from '../hooks/apiHooks.jsx';
import {useEffect, useState} from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        const {userData} = await getUserByToken(token);
        setUser(userData.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <h2>My Profile</h2>
      {user && (
        <>
          <h2>username: {user.username}</h2>
          <h2>email: {user.email}</h2>
          <h2>
            created_at: {new Date(user.created_at).toLocaleString('FI-fi')}{' '}
          </h2>
        </>
      )}
    </>
  );
}

Profile.propTypes = {};

export default Profile;
