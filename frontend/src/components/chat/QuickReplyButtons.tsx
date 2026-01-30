import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickReplyButtonProps {
  options: { key: string; label: string }[];
  onSelect: (value: string) => void;
}

const QuickReplyButtons: React.FC<QuickReplyButtonProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="px-4 py-2 text-sm font-medium rounded-full border border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplyButtons;
