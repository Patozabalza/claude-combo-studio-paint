"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { defaultTranslations } from "@/lib/translations";

export { defaultTranslations };

type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
  initialTranslations?: Record<string, Record<string, string>>;
}

export function LanguageProvider({ children, initialTranslations }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>("en");

  const translations = initialTranslations ?? defaultTranslations;

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
