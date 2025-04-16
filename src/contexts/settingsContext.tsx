import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          // English translations
          settings: "Settings",
          theme: "Theme",
          language: "Language",
          dark: "Dark",
          light: "Light",
          account: "Account",
          security: "Security",
          notifications: "Notifications",
          system: "System",
          profileSettings: "Profile Settings",
          manageAccountInfo: "Manage your account information and preferences",
          personalInformation: "Personal Information",
          fullName: "Full Name",
          email: "Email",
          department: "Department",
          employeeId: "Employee ID",
          saveChanges: "Save Changes",
          preferences: "Preferences",
          darkTheme: "Dark theme",
          compactView: "Compact view",
          selectLanguage: "Select language",
          // Add more translations as needed
        },
      },
      es: {
        translation: {
          // Spanish translations
          settings: "Configuración",
          theme: "Tema",
          language: "Idioma",
          dark: "Oscuro",
          light: "Claro",
          account: "Cuenta",
          security: "Seguridad",
          notifications: "Notificaciones",
          system: "Sistema",
          profileSettings: "Ajustes de Perfil",
          manageAccountInfo:
            "Administra tu información de cuenta y preferencias",
          personalInformation: "Información Personal",
          fullName: "Nombre Completo",
          email: "Correo Electrónico",
          department: "Departamento",
          employeeId: "ID de Empleado",
          saveChanges: "Guardar Cambios",
          preferences: "Preferencias",
          darkTheme: "Tema oscuro",
          compactView: "Vista compacta",
          selectLanguage: "Seleccionar idioma",
          // Add more translations as needed
        },
      },
      // Add more languages as needed
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

const SettingsContext = createContext({});

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("appSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          language: "es",
          theme: "light",
          // Add other settings here
        };
  });

  // Apply settings whenever they change
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("appSettings", JSON.stringify(settings));

    // Apply language

    // Apply theme
    document.documentElement.setAttribute("data-theme", settings.theme);
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (i18n.language !== settings.language) {
      i18n.changeLanguage(settings.language);
    }
  }, [settings]);

  // Function to update settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };
  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettings must be used within a Settings Provider component"
    );
  }
  return context;
};

export default SettingsProvider;
