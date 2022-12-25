import { Router } from 'express';
import { UserRoles } from '../@types/entity/user.entity';
import {
  assignTeacherToClass,
  classCount,
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from '../controller/classController';
import { accessProtectMiddleare, authMiddleware } from '../middleware/auth';

const router = Router();

router.post(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  createClass,
);

router.get(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  getClasses,
);

router.delete(
  '/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  deleteClass,
);

router.put(
  '/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  updateClass,
);

router.get(
  '/count',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  classCount,
);

router.post(
  '/assign_teacher/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  assignTeacherToClass,
);

export default router;
