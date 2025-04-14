import {useState} from 'react';
import {Outlet} from 'react-router';
import {Link} from 'react-router';
import {UserProvider} from '../contexts/UserContext';

export default function Layout() {
  const {handleAutoLogin} = UserProvider;
  const [user] = useState();

  handleAutoLogin;
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
