import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonials';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import { i18nMiddleware } from '../middleware/i18n';

const router = Router();

// Public routes
router.get('/', i18nMiddleware, getTestimonials);

// Admin routes
router.post('/', authMiddleware, requireAdmin, createTestimonial);
router.put('/:id', authMiddleware, requireAdmin, updateTestimonial);
router.delete('/:id', authMiddleware, requireAdmin, deleteTestimonial);

export default router;
