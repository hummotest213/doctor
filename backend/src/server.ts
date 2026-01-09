import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config/index';
import { corsMiddleware, securityHeaders } from './middleware/security';
import authRoutes from './routes/auth';
import doctorRoutes from './routes/doctors';
import serviceRoutes from './routes/services';
import testimonialRoutes from './routes/testimonials';
import settingsRoutes from './routes/settings';
import { createAdmin } from './controllers/auth';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(corsMiddleware);
app.use(securityHeaders);

// Initialize database on startup
const initializeDatabase = async () => {
  try {
    // Check if admin user exists
    const adminExists = await prisma.user.findUnique({
      where: { email: config.auth.adminEmail },
    });

    if (!adminExists) {
      console.log('📝 Creating default admin user...');
      await createAdmin(config.auth.adminEmail, config.auth.adminPassword);
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error: any) {
    console.error('❌ Database initialization error:', error.message);
  }
};

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with database initialization
const PORT = config.server.port;
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
      console.log(`Admin email: ${config.auth.adminEmail}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
