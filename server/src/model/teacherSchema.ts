import { model, Schema } from 'mongoose';
import { TeacherEntity } from '../@types/entity/teacher.entity';

const teacherSchema = new Schema<TeacherEntity>(
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
    qualification: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { versionKey: false },
);

teacherSchema.pre(/^find/, async function () {
  this.populate('user');
});

export const TeacherModel = model('Teacher', teacherSchema);
