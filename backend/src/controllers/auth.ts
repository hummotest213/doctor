import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { LocalizedRequest, getLanguage } from '../middleware/i18n';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { hashPassword, generateToken, comparePasswords } from '../utils/auth';

const prisma = new PrismaClient();

export const login = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log(`🔐 Login attempt for: ${email}`);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return sendError(res, 401, 'Invalid email or password');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      console.log(`❌ Invalid password for user: ${email}`);
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user.id, user.email, user.role);
    console.log(`✅ Login successful for: ${email}`);
    return sendSuccess(res, { token, user: { id: user.id, email: user.email, role: user.role } }, 200);
  } catch (error: any) {
    console.error('❌ Login error:', error);
    return sendError(res, 500, `Login failed: ${error.message}`);
  }
};

export const createAdmin = async (email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password);
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    return admin;
  } catch (error: any) {
    console.error('Error creating admin:', error.message);
    throw error;
  }
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, user);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

export const getStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [doctorsCount, servicesCount, appointmentsCount, testimonialCount] = await Promise.all([
      prisma.doctor.count(),
      prisma.service.count(),
      prisma.appointment.count(),
      prisma.testimonial.count(),
    ]);

    return sendSuccess(res, {
      doctors: doctorsCount,
      services: servicesCount,
      appointments: appointmentsCount,
      testimonials: testimonialCount,
    });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};
