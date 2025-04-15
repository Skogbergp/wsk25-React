import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks.jsx';

export default function Logout() {
  const {handleLogout} = useUserContext();
  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
    </div>
  );
}
