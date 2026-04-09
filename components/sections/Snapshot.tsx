import StatCard from '@/components/ui/StatCard';
import { Calendar, BarChart2, DollarSign, Search } from 'lucide-react';

const industries = ['Logistics', 'Supply Chain', 'Retail / FMCG', 'E-Commerce', 'Research'];
const coreSkills = [
  'Exploratory Data Analysis',
  'Dashboard Design & BI',
  'Statistical Modeling',
  'A/B Testing',
  'Data Storytelling',
  'ETL Pipeline Design',
];
const tools = ['Python', 'SQL', 'Power BI', 'Tableau', 'dbt', 'Excel / Sheets', 'Looker Studio', 'R'];

export default function Snapshot() {
  return (
    <section id="snapshot" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Summary Snapshot</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">At a Glance</h2>
        <p className="text-gray-500 mb-10">Numbers that define the work. Stories behind each one.</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard value={3} suffix="+" label="Years of Experience" icon={<Calendar size={32} />} />
          <StatCard value={20} suffix="+" label="Dashboards Built" icon={<BarChart2 size={32} />} />
          <StatCard value={68} suffix="K" prefix="$" label="Cost Savings Identified" icon={<DollarSign size={32} />} />
          <StatCard value={30} suffix="+" label="Datasets Analyzed" icon={<Search size={32} />} />
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Industries */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-4">
              Industries
            </h3>
            <ul className="space-y-2">
              {industries.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Core Skills */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-4">
              Core Skills
            </h3>
            <ul className="space-y-2">
              {coreSkills.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-4">
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="tag-blue">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
