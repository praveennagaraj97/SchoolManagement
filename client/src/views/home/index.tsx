import { FC } from 'react';
import { useUserStore } from '../../context/userContext';
import AdminView from './admin';
import Student from './student';
import Teacher from './teacher';

const HomeView: FC = () => {
  const { role } = useUserStore();

  if (role === 'admin') {
    return <AdminView />;
  }

  if (role === 'teacher') {
    return <Teacher />;
  }

  return <Student />;
};

export default HomeView;
