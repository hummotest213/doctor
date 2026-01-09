import { Router } from 'express';
import { login, getCurrentUser, getStats } from '../controllers/auth';
import { authMiddleware, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/stats', authMiddleware, requireAdmin, getStats);

export default router;
