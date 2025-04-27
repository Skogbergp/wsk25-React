import {useNavigate} from 'react-router';
import {useUser} from '../hooks/apiHooks.jsx';
import useForm from '../hooks/formHooks';
import TextInput from './ui/TextInput.jsx';
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
        <TextInput
          label="Username"
          name="username"
          type="text"
          id="registeruser"
          onChange={handleInputChange}
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          id="email"
          onChange={handleInputChange}
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          id="newpassword"
          onChange={handleInputChange}
        />

        <button
          className="rounded border-2 bg-stone-400 text-stone-800"
          text
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
}
