import { JWTPayload } from '.';

declare global {
  namespace Express {
    interface Request extends Request, JWTPayload {}
  }
}
