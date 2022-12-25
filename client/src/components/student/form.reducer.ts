export enum StudentFormActionTypes {
  Name,
  Age,
  Email,
  Gender,
  Qualification,
  Salary,
  Subject,
  Address,
  SetInitial,
}

interface StudentFormState {
  name: string;
  age: null | number;
  email: string;
  gender: string;
  address: string;
}

export const initialState: StudentFormState = {
  name: '',
  age: null,
  email: '',
  gender: '',
  address: '',
};

export const StudentFormReducer = (
  state: StudentFormState,
  action: { type: StudentFormActionTypes; payload: string | any }
) => {
  switch (action.type) {
    case StudentFormActionTypes.Name:
      return { ...state, name: action.payload };
    case StudentFormActionTypes.Email:
      return { ...state, email: action.payload };
    case StudentFormActionTypes.Age:
      return { ...state, age: parseInt(action.payload) };
    case StudentFormActionTypes.Gender:
      return { ...state, gender: action.payload };
    case StudentFormActionTypes.Address:
      return { ...state, address: action.payload };
    case StudentFormActionTypes.SetInitial:
      return action.payload;
    default:
      return initialState;
  }
};
