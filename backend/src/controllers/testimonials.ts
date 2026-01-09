import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { LocalizedRequest, getLanguage } from '../middleware/i18n';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';

const prisma = new PrismaClient();

// Get all testimonials
export const getTestimonials = async (req: LocalizedRequest, res: Response) => {
  try {
    const language = getLanguage(req);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const testimonials = await prisma.testimonial.findMany({
      skip,
      take: pageSize,
      include: {
        translations: {
          where: { language },
          select: { field: true, value: true },
        },
      },
    });

    const total = await prisma.testimonial.count();

    const formattedTestimonials = testimonials.map((testimonial: any) => ({
      id: testimonial.id,
      authorName: testimonial.authorName,
      authorImage: testimonial.authorImage,
      authorRole: testimonial.authorRole,
      rating: testimonial.rating,
      ...testimonial.translations.reduce((acc: any, t: any) => ({ ...acc, [t.field]: t.value }), {}),
    }));

    return sendPaginated(res, formattedTestimonials, total, page, pageSize);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Create testimonial
export const createTestimonial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { authorName, authorImage, authorRole, rating, translations } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName,
        authorImage,
        authorRole,
        rating,
        translations: {
          create: translations || [],
        },
      },
      include: { translations: true },
    });

    return sendSuccess(res, testimonial, 201);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Update testimonial
export const updateTestimonial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { authorName, authorImage, authorRole, rating, translations } = req.body;

    if (translations) {
      await prisma.translation.deleteMany({
        where: { testimonialId: id },
      });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        authorName,
        authorImage,
        authorRole,
        rating,
        ...(translations && {
          translations: {
            create: translations,
          },
        }),
      },
      include: { translations: true },
    });

    return sendSuccess(res, testimonial);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Delete testimonial
export const deleteTestimonial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id },
    });

    return sendSuccess(res, { message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};
