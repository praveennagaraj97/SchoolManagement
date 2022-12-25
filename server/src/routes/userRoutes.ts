import { Router } from 'express';
import { getUser, login, registerUser } from '../controller/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('', registerUser);
router.post('/login', login);
router.get('', authMiddleware, getUser);

export default router;
