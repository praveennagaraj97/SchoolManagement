import { FC } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosLogOut, IoMdSchool } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../context/userContext';

const Header: FC = () => {
  const { name, role, isLogged, setAuthState } = useUserStore();

  return (
    <header className="border-b shadow-md fixed top-0 left-0 right-0 z-50 bg-gray-50">
      <div className="container px-2 mx-auto py-1 flex justify-between items-center">
        <Link to="/">
          <div className="flex space-x-2 items-center">
            <IoMdSchool size={48} className="fill-sky-600" />
          </div>
        </Link>

        {isLogged ? (
          <div className="flex items-center space-x-2 animate-fade-in">
            <FaRegUserCircle size={32} className="fill-gray-700" />
            <strong className="text-sm">
              {name} <span className="opacity-50">({role})</span>
            </strong>
            <IoIosLogOut
              title="Click to logout"
              className="cursor-pointer hover:scale-110 smooth-animate w-5 h-5"
              onClick={() => {
                setAuthState({
                  isLogged: false,
                  token: '',
                  name: '',
                  role: 'student',
                  pending: false,
                });
                localStorage.removeItem('user');
              }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
