import { FC, useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import useSWR, { mutate } from 'swr';
import { ClassEntity, TeacherEntity } from '../../../@types';
import { Class, Teacher } from '../../../api-endpoints';
import useMessageStatusSetter from '../../../hooks/useStatusMessageSetter';
import { assignClassToTeacher } from '../../../services/api.service';
import ResponseStatusTag from '../../shared/response-status-tag';
import Students from './student';

interface ManageClassTeacherAndStudentsProps {
  data: ClassEntity | null;
}

const ManageClassTeacherAndStudents: FC<ManageClassTeacherAndStudentsProps> = ({
  data,
}) => {
  const [selectedTeacher, setSeletedTeacher] = useState('');
  const [loading, setLoading] = useState(false);
  const { errMessage, successmessage, setter } = useMessageStatusSetter();

  const { data: teachers } = useSWR<{ results: TeacherEntity[] }>(Teacher);

  useEffect(() => {
    if (data) {
      setSeletedTeacher(data?.teacher?._id || '');
    }
  }, [data]);

  if (!data) {
    return null;
  }

  async function assignTeacher() {
    try {
      if (!selectedTeacher) {
        return setter('Please select a teacher', 'error');
      }

      setLoading(true);
      await assignClassToTeacher(selectedTeacher, data?._id || '');
      await setter('Teacher assigned successfully', 'success');
      await mutate(Class);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setter(error?.response?.data?.message || 'Something went wrong', 'error');
    }
  }

  return (
    <div className="sm:w-auto w-full p-2  overflow-y-auto max-h-[93vh] sm:min-h-[93vh]">
      <div className="border p-1 rounded-md text-sm mt-5 mb-2">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Teacher
        </label>
        <select
          value={selectedTeacher}
          onChange={(ev) => setSeletedTeacher(ev.target.value)}
          className="rounded-md sm:w-80 w-full p-2 border mb-1"
        >
          <option value="">Select teacher</option>
          {teachers?.results?.map((teacher) => {
            return (
              <option value={teacher._id} key={teacher._id}>
                {teacher.user.name}
              </option>
            );
          })}
        </select>
        <ResponseStatusTag
          errMessage={errMessage}
          successmessage={successmessage}
        />
        <button
          disabled={loading || selectedTeacher === data?.teacher?._id}
          onClick={assignTeacher}
          className="action-btn w-full p-2 justify-center"
        >
          {loading ? <ImSpinner2 className="animate-spin" /> : ''}
          <span>{loading ? 'Please wait' : 'Save'}</span>
        </button>
      </div>

      <h4 className="mt-3 text-xl">Students</h4>
      <hr className="my-2" />
      <Students classId={data?._id} />
    </div>
  );
};

export default ManageClassTeacherAndStudents;
