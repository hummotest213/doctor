import { Router, Response } from 'express';
import { sendSuccess } from '../utils/response';

const router = Router();

// Hero section stub
router.get('/hero', (req, res: Response) => {
  const language = req.query.lang || 'en';
  sendSuccess(res, {
    title: 'Welcome to Our Medical Clinic',
    title_highlight: 'Expert Care',
    description: 'Professional medical services',
    members_treated_count: '5000',
    members_treated_label: 'Patients Treated',
    virtual_patients_count: '10000',
    virtual_patients_label: 'Virtual Consultations',
    licensed_doctors_count: '25',
    licensed_doctors_label: 'Expert Doctors',
  });
});

// Navbar stub
router.get('/navbar', (req, res: Response) => {
  sendSuccess(res, {
    logo_text: 'Doctor Portal',
    logo_image_url: '/logo.png',
  });
});

// About section stub
router.get('/about', (req, res: Response) => {
  sendSuccess(res, {
    title: 'About Our Clinic',
    description: 'We provide quality healthcare services',
  });
});

// Services list (note: we have /api/services for actual services)
router.get('/services-page', (req, res: Response) => {
  sendSuccess(res, {
    title: 'Our Services',
    subtitle: 'Comprehensive healthcare solutions',
  });
});

// Appointments page info
router.get('/appointment', (req, res: Response) => {
  sendSuccess(res, {
    title: 'Book an Appointment',
    subtitle: 'Schedule your consultation',
  });
});

// Contact page info
router.get('/contact', (req, res: Response) => {
  sendSuccess(res, {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    phone: '+1-800-000-0000',
    email: 'contact@doctorportal.com',
  });
});

// Feedbacks/Testimonials (note: we have /api/testimonials for actual testimonials)
router.get('/feedbacks', (req, res: Response) => {
  sendSuccess(res, []);
});

// Blogs list
router.get('/blogs', (req, res: Response) => {
  sendSuccess(res, []);
});

export default router;
