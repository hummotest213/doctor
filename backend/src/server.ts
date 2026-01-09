import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import config from './config/index';
import { corsMiddleware, securityHeaders } from './middleware/security';
import authRoutes from './routes/auth';
import doctorRoutes from './routes/doctors';
import serviceRoutes from './routes/services';
import testimonialRoutes from './routes/testimonials';
import settingsRoutes from './routes/settings';
import contentRoutes from './routes/content';
import { createAdmin } from './controllers/auth';

const app = express();
const prisma = new PrismaClient();

// Run migrations at startup
const runMigrations = async () => {
  try {
    console.log('🔄 Running Prisma migrations...');
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log('✅ Migrations completed');
  } catch (error: any) {
    console.warn('⚠️  Migration warning (may be expected):', error.message);
    // Don't fail - migrations might already be applied
  }
};

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(corsMiddleware);
app.use(securityHeaders);

// Initialize database on startup
const initializeDatabase = async () => {
  try {
    console.log('🔍 Checking database connection...');
    
    // Try to count users to verify connection
    const userCount = await prisma.user.count();
    console.log(`✅ Database connected. Users: ${userCount}`);

    // Check if admin user exists
    const adminExists = await prisma.user.findUnique({
      where: { email: config.auth.adminEmail },
    });

    if (!adminExists) {
      console.log('📝 Creating default admin user...');
      await createAdmin(config.auth.adminEmail, config.auth.adminPassword);
      console.log(`✅ Admin user created: ${config.auth.adminEmail}`);
    } else {
      console.log(`✅ Admin user already exists: ${config.auth.adminEmail}`);
    }
  } catch (error: any) {
    console.error('❌ Database initialization error:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database status check
app.get('/api/status', async (req: Request, res: Response) => {
  try {
    // Try to count users to verify database connection
    const userCount = await prisma.user.count();
    return res.status(200).json({
      status: 'ok',
      database: 'connected',
      adminUserExists: userCount > 0,
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Database status check failed:', error);
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api', contentRoutes);

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
    // Run migrations first
    await runMigrations();

    // Then initialize database (create admin user if needed)
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📧 Admin email: ${config.auth.adminEmail}`);
      console.log(`🗄️  Database: ${config.database.url.split('@')[1] || 'local'}`);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
