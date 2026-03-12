import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ArrowLeft, Calendar } from 'lucide-react';
import { formatDate, getTagColor } from '@/lib/utils';

interface ProjectLayoutProps {
  project: Project;
  content: string; // rendered HTML
}

export default function ProjectLayout({ project, content }: ProjectLayoutProps) {
  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-600/50 text-blue-100 text-xs font-medium border border-blue-400/30">
              {project.industry}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-200 text-xs font-medium border border-yellow-400/30">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{project.title}</h1>

          {/* Impact banner */}
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-green-300 text-lg">✦</span>
            <span className="text-white font-medium">{project.impact}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(project.date)}
            </span>
          </div>

          {/* Tool tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-h2:text-2xl prose-h3:text-xl prose-a:text-brand-600 prose-code:text-brand-700 prose-pre:bg-gray-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Navigation footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/#portfolio"
            className="btn-primary"
          >
            <ArrowLeft size={16} /> Back to All Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
