import { Request, Response, NextFunction } from 'express';
import config from '../config/index';

export interface LocalizedRequest extends Request {
  language?: 'en' | 'az' | 'ru';
}

export const i18nMiddleware = (req: LocalizedRequest, res: Response, next: NextFunction) => {
  // Get language from query param, header, or use default
  const language = (
    req.query.language ||
    req.headers['accept-language']?.split(',')[0]?.split('-')[0] ||
    config.i18n.defaultLanguage
  ) as 'en' | 'az' | 'ru';

  // Validate language is supported
  if (!config.i18n.supportedLanguages.includes(language)) {
    req.language = config.i18n.defaultLanguage;
  } else {
    req.language = language;
  }

  // Add language to response header
  res.set('Content-Language', req.language);
  next();
};

export const getLanguage = (req: LocalizedRequest): 'en' | 'az' | 'ru' => {
  return req.language || config.i18n.defaultLanguage;
};
