'use client';

import React, { useState, useEffect } from 'react';

interface ServicesService {
  id?: number;
  title: string | null;
  description: string | null;
  icon?: string | null;
  key: string | null;
  features: string[];
}

interface ServicesSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ language, showAlert }) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const [services, setServices] = useState<ServicesService[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ServicesService>({
    title: null,
    description: null,
    key: null,
    features: [],
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadServices(language);
  }, [language]);

  const loadServices = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`Loading services for language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/services?lang=${fetchLang}`);
      if (!response.ok) throw new Error('Failed to load services');
      
      const data = await response.json();
      console.log('Loaded services:', data);
      
      setServices(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setIsLoading(false);
      showAlert('Xidmətləri yükləmək mümkün olmadı', 'error');
    }
  };

  const openServiceModal = (serviceId?: number) => {
    if (serviceId) {
      setCurrentServiceId(serviceId);
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          icon: service.icon,
          key: service.key,
          features: service.features || [],
        });
      }
    } else {
      setCurrentServiceId(null);
      setFormData({
        title: null,
        description: null,
        key: null,
        features: [],
      });
    }
    setIconFile(null);
    setShowModal(true);
  };

  const closeServiceModal = () => {
    setShowModal(false);
    setCurrentServiceId(null);
    setIconFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(f => f.trim());
    setFormData(prev => ({ ...prev, features }));
  };

  const handleSaveService = async () => {
    if (!formData.title || formData.title.trim() === '' || !formData.description || formData.description.trim() === '' || !formData.key || formData.key.trim() === '') {
      showAlert('Lütfən bütün lazimi sahələri doldurun', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      if (formData.title && formData.title.trim() !== '') {
        formDataToSend.append('title', formData.title.trim());
      }
      if (formData.description && formData.description.trim() !== '') {
        formDataToSend.append('description', formData.description.trim());
      }
      if (formData.key && formData.key.trim() !== '') {
        formDataToSend.append('key', formData.key.trim());
      }
      formDataToSend.append('language_code', language);
      formData.features.forEach((feature, index) => {
        if (feature.trim() !== '') {
          formDataToSend.append(`features[${index}]`, feature.trim());
        }
      });

      if (iconFile) {
        formDataToSend.append('icon', iconFile);
      }

      const url = currentServiceId ? `${API_URL}/services/${currentServiceId}` : `${API_URL}/services`;
      const method = currentServiceId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to save service');

      showAlert(currentServiceId ? 'Xidmət yeniləndi!' : 'Xidmət əlavə edildi!', 'success');
      closeServiceModal();
      
      // Reload services with proper language parameter
      await loadServices(language);
    } catch (error) {
      console.error('Error saving service:', error);
      showAlert('Xidməti yadda saxlamaq mümkün olmadı', 'error');
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    if (!confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) return;

    try {
      const response = await fetch(`${API_URL}/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete service');

      showAlert('Xidmət silindi!', 'success');
      
      // Reload services with proper language parameter
      await loadServices(language);
    } catch (error) {
      console.error('Error deleting service:', error);
      showAlert('Xidməti silmək mümkün olmadı', 'error');
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Xidmətlərin İdarə Edilməsi</h2>

      <button className="btn btn-primary" onClick={() => openServiceModal()}>
        + Yeni Xidmət Əlavə Et
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Başlıq</th>
              <th>Təsvir</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.description ? service.description.substring(0, 50) : 'N/A'}...</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => openServiceModal(service.id)}
                    >
                      Redaktə et
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => service.id && handleDeleteService(service.id)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Modal */}
      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <button className="close-modal" onClick={closeServiceModal}>&times;</button>
            <h3>{currentServiceId ? 'Xidməti Redaktə Et' : 'Xidmət Əlavə Et'}</h3>

            <div className="form-group">
              <label>Başlıq</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Xidmət başlığı"
              />
            </div>

            <div className="form-group">
              <label>Təsvir</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Xidmətin təsviri"
              />
            </div>

            <div className="form-group">
              <label>İkon Faylı</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIconFile(e.target.files?.[0] || null)}
              />
              <small className="image-hint">PNG, SVG və ya digər şəkil formatları qəbul olunur</small>
            </div>

            <div className="form-group">
              <label>Açar (tərcümələr üçün)</label>
              <input
                type="text"
                name="key"
                value={formData.key || ''}
                onChange={handleInputChange}
                placeholder="məs., cancerScreening"
              />
            </div>

            <div className="form-group">
              <label>Xüsusiyyətlər (hər birini yeni sətirdə əlavə edin)</label>
              <textarea
                value={formData.features.join('\n')}
                onChange={handleFeaturesChange}
                placeholder="Xüsusiyyət 1&#10;Xüsusiyyət 2&#10;Xüsusiyyət 3"
              />
            </div>

            <div className="btn-group">
              <button className="btn btn-success" onClick={handleSaveService}>
                Xidməti Yadda Saxla
              </button>
              <button className="btn btn-secondary" onClick={closeServiceModal}>
                Ləğv et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
