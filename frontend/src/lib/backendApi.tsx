'use client';

/**
 * FRONTEND-BACKEND INTEGRATION GUIDE
 * 
 * This example shows how to:
 * 1. Connect to the backend API
 * 2. Handle authentication
 * 3. Manage multi-language data
 * 4. Load & display content
 * 5. Handle errors properly
 */

import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';

/**
 * ============================================
 * 1. API CLIENT SETUP
 * ============================================
 */

// Initialize API client with base configuration
const createApiClient = (token?: string): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';
  
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return client;
};

/**
 * ============================================
 * 2. DATA TYPES
 * ============================================
 */

interface Doctor {
  id: string;
  slug: string;
  name: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  experience: number;
  qualifications: string[];
}

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string;
  order?: number;
}

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  authorImage?: string;
  rating: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * ============================================
 * 3. AUTH UTILITIES
 * ============================================
 */

// Login and get token
export const loginAdmin = async (email: string, password: string): Promise<string> => {
  const client = createApiClient();
  
  try {
    const response = await client.post<any>('/auth/login', { email, password });
    const token = response.data.data.token;
    
    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', token);
    }
    
    return token;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.error);
    throw error;
  }
};

// Get stored token
export const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Clear token on logout
export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
};

/**
 * ============================================
 * 4. DATA FETCHING FUNCTIONS
 * ============================================
 */

// Fetch doctors with language support
export const fetchDoctors = async (
  language: 'en' | 'az' | 'ru' = 'en',
  page: number = 1,
  pageSize: number = 10
): Promise<{ doctors: Doctor[]; total: number }> => {
  const client = createApiClient();
  
  try {
    const response = await client.get<ApiResponse<Doctor[]>>('/doctors', {
      params: { language, page, pageSize },
    });
    
    console.log(`✅ Fetched ${response.data.data.length} doctors for language: ${language}`);
    
    return {
      doctors: response.data.data,
      total: response.data.pagination?.total || 0,
    };
  } catch (error: any) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Fetch single doctor
export const fetchDoctorBySlug = async (
  slug: string,
  language: 'en' | 'az' | 'ru' = 'en'
): Promise<Doctor> => {
  const client = createApiClient();
  
  try {
    const response = await client.get<ApiResponse<Doctor>>(`/doctors/${slug}`, {
      params: { language },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error fetching doctor ${slug}:`, error);
    throw error;
  }
};

// Fetch services
export const fetchServices = async (
  language: 'en' | 'az' | 'ru' = 'en'
): Promise<Service[]> => {
  const client = createApiClient();
  
  try {
    const response = await client.get<ApiResponse<Service[]>>('/services', {
      params: { language },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Fetch testimonials
export const fetchTestimonials = async (
  language: 'en' | 'az' | 'ru' = 'en'
): Promise<Testimonial[]> => {
  const client = createApiClient();
  
  try {
    const response = await client.get<ApiResponse<Testimonial[]>>('/testimonials', {
      params: { language },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

/**
 * ============================================
 * 5. ADMIN OPERATIONS (CRUD)
 * ============================================
 */

// Create doctor
export const createDoctor = async (doctor: Omit<Doctor, 'id'>, token: string) => {
  const client = createApiClient(token);
  
  try {
    const response = await client.post('/doctors', {
      ...doctor,
      translations: [
        { language: 'en', field: 'name', value: doctor.name },
        { language: 'en', field: 'bio', value: doctor.bio },
      ],
    });
    
    console.log('✅ Doctor created:', response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating doctor:', error.response?.data?.error);
    throw error;
  }
};

// Update doctor
export const updateDoctor = async (id: string, doctor: Partial<Doctor>, token: string) => {
  const client = createApiClient(token);
  
  try {
    const response = await client.put(`/doctors/${id}`, {
      ...doctor,
      ...(doctor.name && {
        translations: [
          { language: 'en', field: 'name', value: doctor.name },
          { language: 'en', field: 'bio', value: doctor.bio },
        ],
      }),
    });
    
    console.log('✅ Doctor updated:', response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error('Error updating doctor:', error.response?.data?.error);
    throw error;
  }
};

// Delete doctor
export const deleteDoctor = async (id: string, token: string) => {
  const client = createApiClient(token);
  
  try {
    await client.delete(`/doctors/${id}`);
    console.log('✅ Doctor deleted');
  } catch (error: any) {
    console.error('Error deleting doctor:', error.response?.data?.error);
    throw error;
  }
};

/**
 * ============================================
 * 6. EXAMPLE COMPONENT
 * ============================================
 */

interface DoctorsListProps {
  language: 'en' | 'az' | 'ru';
}

export const DoctorsList: React.FC<DoctorsListProps> = ({ language }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDoctors();
  }, [language]); // Reload when language changes

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🌍 Loading doctors for language: ${language}`);
      const { doctors: data } = await fetchDoctors(language);
      
      setDoctors(data);
      console.log(`✅ Loaded ${data.length} doctors`);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to load doctors';
      setError(message);
      console.error('❌ Error loading doctors:', message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (doctors.length === 0) return <div>No doctors found</div>;

  return (
    <div className="doctors-list">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          {doctor.imageUrl && <img src={doctor.imageUrl} alt={doctor.name} />}
          <h3>{doctor.name}</h3>
          <p className="specialty">{doctor.specialties?.join(', ')}</p>
          <p className="bio">{doctor.bio}</p>
          <p className="experience">Experience: {doctor.experience} years</p>
        </div>
      ))}
    </div>
  );
};

/**
 * ============================================
 * 7. ERROR HANDLING PATTERN
 * ============================================
 */

// Robust error handler with proper logging
export const handleApiError = (error: any, context: string = 'API Call') => {
  console.error(`❌ ${context} failed:`, {
    status: error.response?.status,
    message: error.response?.data?.error || error.message,
    details: error.response?.data?.details,
  });

  return {
    message: error.response?.data?.error || 'An error occurred',
    status: error.response?.status || 500,
    details: error.response?.data?.details,
  };
};

/**
 * ============================================
 * 8. USAGE IN COMPONENTS
 * ============================================
 */

/**
 * Example 1: Simple list component
 * 
 * const MyDoctorsPage = () => {
 *   return <DoctorsList language="en" />;
 * };
 */

/**
 * Example 2: With admin functionality
 * 
 * const AdminDoctors = () => {
 *   const [doctors, setDoctors] = useState([]);
 *   const token = getStoredToken();
 * 
 *   const handleDelete = async (id: string) => {
 *     if (token) {
 *       await deleteDoctor(id, token);
 *       // Reload list
 *     }
 *   };
 * 
 *   return <div>...</div>;
 * };
 */

/**
 * Example 3: With login
 * 
 * const LoginPage = () => {
 *   const handleLogin = async (email: string, password: string) => {
 *     const token = await loginAdmin(email, password);
 *     // Redirect to admin panel
 *   };
 * 
 *   return <form onSubmit={handleLogin}>...</form>;
 * };
 */

export default DoctorsList;
