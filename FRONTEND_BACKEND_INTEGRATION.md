# Frontend-Backend Integration Guide

## Overview

Your project has separate frontend and backend repositories. This guide shows how to properly connect them while maintaining clean separation of concerns.

```
📁 testing-server/
├── 📁 frontend/          (Next.js React app)
│   ├── src/messages/    ← Translation JSON files
│   ├── src/lib/backendApi.ts  ← API integration layer
│   ├── src/components/admin/  ← Admin components
│   └── .env.local       ← Points to backend
│
└── 📁 backend/          (Node.js Express server)
    ├── src/            ← API implementation
    ├── messages/       ← Copy of frontend translations
    ├── prisma/         ← Database schema
    └── .env            ← Server config
```

---

## Part 1: Backend Setup

### Step 1: Copy Frontend Messages to Backend

The backend needs the translation files to migrate them to the database.

**On Windows (PowerShell):**
```powershell
Copy-Item -Path "frontend\src\messages" -Destination "backend\messages" -Recurse -Force
```

**On Mac/Linux (Bash):**
```bash
cp -r frontend/src/messages backend/messages
```

**Or run the setup script:**
```bash
# Windows
.\setup-backend.bat

# Mac/Linux
bash setup-backend.sh
```

### Step 2: Install & Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/doctor_portal"
JWT_SECRET="your_strong_random_string"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="SecurePassword123!"
FRONTEND_URL="http://localhost:3000"
ALLOWED_ORIGINS="http://localhost:3000"
```

### Step 3: Setup Database

**With Docker Compose:**
```bash
docker-compose up -d
# Automatically runs migrations and seeds
```

**Without Docker:**
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run migrate:from-json
```

### Step 4: Start Backend

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

---

## Part 2: Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Backend URL

