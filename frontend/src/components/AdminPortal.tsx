'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuthToken } from '@/lib/auth';
import HeroSection from './admin/HeroSection';
import AboutSection from './admin/AboutSection';
import ServicesSection from './admin/ServicesSection';
import AppointmentSection from './admin/AppointmentSection';
import ContactSection from './admin/ContactSection';
import FeedbacksSection from './admin/FeedbacksSection';
import BlogsSection from './admin/BlogsSection';
import ExportSection from './admin/ExportSection';
import logoNeo from "./logo.png";
import './AdminPortal.css';
import Image from 'next/image';

type Section = 'hero' | 'about' | 'services' | 'appointment' | 'contact' | 'feedbacks' | 'blogs' | 'export';

interface AlertState {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

const AdminPortal: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [currentLanguage, setCurrentLanguage] = useState<'az' | 'en' | 'ru'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('adminLanguage') as 'az' | 'en' | 'ru') || 'az';
    }
    return 'az';
  });
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    type: 'success',
    show: false,
  });

  const showAlert = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ message, type, show: true });
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
  }, []);

  const handleLanguageChange = (lang: 'az' | 'en' | 'ru') => {
    setCurrentLanguage(lang);
    localStorage.setItem('adminLanguage', lang);
  };

  const handleLogout = () => {
    if (confirm('Çıxmaq istədiyinizə əminsiniz?')) {
      clearAuthToken();
      router.push('/admin-login');
    }
  };

  const sectionTitles = {
    hero: { title: 'Hero Hissəsi', desc: 'Hero hissəsinin məzmununu idarə edin' },
    about: { title: 'Haqqımızda', desc: 'Haqqımızda səhifəsinin məzmununu idarə edin' },
    services: { title: 'Xidmətlərin İdarə Edilməsi', desc: 'Xidmətləri əlavə, redaktə və silin' },
    appointment: { title: 'Görüş Səhifəsi', desc: 'Görüş səhifəsinin məzmununu idarə edin' },
    contact: { title: 'Əlaqə Səhifəsi', desc: 'Əlaqə səhifəsinin məzmununu idarə edin' },
    feedbacks: { title: 'Xəstə Rəyləri', desc: 'Xəstə rəylərini idarə edin' },
    blogs: { title: 'Blogların İdarə Edilməsi', desc: 'Blogları əlavə, redaktə və silin' },
    export: { title: 'Məlumatları İxrac Et', desc: 'Bütün məzmununuzu ehtiyat nüsxə olaraq yükləyin' },
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <Image src={logoNeo} alt="Logo" width={120} height={120} className="w-32 h-auto rounded-lg mb-6" />
        </div>
        <h2 className="sidebar-title">İdarəetmə Paneli</h2>
        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveSection('hero')}
            className={`nav-btn ${activeSection === 'hero' ? 'active' : ''}`}
          >
            Hero Hissəsi
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
          >
            Haqqımızda
          </button>
          <button
            onClick={() => setActiveSection('services')}
            className={`nav-btn ${activeSection === 'services' ? 'active' : ''}`}
          >
            Xidmətlər
          </button>
          <button
            onClick={() => setActiveSection('appointment')}
            className={`nav-btn ${activeSection === 'appointment' ? 'active' : ''}`}
          >
            Görüş Təyin Etmək
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Əlaqə
          </button>
          <button
            onClick={() => setActiveSection('feedbacks')}
            className={`nav-btn ${activeSection === 'feedbacks' ? 'active' : ''}`}
          >
            Rəylər
          </button>
          <button
            onClick={() => setActiveSection('blogs')}
            className={`nav-btn ${activeSection === 'blogs' ? 'active' : ''}`}
          >
            Bloglar
          </button>
          <hr className="my-4 border-t border-gray-400" />
          <button
            onClick={() => setActiveSection('export')}
            className={`nav-btn ${activeSection === 'export' ? 'active' : ''}`}
          >
            Məlumatları İxrac Et
          </button>
          <hr className="my-4 border-t border-gray-400" />
          <button
            onClick={handleLogout}
            className="nav-btn logout-btn"
          >
            Çıxış
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="header-title">{sectionTitles[activeSection].title}</h1>
            <p className="header-desc">{sectionTitles[activeSection].desc}</p>
          </div>
        </div>

        {/* Alert */}
        {alert.show && (
          <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {alert.message}
          </div>
        )}

        {/* Language Selector */}
        <div className="language-selector">
          <h3>Dil Seçin</h3>
          <div className="lang-tabs">
            <button
              onClick={() => handleLanguageChange('az')}
              className={`lang-tab ${currentLanguage === 'az' ? 'active' : ''}`}
              title="Azərbaycanca"
            >
              🇦🇿
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`lang-tab ${currentLanguage === 'en' ? 'active' : ''}`}
              title="English"
            >
              🇬🇧
            </button>
            <button
              onClick={() => handleLanguageChange('ru')}
              className={`lang-tab ${currentLanguage === 'ru' ? 'active' : ''}`}
              title="Русский"
            >
              🇷🇺
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'hero' && <HeroSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'about' && <AboutSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'services' && <ServicesSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'appointment' && <AppointmentSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'contact' && <ContactSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'feedbacks' && <FeedbacksSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'blogs' && <BlogsSection language={currentLanguage} showAlert={showAlert} />}
        {activeSection === 'export' && <ExportSection language={currentLanguage} showAlert={showAlert} />}
      </main>
    </div>
  );
};

export default AdminPortal;
