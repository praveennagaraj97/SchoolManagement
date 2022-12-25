import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextState {
  isLogged: boolean;
  name: string;
  token: string;
  role: 'admin' | 'teacher' | 'student';
  setAuthState: (state: Omit<UserContextState, 'setAuthState'>) => void;
  pending?: boolean;
}

const initialState: UserContextState = {
  isLogged: false,
  name: '',
  role: 'student',
  token: '',
  setAuthState: () => {},
  pending: true,
};

const UserContext = createContext<UserContextState>(initialState);

export const useUserStore = () => useContext(UserContext);

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setAuthState] =
    useState<Omit<UserContextState, 'setAuthState'>>(initialState);

  useEffect(() => {
    const authState = localStorage.getItem('user');

    if (authState) {
      setAuthState({ ...JSON.parse(authState), pending: false });
      return;
    }

    setAuthState((curr) => ({ ...curr, pending: false }));
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setAuthState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
