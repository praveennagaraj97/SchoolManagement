import { FC } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TeacherEntity } from '../../@types';

const TeacherCard: FC<
  TeacherEntity & { onEditClick: () => void; onDeleteClick: () => void }
> = ({
  user,
  address,
  age,
  gender,
  qualification,
  salary,
  subject,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="border rounded-md shadow-md p-4">
      <div className="p-2 rounded-full mx-auto border-2 w-fit">
        <FaChalkboardTeacher size={64} className="opacity-70 fill-rose-600" />
      </div>
      <hr className="my-3" />
      <div className="grid grid-cols-2 text-sm mt-3">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Name
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {user?.name}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Email
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {user.email}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Age
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {age} Years
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Subject
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {subject}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Salary
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {salary}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Gender
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {gender}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Qualification
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md overflow-hidden">
          {qualification}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-0.5">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Address
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200 whitespace-nowrap rounded-r-md overflow-hidden">
          {address}
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onEditClick}
          className="bg-fuchsia-400 text-sm rounded-md shadow-md shadow-fuchsia-400/30 
        w-full py-2 px-4 text-gray-50 flex space-x-1 items-center justify-center smooth-animate hover:bg-fuchsia-600 mt-3"
        >
          <MdEdit />
          <span>Edit</span>
        </button>
        <button
          onClick={onDeleteClick}
          className="bg-red-500 text-sm rounded-md shadow-md shadow-red-400/30 
        w-full py-2 px-4 text-gray-50 flex space-x-1 items-center justify-center smooth-animate hover:bg-red-700 mt-3"
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
