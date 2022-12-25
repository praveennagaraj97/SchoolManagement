export enum UserRoles {
  student = 'student',
  teacher = 'teacher',
  admin = 'admin',
}

export interface UserEntity {
  _id: string;
  name: string;
  role: UserRoles;
  email: string;
  password: string;
  token: string;
}

export interface ClassEntity {
  _id: string;
  name: string;
  capacity: number;
}

export interface TeacherEntity {
  _id: string;
  user: UserEntity;
  subject: string;
  qualification: string;
  gender: string;
  address: string;
  salary: number;
  age: number;
}

export interface StudentEntity {
  _id: string;
  user: UserEntity;
  gender: string;
  address: string;
  age: number;
}
