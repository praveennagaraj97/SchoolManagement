export enum TeacherFormActionTypes {
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

interface TeacherFormState {
  name: string;
  age: null | number;
  email: string;
  gender: string;
  qualification: string;
  salary: null | number;
  subject: string;
  address: string;
}

export const initialState: TeacherFormState = {
  name: '',
  age: null,
  email: '',
  gender: '',
  qualification: '',
  salary: null,
  subject: '',
  address: '',
};

export const teacherFormReducer = (
  state: TeacherFormState,
  action: { type: TeacherFormActionTypes; payload: string | any }
) => {
  switch (action.type) {
    case TeacherFormActionTypes.Name:
      return { ...state, name: action.payload };
    case TeacherFormActionTypes.Email:
      return { ...state, email: action.payload };
    case TeacherFormActionTypes.Age:
      return { ...state, age: parseInt(action.payload) };
    case TeacherFormActionTypes.Gender:
      return { ...state, gender: action.payload };
    case TeacherFormActionTypes.Qualification:
      return { ...state, qualification: action.payload };
    case TeacherFormActionTypes.Salary:
      return { ...state, salary: parseInt(action.payload) };
    case TeacherFormActionTypes.Subject:
      return { ...state, subject: action.payload };
    case TeacherFormActionTypes.Address:
      return { ...state, address: action.payload };
    case TeacherFormActionTypes.SetInitial:
      return action.payload;
    default:
      return initialState;
  }
};
