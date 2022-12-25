import { model, Schema } from 'mongoose';
import { ClassEntity } from '../@types/entity/class.entity';

const classSchema = new Schema<ClassEntity>({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, min: 10, max: 180 },
});

export const ClassModel = model('Class', classSchema);
