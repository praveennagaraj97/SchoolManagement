import { NextFunction, Request, Response } from 'express';

export const cors = (_: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, DELETE, POST');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
