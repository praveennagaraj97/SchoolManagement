import axios from 'axios';
import {
  ClassEntity,
  StudentEntity,
  TeacherEntity,
  UserEntity,
} from '../@types';
import {
  AssignClassToStudent,
  AssignClassToTeacher,
  Class,
  LoginEndpoint,
  Student,
  Teacher,
} from '../api-endpoints';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const getAuthHeader = () => ({
  Authorization: `Bearer ${
    JSON.parse(localStorage.getItem('user')!)?.token || ''
  }`,
});

export const loginUser = <T = any>(email: string, password: string) =>
  axiosInstance.post<T>(LoginEndpoint, { email, password });

export const addClass = <T = any>(
  payload: Omit<ClassEntity, '_id' | 'teacher'>
) => axiosInstance.post<T>(Class, payload, { headers: getAuthHeader() });

export const deleteClass = <T = any>(id: string) =>
  axiosInstance.delete<T>(Class + `/${id}`, { headers: getAuthHeader() });

export const editClass = <T = any>(
  payload: Omit<ClassEntity, '_id' | 'teacher'>,
  id: string
) =>
  axiosInstance.put<T>(Class + `/${id}`, payload, {
    headers: getAuthHeader(),
  });

export const addTeacher = <T = any>(
  payload: Omit<TeacherEntity, 'user' | '_id'> &
    Omit<UserEntity, 'password' | '_id' | 'token'>
) => axiosInstance.post<T>(Teacher, payload, { headers: getAuthHeader() });

export const editTeacher = <T = any>(
  payload: Omit<TeacherEntity, 'user' | '_id'> &
    Omit<UserEntity, 'password' | '_id' | 'token'>,
  id: string
) =>
  axiosInstance.put<T>(Teacher + `/${id}`, payload, {
    headers: getAuthHeader(),
  });

export const deleteTeacher = <T = any>(id: string) =>
  axiosInstance.delete<T>(Teacher + `/${id}`, {
    headers: getAuthHeader(),
  });

export const addStudent = <T = any>(
  payload: Omit<StudentEntity, 'user' | '_id'> &
    Omit<UserEntity, 'password' | '_id' | 'token'>
) => axiosInstance.post<T>(Student, payload, { headers: getAuthHeader() });

export const editStudent = <T = any>(
  payload: Omit<StudentEntity, 'user' | '_id'> &
    Omit<UserEntity, 'password' | '_id' | 'token'>,
  id: string
) =>
  axiosInstance.put<T>(Student + `/${id}`, payload, {
    headers: getAuthHeader(),
  });

export const deleteStudent = <T = any>(id: string) =>
  axiosInstance.delete<T>(Student + `/${id}`, {
    headers: getAuthHeader(),
  });

export const assignClassToTeacher = (teacherId: string, classId: string) =>
  axiosInstance.post(
    AssignClassToTeacher + `/${classId}`,
    { teacher: teacherId },
    {
      headers: getAuthHeader(),
    }
  );

export const assignClassToStudent = (studentId: string, classId: string) =>
  axiosInstance.post(
    AssignClassToStudent + `/${studentId}`,
    { classId },
    {
      headers: getAuthHeader(),
    }
  );
