import {createContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useAuthentication, useUser} from '../hooks/apiHooks';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

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

      if (token) {
        const userData = await getUserByToken(token);
        setUser(userData.userData.user);
      }

      navigate(location.pathname);
    } catch (e) {
      handleLogout();
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
export {UserContext, UserProvider};
