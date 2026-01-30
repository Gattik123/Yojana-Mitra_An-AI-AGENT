import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Progress } from '@/components/ui/progress';

const ProfileProgress: React.FC = () => {
  const { t } = useLanguage();
  const { getProgress } = useUserProfile();
  const progress = getProgress();

  return (
    <div className="px-4 py-3 bg-muted/50 border-b border-border">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">{t('profile.progress')}</span>
        <span className="font-medium text-foreground">{progress}% {t('profile.complete')}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProfileProgress;
