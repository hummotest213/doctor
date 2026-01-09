import { Router } from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/services';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import { i18nMiddleware } from '../middleware/i18n';

const router = Router();

// Public routes
router.get('/', i18nMiddleware, getServices);
router.get('/:slug', i18nMiddleware, getServiceBySlug);

// Admin routes
router.post('/', authMiddleware, requireAdmin, createService);
router.put('/:id', authMiddleware, requireAdmin, updateService);
router.delete('/:id', authMiddleware, requireAdmin, deleteService);

export default router;
