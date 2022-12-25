import { UserEntity } from '../entity/user.entity';

export interface RegisterUserDTO extends Omit<UserEntity, '_id'> {}

export interface LoginUserDTO
  extends Omit<UserEntity, '_id' | 'name' | 'role'> {}
