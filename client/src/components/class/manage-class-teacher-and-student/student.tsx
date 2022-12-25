import { FC } from 'react';
import useSWR from 'swr';
import { StudentEntity } from '../../../@types';
import { Student } from '../../../api-endpoints';
import AddStudent from './add-student';

const Students: FC<{ classId: string }> = ({ classId }) => {
  const { data } = useSWR<{ results: StudentEntity[] }>(
    Student + `?class[$eq]=${classId}`
  );

  return (
    <div>
      <div className="max-h-[150px] overflow-y-auto">
        <table className="text-sm table-auto w-full rounded-md overflow-hidden">
          <thead className="rounded-md border bg-gray-300">
            <tr className="font-semibold">
              <td className="rounded-md border-2 px-2 py-0.5">Sl. No</td>
              <td className="rounded-md border-2 px-2 py-0.5">Name</td>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((student, idx) => {
              return (
                <tr key={student._id}>
                  <td className="border rounded-md border-gray-300 px-2 py-0.5">
                    {idx + 1}
                  </td>
                  <td className="border rounded-md border-gray-300 px-2 py-0.5">
                    {student.user?.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddStudent classId={classId} />
    </div>
  );
};

export default Students;
