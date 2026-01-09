import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  email?: string;
  role?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      res.status(401).json({ error: 'No authentication token provided' });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as any;
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.role !== 'ADMIN') {
    res.status(403).json({ error: 'Admin privileges required' });
    return;
  }
  next()
};
