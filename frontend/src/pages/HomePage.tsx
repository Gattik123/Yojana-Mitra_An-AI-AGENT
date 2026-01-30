import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, FileSearch } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: FileSearch,
      title: language === 'en' ? 'Smart Search' : 'स्मार्ट खोज',
      description: language === 'en' ? 'Find schemes matching your profile' : 'अपनी प्रोफाइल से मेल खाती योजनाएं खोजें',
    },
    {
      icon: Users,
      title: language === 'en' ? 'Simple Language' : 'सरल भाषा',
      description: language === 'en' ? 'Easy to understand for everyone' : 'सभी के लिए समझने में आसान',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Trusted Info' : 'विश्वसनीय जानकारी',
      description: language === 'en' ? 'Verified government sources' : 'सत्यापित सरकारी स्रोत',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <Shield className="h-4 w-4" />
            {t('app.tagline')}
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {t('home.welcome')}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="w-full sm:w-auto gap-2 text-base"
            >
              {t('home.startChat')}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/schemes')}
              className="w-full sm:w-auto text-base"
            >
              {t('home.viewSchemes')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div 
                key={title}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2026 SchemeSaathi. {language === 'en' ? 'Made for citizens of India.' : 'भारत के नागरिकों के लिए बनाया गया।'}</p>
      </footer>
    </div>
  );
};

export default HomePage;
