import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  de: {
    landing: {
      step1: 'QR-Code scannen',
      step2: 'Tür auswählen',
      step3: 'Bezahlen & entnehmen',
      continue: 'Weiter',
      scanned: 'Erledigt'
    },
    doorSelect: {
      title: 'Tür auswählen',
      subtitle: 'Wählen Sie die Tür Ihres Produkts',
      door: 'Tür',
      confirm: 'Weiter zur Zahlung',
      back: 'Zurück'
    },
    payment: {
      title: 'Zahlungsmethode',
      subtitle: 'Wählen Sie Ihre bevorzugte Zahlungsart',
      card: 'Mit Karte bezahlen',
      or: 'oder',
      cardNumber: 'Kartennummer',
      cardHolder: 'Karteninhaber',
      expiry: 'Gültig bis',
      payNow: 'Jetzt bezahlen',
      processing: 'Wird verarbeitet...',
      cancel: 'Abbrechen',
      secure: 'Sichere Zahlung verschlüsselt'
    },
    success: {
      title: 'Zahlung erfolgreich!',
      subtitle: 'Vielen Dank für Ihren Einkauf',
      doorInfo: 'Bitte entnehmen Sie Ihr Produkt aus',
      opening: 'Tür öffnet sich...',
      ready: 'Tür ist geöffnet',
      thanks: 'Vielen Dank!',
      enjoy: 'Genießen Sie Ihren Wein',
      newPurchase: 'Neuer Einkauf'
    }
  },
  en: {
    landing: {
      step1: 'Scan QR code',
      step2: 'Select door',
      step3: 'Pay & collect',
      continue: 'Continue',
      scanned: 'Done'
    },
    doorSelect: {
      title: 'Select Door',
      subtitle: 'Choose the door for your product',
      door: 'Door',
      confirm: 'Continue to Payment',
      back: 'Back'
    },
    payment: {
      title: 'Payment Method',
      subtitle: 'Choose your preferred payment method',
      card: 'Pay with Card',
      or: 'or',
      cardNumber: 'Card Number',
      cardHolder: 'Cardholder Name',
      expiry: 'Expiry',
      payNow: 'Pay Now',
      processing: 'Processing...',
      cancel: 'Cancel',
      secure: 'Secure encrypted payment'
    },
    success: {
      title: 'Payment Successful!',
      subtitle: 'Thank you for your purchase',
      doorInfo: 'Please collect your product from',
      opening: 'Door is opening...',
      ready: 'Door is open',
      thanks: 'Thank you!',
      enjoy: 'Enjoy your wine',
      newPurchase: 'New Purchase'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selfcheckout-lang') || 'de';
    }
    return 'de';
  });

  useEffect(() => {
    localStorage.setItem('selfcheckout-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
