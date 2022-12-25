import { AddClassDTO } from '../@types/dto/class-dto';
import { RegisterUserDTO } from '../@types/dto/user-dto';
import { UserRoles } from '../@types/entity/user.entity';

export const validateEmail = (email: string) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export function validateRegisterDTO(data: RegisterUserDTO) {
  const error: { [key: string]: string } = {};

  if (!data?.email) {
    error['email'] = 'Email cannot be empty';
  } else if (!validateEmail(data?.email)) {
    error['email'] = 'Email is not valid';
  }

  if (!data?.name) {
    error['name'] = 'Name cannot be empty';
  }

  if (!data?.password) {
    error['password'] = 'Password cannot be empty';
  }

  if (
    data?.role != UserRoles.admin &&
    data?.role != UserRoles.student &&
    data?.role != UserRoles.teacher
  ) {
    error['role'] = 'Role is invalid';
  }

  if (!Object.keys(error).length) {
    return null;
  }

  return error;
}

export function validateAddClassDTO({ capacity = 0, name = '' }: AddClassDTO) {
  const errors: { [key: string]: string } = {};
  if (!name) {
    errors['name'] = 'Class Room name cannot be empty';
  }

  if (!capacity) {
    errors['capacity'] = 'Class Room capacity cannot be empty';
  } else if (!/^[0-9]+$/.test(`${capacity}`)) {
    errors['capacity'] = 'Class Room capacity should be number';
  }

  if (!Object.keys(errors).length) {
    return null;
  }

  return errors;
}
