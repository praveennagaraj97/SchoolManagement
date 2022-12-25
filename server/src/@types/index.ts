import { Schema } from 'mongoose';
import { UserRoles } from './entity/user.entity';

export type JWTPayload = { id?: Schema.Types.ObjectId; role?: UserRoles };
