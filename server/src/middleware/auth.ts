import { NextFunction, Request, Response } from 'express';
import { UserRoles } from '../@types/entity/user.entity';
import { decodeJWTToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Authentication header is missing' });
    return;
  }

  const token = authHeader.split('Bearer ')?.[1];

  if (!token) {
    res.status(401).json({ message: 'Token cannot be empty' });
    return;
  }

  const payload = decodeJWTToken(token);

  req.role = payload.role;
  req.id = payload.id;

  next();
};

export const accessProtectMiddleare =
  (role: [UserRoles]) => (req: Request, res: Response, next: NextFunction) => {
    if (!role.includes(req.role!)) {
      res.status(401).json({ message: 'Access denied' });
      return;
    }

    next();
  };
