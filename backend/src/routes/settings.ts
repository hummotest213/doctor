import { Router } from 'express';
import {
  getSettings,
  getSetting,
  updateSetting,
  deleteSetting,
} from '../controllers/settings';
import { authMiddleware, requireAdmin } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', authMiddleware, requireAdmin, getSettings);
router.get('/:key', authMiddleware, requireAdmin, getSetting);

// Admin routes
router.put('/:key', authMiddleware, requireAdmin, updateSetting);
router.delete('/:key', authMiddleware, requireAdmin, deleteSetting);

export default router;
