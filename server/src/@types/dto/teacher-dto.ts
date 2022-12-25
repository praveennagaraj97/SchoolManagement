import { TeacherEntity } from '../entity/teacher.entity';
import { UserEntity } from '../entity/user.entity';

export interface AddTeacherDTO
  extends Omit<TeacherEntity, '_id' | 'user'>,
    Omit<UserEntity, '_id'> {}
