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
      <button
        className="rounded border-2 bg-stone-400 text-stone-800"
        onClick={toggleForm}
      >
        {showLogin ? 'Register' : 'Login'}
      </button>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
}
