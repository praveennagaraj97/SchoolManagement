import { compare, genSalt, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { UserEntity, UserRoles } from '../@types/entity/user.entity';

import { validateEmail } from '../validators';

const userSchema = new Schema<
  UserEntity & {
    comparePassword: (
      password: string,
      hashedPassword: string,
    ) => Promise<boolean>;
  }
>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val: string) => {
        return validateEmail(val);
      },
      message: 'Email is not valid',
    },
    unique: true,
  },
  role: {
    type: String,
    enum: [UserRoles.admin, UserRoles.student, UserRoles.teacher],
  },
  password: { type: String, required: true, select: false },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async (
  password: string = '',
  hashedPassword: string = '',
) => {
  return await compare(password, hashedPassword);
};

export const UserModel = model('User', userSchema);
