'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface DoctorData {
  id?: string;
  slug: string;
  name: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  experience: number;
  qualifications: string[];
  [key: string]: any;
}

interface DoctorsManagerProps {
  language: 'en' | 'az' | 'ru';
  showAlert: (message: string, type: 'success' | 'error') => void;
  token: string;
}

export const DoctorsManager: React.FC<DoctorsManagerProps> = ({ language, showAlert, token }) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';
  
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<DoctorData>({
    slug: '',
    name: '',
    bio: '',
    imageUrl: '',
    specialties: [],
    experience: 0,
    qualifications: [],
  });

  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    loadDoctors();
  }, [language]);

  const loadDoctors = async () => {
    try {
      setIsLoading(true);
      console.log(`📥 Loading doctors for language: ${language}`);
      
      const response = await apiClient.get('/doctors', {
        params: { language, page: 1, pageSize: 100 },
      });
      
      console.log('📦 Doctors data received:', response.data.data);
      setDoctors(response.data.data);
    } catch (error: any) {
      console.error('Error loading doctors:', error);
      showAlert('Failed to load doctors', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Build translations for all three languages
      const translations = [
        { language, field: 'name', value: formData.name },
        { language, field: 'bio', value: formData.bio },
      ];

      const payload = {
        slug: formData.slug,
        imageUrl: formData.imageUrl,
        specialties: Array.isArray(formData.specialties) 
          ? formData.specialties 
          : String(formData.specialties).split(',').map(s => s.trim()),
        experience: parseInt(String(formData.experience)),
        qualifications: Array.isArray(formData.qualifications)
          ? formData.qualifications
          : String(formData.qualifications).split(',').map(q => q.trim()),
        translations,
      };

      console.log('📤 Sending doctor data:', payload);

      if (editingId) {
        await apiClient.put(`/doctors/${editingId}`, payload);
        showAlert('Doctor updated successfully', 'success');
      } else {
        await apiClient.post('/doctors', payload);
        showAlert('Doctor created successfully', 'success');
      }

      resetForm();
      loadDoctors();
    } catch (error: any) {
      console.error('Error saving doctor:', error);
      showAlert(
        error.response?.data?.error || 'Failed to save doctor',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (doctor: DoctorData) => {
    setFormData(doctor);
    setEditingId(doctor.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await apiClient.delete(`/doctors/${id}`);
      showAlert('Doctor deleted successfully', 'success');
      loadDoctors();
    } catch (error: any) {
      console.error('Error deleting doctor:', error);
      showAlert('Failed to delete doctor', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      bio: '',
      imageUrl: '',
      specialties: [],
      experience: 0,
      qualifications: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="doctors-manager">
      <div className="manager-header">
        <h2>Doctors Management</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="btn btn-primary"
          disabled={isSaving}
        >
          {showForm ? '✕ Cancel' : '+ Add Doctor'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Experience (years)</label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Specialties (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(formData.specialties) ? formData.specialties.join(', ') : formData.specialties}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialties: e.target.value.split(',').map(s => s.trim()),
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Qualifications (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(formData.qualifications) ? formData.qualifications.join(', ') : formData.qualifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  qualifications: e.target.value.split(',').map(q => q.trim()),
                })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : editingId ? 'Update Doctor' : 'Create Doctor'}
          </button>
        </form>
      )}

      {isLoading ? (
        <p className="loading">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="no-data">No doctors found</p>
      ) : (
        <div className="doctors-list">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-card-header">
                {doctor.imageUrl && <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />}
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialties?.join(', ')}</p>
                </div>
              </div>
              <div className="doctor-card-body">
                <p className="bio">{doctor.bio}</p>
                <p className="meta">Experience: {doctor.experience} years</p>
              </div>
              <div className="doctor-card-actions">
                <button onClick={() => handleEdit(doctor)} className="btn btn-edit">
                  ✎ Edit
                </button>
                <button onClick={() => handleDelete(doctor.id!)} className="btn btn-delete">
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .doctors-manager {
          padding: 2rem 0;
        }

        .manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .manager-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .doctor-form {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-edit {
          background: #e3f2fd;
          color: #1976d2;
          border: 1px solid #1976d2;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        .btn-edit:hover {
          background: #1976d2;
          color: white;
        }

        .btn-delete {
          background: #ffebee;
          color: #d32f2f;
          border: 1px solid #d32f2f;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        .btn-delete:hover {
          background: #d32f2f;
          color: white;
        }

        .loading,
        .no-data {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-size: 1.1rem;
        }

        .doctors-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .doctor-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .doctor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .doctor-card-header {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #f9f9f9;
          align-items: flex-start;
        }

        .doctor-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
        }

        .doctor-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #333;
        }

        .doctor-info .specialty {
          margin: 0;
          color: #667eea;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .doctor-card-body {
          padding: 1rem;
        }

        .doctor-card-body .bio {
          margin: 0 0 0.75rem 0;
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .doctor-card-body .meta {
          margin: 0;
          font-size: 0.85rem;
          color: #999;
        }

        .doctor-card-actions {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        .doctor-card-actions .btn {
          flex: 1;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .doctors-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorsManager;
