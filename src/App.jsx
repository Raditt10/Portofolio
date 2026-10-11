import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import ProjectCard from './components/ProjectCard';
import AchievementCard from './components/AchievementCard';
import CertificateViewModal from './components/CertificateViewModal';
import CredlyBadge from './components/CredlyBadge';
import { useLanguage } from './context/LanguageContext';
import { credlyProfileUrl, hardSkills } from '../constant';
import {
  Github,
  Instagram,
  Mail,
  FileText,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';

const socialIconMap = {
  Github,
  Instagram,
  Mail,
  FileText
};

export default function App() {
  const { lang, t } = useLanguage();

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.title = `${t.profileData.name} — ${t.profileData.role}`;
  }, [lang, t.profileData.name, t.profileData.role]);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Floating Navigation Header */}
      <HeaderNav theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-5 sm:px-6 pt-16 pb-24">
        {/* About / Hero Section */}
        <section id="about" className="animate-in-fade">
          <img
            src={t.profileData.avatar}
            alt={`Portrait of ${t.profileData.name}`}
            width={88}
            height={88}
            loading="eager"
            fetchPriority="high"
            className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full object-cover ring-2 ring-border shadow-sm select-none"
          />

          <h1 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight">
            {t.profileData.greeting} {t.profileData.shortName}{' '}
            <span className="inline-block animate-wave" role="img" aria-label="Waving hand">
              👋
            </span>
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {lang === 'en' ? (
              <>
                Cloud Engineer from{' '}
                <span className="text-foreground font-medium">{t.profileData.location}</span>. Currently
                studying Software Engineering at{' '}
                <span className="text-foreground font-medium">{t.profileData.school}</span> and building{' '}
                <a
                  href={t.profileData.currentFocus.highlightHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-4 hover:text-accent transition-colors"
                >
                  {t.profileData.currentFocus.highlight}
                </a>{' '}
                digital solutions, scalable web applications, and modern developer products.
              </>
            ) : (
              <>
                Cloud Engineer asal{' '}
                <span className="text-foreground font-medium">{t.profileData.location}</span>. Saat ini
                menempuh jurusan Rekayasa Perangkat Lunak di{' '}
                <span className="text-foreground font-medium">{t.profileData.school}</span> dan membangun solusi digital{' '}
                <a
                  href={t.profileData.currentFocus.highlightHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-4 hover:text-accent transition-colors"
                >
                  {t.profileData.currentFocus.highlight}
                </a>
                , aplikasi web scalable, serta produk developer modern.
              </>
            )}
          </p>
        </section>

        {/* Find me on */}
        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.findMeOn}
          </h2>
          <ul className="mt-3">
            {t.socialLinks.map(({ label, href, iconName }) => {
              const Icon = socialIconMap[iconName] || ArrowUpRight;
              const isHttp = href.startsWith('http') || href.startsWith('mailto');

              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isHttp && !href.startsWith('mailto') ? '_blank' : undefined}
                    rel={isHttp && !href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                    className="dashed-row group"
                  >
                    <span className="text-foreground group-hover:text-accent transition-colors">
                      {label}
                    </span>
                    <span className="dashed-fill" />
                    <Icon className="w-4 h-4 text-foreground group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 shrink-0" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Personal Projects */}
        <section id="projects" className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.personalProjects}
          </h2>
          <ul className="mt-4 space-y-6">
            {t.personalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <a
              href="https://github.com/Raditt10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors group"
            >
              <span>{t.sections.allProjects}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* Featured Portfolio */}
        <section className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.featuredPortfolio}
          </h2>
          <ul className="mt-4 space-y-6">
            {t.featuredPortfolio.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
        </section>

        {/* Achievements */}
        <section id="achievements" className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.achievements}
          </h2>
          <ul className="mt-4 space-y-2">
            {t.achievementsData.map((item) => (
              <AchievementCard
                key={item.title + item.event}
                item={item}
                onSelect={(selected) => setSelectedCertificate(selected)}
              />
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section id="certifications" className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.certifications}
          </h2>
          <ul className="mt-4 space-y-2">
            {t.certificationsData.map((item) => (
              <AchievementCard
                key={item.title + item.event}
                item={item}
                onSelect={(selected) => setSelectedCertificate(selected)}
              />
            ))}
          </ul>
        </section>

        {/* Badges (Credly) */}
        <section id="badges" className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.badges}
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {t.credlyBadgesData.map((badge) => (
              <CredlyBadge
                key={badge.id}
                badgeId={badge.id}
                title={badge.title}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href={credlyProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors group"
            >
              <span>{t.sections.allBadges}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* Hard Skills */}
        <section id="skills" className="mt-16">
          <h2 className="text-[11px] tracking-[0.18em] font-medium text-muted-foreground uppercase">
            {t.sections.hardSkills}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {hardSkills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-background/50 hover:text-foreground hover:border-accent/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-xs text-muted-foreground text-center">
          <span>© {new Date().getFullYear()} {t.profileData.name}. {t.footer?.rights || (lang === 'id' ? 'Hak Cipta Dilindungi' : 'All Rights Reserved')}</span>
        </footer>
      </main>

      {/* Certificate Viewer Modal */}
      <CertificateViewModal
        item={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
