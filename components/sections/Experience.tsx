import experienceData from '@/content/experience.json';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Experience</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Career Timeline</h2>
        <p className="text-gray-500 mb-12">Where the work happened.</p>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, #DBEAFE, #3B82F6, #DBEAFE)' }}
          />

          <div className="space-y-10">
            {(experienceData as Array<{
              id: string; role: string; company: string; location: string;
              period: string; type: string; description: string;
              achievements: string[]; tools: string[];
            }>).map((job, idx) => (
              <div
                key={job.id}
                className={`relative flex gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col pl-12 md:pl-0`}
              >
                {/* Circle node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-md z-10" />

                {/* Card */}
                <div className={`card p-6 md:w-5/12 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Period + type */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      {job.period}
                    </span>
                    <span className="tag-gray text-xs">{job.type}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{job.role}</h3>
                  <p className="text-brand-600 font-semibold text-sm mb-1">{job.company}</p>
                  <p className="text-gray-400 text-xs mb-4">{job.location}</p>

                  {/* Achievements — top 3 only */}
                  <ul className="space-y-2 mb-4">
                    {job.achievements.slice(0, 3).map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-brand-500 flex-shrink-0 mt-0.5">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                    {job.tools.map((tool) => (
                      <span key={tool} className="tag-blue text-xs">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
