import { FC, FormEvent, useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { ClassEntity } from '../../@types';
import useMessageStatusSetter, {
  ErrorTypes,
} from '../../hooks/useStatusMessageSetter';
import ResponseStatusTag from '../shared/response-status-tag';

interface ClassFormProps {
  onSubmit: (payload: Omit<ClassEntity, '_id' | 'teacher'>) => Promise<{
    message: any;
    type: ErrorTypes;
  }>;
  onComplete: () => void;
  data: ClassEntity | null;
}

const ClassForm: FC<ClassFormProps> = ({ onSubmit, onComplete, data }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState<number>();
  const [loading, setLoading] = useState(false);

  const { errMessage, successmessage, setter } = useMessageStatusSetter();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCapacity(data.capacity);
    }
  }, [data]);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!name.trim()) {
      return setter('Class name cannot be empty', 'error');
    }

    if (!capacity) {
      return setter('Capacity cannot be empty', 'error');
    }

    if (capacity < 10) {
      return setter('Capacity should be greater than 10', 'error');
    }

    if (capacity > 160) {
      return setter('Capacity should be less than 160', 'error');
    }
    setLoading(true);
    const { message, type } = await onSubmit({ capacity, name });
    await setter(message, type);
    setLoading(false);
    if (type === 'success') {
      onComplete();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded-md" noValidate>
      <div className="border p-1 rounded-md text-sm">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          disabled={loading}
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          className="rounded-md sm:w-96 w-full p-2 border"
          placeholder="Enter class name"
        />
      </div>

      <div className="border p-1 rounded-md text-sm mt-5 mb-2">
        <label htmlFor="name" className="text-xs opacity-50 block  mb-1">
          Capacity
        </label>
        <input
          type="number"
          min={10}
          max={160}
          value={capacity || ''}
          disabled={loading}
          onChange={(ev) => {
            setCapacity(ev.target.valueAsNumber);
          }}
          className="rounded-md sm:w-96 w-full p-2 border"
          placeholder="Enter class capacity"
        />
      </div>
      <div className="max-w-sm">
        <ResponseStatusTag
          errMessage={errMessage}
          successmessage={successmessage}
        />
      </div>
      <button
        disabled={loading}
        className="action-btn w-full p-2 mt-1.5 justify-center"
      >
        {loading ? <ImSpinner2 className="animate-spin" /> : ''}
        <span>{loading ? 'Please wait' : 'Submit'}</span>
      </button>
    </form>
  );
};

export default ClassForm;
