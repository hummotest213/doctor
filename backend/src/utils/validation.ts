import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.success) {
        break;
      }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
      });
      return;
    }
    next();
  };
};

// Common validators
export const emailValidator = () => body('email').isEmail().normalizeEmail();
export const passwordValidator = () =>
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters');

export const titleValidator = () => body('title').trim().notEmpty().withMessage('Title is required');
export const contentValidator = () =>
  body('content').trim().notEmpty().withMessage('Content is required');

export const languageValidator = () =>
  body('language').isIn(['en', 'az', 'ru']).withMessage('Language must be en, az, or ru');
