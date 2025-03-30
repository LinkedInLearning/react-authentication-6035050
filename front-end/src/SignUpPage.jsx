import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from './useToken';

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post('/api/sign-up', {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate('/please-verify', { replace: true });
  }

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        placeholder="someone@gmail.com" />
      <input
        type="password"
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        placeholder="password" />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={e => setConfirmPasswordValue(e.target.value)}
        placeholder="password" />
      <hr />
      <button
        disabled={
          !emailValue || !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}>Sign Up</button>
      <button onClick={() => navigate('/log-in')}>Already have an account? Log In</button>
    </div>
  );
}