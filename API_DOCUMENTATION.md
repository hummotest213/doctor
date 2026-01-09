# API Documentation

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-domain.up.railway.app/api`

## Authentication

All protected endpoints require JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ /* ... */ ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pageSize": 10,
    "totalPages": 5
  }
}
```

---

## Authentication Endpoints

### Login

Create a new session and get JWT token.

```
POST /auth/login
Content-Type: application/json
```

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
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

**Error (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Get Current User

Get logged-in user information.

```
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

### Get Dashboard Stats

Get overview statistics.

```
GET /auth/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "doctors": 10,
    "services": 5,
    "appointments": 25,
    "testimonials": 12
  }
}
```

---

## Doctors Endpoints

### Get All Doctors

Retrieve list of doctors with pagination.

```
GET /doctors?page=1&pageSize=10&language=en
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)
- `language` (optional): Language code - `en`, `az`, `ru` (default: en)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "dr-john-doe",
      "name": "Dr. John Doe",
      "bio": "Experienced cardiologist...",
      "imageUrl": "https://example.com/doctor.jpg",
      "specialties": ["Cardiology", "General Practice"],
      "experience": 15,
      "qualifications": ["MD", "Board Certified"]
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

### Get Single Doctor

Retrieve doctor by slug.

```
GET /doctors/:slug?language=en
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "dr-john-doe",
    "name": "Dr. John Doe",
    "bio": "Experienced cardiologist...",
    "imageUrl": "https://example.com/doctor.jpg",
    "specialties": ["Cardiology"],
    "experience": 15,
    "qualifications": ["MD"]
  }
}
```

### Create Doctor

Create a new doctor (Admin only).

```
POST /doctors
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
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
      "value": "Experienced cardiologist with 15 years of practice..."
    },
    {
      "language": "az",
      "field": "name",
      "value": "Dr. John Doe"
    },
    {
      "language": "az",
      "field": "bio",
      "value": "15 il təcrübəsi olan kardiologiya mütəxəssisi..."
    },
    {
      "language": "ru",
      "field": "name",
      "value": "Др. Джон Доу"
    },
    {
      "language": "ru",
      "field": "bio",
      "value": "Опытный кардиолог с 15-летним стажем..."
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "dr-john-doe",
    "imageUrl": "https://example.com/doctor.jpg",
    "specialties": ["Cardiology", "General Practice"],
    "experience": 15,
    "qualifications": ["MD", "Board Certified"],
    "translations": [/* ... */]
  }
}
```

### Update Doctor

Update doctor information (Admin only).

```
PUT /doctors/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:** (Same as Create)

**Response (200):** (Same as Create)

### Delete Doctor

Delete a doctor (Admin only).

```
DELETE /doctors/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Doctor deleted successfully"
  }
}
```

---

## Services Endpoints

### Get All Services

```
GET /services?page=1&pageSize=10&language=en
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "general-checkup",
      "title": "General Checkup",
      "description": "Comprehensive health examination...",
      "iconUrl": "https://example.com/icon.svg",
      "order": 1
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

### Get Single Service

```
GET /services/:slug?language=en
```

### Create Service

```
POST /services
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "slug": "general-checkup",
  "iconUrl": "https://example.com/icon.svg",
  "order": 1,
  "translations": [
    {
      "language": "en",
      "field": "title",
      "value": "General Checkup"
    },
    {
      "language": "en",
      "field": "description",
      "value": "Comprehensive health examination..."
    },
    {
      "language": "az",
      "field": "title",
      "value": "Ümumi Sağlamlıq Yoxlaması"
    },
    {
      "language": "az",
      "field": "description",
      "value": "Hərtərəfli sağlamlıq müayinəsi..."
    }
  ]
}
```

### Update Service

```
PUT /services/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete Service

```
DELETE /services/:id
Authorization: Bearer <token>
```

---

## Testimonials Endpoints

### Get All Testimonials

```
GET /testimonials?page=1&pageSize=10&language=en
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "authorName": "John Smith",
      "authorRole": "Patient",
      "authorImage": "https://example.com/avatar.jpg",
      "content": "Excellent service and care...",
      "rating": 5
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "totalPages": 2
  }
}
```

### Create Testimonial

```
POST /testimonials
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "authorName": "John Smith",
  "authorRole": "Patient",
  "authorImage": "https://example.com/avatar.jpg",
  "rating": 5,
  "translations": [
    {
      "language": "en",
      "field": "content",
      "value": "Excellent service and care..."
    },
    {
      "language": "az",
      "field": "content",
      "value": "Əla xidmət və qayğı..."
    }
  ]
}
```

### Update Testimonial

```
PUT /testimonials/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete Testimonial

```
DELETE /testimonials/:id
Authorization: Bearer <token>
```

---

## Settings Endpoints

### Get All Settings

Get all site settings.

```
GET /settings
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "site_name": "Doctor Portal",
    "site_description": "Professional medical website",
    "contact_email": "contact@doctorportal.com",
    "contact_phone": "+1-800-000-0000"
  }
}
```

### Get Single Setting

```
GET /settings/:key
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "site_name": "Doctor Portal"
  }
}
```

### Update Setting

```
PUT /settings/:key
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "value": "New Value",
  "description": "Optional description"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "key": "site_name",
    "value": "New Value",
    "description": "Optional description",
    "createdAt": "2024-01-10T00:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  }
}
```

### Delete Setting

```
DELETE /settings/:key
Authorization: Bearer <token>
```

---

## Health Check

```
GET /health
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently not implemented. Can be added with `express-rate-limit`.

## Caching

Currently not implemented. Can be added with Redis.

## Webhooks

Currently not implemented. Can be added for real-time notifications.

---

## Example: Complete Doctor CRUD

### 1. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"SecurePassword123!"}'
```

### 2. Create Doctor
```bash
curl -X POST http://localhost:5000/api/doctors \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "dr-jane-doe",
    "imageUrl": "https://example.com/jane.jpg",
    "specialties": ["Pediatrics"],
    "experience": 10,
    "translations": [
      {"language": "en", "field": "name", "value": "Dr. Jane Doe"},
      {"language": "en", "field": "bio", "value": "Pediatrician..."}
    ]
  }'
```

### 3. Get All Doctors
```bash
curl http://localhost:5000/api/doctors?language=en
```

### 4. Get Single Doctor
```bash
curl http://localhost:5000/api/doctors/dr-jane-doe?language=en
```

### 5. Update Doctor
```bash
curl -X PUT http://localhost:5000/api/doctors/<id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"experience": 11, ...}'
```

### 6. Delete Doctor
```bash
curl -X DELETE http://localhost:5000/api/doctors/<id> \
  -H "Authorization: Bearer <token>"
```

---

## SDK/Client Setup

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usage
api.get('/doctors?language=en');
api.post('/doctors', doctorData);
api.put('/doctors/:id', updateData);
api.delete('/doctors/:id');
```

---

## Versioning

Current API version: **v1**

Future versions will support `/api/v2/` endpoints while maintaining backward compatibility.
