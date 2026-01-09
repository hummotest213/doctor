"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Translation type
type Translations = {
  [key: string]: any;
};

// Language context type
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => any;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<string>("az");
  const [translations, setTranslations] = useState<Translations>({});

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      // Load from local JSON files directly (backend doesn't have /languages endpoint)
      try {
        let messages;
        if (language === 'az') {
          messages = await import(`@/messages/az.json`);
        } else if (language === 'en') {
          messages = await import(`@/messages/en.json`);
        } else if (language === 'ru') {
          messages = await import(`@/messages/ru.json`);
        }
        
        if (messages) {
          setTranslations(messages.default);
          console.log(`[LanguageContext] Loaded local translations for ${language}`, Object.keys(messages.default).length, 'keys');
        }
      } catch (error) {
        console.error(`[LanguageContext] Failed to load translations for ${language}:`, error);
      }
    };

    loadTranslations();
  }, [language]);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && ["az", "en", "ru"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
