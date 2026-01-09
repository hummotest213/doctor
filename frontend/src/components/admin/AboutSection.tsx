'use client';

import React, { useState, useEffect } from 'react';
import { validateField, buildValidatedFormData, validateFile, logPayload } from '@/lib/payloadValidation';

interface AboutSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

interface AboutData {
  subtitle: string | null;
  title: string | null;
  description: string | null;
  paragraph1: string | null;
  paragraph2: string | null;
  statistic1_numbers: string | null;
  statistic1_suffix: string | null;
  statistic1_description: string | null;
  statistic2_numbers: string | null;
  statistic2_suffix: string | null;
  statistic2_description: string | null;
  statistic3_numbers: string | null;
  statistic3_suffix: string | null;
  statistic3_description: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
  language_code?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ language, showAlert }) => {
  const API_URL = 'https://server.ginekoloqayten.online/api';

  const [aboutData, setAboutData] = useState<AboutData>({
    subtitle: null,
    title: null,
    description: null,
    paragraph1: null,
    paragraph2: null,
    statistic1_numbers: null,
    statistic1_suffix: null,
    statistic1_description: null,
    statistic2_numbers: null,
    statistic2_suffix: null,
    statistic2_description: null,
    statistic3_numbers: null,
    statistic3_suffix: null,
    statistic3_description: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadAboutData(language);
  }, [language]);

  /**
   * ROBUST DATA LOADER
   * Fetches about data with validation and cleanup
   * Ensures backend data is properly sanitized before setting state
   * Supports language parameter passing to prevent race conditions
   */
  const loadAboutData = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      
      console.log('📥 ========== LOADING ABOUT DATA ==========');
      console.log(`🌍 Language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/about?lang=${fetchLang}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load about data`);
      }
      
      const data = await response.json();
      console.log('📦 Raw API Response:', data);
      
      /**
       * CRITICAL CLEANUP PHASE
       * Ensures all received data is properly validated
       * Prevents "undefined" strings and other malformed data
       */
      const cleanedData: AboutData = {
        // Use centralized validateField utility for each field
        subtitle: validateField(data.subtitle, 'subtitle'),
        title: validateField(data.title, 'title'),
        description: validateField(data.description, 'description'),
        paragraph1: validateField(data.paragraph1, 'paragraph1'),
        paragraph2: validateField(data.paragraph2, 'paragraph2'),
        statistic1_numbers: validateField(data.statistic1_numbers, 'statistic1_numbers'),
        statistic1_suffix: validateField(data.statistic1_suffix, 'statistic1_suffix'),
        statistic1_description: validateField(data.statistic1_description, 'statistic1_description'),
        statistic2_numbers: validateField(data.statistic2_numbers, 'statistic2_numbers'),
        statistic2_suffix: validateField(data.statistic2_suffix, 'statistic2_suffix'),
        statistic2_description: validateField(data.statistic2_description, 'statistic2_description'),
        statistic3_numbers: validateField(data.statistic3_numbers, 'statistic3_numbers'),
        statistic3_suffix: validateField(data.statistic3_suffix, 'statistic3_suffix'),
        statistic3_description: validateField(data.statistic3_description, 'statistic3_description'),
        image_url: validateField(data.image_url, 'image_url'),
        created_at: data.created_at,
        updated_at: data.updated_at,
        language_code: fetchLang,
      };
      
      console.log('✅ Cleaned Data:', cleanedData);
      setAboutData(cleanedData);
      setIsLoading(false);
      
      console.log('✅ ========== DATA LOAD COMPLETE ==========\n');
      
    } catch (error) {
      console.error('❌ Error loading about data:', error);
      setIsLoading(false);
      showAlert('Haqqımızda məlumatlarını yükləmək mümkün olmadı', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * ROBUST SAVE HANDLER
   * Uses centralized validation utilities to prevent payload issues
   * Ensures all fields are properly validated before transmission
   * Includes comprehensive error handling and state synchronization
   */
  const handleSaveAbout = async () => {
    try {
      setIsSaving(true);
      console.log('\n🔄 ========== ABOUT SAVE INITIATED ==========');
      console.log(`📝 Language: ${language}`);
      console.log('📊 Current Form State:', aboutData);
      
      // Validate that at least some data is present
      const hasAnyData = Object.values(aboutData).some(val => 
        val && validateField(val) !== null
      );
      if (!hasAnyData && !image) {
        showAlert('Lütfən ən az bir alan doldurunuz', 'error');
        setIsSaving(false);
        return;
      }
      
      // Validate image if present
      if (image) {
        const fileValidation = validateFile(image, 5, ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']);
        if (!fileValidation.valid) {
          showAlert(`📸 Image Error: ${fileValidation.error}`, 'error');
          setIsSaving(false);
          return;
        }
      }
      
      // Build field map for validation (explicitly typed to allow File objects)
      const fieldMap: Array<{ name: string; value: unknown }> = [
        { name: 'subtitle', value: aboutData.subtitle },
        { name: 'title', value: aboutData.title },
        { name: 'description', value: aboutData.description },
        { name: 'paragraph1', value: aboutData.paragraph1 },
        { name: 'paragraph2', value: aboutData.paragraph2 },
        { name: 'statistic1_numbers', value: aboutData.statistic1_numbers },
        { name: 'statistic1_suffix', value: aboutData.statistic1_suffix },
        { name: 'statistic1_description', value: aboutData.statistic1_description },
        { name: 'statistic2_numbers', value: aboutData.statistic2_numbers },
        { name: 'statistic2_suffix', value: aboutData.statistic2_suffix },
        { name: 'statistic2_description', value: aboutData.statistic2_description },
        { name: 'statistic3_numbers', value: aboutData.statistic3_numbers },
        { name: 'statistic3_suffix', value: aboutData.statistic3_suffix },
        { name: 'statistic3_description', value: aboutData.statistic3_description },
      ];
      
      // Handle image separately
      if (image) {
        fieldMap.push({ name: 'image', value: image });
      } else if (aboutData.image_url) {
        fieldMap.push({ name: 'image_url', value: aboutData.image_url });
      }
      
      // Build validated FormData using utility
      const formData = buildValidatedFormData(fieldMap, {
        language: language,
        language_code: language,
      });
      
      // Log the complete payload
      logPayload(formData, 'ABOUT SECTION PAYLOAD');
      
      console.log('🚀 SUBMITTING TO API...');
      console.log(`📤 Target: ${API_URL}/about`);
      
      // Make API request
      const response = await fetch(`${API_URL}/about`, {
        method: 'PUT',
        body: formData,
      });

      console.log(`📨 API Response Status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('✅ API Response Data:', responseData);

      // Success messaging
      showAlert(
        `✅ Haqqımızda məzmunu ${language.toUpperCase()} dildə uğurla yadda saxlandı!`,
        'success'
      );
      
      // Reset image upload state
      setImage(null);
      console.log('🖼️  Image state reset');
      
      // Reload data to ensure sync with backend
      console.log('🔄 Reloading data from server...');
      await loadAboutData(language);
      
      console.log('✅ ========== ABOUT SAVE COMPLETED ==========\n');
      setIsSaving(false);
      
    } catch (error) {
      console.error('❌ CRITICAL ERROR:', error);
      const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta';
      showAlert(`Haqqımızda məzmununu yadda saxlamaq mümkün olmadı: ${errorMessage}`, 'error');
      setIsSaving(false);
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Haqqımızda Səhifəsi Məzmunu</h2>

      <div className="form-group">
        <label>Alt Başlıq</label>
        <input
          type="text"
          name="subtitle"
          value={aboutData.subtitle || ''}
          onChange={handleInputChange}
          placeholder="məs., Haqqımızda"
        />
      </div>

      <div className="form-group">
        <label>Başlıq</label>
        <input
          type="text"
          name="title"
          value={aboutData.title || ''}
          onChange={handleInputChange}
          placeholder="məs., Dr. Ayten Abdullayeva Haqqında"
        />
      </div>

      <div className="form-group">
        <label>Təsvir</label>
        <textarea
          name="description"
          value={aboutData.description || ''}
          onChange={handleInputChange}
          placeholder="Haqqımızda bölməsinin təsviri"
        />
      </div>

      <div className="form-group">
        <label>Şəkil (Yükləmə)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {aboutData.image_url && (
          <p className="image-hint">Cari şəkil: {aboutData.image_url}</p>
        )}
        <small className="image-hint">Maksimum ölçü: 5MB. Dəstəklənən formatlar: JPEG, PNG, GIF, SVG</small>
      </div>

      <div className="form-group">
        <label>Birinci Paragraf</label>
        <textarea
          name="paragraph1"
          value={aboutData.paragraph1 || ''}
          onChange={handleInputChange}
          placeholder="Haqqımızda bölməsinin ilk paragrafı"
        />
      </div>

      <div className="form-group">
        <label>İkinci Paragraf</label>
        <textarea
          name="paragraph2"
          value={aboutData.paragraph2 || ''}
          onChange={handleInputChange}
          placeholder="Haqqımızda bölməsinin ikinci paragrafı"
        />
      </div>

      <h3 className="section-title" style={{ marginTop: '30px' }}>Statistika</h3>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Statistika 1 - Rəqəm</label>
          <input
            type="text"
            name="statistic1_numbers"
            value={aboutData.statistic1_numbers || ''}
            onChange={handleInputChange}
            placeholder="məs., 15"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 1 - Simvol</label>
          <input
            type="text"
            name="statistic1_suffix"
            value={aboutData.statistic1_suffix || ''}
            onChange={handleInputChange}
            placeholder="məs., +"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 1 - Təsvir</label>
          <input
            type="text"
            name="statistic1_description"
            value={aboutData.statistic1_description || ''}
            onChange={handleInputChange}
            placeholder="məs., İllik Təcrübə"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Statistika 2 - Rəqəm</label>
          <input
            type="text"
            name="statistic2_numbers"
            value={aboutData.statistic2_numbers || ''}
            onChange={handleInputChange}
            placeholder="məs., 200"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 2 - Simvol</label>
          <input
            type="text"
            name="statistic2_suffix"
            value={aboutData.statistic2_suffix || ''}
            onChange={handleInputChange}
            placeholder="məs., +"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 2 - Təsvir</label>
          <input
            type="text"
            name="statistic2_description"
            value={aboutData.statistic2_description || ''}
            onChange={handleInputChange}
            placeholder="məs., Uğurlu Əməliyyat"
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <label>Statistika 3 - Rəqəm</label>
          <input
            type="text"
            name="statistic3_numbers"
            value={aboutData.statistic3_numbers || ''}
            onChange={handleInputChange}
            placeholder="məs., 500"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 3 - Simvol</label>
          <input
            type="text"
            name="statistic3_suffix"
            value={aboutData.statistic3_suffix || ''}
            onChange={handleInputChange}
            placeholder="məs., +"
          />
        </div>
        <div className="stat-box">
          <label>Statistika 3 - Təsvir</label>
          <input
            type="text"
            name="statistic3_description"
            value={aboutData.statistic3_description || ''}
            onChange={handleInputChange}
            placeholder="məs., Müayinə Olunan Pasient"
          />
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-success" onClick={handleSaveAbout}>
          Haqqımızda Məlumatlarını Yadda Saxla
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
