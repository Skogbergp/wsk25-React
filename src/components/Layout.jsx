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
        <ul className='overflow-hidden bg-stone-700 text-stone-50 flex justify-end'>

          <li>
            <Link className="block text-stone-50 text-center p-4 hover:bg-stone-500" to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link className="block text-stone-50 text-center p-4 hover:bg-stone-500" to="/profile">Profile</Link>
              </li>

              <li>
                <Link className="block text-stone-50 text-center p-4 hover:bg-stone-500" to="/upload">Upload</Link>
              </li>

              <li>
                <Link className="block text-stone-50 text-center p-4 hover:bg-stone-500" to="/logout">Logout</Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link className="block text-stone-50 text-center p-4 hover:bg-stone-500" to="/login">Login</Link>
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
