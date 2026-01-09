import axios from 'axios';

// Backend API authentication
const getBackendUrl = () => {
  let url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  
  // Ensure URL ends with /api
  if (!url.endsWith('/api')) {
    url = url.endsWith('/') ? url + 'api' : url + '/api';
  }
  
  return url;
};

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

// Login with backend API
export const loginWithBackend = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${getBackendUrl()}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  const expiresAt = localStorage.getItem('adminTokenExpires');

  if (!token || !expiresAt) return false;

  // Check if token has expired
  if (new Date().getTime() > parseInt(expiresAt)) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpires');
    return false;
  }

  return true;
};

// Set authentication token (7 day expiration to match JWT)
export const setAuthToken = (token: string): void => {
  const expiresAt = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days

  localStorage.setItem('adminToken', token);
  localStorage.setItem('adminTokenExpires', expiresAt.toString());
};

// Get current token
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

// Clear authentication
export const clearAuthToken = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminTokenExpires');
};
