import React from 'react';
import { House, User, Trophy, FolderOpen, Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  House,
  User,
  Trophy,
  FolderOpen
};

export default function HeaderNav({ theme, toggleTheme }) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-4 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 px-2 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-sm"
      >
        {t.navLinks.map(({ label, href, iconName }) => {
          const Icon = iconMap[iconName] || House;
          return (
            <a
              key={iconName}
              href={href}
              aria-label={label}
              className="group relative w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-accent hover:bg-secondary transition-all duration-300"
              title={label}
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          );
        })}

        <span className="w-px h-6 bg-border mx-1" aria-hidden="true" />

        {/* Language Toggle */}
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={lang === 'en' ? t.langToggle.switchToId : t.langToggle.switchToEn}
          className="group relative w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-accent hover:bg-secondary transition-all duration-300 cursor-pointer"
          title={lang === 'en' ? t.langToggle.switchToId : t.langToggle.switchToEn}
        >
          <Languages className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -bottom-0.5 right-0.5 text-[8px] font-bold tracking-wider uppercase px-1 py-0 rounded-full bg-secondary text-foreground/80 border border-border/80 group-hover:border-accent/40 group-hover:text-accent transition-colors leading-tight select-none">
            {lang}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={t.theme.toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-accent hover:bg-secondary transition-all duration-300 cursor-pointer"
          title={theme === 'dark' ? t.theme.switchToLight : t.theme.switchToDark}
        >
          {theme === 'dark' ? (
            <Sun className="w-[18px] h-[18px]" />
          ) : (
            <Moon className="w-[18px] h-[18px]" />
          )}
        </button>
      </nav>
    </header>
  );
}
