import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ isAllowed, redirectPath }) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
}