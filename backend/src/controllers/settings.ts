import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

const prisma = new PrismaClient();

// Get all site settings
export const getSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const settings = await prisma.siteSettings.findMany();

    const formatted = settings.reduce(
      (acc: any, setting: any) => ({
        ...acc,
        [setting.key]: setting.value,
      }),
      {}
    );

    return sendSuccess(res, formatted);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Get single setting
export const getSetting = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;

    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    });

    if (!setting) {
      return sendError(res, 404, 'Setting not found');
    }

    return sendSuccess(res, { [setting.key]: setting.value });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Update setting
export const updateSetting = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });

    return sendSuccess(res, setting);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Delete setting
export const deleteSetting = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;

    await prisma.siteSettings.delete({
      where: { key },
    });

    return sendSuccess(res, { message: 'Setting deleted successfully' });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};
