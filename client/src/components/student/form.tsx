import { FC, FormEvent, useEffect, useReducer, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { StudentEntity, UserEntity, UserRoles } from '../../@types';
import useMessageStatusSetter, {
  ErrorTypes,
} from '../../hooks/useStatusMessageSetter';
import { validateEmail } from '../../utils';
import ResponseStatusTag from '../shared/response-status-tag';
import {
  initialState,
  StudentFormActionTypes,
  StudentFormReducer,
} from './form.reducer';

interface StudentFormProps {
  onSubmit: (
    payload: Omit<StudentEntity, 'user' | '_id'> &
      Omit<UserEntity, 'password' | '_id' | 'token'>
  ) => Promise<{
    message: any;
    type: ErrorTypes;
  }>;
  onComplete: () => void;
  data: StudentEntity | null;
}

const StudentForm: FC<StudentFormProps> = ({ onComplete, onSubmit, data }) => {
  const [state, dispatch] = useReducer(StudentFormReducer, initialState);

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
      role: UserRoles.student,
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
          address: data.address,
        },
        type: StudentFormActionTypes.SetInitial,
      });
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 rounded-md mt-2 overflow-y-auto max-h-[93vh] sm:min-h-[93vh] sm:pb-28 pb-24"
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
              type: StudentFormActionTypes.Name,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter student's name"
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
              type: StudentFormActionTypes.Email,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter student's email"
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
          min={3}
          onChange={(ev) => {
            dispatch({
              type: StudentFormActionTypes.Age,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter student's age"
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
              type: StudentFormActionTypes.Gender,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter student's email"
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
          Address
        </label>
        <textarea
          value={state.address}
          disabled={loading}
          onChange={(ev) => {
            dispatch({
              type: StudentFormActionTypes.Address,
              payload: ev.target.value,
            });
          }}
          placeholder="Enter student's address"
          className="rounded-md sm:w-80 w-full p-2 border"
        />
      </div>
      <small className="opacity-50 mt-4 block whitespace-pre">
        {`Note : Use student's name with lowercase as password`}
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

export default StudentForm;
