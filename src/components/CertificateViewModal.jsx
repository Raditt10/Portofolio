import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CertificateViewModal({ item, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in-fade"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
          <div className="min-w-0 pr-4">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {item.event}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-muted-foreground hover:text-accent hover:bg-secondary transition-colors"
                title={t.modal.openOriginal}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              title={t.modal.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Image / Preview */}
        <div className="p-4 overflow-y-auto flex items-center justify-center bg-secondary/30">
          <img
            src={item.href}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-sm border border-border"
          />
        </div>
      </div>
    </div>
  );
}
