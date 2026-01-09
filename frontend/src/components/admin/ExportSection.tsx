'use client';

import React from 'react';

interface ExportSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({ language, showAlert }) => {
  const API_URL = 'https://server.ginekoloqayten.online/api';

  const handleExportData = async () => {
    try {
      const response = await fetch(`${API_URL}/export?lang=${language}`);
      if (!response.ok) throw new Error('Failed to export data');

      const data = await response.json();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `doctor-website-data-${language}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showAlert(`Məlumatlar ${language.toUpperCase()} dildə uğurla ixrac edildi!`, 'success');
    } catch (error) {
      console.error('Error exporting data:', error);
      showAlert('Məlumatları ixrac etmək mümkün olmadı', 'error');
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Məlumatları İxrac Et</h2>

      <p style={{ marginBottom: '20px', color: '#7f8c8d' }}>
        Bütün məzmununuzu ehtiyat nüsxə və ya miqrasiya üçün JSON faylı olaraq yükləyin.
      </p>

      <button className="btn btn-primary" onClick={handleExportData}>
        Bütün Məlumatları Yüklə (JSON)
      </button>

      <div style={{ marginTop: '30px', padding: '15px', background: '#ecf0f1', borderRadius: '4px' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Mövcud Endpoint-lər:</h4>
        <p style={{ color: '#7f8c8d', fontSize: '13px' }}>
          <strong>GET /api/hero</strong> - Hero bölməsinin məlumatlarını əldə edin<br />
          <strong>GET /api/about</strong> - Haqqımızda bölməsinin məlumatlarını əldə edin<br />
          <strong>GET /api/services</strong> - Bütün xidmətləri əldə edin<br />
          <strong>GET /api/appointment</strong> - Görüş məlumatlarını əldə edin<br />
          <strong>GET /api/contact</strong> - Əlaqə məlumatlarını əldə edin<br />
          <strong>GET /api/feedbacks</strong> - Bütün rəyləri əldə edin<br />
          <strong>GET /api/blogs</strong> - Bütün blogları əldə edin<br />
          <strong>GET /api/export</strong> - Bütün məlumatları ixrac edin<br />
        </p>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#d1ecf1', borderRadius: '4px', border: '1px solid #bee5eb' }}>
        <h4 style={{ color: '#0c5460', marginBottom: '10px' }}>API Əsas Ünvan:</h4>
        <p style={{ color: '#0c5460', fontSize: '13px', fontFamily: 'monospace' }}>
          https://server.ginekoloqayten.online/api
        </p>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#fff3cd', borderRadius: '4px', border: '1px solid #ffeaa7' }}>
        <h4 style={{ color: '#856404', marginBottom: '10px' }}>Qeyd:</h4>
        <p style={{ color: '#856404', fontSize: '13px' }}>
          Bütün API sorğuları multipart/form-data və ya application/json üstünsüz qəbul edir. 
          Şəkil yükləmə zamanı formData istifadə edin.
        </p>
      </div>
    </div>
  );
};

export default ExportSection;
