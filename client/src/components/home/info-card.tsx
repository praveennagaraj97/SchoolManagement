import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface OverviewCardProps {
  icon: ReactNode;
  title: string;
  link: string;
  description: string;
  btnName: string;
}

const OverviewCard: FC<OverviewCardProps> = ({
  icon,
  link,
  title,
  description,
  btnName,
}) => {
  return (
    <div className="border p-4 rounded-md shadow-md drop-shadow-xl animate-fade-in">
      <div className="flex space-x-3 items-center">
        {icon}
        <strong>{title}</strong>
      </div>
      <p className="text-sm mt-2">{description}</p>
      <Link to={link}>
        <button
          className="bg-fuchsia-400 mt-2 text-sm rounded-md shadow-md shadow-fuchsia-400/30 
        w-full py-2 px-4 text-gray-50 smooth-animate hover:bg-fuchsia-600"
        >
          <span>{btnName}</span>
        </button>
      </Link>
    </div>
  );
};

export default OverviewCard;
