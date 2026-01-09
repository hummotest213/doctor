# Backend Setup Instructions

## Initial Setup

### 1. Copy Frontend Messages to Backend

Since frontend and backend are in separate locations, you need to copy the translation JSON files to the backend:

```bash
# From project root
cp -r frontend/src/messages backend/messages
```

Or on Windows:
```powershell
# From project root
Copy-Item -Path "frontend\src\messages" -Destination "backend\messages" -Recurse -Force
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Setup PostgreSQL

**Option A: Docker Compose (Recommended)**
```bash
docker-compose up -d
```

**Option B: Local PostgreSQL**
```bash
createdb doctor_portal
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/doctor_portal"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=generate_a_strong_random_string_here
JWT_EXPIRY=7d

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!

# Frontend Integration
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Languages
SUPPORTED_LANGUAGES=en,az,ru
DEFAULT_LANGUAGE=en
```

### 5. Generate Prisma Client & Run Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 6. Migrate Data from JSON to Database

```bash
npm run migrate:from-json
```

This command will:
- Read JSON files from `backend/messages/`
- Create database records for doctors, services, etc.
- Set up multi-language translations
- Seed sample data if JSON files are found

### 7. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## Project Structure After Setup

```
testing-server/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, i18n, security
│   │   ├── config/          # Configuration
│   │   ├── utils/           # Helpers
│   │   ├── scripts/         # Utilities (migration)
│   │   └── server.ts        # Main server
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Initial data
│   ├── messages/            # JSON translations (copied from frontend)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env                 # Your environment variables
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── admin-dashboard/
    │   │   └── admin-portal/
    │   ├── components/
    │   │   ├── admin/           # Admin section components
    │   │   │   └── DoctorsManager.tsx
    │   │   └── AdminDashboard/
    │   └── messages/            # Original translations
    └── .env.local
```

---

## Verify Installation

### 1. Check Backend Health

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

### 2. Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

### 3. View Database with Prisma Studio

```bash
npx prisma studio
```

Opens visual database editor at `http://localhost:5555`

---

## Frontend Integration

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
EOF
```

### 3. Start Frontend Dev Server

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Access Admin Panel

### Option 1: Existing Admin Portal
```
URL: http://localhost:3000/admin-portal
Protected by ProtectedRoute
Uses existing AdminPortal component
```

### Option 2: New Admin Dashboard
```
URL: http://localhost:3000/admin-dashboard
Clean, modern interface
All CRUD operations for content
```

**Default Credentials:**
```
Email: admin@example.com
Password: SecurePassword123!
```

---

## Common Commands

### Development
```bash
# Backend
cd backend
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Frontend
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
```

### Database
```bash
# Backend
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed initial data
npm run migrate:from-json # Import from JSON files

# Prisma Studio
npx prisma studio       # Open visual editor
```

### Docker
```bash
# From backend directory
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
docker-compose down -v   # Stop and remove volumes (resets DB)
```

---

## Testing API Endpoints

### Get Doctors (Public)
```bash
curl "http://localhost:5000/api/doctors?language=en&page=1&pageSize=10"
```

### Create Doctor (Admin)
```bash
# First login to get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"SecurePassword123!"}' \
  | jq -r '.data.token')

# Then create doctor
curl -X POST http://localhost:5000/api/doctors \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "dr-test",
    "name": "Dr. Test",
    "imageUrl": "https://example.com/image.jpg",
    "specialties": ["Surgery"],
    "experience": 10,
    "qualifications": ["MD"],
    "translations": [
      {"language": "en", "field": "name", "value": "Dr. Test"},
      {"language": "en", "field": "bio", "value": "Test bio"}
    ]
  }'
```

---

## Troubleshooting

### Docker Issues

```bash
# View logs
docker-compose logs postgres
docker-compose logs backend

# Reset everything
docker-compose down -v
docker-compose up -d

# Check containers
docker ps
```

### Database Issues

```bash
# Check connection
psql $DATABASE_URL

# Reset migrations
npm run prisma:migrate reset

# Clear and reseed
docker-compose down -v
docker-compose up -d
npm run prisma:seed
```

### Port Conflicts

```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

## Next Steps

1. ✅ Backend setup complete
2. ✅ Database configured
3. ✅ Data migrated from JSON
4. 📝 Integrate admin panel in frontend
5. 🚀 Deploy to Railway
6. 🔒 Configure security & CORS

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for detailed endpoint documentation.
