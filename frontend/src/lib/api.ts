/**
 * API Configuration & Helper Functions
 * Centralized API calls to backend
 */

const getApiBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  
  // Ensure URL ends with /api
  if (!url.endsWith('/api')) {
    url = url.endsWith('/') ? url + 'api' : url + '/api';
  }
  
  return url;
};

const API_BASE_URL = getApiBaseUrl();

// ============== TYPES ==============
export interface Hero {
  id?: number;
  title?: string; // Made optional to prevent build errors on empty returns
  title_highlight?: string;
  description?: string;
  logo_text?: string;
  logo_image_url?: string;
  doctor_image_url?: string;
  members_treated_count?: number;
  members_treated_label?: string;
  virtual_patients_count?: number;
  virtual_patients_label?: string;
  licensed_doctors_count?: number;
  licensed_doctors_label?: string;
  banner_image_url?: string;
  register_button_text?: string;
}

export interface Navbar {
  logo_image_url?: string;
  logo_text?: string;
}

export interface About {
  id?: number;
  subtitle?: string;
  title?: string;
  description?: string;
  image_url?: string;
  paragraph1?: string;
  paragraph2?: string;
  statistic1_numbers?: string;
  statistic1_suffix?: string;
  statistic1_description?: string;
  statistic2_numbers?: string;
  statistic2_suffix?: string;
  statistic2_description?: string;
  statistic3_numbers?: string;
  statistic3_suffix?: string;
  statistic3_description?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon_url?: string;
  key?: string;
  features: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Appointment {
  id?: number;
  title?: string;
  subtitle?: string;
  form_name_label?: string;
  form_name_placeholder?: string;
  form_email_label?: string;
  form_email_placeholder?: string;
  form_phone_label?: string;
  form_phone_placeholder?: string;
  form_service_label?: string;
  form_service_placeholder?: string;
  form_date_label?: string;
  form_date_placeholder?: string;
  form_time_label?: string;
  form_time_placeholder?: string;
  form_message_label?: string;
  form_message_placeholder?: string;
  form_button_text?: string;
}

export interface Contact {
  id?: number;
  title?: string;
  subtitle?: string;
  phone_label?: string;
  phone?: string;
  email_label?: string;
  email?: string;
  address_label?: string;
  address?: string;
  form_name_label?: string;
  form_email_label?: string;
  form_phone_label?: string;
  form_subject_label?: string;
  form_message_label?: string;
  contact_image_url?: string;
}

export interface Feedback {
  id: number;
  name: string;
  location?: string;
  text: string;
  rating?: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Blog {
  id: number;
  title: string;
  category: string;
  content?: string;
  short_description?: string;
  image_url?: string;
  language_code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  doctor?: string;
  notes?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  number: string;
  text: string;
}

// ============== HERO ENDPOINTS ==============
export async function getHero(language: string = 'az'): Promise<Hero> {
  try {
    const response = await fetch(`${API_BASE_URL}/hero?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch hero');
    return await response.json();
  } catch (error) {
    console.error('Error fetching hero:', error);
    return {}; // Now valid because Hero properties are optional
  }
}

// ============== NAVBAR ENDPOINTS ==============
export async function getNavbar(): Promise<Navbar> {
  try {
    const response = await fetch(`${API_BASE_URL}/navbar`);
    if (!response.ok) throw new Error('Failed to fetch navbar');
    return await response.json();
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return { logo_image_url: '/images/logo.png', logo_text: 'Dr. Aytən Abdullayeva' };
  }
}

// ============== ABOUT ENDPOINTS ==============
export async function getAbout(language: string = 'az'): Promise<About> {
  try {
    const response = await fetch(`${API_BASE_URL}/about?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch about');
    return await response.json();
  } catch (error) {
    console.error('Error fetching about:', error);
    return {};
  }
}

// ============== SERVICES ENDPOINTS ==============
export async function getServices(language: string = 'az'): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/services?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(id: number, language: string = 'az'): Promise<Service | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return await response.json();
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// ============== APPOINTMENT ENDPOINTS ==============
export async function getAppointmentConfig(language: string = 'az'): Promise<Appointment> {
  try {
    const response = await fetch(`${API_BASE_URL}/appointment?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch appointment config');
    return await response.json();
  } catch (error) {
    console.error('Error fetching appointment config:', error);
    return {};
  }
}

export async function submitAppointment(data: AppointmentSubmission): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit appointment');
    }

    return { success: true, message: 'Appointment submitted successfully' };
  } catch (error) {
    console.error('Error submitting appointment:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit appointment'
    };
  }
}

// ============== CONTACT ENDPOINTS ==============
export async function getContactInfo(language: string = 'az'): Promise<Contact> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch contact info');
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return {};
  }
}

export async function submitContact(data: ContactSubmission): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit contact form');
    }

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit contact form'
    };
  }
}

// ============== FEEDBACKS ENDPOINTS ==============
export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/feedbacks`);
    if (!response.ok) throw new Error('Failed to fetch feedbacks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return [];
  }
}

export async function getFeedback(id: number): Promise<Feedback | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/feedbacks/${id}`);
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return null;
  }
}

// ============== BLOGS ENDPOINTS ==============
export async function getBlogs(language: string = 'az'): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlog(id: number, language: string = 'az'): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}?lang=${language}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// ============== EXPORT ENDPOINTS ==============
export async function exportAllData() {
  try {
    const response = await fetch(`${API_BASE_URL}/export`);
    if (!response.ok) throw new Error('Failed to export data');
    return await response.json();
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
}

// ============== HEALTH CHECK ==============
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}