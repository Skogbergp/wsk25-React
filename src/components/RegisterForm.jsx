import {useNavigate} from 'react-router';
import {useUser} from '../hooks/apiHooks.jsx';
import useForm from '../hooks/formHooks';
export default function RegisterForm() {
  const initValues = {
    username: '',
    password: '',
  };

  const {postUser} = useUser();
  const navigate = useNavigate();

  const doRegister = async () => {
    await postUser(inputs);
    navigate('/');
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="newpassword">Password</label>
          <input
            name="password"
            type="password"
            id="newpassword"
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
}
