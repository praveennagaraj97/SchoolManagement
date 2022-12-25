import { FC, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import useSWR, { mutate } from 'swr';
import { StudentEntity } from '../../../@types';
import { Student } from '../../../api-endpoints';
import useMessageStatusSetter from '../../../hooks/useStatusMessageSetter';
import { assignClassToStudent } from '../../../services/api.service';
import ResponseStatusTag from '../../shared/response-status-tag';

const AddStudent: FC<{ classId: string }> = ({ classId }) => {
  const { data } = useSWR<{ results: StudentEntity[] }>(
    Student + `?class[$ne]=${classId}`
  );

  const [id, setId] = useState('');

  const [loading, setLoading] = useState(false);
  const { errMessage, successmessage, setter } = useMessageStatusSetter();

  if (!data?.results.length) {
    return null;
  }

  async function assign() {
    if (!id) {
      return setter('Student is required', 'error');
    }
    try {
      setLoading(true);
      await assignClassToStudent(id, classId);
      await setter('Student assigned successfully', 'success');
      await mutate(Student + `?class[$ne]=${classId}`);
      await mutate(Student + `?class[$eq]=${classId}`);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setter(error?.response?.data?.message || 'Something went wrong', 'error');
    }
  }

  return (
    <div className="border p-1 rounded-md text-sm mt-5 mb-2">
      <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
        Student
      </label>
      <select
        onChange={(ev) => setId(ev.target.value)}
        className="rounded-md sm:w-80 w-full p-2 border mb-1"
      >
        <option value="">Select student</option>
        {data?.results.map((student) => {
          return (
            <option value={student._id} key={student._id}>
              {student.user.name}
            </option>
          );
        })}
      </select>
      <ResponseStatusTag
        errMessage={errMessage}
        successmessage={successmessage}
      />
      <button
        disabled={loading}
        onClick={assign}
        className="action-btn w-full p-2 justify-center"
      >
        {loading ? <ImSpinner2 className="animate-spin" /> : ''}
        <span>{loading ? 'Please wait' : 'Save'}</span>
      </button>
    </div>
  );
};

export default AddStudent;
