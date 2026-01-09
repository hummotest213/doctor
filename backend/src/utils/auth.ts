import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { userId, email, role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry as unknown as jwt.SignOptions['expiresIn'] }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwt.secret);
};
