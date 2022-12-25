import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../context/userContext';

const ProtectedRoute: FC = () => {
  const { isLogged, pending } = useUserStore();

  if (pending) {
    return <span>Please wait...</span>;
  }

  if (!isLogged) {
    return <Navigate to={'/auth/login'} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
