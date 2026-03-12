import { getAllProjects } from '@/lib/projects';
import ProjectGrid from '@/components/portfolio/ProjectGrid';

export default async function Portfolio() {
  const projects = getAllProjects();

  return (
    <section id="portfolio" className="py-20 px-6" style={{ background: '#F8FAFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Portfolio</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Selected Work</h2>
        <p className="text-gray-500 mb-10">Real data. Real impact.</p>

        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Projects coming soon. Add markdown files to /content/projects/</p>
          </div>
        )}
      </div>
    </section>
  );
}
