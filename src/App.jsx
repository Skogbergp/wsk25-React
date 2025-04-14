import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './views/Home';
import Single from './views/Single.jsx';
import Profile from './views/Profile.jsx';
import Upload from './views/Upload.jsx';

import './App.css';
import Login from './views/login.jsx';
import Logout from './views/logout.jsx';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* Redirect to home if no other route matches */}

          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
