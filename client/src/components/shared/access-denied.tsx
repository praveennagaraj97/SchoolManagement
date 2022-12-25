import { ImHome } from 'react-icons/im';
import { MdNoAccounts } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function AccessDenied(): JSX.Element {
  return (
    <div className="container px-2 mx-auto text-center max-w-lg shadow-lg border my-20 p-4 rounded-md">
      <MdNoAccounts size={64} className="mx-auto" />
      <h1 className="text-2xl font-semibold my-2">Access Denied</h1>
      <p className="opacity-60">You are authorized to access this route</p>
      <Link to="/">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4
        py-2 px-4 rounded flex items-center space-x-2 mx-auto smooth-animate"
        >
          <ImHome />
          <span>Go to Home</span>
        </button>
      </Link>
    </div>
  );
}
