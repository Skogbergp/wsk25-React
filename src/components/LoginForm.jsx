import {useUserContext} from '../hooks/contextHooks.jsx';
import useForm from '../hooks/formHooks';
import TextInput from './ui/TextInput.jsx';

function LoginForm() {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>


           <TextInput
            label="Username"
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
          />



          <TextInput
            label="Password"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
          />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
