import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { LocalizedRequest, getLanguage } from '../middleware/i18n';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';

const prisma = new PrismaClient();

// Get all doctors with translations
export const getDoctors = async (req: LocalizedRequest, res: Response) => {
  try {
    const language = getLanguage(req);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const doctors = await prisma.doctor.findMany({
      skip,
      take: pageSize,
      include: {
        translations: {
          where: { language },
          select: { field: true, value: true },
        },
      },
    });

    const total = await prisma.doctor.count();

    const formattedDoctors = doctors.map((doctor: any) => ({
      id: doctor.id,
      slug: doctor.slug,
      imageUrl: doctor.imageUrl,
      specialties: doctor.specialties,
      experience: doctor.experience,
      qualifications: doctor.qualifications,
      ...doctor.translations.reduce((acc: any, t: any) => ({ ...acc, [t.field]: t.value }), {}),
    }));

    return sendPaginated(res, formattedDoctors, total, page, pageSize);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Get single doctor by slug
export const getDoctorBySlug = async (req: LocalizedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const language = getLanguage(req);

    const doctor = await prisma.doctor.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
          select: { field: true, value: true },
        },
      },
    });

    if (!doctor) {
      return sendError(res, 404, 'Doctor not found');
    }

    const formattedDoctor = {
      id: doctor.id,
      slug: doctor.slug,
      imageUrl: doctor.imageUrl,
      specialties: doctor.specialties,
      experience: doctor.experience,
      qualifications: doctor.qualifications,
      ...doctor.translations.reduce((acc: any, t: any) => ({ ...acc, [t.field]: t.value }), {}),
    };

    return sendSuccess(res, formattedDoctor);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Create doctor
export const createDoctor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, imageUrl, specialties, experience, qualifications, translations } = req.body;

    const doctor = await prisma.doctor.create({
      data: {
        slug,
        imageUrl,
        specialties: specialties || [],
        experience,
        qualifications: qualifications || [],
        translations: {
          create: translations || [],
        },
      },
      include: { translations: true },
    });

    return sendSuccess(res, doctor, 201);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Update doctor
export const updateDoctor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl, specialties, experience, qualifications, translations } = req.body;

    // Delete existing translations
    if (translations) {
      await prisma.translation.deleteMany({
        where: { doctorId: id },
      });
    }

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        imageUrl,
        specialties,
        experience,
        qualifications,
        ...(translations && {
          translations: {
            create: translations,
          },
        }),
      },
      include: { translations: true },
    });

    return sendSuccess(res, doctor);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Delete doctor
export const deleteDoctor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.doctor.delete({
      where: { id },
    });

    return sendSuccess(res, { message: 'Doctor deleted successfully' });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};
