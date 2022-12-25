import { FC, Fragment } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import useSWR from 'swr';
import { StudentEntity } from '../../@types';
import { StudentsOfTeacher } from '../../api-endpoints';
import StudentCard from '../../components/student/card';

const Teacher: FC = () => {
  const { data, isLoading } = useSWR<{ results: StudentEntity[] }>(
    StudentsOfTeacher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <ImSpinner2 size={32} className="animate-spin" />
      </div>
    );
  }

  if (!data?.results.length) {
    return <h2>No Results found</h2>;
  }

  return (
    <Fragment>
      <div className="border-b pb-2 mb-6 flex justify-between space-x-2 items-center">
        <h1 className="text-xl">My Students</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data?.results?.map((student) => {
          return (
            <StudentCard
              onEditClick={() => {}}
              key={student._id}
              {...student}
              showOptions={false}
              onDeleteClick={() => {}}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Teacher;
