import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface TranslationData {
  [key: string]: any;
}

async function migrateFromJson() {
  try {
    console.log('🚀 Starting migration from JSON files to PostgreSQL...\n');

    // Read JSON files from frontend/messages/
    // Since frontend and backend are in different locations, look for messages in the project root
    let messagesDir = path.join(__dirname, '../../frontend/src/messages');
    
    // If not found, try alternative path
    if (!fs.existsSync(messagesDir)) {
      messagesDir = path.join(__dirname, '../../../frontend/src/messages');
    }
    
    if (!fs.existsSync(messagesDir)) {
      console.warn('⚠️  Messages directory not found. Creating sample data instead...');
      console.warn(`📍 Searched in: ${messagesDir}`);
      await createSampleData();
      return;
    }
    
    console.log(`✅ Found messages directory at: ${messagesDir}\n`);

    const languages = ['en', 'az', 'ru'];
    const translationMap: { [language: string]: TranslationData } = {};

    for (const lang of languages) {
      const filePath = path.join(messagesDir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        translationMap[lang] = JSON.parse(content);
        console.log(`✅ Loaded ${lang}.json`);
      }
    }

    // Migrate doctors
    console.log('\n📋 Migrating doctors...');
    const doctorsData = translationMap.en?.doctors || [];
    for (const doctor of doctorsData) {
      const slug = doctor.slug || doctor.name?.toLowerCase().replace(/\s+/g, '-');
      
      const existingDoctor = await prisma.doctor.findUnique({ where: { slug } });
      if (!existingDoctor) {
        const createdDoctor = await prisma.doctor.create({
          data: {
            slug,
            imageUrl: doctor.imageUrl || doctor.image,
            specialties: doctor.specialties || [],
            experience: doctor.experience || 0,
            qualifications: doctor.qualifications || [],
          },
        });

        // Create translations for each language
        for (const lang of languages) {
          const docData = translationMap[lang]?.doctors?.find((d: any) => 
            (d.slug || d.name?.toLowerCase().replace(/\s+/g, '-')) === slug
          ) || doctor;

          const translations = [
            { field: 'name', value: docData.name || doctor.name },
            { field: 'bio', value: docData.bio || '' },
            { field: 'title', value: docData.title || '' },
          ];

          for (const trans of translations) {
            if (trans.value) {
              await prisma.translation.create({
                data: {
                  language: lang as any,
                  field: trans.field,
                  value: trans.value,
                  doctorId: createdDoctor.id,
                },
              });
            }
          }
        }

        console.log(`  ✓ Migrated doctor: ${slug}`);
      }
    }

    // Migrate services
    console.log('\n📋 Migrating services...');
    const servicesData = translationMap.en?.services || [];
    for (const service of servicesData) {
      const slug = service.slug || service.title?.toLowerCase().replace(/\s+/g, '-');
      
      const existingService = await prisma.service.findUnique({ where: { slug } });
      if (!existingService) {
        const createdService = await prisma.service.create({
          data: {
            slug,
            iconUrl: service.iconUrl || service.icon,
            order: service.order || 0,
          },
        });

        for (const lang of languages) {
          const srvData = translationMap[lang]?.services?.find((s: any) =>
            (s.slug || s.title?.toLowerCase().replace(/\s+/g, '-')) === slug
          ) || service;

          const translations = [
            { field: 'title', value: srvData.title || service.title },
            { field: 'description', value: srvData.description || '' },
          ];

          for (const trans of translations) {
            if (trans.value) {
              await prisma.translation.create({
                data: {
                  language: lang as any,
                  field: trans.field,
                  value: trans.value,
                  serviceId: createdService.id,
                },
              });
            }
          }
        }

        console.log(`  ✓ Migrated service: ${slug}`);
      }
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function createSampleData() {
  try {
    console.log('Creating sample data...\n');

    // Sample doctors
    const doctors = [
      { name: 'Dr. Sarah Johnson', slug: 'dr-sarah-johnson' },
      { name: 'Dr. Michael Chen', slug: 'dr-michael-chen' },
      { name: 'Dr. Elena Rodriguez', slug: 'dr-elena-rodriguez' },
    ];

    for (const doctor of doctors) {
      const existingDoctor = await prisma.doctor.findUnique({ where: { slug: doctor.slug } });
      if (!existingDoctor) {
        const createdDoctor = await prisma.doctor.create({
          data: {
            slug: doctor.slug,
            specialties: ['General Practice'],
            experience: 10,
          },
        });

        // Create translations
        const langs = ['en', 'az', 'ru'];
        for (const lang of langs) {
          await prisma.translation.create({
            data: {
              language: lang as any,
              field: 'name',
              value: doctor.name,
              doctorId: createdDoctor.id,
            },
          });
        }
        console.log(`✓ Created doctor: ${doctor.name}`);
      }
    }

    // Sample services
    const services = [
      { title: 'General Checkup', slug: 'general-checkup' },
      { title: 'Dental Care', slug: 'dental-care' },
      { title: 'Surgery', slug: 'surgery' },
    ];

    for (const service of services) {
      const existingService = await prisma.service.findUnique({ where: { slug: service.slug } });
      if (!existingService) {
        const createdService = await prisma.service.create({
          data: {
            slug: service.slug,
          },
        });

        const langs = ['en', 'az', 'ru'];
        for (const lang of langs) {
          await prisma.translation.create({
            data: {
              language: lang as any,
              field: 'title',
              value: service.title,
              serviceId: createdService.id,
            },
          });
        }
        console.log(`✓ Created service: ${service.title}`);
      }
    }

    console.log('\n✅ Sample data created successfully!');
  } catch (error: any) {
    console.error('❌ Error creating sample data:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateFromJson();
