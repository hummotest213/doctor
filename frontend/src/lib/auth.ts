// Static admin credentials - Change these values for your setup
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Generate a simple token (client-side only)
export const generateToken = (): string => {
  return btoa(`${Date.now()}-admin-token`);
};

// Verify credentials
export const verifyCredentials = (username: string, password: string): boolean => {
  return (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('admin_token');
  const expiresAt = localStorage.getItem('admin_token_expires');

  if (!token || !expiresAt) return false;

  // Check if token has expired
  if (new Date().getTime() > parseInt(expiresAt)) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_expires');
    return false;
  }

  return true;
};

// Set authentication token (24 hour expiration)
export const setAuthToken = (): void => {
  const token = generateToken();
  const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours

  localStorage.setItem('admin_token', token);
  localStorage.setItem('admin_token_expires', expiresAt.toString());
};

// Clear authentication
export const clearAuthToken = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_token_expires');
};
