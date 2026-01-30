import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Home, MessageCircle, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'nav.home', icon: Home },
    { path: '/chat', label: 'nav.chat', icon: MessageCircle },
    { path: '/schemes', label: 'nav.schemes', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            SS
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">
            {t('app.name')}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t(label)}</span>
            </Link>
          ))}
        </nav>

        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
