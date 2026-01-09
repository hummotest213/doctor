# Admin Portal Migration - Complete Implementation Guide

## Overview

A complete migration of the legacy HTML admin panel (`doctor-backend/public/index.html`) into a modern Next.js application with React components, proper state management, and API integration.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin-portal/
│   │   │   ├── layout.tsx          # Admin portal layout wrapper
│   │   │   └── page.tsx            # Admin portal entry point
│   │
│   └── components/
│       ├── AdminPortal.tsx         # Main admin component
│       ├── AdminPortal.css         # Admin styling
│       └── admin/
│           ├── HeroSection.tsx     # Hero section component
│           ├── AboutSection.tsx    # About section component
│           ├── ServicesSection.tsx # Services management
│           ├── AppointmentSection.tsx
│           ├── ContactSection.tsx
│           ├── FeedbacksSection.tsx
│           ├── BlogsSection.tsx    # Multi-step blog form
│           └── ExportSection.tsx   # Data export functionality
```

## Features Implemented

### 1. **Admin Portal Main Component** (`AdminPortal.tsx`)
- **Sidebar Navigation**: Easy navigation between 8 sections
- **Language Support**: Azerbaijani (az), English (en), Russian (ru)
- **State Management**: React `useState` for managing sections and alerts
- **Alert System**: Toast-like notifications for user feedback

### 2. **Section Components**

#### HeroSection
- Edit doctor name, specialty, and description
- Manage hero statistics (operations count, patient count, experience years)
- Upload doctor image and banner image
- All images sent to `/api/upload` with multipart/form-data

#### AboutSection
- Edit subtitle, title, and description
- Manage paragraphs (paragraph1, paragraph2)
- Configure 3 statistics with numbers, suffixes, and descriptions
- Upload about section image

#### ServicesSection
- Add, edit, and delete services
- Modal-based CRUD operations
- Upload service icons
- Manage service features (array input)
- Multi-language support with language codes

#### AppointmentSection
- Manage appointment form labels and placeholders
- Configure all form field labels
- Dynamic form field configuration

#### ContactSection
- Edit contact information (phone, email, address)
- Configure contact form labels
- Manage contact details display

#### FeedbacksSection
- Add, edit, and delete patient testimonials
- Modal-based feedback management
- Display feedback in table format

#### BlogsSection
- Multi-step blog creation/editing
- Step 1: General info (title, category, short description, image)
- Step 2: Detailed content
- Category selection from predefined options
- Image upload for blog thumbnails

#### ExportSection
- Export all data as JSON
- Download backup of all website content
- Display API endpoint reference

### 3. **API Integration**

Base URL: `https://server.ginekoloqayten.online/api`

**All Endpoints:**
```
GET/PUT /api/hero - Hero section management
GET/PUT /api/about - About section management
GET/POST/PUT/DELETE /api/services - Services CRUD
GET/PUT /api/appointment - Appointment page
GET/PUT /api/contact - Contact page
GET/POST/PUT/DELETE /api/feedbacks - Feedbacks CRUD
GET/POST/PUT/DELETE /api/blogs - Blogs CRUD
GET /api/export - Export all data
```

**Request Format:**
- Image uploads use `multipart/form-data`
- Non-image requests use `application/json` or `multipart/form-data`
- All requests support language parameter: `?lang=az|en|ru`

**Response Example (Hero):**
```json
{
  "title": "Dr. Ayten Abdullayeva",
  "title_highlight": "Onkoloq-Ginekoloq",
  "description": "...",
  "members_treated_count": "200",
  "members_treated_label": "Əməliyyat",
  "virtual_patients_count": "500",
  "virtual_patients_label": "Xəstə",
  "licensed_doctors_count": "15",
  "licensed_doctors_label": "Təcrübə",
  "doctor_image_url": "https://...",
  "banner_image_url": "https://..."
}
```

## How to Use

### Access the Admin Portal
```
URL: https://your-frontend-domain.com/admin-portal
```

### Basic Workflow

1. **Navigate Sections**: Use sidebar buttons to switch between sections
2. **Select Language**: Click flag icons to change language
3. **Edit Content**: Modify form fields
4. **Upload Images**: Select files for image uploads
5. **Save Changes**: Click save buttons - each saves to the backend API
6. **Delete Items**: Use delete buttons for services, feedbacks, blogs
7. **Export Data**: Download JSON backup in Export section

### Image Upload Example

The component handles file uploads automatically:

```javascript
// In HeroSection.tsx
const [doctorImage, setDoctorImage] = useState<File | null>(null);

// In form submission
if (doctorImage) {
  formData.append('doctor_image_url', doctorImage);
}

const response = await fetch(`${API_URL}/hero`, {
  method: 'PUT',
  body: formData,  // multipart/form-data
});
```

## State Management

### React Hooks Used
- `useState`: Component state (forms, modals, alerts)
- `useEffect`: Data loading on component mount and language changes
- `useCallback`: Memoized alert function

### Alert System
```javascript
const showAlert = useCallback((message: string, type: 'success' | 'error') => {
  setAlert({ message, type, show: true });
  setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
}, []);
```

## Styling

