import { StudentEntity } from '../entity/student.entity';
import { UserEntity } from '../entity/user.entity';

export interface AddStudentDTO
  extends Omit<StudentEntity, '_id' | 'user'>,
    Omit<UserEntity, '_id'> {}