Create `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

This allows frontend to communicate with backend.

### Step 3: Start Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Part 3: Using the Backend in Frontend

### API Integration Layer

Use the provided `backendApi.ts` library:

```typescript
// src/lib/backendApi.ts
import {
  loginAdmin,
  fetchDoctors,
  fetchServices,
  fetchTestimonials,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '@/lib/backendApi';
```

### Example 1: Load Doctors

```typescript
'use client';

import { DoctorsList } from '@/lib/backendApi';

export default function DoctorsPage() {
  return <DoctorsList language="en" />;
}
```

### Example 2: Admin Authentication

```typescript
import { loginAdmin, getStoredToken, logoutAdmin } from '@/lib/backendApi';

const handleLogin = async (email: string, password: string) => {
  const token = await loginAdmin(email, password);
  // Redirect to admin panel
};

const handleLogout = () => {
  logoutAdmin();
};
```

### Example 3: Admin CRUD Operations

```typescript
'use client';

import { useState } from 'react';
import { 
  createDoctor, 
  updateDoctor, 
  deleteDoctor,
  getStoredToken 
} from '@/lib/backendApi';

export const AdminDoctors = () => {
  const token = getStoredToken();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (doctorData) => {
    try {
      setLoading(true);
      await createDoctor(doctorData, token!);
      // Refresh list, show success message
    } catch (error) {
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, doctorData) => {
    await updateDoctor(id, doctorData, token!);
  };

  const handleDelete = async (id: string) => {
    await deleteDoctor(id, token!);
  };

  return (
    // Your form here
  );
};
```

---

## Part 4: Multi-Language Support

The system supports 3 languages: **en**, **az**, **ru**

### Frontend Display

```typescript
import { fetchDoctors } from '@/lib/backendApi';

const [doctors, setDoctors] = useState([]);
const [language, setLanguage] = useState<'en' | 'az' | 'ru'>('en');

useEffect(() => {
  fetchDoctors(language).then(({ doctors }) => {
    setDoctors(doctors);
  });
}, [language]); // Reload when language changes

return (
  <>
    <select onChange={(e) => setLanguage(e.target.value as any)}>
      <option value="en">English</option>
      <option value="az">Azərbaycanca</option>
      <option value="ru">Русский</option>
    </select>
    
    {doctors.map(doctor => (
      <div key={doctor.id}>
        <h3>{doctor.name}</h3>
        <p>{doctor.bio}</p>
      </div>
    ))}
  </>
);
```

### Admin Panel Language Selection

The admin panel allows editing content in all 3 languages:

```typescript
const [language, setLanguage] = useState<'en' | 'az' | 'ru'>('en');

// When admin saves, backend stores translations for current language
const handleSave = async (data) => {
  const translations = [
    { language, field: 'name', value: data.name },
    { language, field: 'bio', value: data.bio },
  ];
  
  await createDoctor({ ...data, translations }, token);
};
```

---

## Part 5: Data Flow Architecture

### Public Content Display

```
User Browser
    ↓
Frontend (React)
    ↓
API Request: GET /api/doctors?language=en
    ↓
Backend (Express)
    ↓
Database Query (Prisma)
    ↓
Return translations for 'en'
    ↓
Frontend renders doctors
```

### Admin Content Management

```
Admin User
    ↓
Login: POST /api/auth/login
    ↓
Get JWT Token (stored in localStorage)
    ↓
Admin Form Submit
    ↓
API Request: POST /api/doctors
    Header: Authorization: Bearer <token>
    ↓
Backend validates token (middleware)
    ↓
Verify Admin role
    ↓
Create doctor + translations in DB
    ↓
Success response
    ↓
Refresh doctor list
```

---

## Part 6: Connecting Existing Admin Portal

You already have an admin portal. To integrate the backend:

### Update Admin Section Components

Example: Adding backend support to `AboutSection.tsx`

**Before (Static JSON):**
```typescript
const aboutData = staticData; // from JSON file
```

**After (Dynamic Backend):**
```typescript
import { fetchSettings, updateSetting } from '@/lib/backendApi';

const [aboutData, setAboutData] = useState(null);

useEffect(() => {
  const token = getStoredToken();
  // Fetch from backend instead of static JSON
  fetchAbout(token);
}, []);

const handleSave = async (data) => {
  const token = getStoredToken();
  // Save to backend
  await updateSetting('about', JSON.stringify(data), token);
};
```

### Create New Components for Backend Data

Already created for you:
- [DoctorsManager.tsx](./frontend/src/components/admin/DoctorsManager.tsx) - Manage doctors via backend
- [backendApi.ts](./frontend/src/lib/backendApi.ts) - API integration utilities

---

## Part 7: Testing Connections

### Test 1: Backend Health

```bash
curl http://localhost:5000/health
# Response: {"status":"ok","timestamp":"..."}
```

### Test 2: Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@example.com",
    "password":"SecurePassword123!"
  }'
```

### Test 3: Fetch Doctors

```bash
curl http://localhost:5000/api/doctors?language=en
```

### Test 4: From Frontend

```typescript
// In browser console or component
import { fetchDoctors } from '@/lib/backendApi';

await fetchDoctors('en').then(console.log);
```

---

## Part 8: Common Integration Patterns

### Pattern 1: Display List with Language Toggle

```typescript
'use client';

import { useState, useEffect } from 'react';
import { fetchDoctors } from '@/lib/backendApi';

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [language, setLanguage] = useState<'en' | 'az' | 'ru'>('en');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { doctors } = await fetchDoctors(language);
        setDoctors(doctors);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [language]);

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value as any)}>
        <option value="en">English</option>
        <option value="az">Azərbaycanca</option>
        <option value="ru">Русский</option>
      </select>

      {loading && <p>Loading...</p>}
      
      {doctors.map(doc => (
        <div key={doc.id}>
          <h3>{doc.name}</h3>
          <p>{doc.bio}</p>
        </div>
      ))}
    </div>
  );
}
```

### Pattern 2: Admin Form with Save

```typescript
'use client';

import { createDoctor, getStoredToken } from '@/lib/backendApi';
import { useState } from 'react';

export default function AddDoctorForm() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getStoredToken();

    if (!token) {
      alert('Not authenticated');
      return;
    }

    try {
      setLoading(true);
      await createDoctor(form, token);
      alert('Doctor created successfully');
      setForm({ name: '', slug: '', bio: '' });
    } catch (error) {
      alert('Failed to create doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Doctor Name"
      />
      <textarea
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        placeholder="Bio"
      />
      <button disabled={loading}>{loading ? 'Saving...' : 'Add Doctor'}</button>
    </form>
  );
}
```

---

## Part 9: Error Handling

The `backendApi.ts` library includes error handling:

```typescript
import { handleApiError } from '@/lib/backendApi';

try {
  const data = await fetchDoctors('en');
} catch (error) {
  const { message, status, details } = handleApiError(error, 'Load Doctors');
  console.error(`Error ${status}: ${message}`);
  if (details) console.error('Details:', details);
}
```

---

## Part 10: Deployment

### Deploy Backend to Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project → Select "GitHub Repo"
4. Set root directory: `backend`
5. Add PostgreSQL plugin
6. Set environment variables
7. Deploy!

Get backend URL: `https://your-app.up.railway.app`

### Deploy Frontend

1. Update `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-app.up.railway.app
```

2. Deploy to Vercel, Netlify, or Railway

---

## Troubleshooting

### CORS Error

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Check backend `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### 401 Unauthorized

**Problem:** Admin operations fail with 401

**Solution:** 
- Check token is stored: `localStorage.getItem('adminToken')`
- Verify token in Authorization header: `Bearer <token>`
- Check token expiration (7 days)

### Data Not Updating

**Problem:** Changes don't appear after save

**Solution:**
- Manually reload: `location.reload()`
- Or use `useEffect` to refresh list after save
- Check console for errors

### Backend Connection Refused

**Problem:** `Error: connect ECONNREFUSED`

**Solution:**
- Verify backend is running: `curl http://localhost:5000/health`
- Check `.env.local` has correct `NEXT_PUBLIC_BACKEND_URL`
- Ensure both run on correct ports

---

## Summary

| Component | Location | Purpose |
|-----------|----------|---------|
| **Backend** | `/backend` | REST API server |
| **Frontend** | `/frontend` | Next.js React app |
| **Translations** | `/frontend/src/messages` | Source JSON files |
| **API Client** | `/frontend/src/lib/backendApi.ts` | Integration layer |
| **Admin Components** | `/frontend/src/components/admin/` | Admin UI components |
| **Database** | PostgreSQL | Stores all content |
| **Authentication** | JWT | Secures admin operations |

---

## Next Steps

1. ✅ Copy messages to backend: `./setup-backend.bat` (Windows)
2. ✅ Start backend: `cd backend && npm run dev`
3. ✅ Start frontend: `cd frontend && npm run dev`
4. 🎯 Update admin components to use `backendApi.ts`
5. 🚀 Deploy both to production
6. 📊 Monitor with logs and error tracking

See [QUICK_START.md](./QUICK_START.md) for rapid setup.
