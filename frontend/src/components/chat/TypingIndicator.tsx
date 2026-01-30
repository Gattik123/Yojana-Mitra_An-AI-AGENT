import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TypingIndicator: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-start mb-3">
      <div className="bg-chat-ai text-chat-ai-foreground px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-muted-foreground">{t('chat.typing')}</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
