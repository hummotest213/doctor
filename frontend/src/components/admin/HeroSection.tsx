'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  buildValidatedFormData, 
  validateFile,
  logPayload
} from '@/lib/payloadValidation';

interface HeroSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

interface HeroData {
  title: string | null;
  title_highlight: string | null;
  description: string | null;
  members_treated_count: string | null;
  members_treated_label: string | null;
  virtual_patients_count: string | null;
  virtual_patients_label: string | null;
  licensed_doctors_count: string | null;
  licensed_doctors_label: string | null;
  doctor_image_url?: string | null;
  banner_image_url?: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language, showAlert }) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const [heroData, setHeroData] = useState<HeroData>({
    title: null,
    title_highlight: null,
    description: null,
    members_treated_count: null,
    members_treated_label: null,
    virtual_patients_count: null,
    virtual_patients_label: null,
    licensed_doctors_count: null,
    licensed_doctors_label: null,
  });

  const [doctorImage, setDoctorImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [doctorPreview, setDoctorPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CRITICAL: Prevent duplicate requests
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastRequestTimeRef = useRef<number>(0);
  const lastRequestLangRef = useRef<string>('');

  useEffect(() => {
    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    // Load data only if language actually changed
    if (lastRequestLangRef.current !== language) {
      lastRequestLangRef.current = language;
      loadHeroData(language, abortControllerRef.current.signal);
    }
  }, [language]);

  const loadHeroData = async (lang?: string, signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`🔄 [HERO] Loading data for: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/hero?lang=${fetchLang}`, { signal });
      
      // Check if request was aborted
      if (signal?.aborted) {
        console.log(`⛔ [HERO] Request aborted for language: ${fetchLang}`);
        return;
      }

      if (!response.ok) throw new Error('Failed to load hero data');
      
      const responseData = await response.json();
      
      // Use data from API response
      const data = responseData.data || responseData;
      console.log(`✅ [HERO] Data loaded for ${fetchLang}:`, data);
      
      // Clean data: convert null/undefined/empty strings to null, keep actual values
      const cleanedData: HeroData = {
        title: data.title && typeof data.title === 'string' && data.title.trim() && data.title !== 'undefined' ? data.title : null,
        title_highlight: data.title_highlight && typeof data.title_highlight === 'string' && data.title_highlight.trim() && data.title_highlight !== 'undefined' ? data.title_highlight : null,
        description: data.description && typeof data.description === 'string' && data.description.trim() && data.description !== 'undefined' ? data.description : null,
        members_treated_count: data.members_treated_count && typeof data.members_treated_count === 'string' && data.members_treated_count.trim() && data.members_treated_count !== 'undefined' ? data.members_treated_count : null,
        members_treated_label: data.members_treated_label && typeof data.members_treated_label === 'string' && data.members_treated_label.trim() && data.members_treated_label !== 'undefined' ? data.members_treated_label : null,
        virtual_patients_count: data.virtual_patients_count && typeof data.virtual_patients_count === 'string' && data.virtual_patients_count.trim() && data.virtual_patients_count !== 'undefined' ? data.virtual_patients_count : null,
        virtual_patients_label: data.virtual_patients_label && typeof data.virtual_patients_label === 'string' && data.virtual_patients_label.trim() && data.virtual_patients_label !== 'undefined' ? data.virtual_patients_label : null,
        licensed_doctors_count: data.licensed_doctors_count && typeof data.licensed_doctors_count === 'string' && data.licensed_doctors_count.trim() && data.licensed_doctors_count !== 'undefined' ? data.licensed_doctors_count : null,
        licensed_doctors_label: data.licensed_doctors_label && typeof data.licensed_doctors_label === 'string' && data.licensed_doctors_label.trim() && data.licensed_doctors_label !== 'undefined' ? data.licensed_doctors_label : null,
        doctor_image_url: data.doctor_image_url && typeof data.doctor_image_url === 'string' && data.doctor_image_url.trim() && data.doctor_image_url !== 'undefined' ? data.doctor_image_url : null,
        banner_image_url: data.banner_image_url && typeof data.banner_image_url === 'string' && data.banner_image_url.trim() && data.banner_image_url !== 'undefined' ? data.banner_image_url : null,
      };
      
      setHeroData(cleanedData);
      setDoctorPreview(null);
      setBannerPreview(null);
      setIsLoading(false);
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log(`⛔ [HERO] Request aborted`);
        return;
      }
      console.error('❌ [HERO] Error loading hero data:', error);
      setIsLoading(false);
      showAlert('Hero məlumatlarını yükləmək mümkün olmadı', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDoctorImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctorPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = async () => {
    if (!heroData.title) {
      showAlert('Həkimin adı doldurulmalıdır', 'error');
      return;
    }

    if (isSaving) {
      console.log(' [HERO] Already saving, preventing duplicate submission');
      return;
    }

    setIsSaving(true);
    try {
      console.log('📤 [HERO SAVE] Starting save with language:', language);
      
      let formData = new FormData();
      formData.append('language', language);
      
      // CRITICAL: Always send ALL fields - never skip empty ones!
      // The backend will receive the value and handle null/empty properly
      formData.append('title', heroData.title || '');
      formData.append('title_highlight', heroData.title_highlight || '');
      formData.append('description', heroData.description || '');
      formData.append('members_treated_count', heroData.members_treated_count || '');
      formData.append('members_treated_label', heroData.members_treated_label || '');
      formData.append('virtual_patients_count', heroData.virtual_patients_count || '');
      formData.append('virtual_patients_label', heroData.virtual_patients_label || '');
      formData.append('licensed_doctors_count', heroData.licensed_doctors_count || '');
      formData.append('licensed_doctors_label', heroData.licensed_doctors_label || '');

      if (doctorImage) {
        formData.append('doctor_image', doctorImage);
      }

      if (bannerImage) {
        formData.append('banner_image', bannerImage);
      }

      console.log('📋 [HERO SAVE] Payload ready, sending all fields...');
      
      const response = await fetch(`${API_URL}/hero?lang=${language}`, {
        method: 'PUT',
        body: formData,
      });

      let responseData = await response.json();
      
      console.log('✅ [HERO SAVE] Response received:', response.status);

      if (!response.ok) throw new Error('Failed to save hero data');

      console.log('🎉 [HERO SAVE] Success - NOT reloading to prevent second request');
      showAlert(`Hero məzmunu ${language.toUpperCase()} dildə yadda saxlandı!`, 'success');
      
      // Clear only the image uploads, NOT the form data
      setDoctorImage(null);
      setBannerImage(null);
      setDoctorPreview(null);
      setBannerPreview(null);
      
      // DO NOT RELOAD - this was causing the second request with undefined values
      
    } catch (error) {
      console.error('❌ [HERO SAVE] Error:', error);
      showAlert('Hero məzmununu yadda saxlamaq mümkün olmadı', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Hero Banner Məzmunu</h2>

      <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#2c3e50' }}>Əsas Məlumatlar</h3>

      <div className="form-group">
        <label>Həkimin Adı *</label>
        <input
          type="text"
          name="title"
          value={heroData.title || ''}
          onChange={handleInputChange}
          placeholder="məs., Dr. Ayten Abdullayeva"
        />
      </div>

      <div className="form-group">
        <label>Başlıq/İxtisas Vurğusu</label>
        <input
          type="text"
          name="title_highlight"
          value={heroData.title_highlight || ''}
          onChange={handleInputChange}
          placeholder="məs., Onkoloq-Ginekoloq, Tibb üzrə Fəlsəfə Doktoru"
        />
      </div>

      <div className="form-group">
        <label>Təsvir</label>
        <textarea
          name="description"
          value={heroData.description || ''}
          onChange={handleInputChange}
          placeholder="Hero hissəsinin təsviri"
          rows={4}
        />
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Şəkillər</h3>

      <div className="form-group">
        <label>Həkimin Şəkili (Yükləmə)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleDoctorImageChange}
        />
        {doctorPreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Yeni Şəkil Önizləməsi:</p>
            <img 
              src={doctorPreview} 
              alt="Doctor Preview" 
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        {heroData.doctor_image_url && !doctorPreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Cari Şəkil:</p>
            <img 
              src={heroData.doctor_image_url} 
              alt="Doctor" 
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
          Maksimum ölçü: 5MB. Dəstəklənən formatlar: JPEG, PNG, GIF, SVG
        </small>
      </div>

      <div className="form-group">
        <label>Banner Şəkili (Yükləmə)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerImageChange}
        />
        {bannerPreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Yeni Şəkil Önizləməsi:</p>
            <img 
              src={bannerPreview} 
              alt="Banner Preview" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
            />
          </div>
        )}
        {heroData.banner_image_url && !bannerPreview && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Cari Şəkil:</p>
            <img 
              src={heroData.banner_image_url} 
              alt="Banner" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
            />
          </div>
        )}
        <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
          Maksimum ölçü: 5MB. Dəstəklənən formatlar: JPEG, PNG, GIF, SVG
        </small>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>Statistika</h3>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Əməliyyat Sayı</label>
          <input
            type="number"
            name="members_treated_count"
            value={heroData.members_treated_count || ''}
            onChange={handleInputChange}
            placeholder="məs., 500"
          />
        </div>
        <div className="stat-box">
          <label>Əməliyyat Etiketi</label>
          <input
            type="text"
            name="members_treated_label"
            value={heroData.members_treated_label || ''}
            onChange={handleInputChange}
            placeholder="məs., Uğurlu Əməliyyat"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Xəstə Sayı</label>
          <input
            type="number"
            name="virtual_patients_count"
            value={heroData.virtual_patients_count || ''}
            onChange={handleInputChange}
            placeholder="məs., 200"
          />
        </div>
        <div className="stat-box">
          <label>Xəstə Etiketi</label>
          <input
            type="text"
            name="virtual_patients_label"
            value={heroData.virtual_patients_label || ''}
            onChange={handleInputChange}
            placeholder="məs., Müayinə Olunan Xəstə"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Təcrübə (İllər)</label>
          <input
            type="number"
            name="licensed_doctors_count"
            value={heroData.licensed_doctors_count || ''}
            onChange={handleInputChange}
            placeholder="məs., 15"
          />
        </div>
        <div className="stat-box">
          <label>Təcrübə Etiketi</label>
          <input
            type="text"
            name="licensed_doctors_label"
            value={heroData.licensed_doctors_label || ''}
            onChange={handleInputChange}
            placeholder="məs., İllər Təcrübə"
          />
        </div>
      </div>

      <div className="btn-group">
        <button 
          className="btn btn-success" 
          onClick={handleSaveHero}
          disabled={isSaving}
          style={{ opacity: isSaving ? 0.6 : 1 }}
        >
          {isSaving ? 'Yadda Saxlanır...' : 'Hero Məlumatlarını Yadda Saxla'}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