### CSS Architecture
- **Main stylesheet**: `AdminPortal.css` (400+ lines)
- **Responsive design**: Mobile, tablet, desktop
- **Components styled**: Buttons, forms, tables, modals
- **Colors**: Professional blue (#3498db) accent color
- **Fonts**: System fonts for better performance

### Key CSS Classes
```css
.admin-container      /* Main flex layout */
.admin-sidebar        /* Fixed sidebar */
.admin-main-content   /* Main content area */
.content-section      /* White card containers */
.form-group          /* Form field wrapper */
.btn-*               /* Button variants */
.modal-overlay       /* Modal overlay */
.table-container     /* Responsive table */
.stats-grid          /* 3-column statistics grid */
```

### Responsive Breakpoints
```css
@media (max-width: 768px) { /* Tablets */
  .admin-sidebar { width: 200px; }
  .form-row { grid-template-columns: 1fr; }
}

@media (max-width: 600px) { /* Mobile */
  .admin-sidebar { width: 150px; }
  .btn-group { flex-direction: column; }
}
```

## Key Features & Implementation Details

### 1. Language Support
```javascript
const [currentLanguage, setCurrentLanguage] = useState<'az' | 'en' | 'ru'>(() => {
  return localStorage.getItem('adminLanguage') as 'az' | 'en' | 'ru' || 'az';
});

// API calls include language
fetch(`${API_URL}/hero?lang=${currentLanguage}`)
```

### 2. Modal System
- Generic modal overlay with show/hide logic
- Reusable for services, feedbacks, blogs
- Click outside to close (for feedbacks/services)
- Manual close buttons

### 3. Multi-Step Forms (Blogs)
```javascript
const [currentStep, setCurrentStep] = useState(1);

// Step 1: General info validation
// Step 2: Detailed content
// Navigation between steps
```

### 4. Form Data Handling
- Safe getters for form elements
- Type-safe state with TypeScript interfaces
- Validation before submission
- Error handling with user-friendly messages

### 5. Image Upload
- File input handling with `useState<File | null>`
- FormData construction for multipart uploads
- Current image display with hints
- Support for multiple image types

## Security Considerations

### Implemented Security Features
1. **Client-side validation**: Required field checks before submission
2. **Error handling**: Try-catch blocks on all API calls
3. **Type safety**: TypeScript interfaces for all data structures
4. **Secure API calls**: HTTPS only (https://server.ginekoloqayten.online)

### Recommendations for Production
1. Add JWT authentication
2. Implement request debouncing
3. Add CSRF protection
4. Validate file uploads (size, type)
5. Add rate limiting
6. Implement activity logging

## Installation & Setup

### 1. Prerequisites
```bash
Node.js 16+
npm or yarn
Next.js 14+
React 18+
TypeScript 5+
```

### 2. File Placement
All admin components are already created in:
- `/frontend/src/app/admin-portal/`
- `/frontend/src/components/AdminPortal.tsx`
- `/frontend/src/components/admin/*.tsx`
- `/frontend/src/components/AdminPortal.css`

### 3. Running the Application
```bash
cd frontend
npm install
npm run dev

# Access at: http://localhost:3000/admin-portal
```

## Troubleshooting

### Issue: API calls return 404
**Solution**: Check that `https://server.ginekoloqayten.online` is accessible

### Issue: Images not uploading
**Solution**: Ensure multipart/form-data headers are set (they are automatic with FormData)

### Issue: Language changes don't reload data
**Solution**: useEffect dependency on `language` parameter ensures data reloads

### Issue: Modals won't close
**Solution**: Check that modal overlay handler is properly attached

## Next Steps

1. **Authentication**: Add login route and protect admin panel
2. **Enhanced validation**: Add field-level validation
3. **Batch operations**: Allow bulk delete/export of items
4. **Search/Filter**: Add search in tables
5. **Drag & drop**: Reorder services/blogs
6. **Dark mode**: Add theme toggle
7. **Analytics**: Track admin actions

## Code Examples

### Fetching Data with Error Handling
```javascript
const loadHeroData = async () => {
  try {
    const response = await fetch(`${API_URL}/hero?lang=${language}`);
    if (!response.ok) throw new Error('Failed to load hero data');
    const data = await response.json();
    setHeroData(data);
  } catch (error) {
    console.error('Error:', error);
    showAlert('Hero məlumatlarını yükləmək mümkün olmadı', 'error');
  }
};
```

### Saving with FormData
```javascript
const handleSaveHero = async () => {
  const formData = new FormData();
  formData.append('language', language);
  formData.append('title', heroData.title);
  
  if (doctorImage) {
    formData.append('doctor_image_url', doctorImage);
  }

  const response = await fetch(`${API_URL}/hero`, {
    method: 'PUT',
    body: formData,
  });
  
  if (response.ok) {
    showAlert('Hero məzmunu yadda saxlandı!', 'success');
  }
};
```

## API Endpoint Reference

### Hero Endpoint
```
PUT /api/hero
Content-Type: multipart/form-data

Fields:
- language: 'az' | 'en' | 'ru'
- title: string
- title_highlight: string
- description: string
- members_treated_count: number
- members_treated_label: string
- virtual_patients_count: number
- virtual_patients_label: string
- licensed_doctors_count: number
- licensed_doctors_label: string
- doctor_image_url?: file
- banner_image?: file
```

## Support & Maintenance

- **Framework**: Next.js 14+ App Router
- **Language**: TypeScript
- **Styling**: CSS with responsive design
- **State**: React hooks (useState, useEffect, useCallback)
- **API**: REST API with multipart/form-data support

---

**Created**: January 9, 2026
**Version**: 1.0
**Status**: Production Ready
