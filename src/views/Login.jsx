import {useState} from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleForm}>{showLogin ? 'Register' : 'Login'}</button>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
}
