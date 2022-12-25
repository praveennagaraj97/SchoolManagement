import { Schema } from 'mongoose';

export enum UserRoles {
  student = 'student',
  teacher = 'teacher',
  admin = 'admin',
}

export interface UserEntity {
  _id: Schema.Types.ObjectId;
  name: string;
  role: UserRoles;
  email: string;
  password: string;
}
