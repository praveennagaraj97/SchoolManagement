import { FC, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TfiBlackboard } from 'react-icons/tfi';
import { ClassEntity } from '../../@types';
import ConfirmModal from '../shared/confirm-modal';

const ClassRoomCard: FC<
  ClassEntity & {
    onDeleteClick: () => Promise<void>;
    onUpdateClick: () => void;
  }
> = ({ capacity, name, onDeleteClick, onUpdateClick }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="border rounded-md shadow-md p-4">
      <div className="p-2 rounded-full mx-auto border-2 w-fit">
        <TfiBlackboard size={64} className="opacity-70 fill-rose-600" />
      </div>
      <hr className="my-3" />
      <div className="grid grid-cols-2 text-sm mt-3">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Name
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md">
          {name}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-1">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Capacity
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md">
          {capacity}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mt-1">
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-l-md">
          Students
        </div>
        <div className="border border-gray-50 py-1 px-2 bg-gray-200  rounded-r-md">
          {10}
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onUpdateClick}
          className="bg-fuchsia-400 text-sm rounded-md shadow-md shadow-fuchsia-400/30 
        w-full py-2 px-4 text-gray-50 flex space-x-1 items-center justify-center smooth-animate hover:bg-fuchsia-600 mt-3"
        >
          <MdEdit />
          <span>Edit</span>
        </button>
        <button
          onClick={() => setShowDelete(true)}
          className="bg-red-500 text-sm rounded-md shadow-md shadow-red-400/30 
        w-full py-2 px-4 text-gray-50 flex space-x-1 items-center justify-center smooth-animate hover:bg-red-700 mt-3"
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
      {showDelete ? (
        <ConfirmModal
          isAsync
          onConfirm={onDeleteClick}
          setShowModal={(state) => setShowDelete(state)}
          showModal={showDelete}
          onCancel={() => setShowDelete(false)}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ClassRoomCard;
