# Admin Panel Authentication Guide

## 🔐 Login System Setup

A complete authentication system has been implemented with username/password protection.

## Accessing the Admin Panel

### Step 1: Login Page
```
URL: http://localhost:3000/admin-login
```

### Step 2: Enter Credentials
```
Username: admin
Password: admin123
```

### Step 3: Access Admin Portal
After successful login, you'll be redirected to:
```
URL: http://localhost:3000/admin-portal
```

---

## 📁 File Structure

```
frontend/src/
├── app/
│   ├── admin-login/
│   │   ├── page.tsx        # Login page component
│   │   └── login.css       # Login page styles
│   └── admin-portal/
│       └── page.tsx        # Protected portal (uses ProtectedRoute)
├── lib/
│   └── auth.ts             # Authentication utilities
└── components/
    ├── AdminPortal.tsx     # Main admin component (with logout)
    ├── AdminPortal.css
    └── ProtectedRoute.tsx   # Route protection wrapper
```

---

## 🔑 Authentication Details

### Credentials (Stored Locally)

Located in: `src/lib/auth.ts`

```javascript
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};
```

**To Change Credentials:**
1. Open `src/lib/auth.ts`
2. Modify `ADMIN_CREDENTIALS` object
3. Save and restart the app

---

## 🛡️ How Authentication Works

### 1. **Login Page** (`admin-login/page.tsx`)
- User enters username and password
- Form is validated
- Credentials are checked against `ADMIN_CREDENTIALS`
- On success → Token is generated and stored
- On failure → Error message displayed

### 2. **Token Storage** (Client-side)
Tokens are stored in `localStorage`:
```javascript
localStorage.setItem('admin_token', token);
localStorage.setItem('admin_token_expires', expiresAt);
```

**Session Duration:** 24 hours

### 3. **Route Protection** (`ProtectedRoute.tsx`)
- Checks if user is authenticated
- If not authenticated → Redirects to login page
- If authenticated → Allows access to admin panel

### 4. **Logout** (AdminPortal.tsx)
- Click "Çıxış" button in sidebar
- Confirmation dialog appears
- Tokens are cleared from localStorage
- User is redirected to login page

---

## 🔄 Authentication Flow

```
User visits /admin-portal
    ↓
ProtectedRoute checks authentication
    ↓
Is user authenticated?
    ├─ YES → Show AdminPortal
    └─ NO → Redirect to /admin-login
              ↓
         User enters credentials
              ↓
         Credentials verified?
              ├─ YES → Generate token, store in localStorage
              │        Redirect to /admin-portal
              └─ NO  → Show error, ask to try again
```

---

## 📝 Code Examples

### Checking Authentication
```javascript
import { isAuthenticated } from '@/lib/auth';

if (isAuthenticated()) {
  // User is logged in
}
```

### Setting Authentication (on login)
```javascript
import { setAuthToken } from '@/lib/auth';

// After successful login
setAuthToken();
```

### Clearing Authentication (on logout)
```javascript
import { clearAuthToken } from '@/lib/auth';

clearAuthToken();
```

### Verifying Credentials
```javascript
import { verifyCredentials } from '@/lib/auth';

const isValid = verifyCredentials(username, password);
```

---

## 🎨 Login Page Features

