import { FC } from 'react';
import { IoIosClose } from 'react-icons/io';

const PortalHeader: FC<{ title: string; onClose: () => void }> = ({
  onClose,
  title,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-xl">{title}</h4>
      <IoIosClose
        fontSize={24}
        className="cursor-pointer bg-blue-500 rounded-full text-gray-50
              border border-blue-500
                hover:bg-transparent hover:text-blue-500 smooth-animate
              "
        onClick={onClose}
      />
    </div>
  );
};

export default PortalHeader;
