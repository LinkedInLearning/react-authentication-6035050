import { useState, createContext } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token');
  });

  const setToken = newToken => {
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  }

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
}