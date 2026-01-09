'use client';

import React, { useState, useEffect } from 'react';

interface AppointmentData {
  title: string | null;
  subtitle: string | null;
  form_name_label: string | null;
  form_name_placeholder: string | null;
  form_email_label: string | null;
  form_email_placeholder: string | null;
  form_phone_label: string | null;
  form_phone_placeholder: string | null;
  form_service_label: string | null;
  form_service_placeholder: string | null;
  form_date_label: string | null;
  form_date_placeholder: string | null;
  form_time_label: string | null;
  form_time_placeholder: string | null;
  form_message_label: string | null;
  form_message_placeholder: string | null;
  form_button_text: string | null;
}

interface AppointmentSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({ language, showAlert }) => {
  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    if (!url.endsWith('/api')) {
      url = url.endsWith('/') ? url + 'api' : url + '/api';
    }
    return url;
  };
  const API_URL = getApiUrl();

  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    title: null,
    subtitle: null,
    form_name_label: null,
    form_name_placeholder: null,
    form_email_label: null,
    form_email_placeholder: null,
    form_phone_label: null,
    form_phone_placeholder: null,
    form_service_label: null,
    form_service_placeholder: null,
    form_date_label: null,
    form_date_placeholder: null,
    form_time_label: null,
    form_time_placeholder: null,
    form_message_label: null,
    form_message_placeholder: null,
    form_button_text: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAppointmentData(language);
  }, [language]);

  const loadAppointmentData = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`Loading appointment data for language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/appointment?lang=${fetchLang}`);
      if (!response.ok) throw new Error('Failed to load appointment data');
      
      const data = await response.json();
      console.log('Loaded appointment data:', data);
      
      // Clean data: convert null/undefined/empty strings to null, keep actual values
      const cleanedData: AppointmentData = {
        title: data.title && typeof data.title === 'string' && data.title.trim() ? data.title : null,
        subtitle: data.subtitle && typeof data.subtitle === 'string' && data.subtitle.trim() ? data.subtitle : null,
        form_name_label: data.form_name_label && typeof data.form_name_label === 'string' && data.form_name_label.trim() ? data.form_name_label : null,
        form_name_placeholder: data.form_name_placeholder && typeof data.form_name_placeholder === 'string' && data.form_name_placeholder.trim() ? data.form_name_placeholder : null,
        form_email_label: data.form_email_label && typeof data.form_email_label === 'string' && data.form_email_label.trim() ? data.form_email_label : null,
        form_email_placeholder: data.form_email_placeholder && typeof data.form_email_placeholder === 'string' && data.form_email_placeholder.trim() ? data.form_email_placeholder : null,
        form_phone_label: data.form_phone_label && typeof data.form_phone_label === 'string' && data.form_phone_label.trim() ? data.form_phone_label : null,
        form_phone_placeholder: data.form_phone_placeholder && typeof data.form_phone_placeholder === 'string' && data.form_phone_placeholder.trim() ? data.form_phone_placeholder : null,
        form_service_label: data.form_service_label && typeof data.form_service_label === 'string' && data.form_service_label.trim() ? data.form_service_label : null,
        form_service_placeholder: data.form_service_placeholder && typeof data.form_service_placeholder === 'string' && data.form_service_placeholder.trim() ? data.form_service_placeholder : null,
        form_date_label: data.form_date_label && typeof data.form_date_label === 'string' && data.form_date_label.trim() ? data.form_date_label : null,
        form_date_placeholder: data.form_date_placeholder && typeof data.form_date_placeholder === 'string' && data.form_date_placeholder.trim() ? data.form_date_placeholder : null,
        form_time_label: data.form_time_label && typeof data.form_time_label === 'string' && data.form_time_label.trim() ? data.form_time_label : null,
        form_time_placeholder: data.form_time_placeholder && typeof data.form_time_placeholder === 'string' && data.form_time_placeholder.trim() ? data.form_time_placeholder : null,
        form_message_label: data.form_message_label && typeof data.form_message_label === 'string' && data.form_message_label.trim() ? data.form_message_label : null,
        form_message_placeholder: data.form_message_placeholder && typeof data.form_message_placeholder === 'string' && data.form_message_placeholder.trim() ? data.form_message_placeholder : null,
        form_button_text: data.form_button_text && typeof data.form_button_text === 'string' && data.form_button_text.trim() ? data.form_button_text : null,
      };
      
      setAppointmentData(cleanedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading appointment data:', error);
      setIsLoading(false);
      showAlert('Görüş məlumatlarını yükləmək mümkün olmadı', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAppointment = async () => {
    try {
      console.log('=== APPOINTMENT SAVE START ===');
      console.log('Current state:', appointmentData);
      
      let fieldCount = 1; // language field
      const dataToSend: any = { language };
      
      if (appointmentData.title && appointmentData.title.trim() !== '') {
        console.log('✓ Appending title:', appointmentData.title.trim());
        dataToSend.title = appointmentData.title.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping title (null/empty)', appointmentData.title);
      }
      
      if (appointmentData.subtitle && appointmentData.subtitle.trim() !== '') {
        console.log('✓ Appending subtitle:', appointmentData.subtitle.trim());
        dataToSend.subtitle = appointmentData.subtitle.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping subtitle (null/empty)', appointmentData.subtitle);
      }
      
      if (appointmentData.form_name_label && appointmentData.form_name_label.trim() !== '') {
        console.log('✓ Appending form_name_label:', appointmentData.form_name_label.trim());
        dataToSend.form_name_label = appointmentData.form_name_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_name_label (null/empty)', appointmentData.form_name_label);
      }
      
      if (appointmentData.form_name_placeholder && appointmentData.form_name_placeholder.trim() !== '') {
        console.log('✓ Appending form_name_placeholder:', appointmentData.form_name_placeholder.trim());
        dataToSend.form_name_placeholder = appointmentData.form_name_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_name_placeholder (null/empty)', appointmentData.form_name_placeholder);
      }
      
      if (appointmentData.form_email_label && appointmentData.form_email_label.trim() !== '') {
        console.log('✓ Appending form_email_label:', appointmentData.form_email_label.trim());
        dataToSend.form_email_label = appointmentData.form_email_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_email_label (null/empty)', appointmentData.form_email_label);
      }
      
      if (appointmentData.form_email_placeholder && appointmentData.form_email_placeholder.trim() !== '') {
        console.log('✓ Appending form_email_placeholder:', appointmentData.form_email_placeholder.trim());
        dataToSend.form_email_placeholder = appointmentData.form_email_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_email_placeholder (null/empty)', appointmentData.form_email_placeholder);
      }
      
      if (appointmentData.form_phone_label && appointmentData.form_phone_label.trim() !== '') {
        console.log('✓ Appending form_phone_label:', appointmentData.form_phone_label.trim());
        dataToSend.form_phone_label = appointmentData.form_phone_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_phone_label (null/empty)', appointmentData.form_phone_label);
      }
      
      if (appointmentData.form_phone_placeholder && appointmentData.form_phone_placeholder.trim() !== '') {
        console.log('✓ Appending form_phone_placeholder:', appointmentData.form_phone_placeholder.trim());
        dataToSend.form_phone_placeholder = appointmentData.form_phone_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_phone_placeholder (null/empty)', appointmentData.form_phone_placeholder);
      }
      
      if (appointmentData.form_service_label && appointmentData.form_service_label.trim() !== '') {
        console.log('✓ Appending form_service_label:', appointmentData.form_service_label.trim());
        dataToSend.form_service_label = appointmentData.form_service_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_service_label (null/empty)', appointmentData.form_service_label);
      }
      
      if (appointmentData.form_service_placeholder && appointmentData.form_service_placeholder.trim() !== '') {
        console.log('✓ Appending form_service_placeholder:', appointmentData.form_service_placeholder.trim());
        dataToSend.form_service_placeholder = appointmentData.form_service_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_service_placeholder (null/empty)', appointmentData.form_service_placeholder);
      }
      
      if (appointmentData.form_date_label && appointmentData.form_date_label.trim() !== '') {
        console.log('✓ Appending form_date_label:', appointmentData.form_date_label.trim());
        dataToSend.form_date_label = appointmentData.form_date_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_date_label (null/empty)', appointmentData.form_date_label);
      }
      
      if (appointmentData.form_date_placeholder && appointmentData.form_date_placeholder.trim() !== '') {
        console.log('✓ Appending form_date_placeholder:', appointmentData.form_date_placeholder.trim());
        dataToSend.form_date_placeholder = appointmentData.form_date_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_date_placeholder (null/empty)', appointmentData.form_date_placeholder);
      }
      
      if (appointmentData.form_time_label && appointmentData.form_time_label.trim() !== '') {
        console.log('✓ Appending form_time_label:', appointmentData.form_time_label.trim());
        dataToSend.form_time_label = appointmentData.form_time_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_time_label (null/empty)', appointmentData.form_time_label);
      }
      
      if (appointmentData.form_time_placeholder && appointmentData.form_time_placeholder.trim() !== '') {
        console.log('✓ Appending form_time_placeholder:', appointmentData.form_time_placeholder.trim());
        dataToSend.form_time_placeholder = appointmentData.form_time_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_time_placeholder (null/empty)', appointmentData.form_time_placeholder);
      }
      
      if (appointmentData.form_message_label && appointmentData.form_message_label.trim() !== '') {
        console.log('✓ Appending form_message_label:', appointmentData.form_message_label.trim());
        dataToSend.form_message_label = appointmentData.form_message_label.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_message_label (null/empty)', appointmentData.form_message_label);
      }
      
      if (appointmentData.form_message_placeholder && appointmentData.form_message_placeholder.trim() !== '') {
        console.log('✓ Appending form_message_placeholder:', appointmentData.form_message_placeholder.trim());
        dataToSend.form_message_placeholder = appointmentData.form_message_placeholder.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_message_placeholder (null/empty)', appointmentData.form_message_placeholder);
      }
      
      if (appointmentData.form_button_text && appointmentData.form_button_text.trim() !== '') {
        console.log('✓ Appending form_button_text:', appointmentData.form_button_text.trim());
        dataToSend.form_button_text = appointmentData.form_button_text.trim();
        fieldCount++;
      } else {
        console.log('✗ Skipping form_button_text (null/empty)', appointmentData.form_button_text);
      }

      console.log(`=== Sending ${fieldCount} fields to backend ===`);
      
      const response = await fetch(`${API_URL}/appointment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      if (!response.ok) throw new Error('Failed to save appointment data');

      showAlert(`Görüş təyin məzmunu ${language.toUpperCase()} dildə yadda saxlandı!`, 'success');
      
      console.log('=== Reloading appointment data ===');
      // Reload data with proper language parameter
      await loadAppointmentData(language);
      console.log('=== APPOINTMENT SAVE END ===');
    } catch (error) {
      console.error('Error saving appointment data:', error);
      showAlert('Görüş təyin məzmununu yadda saxlamaq mümkün olmadı', 'error');
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Görüş Səhifəsi Məzmunu</h2>

      <div className="form-group">
        <label>Səhifə Başlığı</label>
        <input
          type="text"
          name="title"
          value={appointmentData.title || ''}
          onChange={handleInputChange}
          placeholder="Başlıq"
        />
      </div>

      <div className="form-group">
        <label>Səhifə Alt Başlığı</label>
        <input
          type="text"
          name="subtitle"
          value={appointmentData.subtitle || ''}
          onChange={handleInputChange}
          placeholder="Alt başlıq"
        />
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Form Etiketləri</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Ad Etiketi</label>
          <input
            type="text"
            name="form_name_label"
            value={appointmentData.form_name_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Ad Placeholder</label>
          <input
            type="text"
            name="form_name_placeholder"
            value={appointmentData.form_name_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>E-poçt Etiketi</label>
          <input
            type="text"
            name="form_email_label"
            value={appointmentData.form_email_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>E-poçt Placeholder</label>
          <input
            type="text"
            name="form_email_placeholder"
            value={appointmentData.form_email_placeholder || ''}
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
            value={appointmentData.form_phone_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Telefon Placeholder</label>
          <input
            type="text"
            name="form_phone_placeholder"
            value={appointmentData.form_phone_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Xidmət Etiketi</label>
          <input
            type="text"
            name="form_service_label"
            value={appointmentData.form_service_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Xidmət Placeholder</label>
          <input
            type="text"
            name="form_service_placeholder"
            value={appointmentData.form_service_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tarix Etiketi</label>
          <input
            type="text"
            name="form_date_label"
            value={appointmentData.form_date_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tarix Placeholder</label>
          <input
            type="text"
            name="form_date_placeholder"
            value={appointmentData.form_date_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Vaxt Etiketi</label>
          <input
            type="text"
            name="form_time_label"
            value={appointmentData.form_time_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Vaxt Placeholder</label>
          <input
            type="text"
            name="form_time_placeholder"
            value={appointmentData.form_time_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mesaj Etiketi</label>
          <input
            type="text"
            name="form_message_label"
            value={appointmentData.form_message_label || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mesaj Placeholder</label>
          <input
            type="text"
            name="form_message_placeholder"
            value={appointmentData.form_message_placeholder || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Düymə Mətni</label>
        <input
          type="text"
          name="form_button_text"
          value={appointmentData.form_button_text || ''}
          onChange={handleInputChange}
          placeholder="Görüş Təyin Et"
        />
      </div>

      <div className="btn-group">
        <button className="btn btn-success" onClick={handleSaveAppointment}>
          Görüş Məlumatlarını Yadda Saxla
        </button>
      </div>
    </div>
  );
};

export default AppointmentSection;
