import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';
import {set} from 'lodash';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    const loginResult = await postLogin(credentials);
    setUser(loginResult.user);
    window.localStorage.setItem('token', loginResult.token);

    navigate('/');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);

      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const userData = await getUserByToken(token);
      if (!userData) {
        return;
      }
      console.log('userData', userData);
      setUser(userData.user);
      // TODO: get token from local storage
      // TODO: if token exists, get user data from API
      // TODO: set user to state
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
