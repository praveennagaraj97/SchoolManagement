import { Schema } from 'mongoose';
import { ClassEntity } from './class.entity';
import { UserEntity } from './user.entity';

export interface StudentEntity {
  _id: Schema.Types.ObjectId;
  user: UserEntity;
  gender: string;
  address: string;
  age: number;
  class: ClassEntity;
}
