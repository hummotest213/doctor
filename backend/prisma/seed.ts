import { PrismaClient } from '@prisma/client';
import { createAdmin } from '../src/controllers/auth';
import config from '../src/config/index';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create default admin user
    const existingAdmin = await prisma.user.findUnique({
      where: { email: config.auth.adminEmail },
    });

    if (!existingAdmin) {
      const admin = await createAdmin(config.auth.adminEmail, config.auth.adminPassword);
      console.log(`✅ Admin user created: ${admin.email}`);
    } else {
      console.log(`ℹ️  Admin user already exists: ${existingAdmin.email}`);
    }

    // Create sample site settings
    const settingsToCreate = [
      {
        key: 'site_name',
        value: 'Doctor Portal',
        description: 'Website name',
      },
      {
        key: 'site_description',
        value: 'Professional medical website',
        description: 'SEO description',
      },
      {
        key: 'contact_email',
        value: 'contact@doctorportal.com',
        description: 'Contact form email',
      },
      {
        key: 'contact_phone',
        value: '+1-800-000-0000',
        description: 'Contact phone number',
      },
    ];

    for (const setting of settingsToCreate) {
      await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      });
    }

    console.log('✅ Site settings created');

    console.log('✅ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
