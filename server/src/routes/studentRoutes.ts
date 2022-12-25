import { Router } from 'express';
import { UserRoles } from '../@types/entity/user.entity';
import {
  addStudent,
  assignClassToStudent,
  count,
  deleteStudent,
  myClass,
  studentsList,
  updateStudent,
} from '../controller/studentController';
import { accessProtectMiddleare, authMiddleware } from '../middleware/auth';

const router = Router();

router.post(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  addStudent,
);

router.get(
  '',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  studentsList,
);

router.put(
  '/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  updateStudent,
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
  deleteStudent,
);

router.post(
  '/assign_class/:id',
  authMiddleware,
  accessProtectMiddleare([UserRoles.admin]),
  assignClassToStudent,
);

router.get(
  '/class',
  authMiddleware,
  accessProtectMiddleare([UserRoles.student]),
  myClass,
);

export default router;
