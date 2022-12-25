import { Schema } from 'mongoose';
import { TeacherEntity } from './teacher.entity';

export interface ClassEntity {
  _id: Schema.Types.ObjectId;
  name: string;
  capacity: number;
  teacher: TeacherEntity;
}
