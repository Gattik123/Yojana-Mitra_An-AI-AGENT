import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'app.name': 'SchemeSaathi',
    'app.tagline': 'Your Government Scheme Assistant',
    
    // Homepage
    'home.welcome': 'Find Government Schemes You Are Eligible For',
    'home.description': 'Our AI assistant helps you discover government schemes that match your profile and guides you through the application process in simple language.',
    'home.startChat': 'Start Chat',
    'home.viewSchemes': 'View All Schemes',
    
    // Language
    'lang.english': 'English',
    'lang.hindi': 'हिंदी',
    
    // Chat
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
    'chat.typing': 'SchemeSaathi is typing...',
    'chat.welcome': 'Hello! I am SchemeSaathi, your guide to finding government schemes. Let me ask you a few questions to find schemes you are eligible for.',
    
    // Quick replies
    'quick.yes': 'Yes',
    'quick.no': 'No',
    'quick.skip': 'Skip',
    
    // Profile questions
    'profile.age': 'What is your age?',
    'profile.state': 'Which state do you live in?',
    'profile.income': 'What is your annual family income?',
    'profile.category': 'What is your category?',
    'profile.occupation': 'What is your occupation?',
    'profile.progress': 'Profile Progress',
    'profile.complete': 'Complete',
    
    // Income ranges
    'income.below1': 'Below ₹1 Lakh',
    'income.1to3': '₹1-3 Lakh',
    'income.3to5': '₹3-5 Lakh',
    'income.5to10': '₹5-10 Lakh',
    'income.above10': 'Above ₹10 Lakh',
    
    // Categories
    'category.general': 'General',
    'category.obc': 'OBC',
    'category.sc': 'SC',
    'category.st': 'ST',
    'category.ews': 'EWS',
    
    // Occupations
    'occupation.farmer': 'Farmer',
    'occupation.student': 'Student',
    'occupation.selfEmployed': 'Self Employed',
    'occupation.salaried': 'Salaried',
    'occupation.unemployed': 'Unemployed',
    'occupation.other': 'Other',
    
    // Dashboard
    'dashboard.title': 'Eligible Schemes',
    'dashboard.subtitle': 'Based on your profile, you may be eligible for these schemes',
    'dashboard.central': 'Central',
    'dashboard.state': 'State',
    'dashboard.match': 'match',
    'dashboard.viewDetails': 'View Details',
    'dashboard.noSchemes': 'No schemes found. Please complete your profile.',
    
    // Scheme details
    'scheme.whoCanApply': 'Who Can Apply',
    'scheme.benefits': 'Benefits',
    'scheme.documents': 'Required Documents',
    'scheme.howToApply': 'How to Apply',
    'scheme.applyOnline': 'Apply Online',
    'scheme.downloadChecklist': 'Download Checklist',
    'scheme.back': 'Back to Schemes',
    
    // Navigation
    'nav.home': 'Home',
    'nav.chat': 'Chat',
    'nav.schemes': 'Schemes',
  },
  hi: {
    // Header
    'app.name': 'स्कीमसाथी',
    'app.tagline': 'आपका सरकारी योजना सहायक',
    
    // Homepage
    'home.welcome': 'अपने लिए उपयुक्त सरकारी योजनाएं खोजें',
    'home.description': 'हमारा AI सहायक आपकी प्रोफाइल के अनुसार सरकारी योजनाओं की खोज में मदद करता है और सरल भाषा में आवेदन प्रक्रिया का मार्गदर्शन करता है।',
    'home.startChat': 'चैट शुरू करें',
    'home.viewSchemes': 'सभी योजनाएं देखें',
    
    // Language
    'lang.english': 'English',
    'lang.hindi': 'हिंदी',
    
    // Chat
    'chat.placeholder': 'अपना संदेश लिखें...',
    'chat.send': 'भेजें',
    'chat.typing': 'स्कीमसाथी टाइप कर रहा है...',
    'chat.welcome': 'नमस्ते! मैं स्कीमसाथी हूं, आपकी सरकारी योजनाओं की खोज में मदद करने के लिए। आपकी पात्रता जानने के लिए कुछ सवाल पूछता हूं।',
    
    // Quick replies
    'quick.yes': 'हां',
    'quick.no': 'नहीं',
    'quick.skip': 'छोड़ें',
    
    // Profile questions
    'profile.age': 'आपकी उम्र क्या है?',
    'profile.state': 'आप किस राज्य में रहते हैं?',
    'profile.income': 'आपकी वार्षिक पारिवारिक आय क्या है?',
    'profile.category': 'आपकी श्रेणी क्या है?',
    'profile.occupation': 'आपका व्यवसाय क्या है?',
    'profile.progress': 'प्रोफाइल प्रगति',
    'profile.complete': 'पूर्ण',
    
    // Income ranges
    'income.below1': '₹1 लाख से कम',
    'income.1to3': '₹1-3 लाख',
    'income.3to5': '₹3-5 लाख',
    'income.5to10': '₹5-10 लाख',
    'income.above10': '₹10 लाख से अधिक',
    
    // Categories
    'category.general': 'सामान्य',
    'category.obc': 'ओबीसी',
    'category.sc': 'एससी',
    'category.st': 'एसटी',
    'category.ews': 'ईडब्ल्यूएस',
    
    // Occupations
    'occupation.farmer': 'किसान',
    'occupation.student': 'छात्र',
    'occupation.selfEmployed': 'स्वरोजगार',
    'occupation.salaried': 'वेतनभोगी',
    'occupation.unemployed': 'बेरोजगार',
    'occupation.other': 'अन्य',
    
    // Dashboard
    'dashboard.title': 'पात्र योजनाएं',
    'dashboard.subtitle': 'आपकी प्रोफाइल के आधार पर, आप इन योजनाओं के लिए पात्र हो सकते हैं',
    'dashboard.central': 'केंद्रीय',
    'dashboard.state': 'राज्य',
    'dashboard.match': 'मैच',
    'dashboard.viewDetails': 'विवरण देखें',
    'dashboard.noSchemes': 'कोई योजना नहीं मिली। कृपया अपनी प्रोफाइल पूरी करें।',
    
    // Scheme details
    'scheme.whoCanApply': 'कौन आवेदन कर सकता है',
    'scheme.benefits': 'लाभ',
    'scheme.documents': 'आवश्यक दस्तावेज',
    'scheme.howToApply': 'आवेदन कैसे करें',
    'scheme.applyOnline': 'ऑनलाइन आवेदन करें',
    'scheme.downloadChecklist': 'चेकलिस्ट डाउनलोड करें',
    'scheme.back': 'योजनाओं पर वापस',
    
    // Navigation
    'nav.home': 'होम',
    'nav.chat': 'चैट',
    'nav.schemes': 'योजनाएं',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
