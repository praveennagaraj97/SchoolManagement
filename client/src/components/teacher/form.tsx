import { FC, FormEvent, useEffect, useReducer, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { TeacherEntity, UserEntity, UserRoles } from '../../@types';
import useMessageStatusSetter, {
  ErrorTypes,
} from '../../hooks/useStatusMessageSetter';
import { validateEmail } from '../../utils';
import ResponseStatusTag from '../shared/response-status-tag';
import {
  initialState,
  TeacherFormActionTypes,
  teacherFormReducer,
} from './form.reducer';

interface TeacherFormProps {
  onSubmit: (
    payload: Omit<TeacherEntity, 'user' | '_id'> &
      Omit<UserEntity, 'password' | '_id' | 'token'>
  ) => Promise<{
    message: any;
    type: ErrorTypes;
  }>;
  onComplete: () => void;
  data: TeacherEntity | null;
}

const TeacherForm: FC<TeacherFormProps> = ({ onComplete, onSubmit, data }) => {
  const [state, dispatch] = useReducer(teacherFormReducer, initialState);

  const [loading, setLoading] = useState(false);

  const { errMessage, successmessage, setter } = useMessageStatusSetter();

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!state.name.trim()) {
      return setter('Name cannot be empty', 'error');
    }

    if (!state.email.trim()) {
      return setter('Email cannot be empty', 'error');
    } else if (!validateEmail(state.email)) {
      return setter('Email is not valid', 'error');
    }

    if (!state.age) {
      return setter('Age cannot be empty', 'error');
    }

    if (!state.gender.trim()) {
      return setter('Gender cannot be empty', 'error');
    }

    if (!state.qualification.trim()) {
      return setter('Qualification cannot be empty', 'error');
    }

    if (!state.salary) {
      return setter('Salary cannot be empty', 'error');
    }

    if (!state.subject.trim()) {
      return setter('Subject cannot be empty', 'error');
    }

    if (!state.address.trim()) {
      return setter('Address cannot be empty', 'error');
    }
    setLoading(true);
    const { message, type } = await onSubmit({
      address: state.address,
      age: state.age,
      email: state.email,
      gender: state.gender,
      name: state.name,
      qualification: state.qualification,
      role: UserRoles.teacher,
      salary: state.salary,
      subject: state.subject,
    });

    await setter(message, type);
    setLoading(false);
    if (type === 'success') {
      onComplete();
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        payload: {
          name: data.user.name,
          age: data.age,
          email: data.user.email,
          gender: data.gender,
          qualification: data.qualification,
          salary: data.salary,
          subject: data.subject,
          address: data.address,
        },
        type: TeacherFormActionTypes.SetInitial,
      });
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 rounded-md mt-2 overflow-y-auto max-h-[93vh] sm:pb-28 pb-24"
      noValidate
    >
      <div className="border p-1 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Name
        </label>
        <input
          type="text"
          value={state.name}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Name,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's name"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Email
        </label>
        <input
          type="text"
          value={state.email}
          disabled={loading || data !== null}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Email,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's email"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Age
        </label>
        <input
          type="number"
          value={state.age || ''}
          disabled={loading}
          min={20}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Age,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's age"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Gender
        </label>
        <select
          value={state.gender}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Gender,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's email"
          className="rounded-md sm:w-80 w-full p-2 border"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Qualification
        </label>
        <input
          type="text"
          value={state.qualification}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Qualification,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's qualification"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Salary
        </label>
        <input
          type="number"
          value={state.salary || ''}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Salary,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's salary"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Subject
        </label>
        <input
          type="text"
          value={state.subject}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Subject,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's subject"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>

      <div className="border p-1 mt-4 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Address
        </label>
        <textarea
          value={state.address}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: TeacherFormActionTypes.Address,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter teacher's address"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <small className="opacity-50 mt-4 block whitespace-pre">
        {`Note : Use teacher's name with lowercase as password`}
      </small>
      <small className="opacity-50 block whitespace-pre">
        {`Ex : Ellie Williams = ellie_williams`}
      </small>

      <div className="absolute bottom-2 left-0 right-0 p-2 bg-gray-50">
        <div className="max-w-sm ">
          <ResponseStatusTag
            errMessage={errMessage}
            successmessage={successmessage}
          />
        </div>
        <button
          disabled={loading}
          className="action-btn w-full p-2 justify-center "
        >
          {loading ? <ImSpinner2 className="animate-spin" /> : ''}
          <span>{loading ? 'Please wait' : 'Submit'}</span>
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
