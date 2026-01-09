# Deployment Guide

## Railway Deployment

### Step 1: Prepare Repository

Ensure your repository has the following structure:
```
testing-server/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
└── frontend/
```

### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up or log in
3. Create a new project

### Step 3: Add PostgreSQL Service

1. In Railway dashboard, click "Add"
2. Select "PostgreSQL"
3. This creates a Postgres database with `DATABASE_URL` env variable

### Step 4: Deploy Backend

#### Option A: Deploy from GitHub (Recommended)

1. Push code to GitHub
2. In Railway, click "Add"
3. Select "GitHub Repo"
4. Select your repository
5. Select the `backend` root directory in settings
6. Set Root Directory: `backend`

#### Option B: Deploy with CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create new project
railway init

# Set root to backend
railway link

# Deploy
railway up
```

### Step 5: Configure Environment Variables

In Railway dashboard, add the following environment variables:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=<generate-a-strong-random-string>
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=<strong-password>
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SUPPORTED_LANGUAGES=en,az,ru
DEFAULT_LANGUAGE=en
```

**Note:** `DATABASE_URL` will be automatically set by the PostgreSQL plugin.

### Step 6: Run Migrations

After deployment:

1. In Railway, go to the backend service
2. Open the "Deploy" tab
3. Click "View Logs"
4. Once running, you can execute one-off commands

Run migrations manually:
```bash
npx prisma migrate deploy
npx prisma db seed
```

Or add to `Dockerfile` startup command (already configured).

### Step 7: Connect to Frontend

Update your frontend `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-railway-backend.up.railway.app
```

Or update dynamically in the code.

### Step 8: Connect Custom Domain (Optional)

1. In Railway project settings, add custom domain
2. Update DNS records with Railway CNAME
3. SSL certificate auto-generated

## Docker Compose (Local Development)

### Prerequisites

- Docker & Docker Compose installed
- PostgreSQL 15+

### Quick Start

```bash
cd backend
docker-compose up -d
```

This will:
1. Create PostgreSQL container
2. Build backend image
3. Run migrations
4. Seed database
5. Start backend on `http://localhost:5000`

### Stopping Services

```bash
docker-compose down
```

### Viewing Logs

```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Reset Database

```bash
docker-compose down -v
docker-compose up -d
```

## Environment Variables Reference

### Backend (.env)

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `NODE_ENV` | No | `development` | `production` for Railway |
| `PORT` | No | `5000` | Server port |
| `JWT_SECRET` | Yes | - | Min 32 characters, use strong random string |
| `JWT_EXPIRY` | No | `7d` | Token expiration time |
| `ADMIN_EMAIL` | Yes | - | Initial admin email |
| `ADMIN_PASSWORD` | Yes | - | Initial admin password |
| `FRONTEND_URL` | No | `http://localhost:3000` | Frontend domain |
| `ALLOWED_ORIGINS` | No | - | CORS allowed origins (comma-separated) |
| `SUPPORTED_LANGUAGES` | No | `en,az,ru` | Supported languages |
| `DEFAULT_LANGUAGE` | No | `en` | Default language |

### Frontend (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Generate strong `JWT_SECRET` (use `openssl rand -base64 32`)
- [ ] Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- [ ] Configure `FRONTEND_URL` and `ALLOWED_ORIGINS`
- [ ] Set up PostgreSQL with SSL
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Monitor logs and errors
- [ ] Configure email for notifications (optional)
- [ ] Set up rate limiting (future enhancement)
- [ ] Implement request logging

## Database Backup (Railway)

PostgreSQL backups on Railway:

1. Go to PostgreSQL plugin in Railway
2. Click "Data" tab
3. Set backup frequency
4. Download backups as needed

## Monitoring

### Health Check

```bash
curl https://your-app.up.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

### View Logs

In Railway dashboard:
1. Select backend service
2. Click "Logs" tab
3. Stream logs in real-time

## Troubleshooting

### Build Fails

1. Check Docker build: `docker build .`
2. Verify `Dockerfile` path
3. Check Node version compatibility (18+)

### Database Connection Error

1. Verify `DATABASE_URL` format
2. Check PostgreSQL is running
3. Ensure migrations ran successfully

### Admin Panel Not Accessible

1. Verify JWT_SECRET is set
2. Check `FRONTEND_URL` in environment
3. Test login at `/api/auth/login`

### CORS Issues

1. Verify `ALLOWED_ORIGINS` includes frontend URL
2. Check request headers
3. Ensure CORS middleware is before routes

## Rollback

### Railway Rollback

1. Go to backend service in Railway
2. Click "Deployments" tab
3. Select previous deployment
4. Click "Rollback"

### Local Rollback

```bash
git revert <commit-hash>
docker-compose down -v
docker-compose up -d
```

## Performance Optimization

1. **Database Indexing:** Already optimized in schema
2. **Caching:** Can add Redis (future enhancement)
3. **CDN:** Configure for static assets
4. **Pagination:** Default 10 items per page
5. **Image Optimization:** Use CDN for image URLs

## Security Hardening

- JWT token expiration: 7 days
- Password hashing: bcryptjs (10 rounds)
- SQL injection prevention: Prisma ORM
- XSS protection: Express middleware
- CORS configuration: Strict origin checking
- Environment variable protection: .env not in git
- HTTPS enforced in production

## Support & Monitoring

Set up alerts for:
- Service failures
- High error rates
- Database connection issues
- Disk space usage
- Memory usage

## Next Steps

1. Deploy backend to Railway
2. Update frontend .env with backend URL
3. Deploy frontend
4. Run migrations and seed
5. Test API endpoints
6. Monitor logs and performance
