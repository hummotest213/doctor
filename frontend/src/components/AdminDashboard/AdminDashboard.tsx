'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.css';

interface AdminStats {
  doctors: number;
  services: number;
  appointments: number;
  testimonials: number;
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'doctors' | 'services' | 'testimonials' | 'settings'
  >('dashboard');
  const [language, setLanguage] = useState<'en' | 'az' | 'ru'>('en');
  const [loading, setLoading] = useState(false);

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/auth/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Doctor Portal Admin</h1>
        </div>
        <div className={styles.headerRight}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className={styles.languageSelect}
          >
            <option value="en">English</option>
            <option value="az">Azərbaycanca</option>
            <option value="ru">Русский</option>
          </select>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={styles.sidebarContainer}>
        <nav className={styles.sidebar}>
          <button
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'doctors' ? styles.active : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            👨‍⚕️ Doctors
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'services' ? styles.active : ''}`}
            onClick={() => setActiveTab('services')}
          >
            🏥 Services
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'testimonials' ? styles.active : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            ⭐ Testimonials
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>

        {/* Content Area */}
        <div className={styles.content}>
          {activeTab === 'dashboard' && (
            <Dashboard stats={stats} loading={loading} onRefresh={fetchStats} />
          )}
          {activeTab === 'doctors' && <DoctorsManager language={language} apiClient={apiClient} />}
          {activeTab === 'services' && <ServicesManager language={language} apiClient={apiClient} />}
          {activeTab === 'testimonials' && (
            <TestimonialsManager language={language} apiClient={apiClient} />
          )}
          {activeTab === 'settings' && <SettingsManager apiClient={apiClient} />}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
interface DashboardProps {
  stats: AdminStats | null;
  loading: boolean;
  onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, loading, onRefresh }) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Dashboard</h2>
        <button onClick={onRefresh} className={styles.refreshBtn} disabled={loading}>
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {stats ? (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👨‍⚕️</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.doctors}</div>
              <div className={styles.statLabel}>Doctors</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🏥</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.services}</div>
              <div className={styles.statLabel}>Services</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.appointments}</div>
              <div className={styles.statLabel}>Appointments</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{stats.testimonials}</div>
              <div className={styles.statLabel}>Testimonials</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

// Doctors Manager Component
interface DoctorsManagerProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
}

const DoctorsManager: React.FC<DoctorsManagerProps> = ({ language, apiClient }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [language]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/doctors', { params: { language } });
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      try {
        await apiClient.delete(`/doctors/${id}`);
        setDoctors(doctors.filter((d: any) => d.id !== id));
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Doctors</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.primaryBtn}
        >
          {showForm ? '✕ Cancel' : '+ Add Doctor'}
        </button>
      </div>

      {showForm && <DoctorForm language={language} apiClient={apiClient} onSuccess={fetchDoctors} />}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: any) => (
              <tr key={doctor.id}>
                <td>{doctor.name || 'N/A'}</td>
                <td>{doctor.specialties?.[0] || 'N/A'}</td>
                <td>{doctor.experience} years</td>
                <td>
                  <button className={styles.editBtn}>✎ Edit</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(doctor.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Doctor Form Component
interface DoctorFormProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
  onSuccess: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ language, apiClient, onSuccess }) => {
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    bio: '',
    imageUrl: '',
    specialties: '',
    experience: 0,
    qualifications: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const translations = [
        { language, field: 'name', value: formData.name },
        { language, field: 'bio', value: formData.bio },
      ];

      await apiClient.post('/doctors', {
        slug: formData.slug,
        imageUrl: formData.imageUrl,
        specialties: formData.specialties.split(',').map((s) => s.trim()),
        experience: parseInt(formData.experience.toString()),
        qualifications: formData.qualifications.split(',').map((q) => q.trim()),
        translations,
      });

      setFormData({
        slug: '',
        name: '',
        bio: '',
        imageUrl: '',
        specialties: '',
        experience: 0,
        qualifications: '',
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Specialties (comma-separated)</label>
        <input
          type="text"
          value={formData.specialties}
          onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Experience (years)</label>
        <input
          type="number"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Qualifications (comma-separated)</label>
        <input
          type="text"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
        />
      </div>

      <button type="submit" className={styles.primaryBtn}>
        Create Doctor
      </button>
    </form>
  );
};

// Services Manager Component
interface ServicesManagerProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ language, apiClient }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [language]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/services', { params: { language } });
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await apiClient.delete(`/services/${id}`);
        setServices(services.filter((s: any) => s.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.primaryBtn}
        >
          {showForm ? '✕ Cancel' : '+ Add Service'}
        </button>
      </div>

      {showForm && (
        <ServiceForm language={language} apiClient={apiClient} onSuccess={fetchServices} />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: any) => (
              <tr key={service.id}>
                <td>{service.title || 'N/A'}</td>
                <td>{service.description || 'N/A'}</td>
                <td>
                  <button className={styles.editBtn}>✎ Edit</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(service.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Service Form Component
interface ServiceFormProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
  onSuccess: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ language, apiClient, onSuccess }) => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    iconUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const translations = [
        { language, field: 'title', value: formData.title },
        { language, field: 'description', value: formData.description },
      ];

      await apiClient.post('/services', {
        slug: formData.slug,
        iconUrl: formData.iconUrl,
        translations,
      });

      setFormData({ slug: '', title: '', description: '', iconUrl: '' });
      onSuccess();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Icon URL</label>
        <input
          type="url"
          value={formData.iconUrl}
          onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
        />
      </div>

      <button type="submit" className={styles.primaryBtn}>
        Create Service
      </button>
    </form>
  );
};

// Testimonials Manager Component
interface TestimonialsManagerProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
}

const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({ language, apiClient }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, [language]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/testimonials', { params: { language } });
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await apiClient.delete(`/testimonials/${id}`);
        setTestimonials(testimonials.filter((t: any) => t.id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Testimonials</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.primaryBtn}
        >
          {showForm ? '✕ Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <TestimonialForm
          language={language}
          apiClient={apiClient}
          onSuccess={fetchTestimonials}
        />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial: any) => (
              <tr key={testimonial.id}>
                <td>{testimonial.authorName}</td>
                <td>{testimonial.content?.substring(0, 50) || 'N/A'}...</td>
                <td>{'⭐'.repeat(testimonial.rating || 5)}</td>
                <td>
                  <button className={styles.editBtn}>✎ Edit</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Testimonial Form Component
interface TestimonialFormProps {
  language: 'en' | 'az' | 'ru';
  apiClient: any;
  onSuccess: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ language, apiClient, onSuccess }) => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorRole: '',
    content: '',
    rating: 5,
    authorImage: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const translations = [
        { language, field: 'content', value: formData.content },
      ];

      await apiClient.post('/testimonials', {
        authorName: formData.authorName,
        authorRole: formData.authorRole,
        rating: parseInt(formData.rating.toString()),
        authorImage: formData.authorImage,
        translations,
      });

      setFormData({
        authorName: '',
        authorRole: '',
        content: '',
        rating: 5,
        authorImage: '',
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating testimonial:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Author Name</label>
        <input
          type="text"
          value={formData.authorName}
          onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Author Role</label>
        <input
          type="text"
          value={formData.authorRole}
          onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Rating (1-5)</label>
        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Author Image URL</label>
        <input
          type="url"
          value={formData.authorImage}
          onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
        />
      </div>

      <button type="submit" className={styles.primaryBtn}>
        Create Testimonial
      </button>
    </form>
  );
};

// Settings Manager Component
interface SettingsManagerProps {
  apiClient: any;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ apiClient }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/settings');
      setSettings(response.data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (key: string, value: string) => {
    setEditKey(key);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (editKey) {
      try {
        await apiClient.put(`/settings/${editKey}`, { value: editValue });
        setSettings({ ...settings, [editKey]: editValue });
        setEditKey(null);
        setEditValue('');
      } catch (error) {
        console.error('Error updating setting:', error);
      }
    }
  };

  return (
    <div className={styles.section}>
      <h2>Site Settings</h2>

      <div className={styles.settingsGrid}>
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className={styles.settingItem}>
            <label>{key}</label>
            {editKey === key ? (
              <div className={styles.editGroup}>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSave} className={styles.primaryBtn}>
                  Save
                </button>
                <button onClick={() => setEditKey(null)} className={styles.secondaryBtn}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.displayGroup}>
                <p>{value}</p>
                <button
                  onClick={() => handleEdit(key, value)}
                  className={styles.editBtn}
                >
                  ✎ Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
