# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 15+ (or Docker)
- Git

---

## Option 1: Local Development (with Docker)

### 1. Clone the Repository

```bash
cd testing-server/backend
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://docker:password@postgres:5432/doctor_portal"
JWT_SECRET="your_super_secret_jwt_key_generate_a_strong_one"
```

### 3. Start with Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL database
- Node.js backend server
- Runs migrations automatically
- Seeds sample data

### 4. Verify Backend is Running

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

### 5. Login to Admin Panel

Open browser: `http://localhost:3000/admin-dashboard`

Default credentials:
```
Email: admin@example.com
Password: SecurePassword123!
```

---

## Option 2: Local Development (No Docker)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL

```bash
# Create database
createdb doctor_portal

# Update .env
DATABASE_URL="postgresql://localhost/doctor_portal"
JWT_SECRET="your_strong_secret_key"
```

### 3. Run Migrations

```bash
npm run prisma:migrate
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

## Option 3: Production Deployment (Railway)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Railway Project

- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "GitHub Repo" or upload code
- Select repository and `backend` folder

### 3. Add PostgreSQL

- Click "Add"
- Select "PostgreSQL"
- Railway auto-generates `DATABASE_URL`

### 4. Set Environment Variables

In Railway dashboard, add:
```
NODE_ENV=production
JWT_SECRET=<generate-strong-secret>
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=<strong-password>
FRONTEND_URL=https://yourdomain.com
```

### 5. Deploy

- Click "Deploy"
- Railway auto-detects `Dockerfile`
- Deployment starts automatically
- Get your URL: `https://your-app.up.railway.app`

---

## 📝 Common Tasks

### Add a New Doctor

**Via Admin Panel:**
1. Go to `/admin-dashboard`
2. Navigate to "Doctors"
3. Click "+ Add Doctor"
4. Fill form for all 3 languages
5. Click "Create Doctor"

**Via API:**
```bash
curl -X POST http://localhost:5000/api/doctors \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "dr-new",
    "imageUrl": "https://example.com/doctor.jpg",
    "specialties": ["Surgery"],
    "experience": 5,
    "translations": [
      {"language": "en", "field": "name", "value": "Dr. New"},
      {"language": "en", "field": "bio", "value": "..."},
      {"language": "az", "field": "name", "value": "Dr. New"},
      {"language": "az", "field": "bio", "value": "..."}
    ]
  }'
```

### Fetch Data in Frontend

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Get all doctors
const { data } = await api.get('/doctors?language=en&page=1&pageSize=10');
console.log(data.data); // Array of doctors

// Get single doctor
const { data } = await api.get('/doctors/dr-john-doe?language=en');
console.log(data.data); // Doctor object

// Get services
const { data } = await api.get('/services?language=en');

// Get testimonials
const { data } = await api.get('/testimonials?language=en');
```

### Update Site Settings

```bash
curl -X PUT http://localhost:5000/api/settings/site_name \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"value": "My Medical Center"}'
```

### Manage Languages

The system supports:
- **en** - English
- **az** - Azerbaijani
- **ru** - Russian

Switch language in admin panel or use query parameter:
```bash
# Get doctors in Azerbaijani
curl http://localhost:5000/api/doctors?language=az

# Get doctors in Russian
curl http://localhost:5000/api/doctors?language=ru
```

---

## 🔧 Troubleshooting

### Port 5000 Already in Use

```bash
# Change port
PORT=5001 npm run dev

# Or kill process
lsof -ti:5000 | xargs kill -9
```

### Database Connection Failed

```bash
# Check .env DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL

# For Docker
docker-compose logs postgres
```

### Migrations Error

```bash
# Reset database (deletes data!)
npm run prisma:migrate reset

# Or manually
npx prisma migrate deploy
```

### Admin Login Failed

```bash
# Check admin user exists
psql $DATABASE_URL -c "SELECT * FROM \"user\";"

# Reseed database
npm run prisma:seed
```

### CORS Error

Check `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Next Steps

1. **Read Full Documentation:**
   - [Backend README](./backend/README.md)
   - [API Documentation](./API_DOCUMENTATION.md)
   - [Deployment Guide](./DEPLOYMENT_GUIDE.md)

2. **Customize Admin Panel:**
   - Edit [AdminDashboard.tsx](./frontend/src/components/AdminDashboard/AdminDashboard.tsx)
   - Update [styles](./frontend/src/components/AdminDashboard/AdminDashboard.module.css)

3. **Integrate in Frontend:**
   - Update `.env.local` with backend URL
   - Use API client in your components
   - Follow examples in [AdminDashboard.tsx](./frontend/src/components/AdminDashboard/AdminDashboard.tsx)

4. **Deploy to Production:**
   - Follow [Deployment Guide](./DEPLOYMENT_GUIDE.md)
   - Use Railway or Docker
   - Configure custom domain

---

## 🎯 Key Features Ready to Use

✅ **Multi-language Backend** - Support for 3 languages  
✅ **JWT Authentication** - Secure admin access  
✅ **CRUD Operations** - Manage doctors, services, testimonials  
✅ **Admin Dashboard** - Clean, professional interface  
✅ **REST API** - Well-documented endpoints  
✅ **Docker Ready** - Easy deployment  
✅ **PostgreSQL** - Scalable database  
✅ **Production Optimized** - Security & performance  

---

## 💡 Pro Tips

1. **Generate strong JWT secret:**
   ```bash
   openssl rand -base64 32
   ```

2. **View database in Prisma Studio:**
   ```bash
   npx prisma studio
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f backend
   ```

4. **Access database directly:**
   ```bash
   psql $DATABASE_URL
   ```

5. **Monitor API health:**
   ```bash
   watch -n 1 'curl -s http://localhost:5000/health'
   ```

---

## 📞 Support

- Backend issues: Check logs and `.env`
- Database issues: Check PostgreSQL connection
- API issues: Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Deployment issues: Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## ✨ You're Ready!

Your backend is now running. Start integrating with your frontend and enjoy your production-ready system!

Happy coding! 🎉
