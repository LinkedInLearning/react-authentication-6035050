import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from './useToken';

export const LogInPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [googleOauthUrl, setGoogleOauthUrl] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const oauthToken = queryParams.get('token');

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate('/', { replace: true });
    }
  }, [oauthToken, setToken, navigate]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get('/api/auth/google/url');
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        console.log(e);
      }
    }

    loadOauthUrl();
  }, []);

  const onLogInClicked = async () => {
    try {
      const response = await axios.post('/api/log-in', {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      setToken(token);
      navigate('/', { replace: true });
    } catch (e) {
      setErrorMessage(e.message);
    }
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
      <button
        disabled={!googleOauthUrl}
        onClick={() => { window.location.href = googleOauthUrl }}
      >Log in with Google</button>
    </div>
  );
}