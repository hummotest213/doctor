"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// You can use a CDN for these images to keep the bundle small and flags colorful
const FLAG_BASE_URL = "https://purecatamphetamine.github.io/country-flag-icons/3x2";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "az", name: "Azərbaycan", flagCode: "AZ" },
    { code: "en", name: "English", flagCode: "GB" },
    { code: "ru", name: "Русский", flagCode: "RU" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <img 
          src={`${FLAG_BASE_URL}/${currentLanguage?.flagCode}.svg`} 
          alt={currentLanguage?.name}
          className="flag-img"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
        >
          <path
            d="M13 1.5L7 6.5L1 1.5"
            stroke="#5A6A85"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                language === lang.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img 
                src={`${FLAG_BASE_URL}/${lang.flagCode}.svg`} 
                alt={lang.name} 
                className="flag-img"
              />
              <span className="name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .language-switcher {
          position: relative;
          display: inline-block;
        }

        .language-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-btn:hover {
          border-color: #336aea;
          background: #f9fafb;
        }

        /* Styling for the high-res SVG flags */
        .flag-img {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          display: block;
        }

        .dropdown-arrow {
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          min-width: 180px;
          z-index: 1000;
          padding: 6px;
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .language-option:hover {
          background: #f3f4f6;
        }

        .language-option.active {
          background: #eff6ff;
          color: #336aea;
        }

        @media (max-width: 575px) {
          .language-dropdown {
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;