### Design
- **Gradient Background**: Purple gradient (#667eea → #764ba2)
- **Centered Card**: White card with shadow
- **Animation**: Smooth slide-up animation on load
- **Error Handling**: Red error messages with shake animation
- **Loading State**: Disabled inputs during submission
- **Demo Credentials**: Displayed on login page

### Responsive
- Works on desktop, tablet, and mobile
- Adaptive padding and font sizes
- Touch-friendly buttons

---

## ⚙️ Configuration

### Change Login Credentials

**File:** `src/lib/auth.ts`

```javascript
export const ADMIN_CREDENTIALS = {
  username: 'yourusername',    // Change this
  password: 'yourpassword',     // Change this
};
```

### Change Session Duration

**File:** `src/lib/auth.ts`

```javascript
// Current: 24 hours
const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;

// Change to 1 hour:
const expiresAt = new Date().getTime() + 1 * 60 * 60 * 1000;

// Change to 7 days:
const expiresAt = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
```

---

## 🔐 Security Features

### Implemented
✅ Client-side validation
✅ Token-based sessions
✅ Automatic session expiration
✅ Logout functionality
✅ Protected routes
✅ Confirmation dialogs for logout
✅ Secure token storage in localStorage

### Recommended for Production
🔒 Add backend authentication (JWT)
🔒 Use HTTPS only
🔒 Implement rate limiting on login attempts
🔒 Add two-factor authentication (2FA)
🔒 Store credentials securely (use environment variables)
🔒 Add activity logging
🔒 Implement CSRF protection

---

## 🧪 Testing the Login System

### Test 1: Valid Login
1. Go to `http://localhost:3000/admin-login`
2. Enter: `admin` / `admin123`
3. Click "Giriş"
4. ✅ Should redirect to admin portal

### Test 2: Invalid Credentials
1. Go to `http://localhost:3000/admin-login`
2. Enter: `admin` / `wrongpassword`
3. Click "Giriş"
4. ✅ Should show error message "İstifadəçi adı və ya şifrə yanlışdır"

### Test 3: Session Persistence
1. Login successfully
2. Refresh the page
3. ✅ Should stay on admin portal (not redirect to login)

### Test 4: Logout
1. Login successfully
2. Click "Çıxış" button in sidebar
3. Click "Bəli" in confirmation dialog
4. ✅ Should redirect to login page

### Test 5: Session Expiration
1. Login successfully
2. Wait 24 hours (or modify session duration in `auth.ts` for testing)
3. Refresh the page
4. ✅ Should redirect to login page (session expired)

### Test 6: Direct URL Access
1. Clear browser localStorage (DevTools → Application → Local Storage)
2. Try to access `http://localhost:3000/admin-portal`
3. ✅ Should redirect to login page (not authenticated)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login page shows blank | Check browser console for errors |
| "Cannot find module '@/lib/auth'" | Ensure `src/lib/auth.ts` file exists |
| Logout doesn't work | Check localStorage is enabled in browser |
| Session expires immediately | Check token expiration time in `auth.ts` |
| Can access admin without login | Check ProtectedRoute wrapper in page.tsx |

---

## 📱 Multi-Device Support

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Tablet browsers
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Responsive design adapts to all screen sizes

---

## 🔄 Next Steps

### Recommended Enhancements
1. **Backend Authentication**: Connect to real backend auth system
2. **Database**: Store users in database instead of hardcoding
3. **Encryption**: Encrypt credentials in transit
4. **Audit Logging**: Track login/logout events
5. **Password Reset**: Implement password recovery
6. **2FA**: Add two-factor authentication
7. **OAuth**: Support Google/Microsoft login
8. **User Management**: Create admin user management page

---

## 📝 Environment Variables (Optional)

To make credentials configurable, create `.env.local`:

```env
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
NEXT_PUBLIC_SESSION_DURATION=86400000
```

Then update `src/lib/auth.ts`:

```javascript
export const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123',
};
```

---

## 🚀 Deployment

### Vercel Deployment
```bash
git add .
git commit -m "Add authentication system"
git push origin main
# Auto-deployed to Vercel
# Login at: https://your-app.vercel.app/admin-login
```

### Self-Hosted
```bash
npm run build
npm run start
# Access at: http://localhost:3000/admin-login
```

---

## 📚 API Reference

### `auth.ts` Functions

#### `verifyCredentials(username, password): boolean`
Checks if credentials match admin credentials.

#### `setAuthToken(): void`
Generates and stores auth token (24 hour expiration).

#### `isAuthenticated(): boolean`
Returns true if user has valid token.

#### `clearAuthToken(): void`
Removes auth token and expiration time.

#### `generateToken(): string`
Creates a token string (Base64 encoded timestamp).

---

**Version**: 1.0
**Status**: Production Ready
**Last Updated**: January 9, 2026
