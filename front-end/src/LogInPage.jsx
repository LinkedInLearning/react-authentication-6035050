import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogInPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  const onLogInClicked = async () => {
    alert('Log in not implemented yet');
  }

  return (
    <div className="content-container">
      <h1>Log In</h1>
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
      <hr />
      <button
        disabled={!emailValue || !passwordValue}
        onClick={onLogInClicked}>Log In</button>
      <button onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
      <button onClick={() => navigate('/sign-up')}>Don't have an account? Sign Up</button>
    </div>
  );
}