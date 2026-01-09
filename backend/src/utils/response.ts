import { Response } from 'express';

export const sendError = (res: Response, statusCode: number, message: string, errors?: any) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(errors && { details: errors }),
  });
};

export const sendSuccess = (res: Response, data?: any, statusCode: number = 200) => {
  return res.status(statusCode).json({
    success: true,
    data: data || null,
  });
};

export const sendPaginated = (
  res: Response,
  data: any[],
  total: number,
  page: number,
  pageSize: number,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
};
