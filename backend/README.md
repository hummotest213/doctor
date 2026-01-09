# Doctor's Portal Backend

A production-ready Node.js backend for a multi-language doctor's website with PostgreSQL database, JWT authentication, and a comprehensive Admin Panel.

## Features

- ✅ **Multi-language Support** (English, Azerbaijani, Russian)
- ✅ **JWT Authentication** for Admin Panel
- ✅ **PostgreSQL Database** with Prisma ORM
- ✅ **RESTful API** with CORS support
- ✅ **Role-based Access Control** (Admin, Editor, Viewer)
- ✅ **Docker & Docker Compose** ready
- ✅ **Railway Deployment** compatible
- ✅ **Input Validation** & Security Headers
- ✅ **Comprehensive Error Handling**

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL 15+
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** express-validator
- **Language:** TypeScript

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Business logic
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── scripts/          # Migration scripts
│   ├── utils/            # Helper functions
│   └── server.ts         # Main server file
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## Installation

### Prerequisites

- Node.js 18+ or Docker
- PostgreSQL 15+ (if not using Docker)
- npm or yarn

### Local Setup

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

4. **Update `.env` with your database credentials:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/doctor_portal"
JWT_SECRET="your_super_secret_jwt_key_min_32_characters_long"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="SecurePassword123!"
```

5. **Generate Prisma Client:**
```bash
npm run prisma:generate
```

6. **Run migrations:**
```bash
npm run prisma:migrate
```

7. **Seed initial data:**
```bash
npm run prisma:seed
```

8. **Start development server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Docker Setup

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Using Docker Only

```bash
# Build image
docker build -t doctor-portal-backend .

# Run container
docker run -d \
  -p 5000:5000 \
  -e DATABASE_URL="postgresql://user:password@db:5432/doctor_portal" \
  -e JWT_SECRET="your_secret" \
  doctor-portal-backend
```

## API Endpoints

### Authentication

```
POST   /api/auth/login              # Login (returns JWT token)
GET    /api/auth/me                 # Get current user (requires token)
GET    /api/auth/stats              # Get dashboard stats (admin only)
```

### Doctors (Public)

```
GET    /api/doctors                 # Get all doctors (with pagination)
GET    /api/doctors/:slug           # Get single doctor
```

### Doctors (Admin)

```
POST   /api/doctors                 # Create doctor
PUT    /api/doctors/:id             # Update doctor
DELETE /api/doctors/:id             # Delete doctor
```

### Services (Public)

```
GET    /api/services                # Get all services
GET    /api/services/:slug          # Get single service
```

### Services (Admin)

```
POST   /api/services                # Create service
PUT    /api/services/:id            # Update service
DELETE /api/services/:id            # Delete service
```

### Testimonials (Public)

```
GET    /api/testimonials            # Get all testimonials
```

### Testimonials (Admin)

```
POST   /api/testimonials            # Create testimonial
PUT    /api/testimonials/:id        # Update testimonial
DELETE /api/testimonials/:id        # Delete testimonial
```

### Settings (Admin)

```
GET    /api/settings                # Get all settings
GET    /api/settings/:key           # Get single setting
PUT    /api/settings/:key           # Update setting
DELETE /api/settings/:key           # Delete setting
```

## Multi-Language Support

### Language Query Parameter

The API respects the `language` query parameter (default: `en`):

```bash
GET /api/doctors?language=az
GET /api/doctors?language=ru
```

### Language Header

Alternatively, use the `Accept-Language` header:

```bash
curl -H "Accept-Language: az" http://localhost:5000/api/doctors
```

## Authentication

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "role": "ADMIN"
    }
  }
}
```

### Using Token

Include the token in the `Authorization` header:

```bash
Authorization: Bearer <token>
```

## Database Schema

### Core Tables

- **users** - Admin users with roles
- **doctors** - Doctor profiles
- **services** - Medical services
- **testimonials** - Client testimonials
- **translations** - Multi-language content
- **site_settings** - Global site configuration
- **appointments** - Patient appointments
- **contact_submissions** - Contact form submissions
- **newsletters** - Newsletter subscribers

### Languages Supported

- `en` - English
- `az` - Azerbaijani
- `ru` - Russian

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/doctor_portal

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRY=7d

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!

# CORS
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Languages
SUPPORTED_LANGUAGES=en,az,ru
DEFAULT_LANGUAGE=en
```

## Migration from JSON

To migrate existing JSON data from the frontend:

```bash
npm run migrate:from-json
```

This script will:
1. Read JSON files from `/frontend/messages/`
2. Parse content for each language
3. Create database records with translations
4. Link translations to appropriate entities

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcryptjs)
- ✅ CORS Configuration
- ✅ Security Headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Input Validation
- ✅ SQL Injection Prevention (via Prisma)
- ✅ Rate Limiting Ready
- ✅ Environment Variable Protection

## Railway Deployment

### Prerequisites

- Railway account
- Docker image pushed to registry or connected to GitHub

### Steps

1. **Create `.env` for Railway:**
```env
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
JWT_SECRET=<generate-strong-secret>
NODE_ENV=production
PORT=5000
```

2. **Deploy:**
   - Connect your GitHub repository to Railway
   - Select the backend folder
   - Railway will automatically detect `Dockerfile`
   - Configure environment variables in Railway dashboard
   - Deploy!

3. **Run Migrations:**
   - In Railway console: `npx prisma migrate deploy`
   - Run seed: `npx prisma db seed`

## Troubleshooting

### Database Connection Issues

```bash
# Check DATABASE_URL format
# Format: postgresql://[user]:[password]@[host]:[port]/[database]

# Test connection
npm run prisma:generate
```

### Port Already in Use

```bash
# Change PORT in .env or use:
PORT=5001 npm run dev
```

### Prisma Issues

```bash
# Reset database (warning: deletes data)
npx prisma migrate reset

# Generate client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## API Examples

### Create Doctor

```bash
POST /api/doctors
Authorization: Bearer <token>
Content-Type: application/json

{
  "slug": "dr-john-doe",
  "imageUrl": "https://example.com/doctor.jpg",
  "specialties": ["Cardiology", "General Practice"],
  "experience": 15,
  "qualifications": ["MD", "Board Certified"],
  "translations": [
    {
      "language": "en",
      "field": "name",
      "value": "Dr. John Doe"
    },
    {
      "language": "en",
      "field": "bio",
      "value": "Experienced cardiologist..."
    }
  ]
}
```

### Get All Doctors

```bash
GET /api/doctors?language=en&page=1&pageSize=10

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "dr-john-doe",
      "name": "Dr. John Doe",
      "bio": "Experienced cardiologist..."
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
