import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { schemes } from '@/data/schemes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';

const SchemesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid gap-4 sm:gap-6">
          {schemes.map((scheme) => (
            <Card 
              key={scheme.id} 
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/scheme/${scheme.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={scheme.type === 'central' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {scheme.type === 'central' ? t('dashboard.central') : t('dashboard.state')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      {language === 'en' ? scheme.name.en : scheme.name.hi}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm sm:text-base">
                      {language === 'en' ? scheme.description.en : scheme.description.hi}
                    </CardDescription>
                  </div>
                  
                  {/* Match Percentage */}
                  <div className="flex flex-col items-center justify-center min-w-[70px]">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${
                      scheme.matchPercentage >= 80 ? 'bg-success/10 text-success' :
                      scheme.matchPercentage >= 60 ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <span className="text-lg font-bold">{scheme.matchPercentage}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{t('dashboard.match')}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>{language === 'en' ? 'Likely eligible' : 'संभवतः पात्र'}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {t('dashboard.viewDetails')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;
