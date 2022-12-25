import { NextFunction, Request, Response } from 'express';

export const reqLogs = (req: Request, _: Response, next: NextFunction) => {
  console.log(
    `${req.method.toUpperCase()} | ${req.protocol}://${req.hostname}:${
      process.env.PORT
    }${req.path}`,
  );
  next();
};
