import { FC, FormEvent, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { UserEntity } from '../../@types';
import ResponseStatusTag from '../../components/shared/response-status-tag';
import { useUserStore } from '../../context/userContext';
import useMessageStatusSetter from '../../hooks/useStatusMessageSetter';
import { loginUser } from '../../services/api.service';

const LoginView: FC = () => {
  const { setAuthState } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setter, errMessage, successmessage } = useMessageStatusSetter();

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (!email.trim()) {
      return setter('Email cannot be empty', 'error');
    }

    if (!password.trim()) {
      return setter('Password cannot be empty', 'error');
    }

    setLoading(true);
    try {
      const { data } = await loginUser<UserEntity>(email, password);
      setAuthState({
        isLogged: true,
        name: data.name,
        role: data.role,
        token: data.token,
        pending: false,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          isLogged: true,
          name: data.name,
          role: data.role,
          token: data.token,
        })
      );
      await setter('Logged in successfully', 'success');
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      setLoading(false);
      setter(error?.response?.data?.message || 'Something went wrong', 'error');
    }
  }

  return (
    <div className="container px-2 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 
      mb-4 flex flex-col max-w-xl mx-auto  border"
        autoComplete="off"
      >
        <h1 className="text-2xl mb-2 font-semibold text-center">Login</h1>
        <small className="text-center">
          Enter your credentials to continue
        </small>
        <hr className="mb-3 mt-6" />
        <div className="my-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="text"
            name="email"
            disabled={loading}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            disabled={loading}
            name="password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 
            mb-1"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <ResponseStatusTag
          errMessage={errMessage}
          successmessage={successmessage}
          className="text-left text-sm min-h-[25px]"
        />

        <div className="flex items-center justify-between">
          <button
            className="action-btn py-2 px-4"
            type="submit"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin" /> : ''}
            <span>{loading ? 'Please wait' : 'Sign In'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
