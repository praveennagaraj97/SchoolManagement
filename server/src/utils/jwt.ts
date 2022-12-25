import { decode, sign } from 'jsonwebtoken';
import { JWTPayload } from '../@types';

export const generateJWTToken = <T = typeof Object>(data: T) => {
  return sign(data as any, process.env.JWT_SECRET || '', {
    algorithm: 'HS256',
  });
};

export const decodeJWTToken = (token: string) => {
  return decode(token) as JWTPayload;
};
