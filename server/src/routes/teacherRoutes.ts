import { Router } from 'express';
import { UserRoles } from '../@types/entity/user.entity';
import {
  addTeacher,
  count,
  deleteTeacher,
  getMyStudents,
  teachersList,
  updateTeacher,
} from '../controller/teacherController';
import { accessProtectMiddleare, authMiddleware } from '../middleware/auth';

const router = Router();

router.post(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  addTeacher,
);

router.get(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  teachersList,
);

router.put(
  '/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  updateTeacher,
);

router.get(
  '/count',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  count,
);

router.delete(
  '/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  deleteTeacher,
);

router.get(
  '/student',
  authMiddleware,
  accessProtectMiddleare([UserRoles.teacher]),
  getMyStudents,
);

export default router;
