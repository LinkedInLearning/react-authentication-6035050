import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { SignUpPage } from './SignUpPage';
import { LogInPage } from './LogInPage';
import { UserInfoPage } from './UserInfoPage';
import { PrivateRoute } from './PrivateRoute';
import { useUser } from './useUser';

function App() {
  const user = useUser();

  return (
    <div className="page-container">
      <BrowserRouter>
        <Routes>
          <Route path="/log-in" element={<LogInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/please-verify" element={<SignUpPage />} />
          <Route element={<PrivateRoute redirectPath="log-in" isAllowed={!!user} />}>
            <Route path="/" element={<UserInfoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
