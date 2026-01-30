import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { schemes } from '@/data/schemes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Download, CheckCircle, FileText, Gift, ClipboardList } from 'lucide-react';

const SchemeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const scheme = schemes.find(s => s.id === id);

  if (!scheme) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Scheme not found' : 'योजना नहीं मिली'}
          </h1>
          <Button onClick={() => navigate('/schemes')}>
            {t('scheme.back')}
          </Button>
        </div>
      </div>
    );
  }

  const handleDownloadChecklist = () => {
    const content = `
${language === 'en' ? scheme.name.en : scheme.name.hi}
${'='.repeat(50)}

${t('scheme.whoCanApply')}:
${(language === 'en' ? scheme.eligibility.en : scheme.eligibility.hi).map(item => `• ${item}`).join('\n')}

${t('scheme.documents')}:
${(language === 'en' ? scheme.documents.en : scheme.documents.hi).map(item => `☐ ${item}`).join('\n')}

${t('scheme.howToApply')}:
${(language === 'en' ? scheme.howToApply.en : scheme.howToApply.hi).map((item, i) => `${i + 1}. ${item}`).join('\n')}

Apply Online: ${scheme.applyLink}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.id}-checklist.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sections = [
    {
      title: t('scheme.whoCanApply'),
      icon: CheckCircle,
      items: language === 'en' ? scheme.eligibility.en : scheme.eligibility.hi,
      color: 'text-success',
    },
    {
      title: t('scheme.benefits'),
      icon: Gift,
      items: language === 'en' ? scheme.benefits.en : scheme.benefits.hi,
      color: 'text-accent',
    },
    {
      title: t('scheme.documents'),
      icon: FileText,
      items: language === 'en' ? scheme.documents.en : scheme.documents.hi,
      color: 'text-primary',
    },
    {
      title: t('scheme.howToApply'),
      icon: ClipboardList,
      items: language === 'en' ? scheme.howToApply.en : scheme.howToApply.hi,
      color: 'text-muted-foreground',
      numbered: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/schemes')}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('scheme.back')}
        </Button>

        {/* Header */}
        <div className="mb-6">
          <Badge 
            variant={scheme.type === 'central' ? 'default' : 'secondary'}
            className="mb-3"
          >
            {scheme.type === 'central' ? t('dashboard.central') : t('dashboard.state')}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {language === 'en' ? scheme.name.en : scheme.name.hi}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'en' ? scheme.description.en : scheme.description.hi}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 mb-8">
          {sections.map(({ title, icon: Icon, items, color, numbered }) => (
            <Card key={title}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className={`h-5 w-5 ${color}`} />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className={`mt-1 flex-shrink-0 ${numbered ? 'font-semibold text-primary' : ''}`}>
                        {numbered ? `${index + 1}.` : '•'}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            size="lg" 
            className="flex-1 gap-2"
            onClick={() => window.open(scheme.applyLink, '_blank')}
          >
            {t('scheme.applyOnline')}
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="flex-1 gap-2"
            onClick={handleDownloadChecklist}
          >
            {t('scheme.downloadChecklist')}
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsPage;
