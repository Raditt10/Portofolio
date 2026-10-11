import React from 'react';
import { Award, Medal, Trophy, FileBadge, ArrowUpRight } from 'lucide-react';

export default function AchievementCard({ item, onSelect, iconType }) {
  const getMedalIcon = () => {
    if (iconType === 'certificate' || item.medal === 'certificate') {
      return <FileBadge className="w-5 h-5" />;
    }
    switch (item.medal) {
      case 'gold':
        return <Award className="w-5 h-5" />;
      case 'silver':
        return <Medal className="w-5 h-5" />;
      case 'badge':
        return <FileBadge className="w-5 h-5" />;
      default:
        return <FileBadge className="w-5 h-5" />;
    }
  };

  const getMedalStyles = () => {
    if (iconType === 'certificate' || item.medal === 'certificate') {
      return 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400';
    }
    switch (item.medal) {
      case 'gold':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:text-yellow-400';
      case 'silver':
        return 'bg-zinc-400/10 text-zinc-500 border-zinc-400/30 dark:text-zinc-300';
      case 'badge':
      default:
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400';
    }
  };

  const handleClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(item);
    }
  };

  return (
    <li>
      <a
        href={item.href || '#'}
        onClick={handleClick}
        target={item.href && !onSelect ? '_blank' : undefined}
        rel={item.href && !onSelect ? 'noopener noreferrer' : undefined}
        className="group flex items-center gap-4 rounded-2xl p-4 -mx-4 hover:bg-secondary transition-colors duration-300 cursor-pointer"
      >
        <span
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${getMedalStyles()}`}
          aria-hidden="true"
        >
          {getMedalIcon()}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            {item.event && (
              <span className="text-xs text-muted-foreground">· {item.event}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {[item.field, item.location, item.date].filter(Boolean).join(' · ')}
          </p>
        </div>

        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300 shrink-0" />
      </a>
    </li>
  );
}
