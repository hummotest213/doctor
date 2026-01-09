import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/auth';
import { LocalizedRequest, getLanguage } from '../middleware/i18n';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';

const prisma = new PrismaClient();

// Get all services
export const getServices = async (req: LocalizedRequest, res: Response) => {
  try {
    const language = getLanguage(req);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const services = await prisma.service.findMany({
      skip,
      take: pageSize,
      orderBy: { order: 'asc' },
      include: {
        translations: {
          where: { language },
          select: { field: true, value: true },
        },
      },
    });

    const total = await prisma.service.count();

    const formattedServices = services.map((service: any) => ({
      id: service.id,
      slug: service.slug,
      iconUrl: service.iconUrl,
      order: service.order,
      ...service.translations.reduce((acc: any, t: any) => ({ ...acc, [t.field]: t.value }), {}),
    }));

    return sendPaginated(res, formattedServices, total, page, pageSize);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Get single service by slug
export const getServiceBySlug = async (req: LocalizedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const language = getLanguage(req);

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
          select: { field: true, value: true },
        },
      },
    });

    if (!service) {
      return sendError(res, 404, 'Service not found');
    }

    const formattedService = {
      id: service.id,
      slug: service.slug,
      iconUrl: service.iconUrl,
      order: service.order,
      ...service.translations.reduce((acc: any, t: any) => ({ ...acc, [t.field]: t.value }), {}),
    };

    return sendSuccess(res, formattedService);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Create service
export const createService = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, iconUrl, order, translations } = req.body;

    const service = await prisma.service.create({
      data: {
        slug,
        iconUrl,
        order,
        translations: {
          create: translations || [],
        },
      },
      include: { translations: true },
    });

    return sendSuccess(res, service, 201);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Update service
export const updateService = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { iconUrl, order, translations } = req.body;

    if (translations) {
      await prisma.translation.deleteMany({
        where: { serviceId: id },
      });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        iconUrl,
        order,
        ...(translations && {
          translations: {
            create: translations,
          },
        }),
      },
      include: { translations: true },
    });

    return sendSuccess(res, service);
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};

// Admin: Delete service
export const deleteService = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id },
    });

    return sendSuccess(res, { message: 'Service deleted successfully' });
  } catch (error: any) {
    return sendError(res, 500, error.message);
  }
};
