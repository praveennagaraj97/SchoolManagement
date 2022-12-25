import { model, Schema } from 'mongoose';
import { StudentEntity } from '../@types/entity/student.entity';

const studentSchema = new Schema<StudentEntity>(
  {
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
  },
  { versionKey: false },
);

studentSchema.pre(/^find/, async function () {
  this.populate('user');
});

export const StudentModel = model('Student', studentSchema);
