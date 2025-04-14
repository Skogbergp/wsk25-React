import {useEffect} from 'react';
import {UserProvider} from '../contexts/UserContext.jsx';

export default function Logout() {
  const {handleLogout} = UserProvider();

  useEffect(() => {
    handleLogout();
  }, []);

  return handleLogout;
}
