import {Outlet} from 'react-router';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

export default function Layout() {
  const {handleAutoLogin, user} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/upload">Upload</Link>
              </li>

              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
