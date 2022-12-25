import { FC } from 'react';
import { useUserStore } from '../../context/userContext';
import AdminView from './admin';

const HomeView: FC = () => {
  const { role } = useUserStore();

  if (role === 'admin') {
    return <AdminView />;
  }

  return null;
};

export default HomeView;
