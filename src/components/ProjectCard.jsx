import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const isExternal = project.href && project.href.startsWith('http');

  return (
    <li>
      <a
        href={project.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group block rounded-2xl p-4 -mx-4 hover:bg-secondary transition-colors duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent shrink-0" />
            </h3>
            {project.date && (
              <p className="text-xs text-muted-foreground mt-0.5">{project.date}</p>
            )}
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </li>
  );
}
