import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children}) => {
  const {user} = useUserContext();
  const location = useLocation();
  console.log(location.pathname ? location.pathname : '/');

  if (!user) {
    return <Navigate to={'/'} />;
  }

  return children;
};

export default ProtectedRoute;
