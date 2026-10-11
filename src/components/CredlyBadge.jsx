import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CredlyBadge({ badgeId, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();

  const defaultTitle = lang === 'id'
    ? 'Lihat pencapaian terverifikasi saya di Credly.'
    : 'View my verified achievement on Credly.';

  return (
    <div className="relative w-[150px] h-[270px] shrink-0 rounded overflow-hidden bg-card/40 border border-border/60 hover:border-accent/40 transition-all duration-300 shadow-xs">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 animate-pulse bg-muted/20">
          <div className="w-16 h-16 rounded-full bg-muted/40 mb-3" />
          <div className="w-20 h-3 rounded bg-muted/40 mb-2" />
          <div className="w-14 h-2.5 rounded bg-muted/30" />
        </div>
      )}
      <iframe
        name="acclaim-badge"
        allowTransparency="true"
        frameBorder="0"
        id={`embedded-badge-${badgeId}`}
        scrolling="no"
        src={`https://www.credly.com/embedded_badge/${badgeId}`}
        style={{ width: '150px', height: '270px' }}
        title={title || defaultTitle}
        onLoad={() => setIsLoading(false)}
        className="w-[150px] h-[270px] border-0"
      />
    </div>
  );
}
