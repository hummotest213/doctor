'use client';

import React, { useState, useEffect } from 'react';

interface ContactData {
  title: string | null;
  subtitle: string | null;
  phone_label: string | null;
  phone: string | null;
  email_label: string | null;
  email: string | null;
  address_label: string | null;
  address: string | null;
  form_name_label: string | null;
  form_email_label: string | null;
  form_phone_label: string | null;
  form_subject_label: string | null;
  form_message_label: string | null;
  contact_image_url?: string | null;
}

interface ContactSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language, showAlert }) => {
  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    if (!url.endsWith('/api')) {
      url = url.endsWith('/') ? url + 'api' : url + '/api';
    }
    return url;
  };
  const API_URL = getApiUrl();

  const [contactData, setContactData] = useState<ContactData>({
    title: null,
    subtitle: null,
    phone_label: null,
    phone: null,
    email_label: null,
    email: null,
    address_label: null,
    address: null,
    form_name_label: null,
    form_email_label: null,
    form_phone_label: null,
    form_subject_label: null,
    form_message_label: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadContactData(language);
  }, [language]);

  const loadContactData = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`Loading contact data for language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/contact?lang=${fetchLang}`);
      if (!response.ok) throw new Error('Failed to load contact data');
      
      const data = await response.json();
      console.log('Loaded contact data:', data);
      
      // Clean data: convert null/undefined/empty strings to null, keep actual values
      const cleanedData: ContactData = {
        title: data.title && typeof data.title === 'string' && data.title.trim() ? data.title : null,
        subtitle: data.subtitle && typeof data.subtitle === 'string' && data.subtitle.trim() ? data.subtitle : null,
        phone_label: data.phone_label && typeof data.phone_label === 'string' && data.phone_label.trim() ? data.phone_label : null,
        phone: data.phone && typeof data.phone === 'string' && data.phone.trim() ? data.phone : null,
        email_label: data.email_label && typeof data.email_label === 'string' && data.email_label.trim() ? data.email_label : null,
        email: data.email && typeof data.email === 'string' && data.email.trim() ? data.email : null,
        address_label: data.address_label && typeof data.address_label === 'string' && data.address_label.trim() ? data.address_label : null,
        address: data.address && typeof data.address === 'string' && data.address.trim() ? data.address : null,
        form_name_label: data.form_name_label && typeof data.form_name_label === 'string' && data.form_name_label.trim() ? data.form_name_label : null,
        form_email_label: data.form_email_label && typeof data.form_email_label === 'string' && data.form_email_label.trim() ? data.form_email_label : null,
        form_phone_label: data.form_phone_label && typeof data.form_phone_label === 'string' && data.form_phone_label.trim() ? data.form_phone_label : null,
        form_subject_label: data.form_subject_label && typeof data.form_subject_label === 'string' && data.form_subject_label.trim() ? data.form_subject_label : null,
        form_message_label: data.form_message_label && typeof data.form_message_label === 'string' && data.form_message_label.trim() ? data.form_message_label : null,
        contact_image_url: data.contact_image_url && typeof data.contact_image_url === 'string' && data.contact_image_url.trim() ? data.contact_image_url : null,
      };
      
      setContactData(cleanedData);
      setImage(null);
      setImagePreview(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading contact data:', error);
      setIsLoading(false);
      showAlert('Əlaqə məlumatlarını yükləmək mümkün olmadı', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveContact = async () => {
    if (!contactData.title || !contactData.phone) {
      showAlert('Başlıq və telefon məlumatları doldurulmalıdır', 'error');
      return;
    }

    setIsSaving(true);
    try {
      console.log('=== CONTACT SAVE START ===');
      console.log('Current state:', contactData);
      
      const formData = new FormData();
      formData.append('language', language);
      let fieldCount = 1;
      
      if (contactData.title && contactData.title.trim() !== '') {
        console.log('✓ Appending title:', contactData.title.trim());
        formData.append('title', contactData.title.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping title (null/empty)', contactData.title);
      }
      
      if (contactData.subtitle && contactData.subtitle.trim() !== '') {
        console.log('✓ Appending subtitle:', contactData.subtitle.trim());
        formData.append('subtitle', contactData.subtitle.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping subtitle (null/empty)', contactData.subtitle);
      }
      
      if (contactData.phone_label && contactData.phone_label.trim() !== '') {
        console.log('✓ Appending phone_label:', contactData.phone_label.trim());
        formData.append('phone_label', contactData.phone_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping phone_label (null/empty)', contactData.phone_label);
      }
      
      if (contactData.phone && contactData.phone.trim() !== '') {
        console.log('✓ Appending phone:', contactData.phone.trim());
        formData.append('phone', contactData.phone.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping phone (null/empty)', contactData.phone);
      }
      
      if (contactData.email_label && contactData.email_label.trim() !== '') {
        console.log('✓ Appending email_label:', contactData.email_label.trim());
        formData.append('email_label', contactData.email_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping email_label (null/empty)', contactData.email_label);
      }
      
      if (contactData.email && contactData.email.trim() !== '') {
        console.log('✓ Appending email:', contactData.email.trim());
        formData.append('email', contactData.email.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping email (null/empty)', contactData.email);
      }
      
      if (contactData.address_label && contactData.address_label.trim() !== '') {
        console.log('✓ Appending address_label:', contactData.address_label.trim());
        formData.append('address_label', contactData.address_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping address_label (null/empty)', contactData.address_label);
      }
      
      if (contactData.address && contactData.address.trim() !== '') {
        console.log('✓ Appending address:', contactData.address.trim());
        formData.append('address', contactData.address.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping address (null/empty)', contactData.address);
      }
      
      if (contactData.form_name_label && contactData.form_name_label.trim() !== '') {
        console.log('✓ Appending form_name_label:', contactData.form_name_label.trim());
        formData.append('form_name_label', contactData.form_name_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping form_name_label (null/empty)', contactData.form_name_label);
      }
      
      if (contactData.form_email_label && contactData.form_email_label.trim() !== '') {
        console.log('✓ Appending form_email_label:', contactData.form_email_label.trim());
        formData.append('form_email_label', contactData.form_email_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping form_email_label (null/empty)', contactData.form_email_label);
      }
      
      if (contactData.form_phone_label && contactData.form_phone_label.trim() !== '') {
        console.log('✓ Appending form_phone_label:', contactData.form_phone_label.trim());
        formData.append('form_phone_label', contactData.form_phone_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping form_phone_label (null/empty)', contactData.form_phone_label);
      }
      
      if (contactData.form_subject_label && contactData.form_subject_label.trim() !== '') {
        console.log('✓ Appending form_subject_label:', contactData.form_subject_label.trim());
        formData.append('form_subject_label', contactData.form_subject_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping form_subject_label (null/empty)', contactData.form_subject_label);
      }
      
      if (contactData.form_message_label && contactData.form_message_label.trim() !== '') {
        console.log('✓ Appending form_message_label:', contactData.form_message_label.trim());
        formData.append('form_message_label', contactData.form_message_label.trim());
        fieldCount++;
      } else {
        console.log('✗ Skipping form_message_label (null/empty)', contactData.form_message_label);
      }

      if (image) {
        console.log('✓ Appending contact_image:', image.name);
        formData.append('contact_image', image);
        fieldCount++;
      } else {
        console.log('✗ Skipping contact_image (null/empty)');
      }

      console.log(`=== Sending ${fieldCount} fields to backend ===`);
      
      const response = await fetch(`${API_URL}/contact`, {
        method: 'PUT',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      if (!response.ok) throw new Error('Failed to save contact data');

      showAlert(`Əlaqə məzmunu ${language.toUpperCase()} dildə yadda saxlandı!`, 'success');
      setImage(null);
      setImagePreview(null);
      
      console.log('=== Reloading contact data ===');
      // Reload data with proper language parameter
      await loadContactData(language);
      console.log('=== CONTACT SAVE END ===');
    } catch (error) {
      console.error('Error saving contact data:', error);
      showAlert('Əlaqə məzmununu yadda saxlamaq mümkün olmadı', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Əlaqə Səhifəsi Məzmunu</h2>

      <div className="form-group">
        <label>Səhifə Başlığı</label>
        <input
          type="text"
          name="title"
          value={contactData.title || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Səhifə Alt Başlığı</label>
        <input
          type="text"
          name="subtitle"
          value={contactData.subtitle || ''}
          onChange={handleInputChange}
        />
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Əlaqə Məlumatları</h3>

      <div className="form-group">
        <label>Telefon Başlığı/Etiketi</label>
        <input
          type="text"
          name="phone_label"
          value={contactData.phone_label || ''}
          onChange={handleInputChange}
          placeholder="məs., Qəbul üçün zəng"
        />
      </div>

      <div className="form-group">
        <label>Telefon Nömrəsi</label>
        <input
          type="text"
          name="phone"
          value={contactData.phone || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>E-poçt Başlığı/Etiketi</label>
        <input
          type="text"
          name="email_label"
          value={contactData.email_label || ''}
          onChange={handleInputChange}
          placeholder="məs., E-poçt"
        />
      </div>

      <div className="form-group">
        <label>E-poçt Ünvanı</label>
        <input
          type="text"
          name="email"
          value={contactData.email || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Ünvan Başlığı/Etiketi</label>
        <input
          type="text"
          name="address_label"
          value={contactData.address_label || ''}
          onChange={handleInputChange}
          placeholder="məs., Ünvan"
        />
      </div>

      <div className="form-group">
        <label>Ünvan</label>
        <input
          type="text"
          name="address"
          value={contactData.address || ''}
          onChange={handleInputChange}
        />
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Form Etiketləri</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Ad Etiketi</label>
          <input
            type="text"
            name="form_name_label"
            value={contactData.form_name_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>E-poçt Etiketi</label>
          <input
            type="text"
            name="form_email_label"
            value={contactData.form_email_label || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Telefon Etiketi</label>
          <input
            type="text"
            name="form_phone_label"
            value={contactData.form_phone_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mövzu Etiketi</label>
          <input
            type="text"
            name="form_subject_label"
            value={contactData.form_subject_label || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Mesaj Etiketi</label>
        <input
          type="text"
          name="form_message_label"
          value={contactData.form_message_label || ''}
          onChange={handleInputChange}
        />
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Şəkil</h3>

      <div className="form-group">
        <label>Əlaqə Səhifəsi Şəkili (Yükləmə)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Yeni Şəkil Önizləməsi:</p>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        {contactData.contact_image_url && !imagePreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Cari Şəkil:</p>
            <img 
              src={contactData.contact_image_url} 
              alt="Current" 
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
          Maksimum ölçü: 5MB. Dəstəklənən formatlar: JPEG, PNG, GIF, SVG
        </small>
      </div>

      <div className="btn-group">
        <button 
          className="btn btn-success" 
          onClick={handleSaveContact}
          disabled={isSaving}
          style={{ opacity: isSaving ? 0.6 : 1 }}
        >
          {isSaving ? 'Yadda Saxlanır...' : 'Əlaqə Məlumatlarını Yadda Saxla'}
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
