import { Router } from 'express';
import {
  getDoctors,
  getDoctorBySlug,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctors';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import { i18nMiddleware } from '../middleware/i18n';

const router = Router();

// Public routes
router.get('/', i18nMiddleware, getDoctors);
router.get('/:slug', i18nMiddleware, getDoctorBySlug);

// Admin routes
router.post('/', authMiddleware, requireAdmin, createDoctor);
router.put('/:id', authMiddleware, requireAdmin, updateDoctor);
router.delete('/:id', authMiddleware, requireAdmin, deleteDoctor);

export default router;
