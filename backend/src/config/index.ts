import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost/doctor_portal',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_min_32_characters_long',
    expiry: process.env.JWT_EXPIRY || '7d',
  },
  auth: {
    adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
    adminPassword: process.env.ADMIN_PASSWORD || 'SecurePassword123!',
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001').split(','),
  },
  i18n: {
    supportedLanguages: (process.env.SUPPORTED_LANGUAGES || 'en,az,ru').split(',') as Array<'en' | 'az' | 'ru'>,
    defaultLanguage: (process.env.DEFAULT_LANGUAGE || 'en') as 'en' | 'az' | 'ru',
  },
};

export default config;
