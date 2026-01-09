# 🔐 Admin Panel Authentication - Quick Setup

## What Was Added

A complete login system to protect your admin panel with username and password.

## ✅ Quick Access

### Login Page
```
http://localhost:3000/admin-login
```

### Default Credentials
```
Username: admin
Password: admin123
```

### Admin Portal (After Login)
```
http://localhost:3000/admin-portal
```

---

## 🗂️ Files Created

```
frontend/
├── src/
│   ├── app/admin-login/
│   │   ├── page.tsx          ← Login page UI
│   │   └── login.css         ← Login styling
│   ├── lib/
│   │   └── auth.ts           ← Authentication logic
│   └── components/
│       └── ProtectedRoute.tsx ← Route protection
```

## 🔄 How It Works

1. **Login Page**: User enters `admin` / `admin123`
2. **Token Generation**: Login creates a 24-hour session token
3. **Route Protection**: Admin portal checks if user is logged in
4. **Logout Button**: Red "Çıxış" button in sidebar clears session

---

## 🎯 To Change Credentials

**File:** `src/lib/auth.ts` (line 2-5)

```javascript
export const ADMIN_CREDENTIALS = {
  username: 'admin',      // ← Change this
  password: 'admin123',   // ← Change this
};
```

Then restart the development server.

---

## 💾 Session Storage

Sessions are stored in browser's `localStorage`:
- Token lasts **24 hours**
- Automatically expires after 24 hours
- Cleared on logout

---

## 🧪 Quick Test

1. Open: http://localhost:3000/admin-login
2. Try: `admin` / `admin123`
3. ✅ Should enter admin portal
4. Click red "Çıxış" button to logout

---

## 🚨 Security Notes

### Current (Development)
- ✅ Basic password protection
- ✅ Session tokens
- ✅ Logout functionality

### For Production, Add:
🔒 HTTPS only
🔒 Backend authentication (JWT)
🔒 Rate limiting on login
🔒 Two-factor authentication (2FA)
🔒 Activity logging

---

## 📚 Full Documentation

See `AUTHENTICATION_GUIDE.md` for:
- Detailed setup instructions
- Code examples
- Testing checklist
- Troubleshooting
- Advanced configuration

---

**Status**: ✅ Ready to Use
**Session Duration**: 24 hours
**Default User**: admin / admin123
