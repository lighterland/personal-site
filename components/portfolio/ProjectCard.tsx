import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ArrowRight } from 'lucide-react';
import { getTagColor } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card p-6 flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="tag-gray text-xs">{project.industry}</span>
        {project.featured && (
          <span className="tag-blue text-xs">Featured</span>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
        {project.title}
      </h3>

      {/* Impact statement */}
      <p className="text-brand-600 font-medium text-sm mb-4 leading-relaxed">
        {project.impact}
      </p>

      {/* Tool tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tools.slice(0, 5).map((tool) => (
          <span key={tool} className={getTagColor(tool) + ' text-xs px-2 py-0.5 rounded-full font-medium'}>
            {tool}
          </span>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA — links to original HTML if externalUrl set, otherwise Next.js page */}
      {project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors group-hover:gap-3"
        >
          View Interactive Report <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors group-hover:gap-3"
        >
          Read Case Study <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
