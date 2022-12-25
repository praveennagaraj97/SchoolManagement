import { FC, Fragment } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import useSWR from 'swr';
import { ClassEntity } from '../../@types';
import { StudentsClass } from '../../api-endpoints';
import ClassRoomCard from '../../components/class/class-room-card';

const Student: FC = () => {
  const { data, isLoading } = useSWR<ClassEntity>(StudentsClass);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <ImSpinner2 size={32} className="animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <h2>No Results found</h2>;
  }

  return (
    <Fragment>
      <div className="border-b pb-2 mb-6 flex justify-between space-x-2 items-center">
        <h1 className="text-xl">My Class</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <ClassRoomCard
          {...data}
          onDeleteClick={async () => {}}
          onManageClick={() => {}}
          onUpdateClick={() => {}}
          showOptions={false}
        />
      </div>
    </Fragment>
  );
};

export default Student;
