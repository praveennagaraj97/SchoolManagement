import { Schema } from 'mongoose';
import { UserEntity } from './user.entity';

export interface TeacherEntity {
  _id: Schema.Types.ObjectId;
  user: UserEntity;
  subject: string;
  qualification: string;
  gender: string;
  address: string;
  salary: number;
  age: number;
}
