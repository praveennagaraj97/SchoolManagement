import { Schema } from 'mongoose';

export interface ClassEntity {
  _id: Schema.Types.ObjectId;
  name: string;
  capacity: number;
}
