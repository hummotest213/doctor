# 🚀 Deployment Checklist - Railway & Vercel

## ✅ Backend (Railway) - Deployment Ready

### Pre-Deployment Setup
- [x] `package.json` configured with build/start scripts
- [x] `Dockerfile` created with multi-stage build
- [x] `docker-compose.yml` created for local testing
- [x] `.env` file created with config template
- [x] Prisma schema configured
- [x] All API routes implemented

### What You Need to Do Before Deploy

1. **Update Backend `.env` - CRITICAL**
   ```bash
   cd backend
   # Edit .env and set these for Railway:
   
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@your-railway-db:5432/doctor_portal"
   NODE_ENV=production
   JWT_SECRET=change-this-to-very-long-random-string-min-32-chars
   FRONTEND_URL=https://your-vercel-frontend.vercel.app
   ALLOWED_ORIGINS=https://your-vercel-frontend.vercel.app
   ```

2. **Test Locally First**
   ```bash
   cd backend
   npm install
   npm run build
   npm run prisma:deploy  # Apply migrations
   npm run prisma:seed    # Add initial data
   npm start
   ```
   
   Should see: `Server running on http://localhost:5000`

3. **Deploy to Railway**
   - Go to https://railway.app
   - Create new project
   - Connect GitHub repository (testing-server)
   - Railway will detect `Dockerfile`
   - Configure environment variables from `.env`
   - Click Deploy
   - Copy the Railway URL (e.g., `https://backend-production-abc123.up.railway.app`)

4. **Verify Backend is Running**
   ```bash
   curl https://YOUR-RAILWAY-URL/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

---

## ✅ Frontend (Vercel) - Deployment Ready

### Pre-Deployment Setup
- [x] `package.json` configured with build/start scripts
- [x] Next.js config ready
- [x] `backendApi.ts` created with API client
- [x] Admin dashboard components ready
- [x] `axios` added as dependency

### What You Need to Do Before Deploy

1. **Update Frontend `.env.production`**
   ```bash
   cd frontend
   # Create/update .env.production:
   
   NEXT_PUBLIC_BACKEND_URL=https://YOUR-RAILWAY-BACKEND-URL.up.railway.app
   ```

2. **Test Locally First**
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```
   
   Should see: `ready - started server on 0.0.0.0:3000`

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository (testing-server)
   - Framework preset: Next.js (auto-detected)
   - Root directory: `frontend`
   - Environment variables:
     ```
     NEXT_PUBLIC_BACKEND_URL = https://YOUR-RAILWAY-BACKEND-URL.up.railway.app
     ```
   - Click Deploy

4. **Verify Frontend is Running**
   - Your app will be at: `https://your-project.vercel.app`
   - Check that backend requests work:
     - Visit `/admin-dashboard`
     - Try logging in with admin@example.com / SecurePassword123!

---

## 📋 Complete Deployment Workflow

### Step 1: Prepare Backend (10 minutes)
```bash
cd backend

# Create .env with correct values
cp .env.example .env
# ← EDIT .env and set DATABASE_URL, JWT_SECRET, etc.

# Test locally
npm install
npm run build
npm run prisma:deploy
npm run prisma:seed
npm start

# Verify
curl http://localhost:5000/health
```

### Step 2: Deploy Backend to Railway (5 minutes)
1. Create Railway account: https://railway.app
2. Link GitHub and authorize access
3. Create new project
4. Add services → GitHub repo
5. Railway detects Dockerfile automatically
6. Set environment variables in Railway dashboard:
   - DATABASE_URL (Railway PostgreSQL)
   - JWT_SECRET (generate random)
   - FRONTEND_URL (your Vercel domain)
   - ALLOWED_ORIGINS (your Vercel domain)
7. Click Deploy
8. Get Railway URL from domain settings

### Step 3: Prepare Frontend (10 minutes)
```bash
cd frontend

# Add axios
npm install axios

# Create production env
echo 'NEXT_PUBLIC_BACKEND_URL=https://YOUR-RAILWAY-URL.up.railway.app' > .env.production

# Test locally
npm install
npm run build
npm start

# Verify on http://localhost:3000
# Check /admin-dashboard works
```

### Step 4: Deploy Frontend to Vercel (5 minutes)
1. Create Vercel account: https://vercel.com
2. Import project from GitHub
3. Select `frontend` as root directory
4. Add environment variables:
   - NEXT_PUBLIC_BACKEND_URL = (your Railway URL)
5. Click Deploy
6. Vercel auto-deploys on GitHub push

### Step 5: Verify Both Are Connected
1. Visit your Vercel frontend: `https://your-project.vercel.app`
2. Go to `/admin-dashboard`
3. Login with: `admin@example.com` / `SecurePassword123!`
4. Try creating a doctor (should save to Railway database)
5. Refresh page (should fetch from backend)

---

## 🔐 Security Checklist Before Production

- [ ] Change `JWT_SECRET` to a random 32+ character string
- [ ] Change `ADMIN_PASSWORD` in Prisma seed
- [ ] Set `NODE_ENV=production` in Railway
- [ ] Enable HTTPS (automatic on Railway & Vercel)
- [ ] Configure `ALLOWED_ORIGINS` to only include your Vercel domain
- [ ] Use strong database password in DATABASE_URL
- [ ] Enable Railway PostgreSQL backup
- [ ] Set up monitoring/alerts on Railway
- [ ] Review CORS configuration in backend/src/middleware/security.ts

---

## 🐛 Common Issues & Solutions

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** PostgreSQL not running. On Railway, it auto-creates. Locally, run `docker-compose up -d`

### Frontend can't reach backend
```
Error: Network request failed
```
**Solution:** 
1. Check NEXT_PUBLIC_BACKEND_URL is set correctly
2. Check ALLOWED_ORIGINS includes your Vercel domain
3. Check backend CORS middleware allows frontend URL

### Database migration fails
```
Error: No queryable schema in datasource
```
**Solution:** Run `npm run prisma:deploy` then `npm run prisma:seed`

### Login always fails
```
Error: Invalid credentials
```
**Solution:** 
1. Check admin user exists: `npm run prisma:seed`
2. Check email matches in seed.ts
3. Check password hash is correct

---

## 📊 Environment Variables Summary

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db_name
PORT=5000
NODE_ENV=production
JWT_SECRET=<change-me-32+ chars>
JWT_EXPIRY=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!
FRONTEND_URL=https://your-vercel-domain.vercel.app
ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
```

### Frontend (.env.production)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-railway-backend-url.up.railway.app
```

---

## ✅ Final Verification

After deployment, test these endpoints:

```bash
# Health check
curl https://YOUR-RAILWAY-BACKEND/health

# Get doctors (no auth needed)
curl https://YOUR-RAILWAY-BACKEND/api/doctors?language=en

# Login (should return token)
curl -X POST https://YOUR-RAILWAY-BACKEND/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"SecurePassword123!"}'

# Create doctor (with token)
curl -X POST https://YOUR-RAILWAY-BACKEND/api/doctors \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## 🎯 Summary

| Component | Status | Platform | Deploy Time |
|-----------|--------|----------|-------------|
| Backend | ✅ Ready | Railway | 5 min |
| Frontend | ✅ Ready | Vercel | 5 min |
| Database | ✅ Ready | Railway PostgreSQL | Auto |
| Total Setup | ✅ Complete | - | ~30 min |

**You're ready to deploy! Start with backend, then frontend.** 🚀
