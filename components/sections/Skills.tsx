'use client';
import { useState } from 'react';
import SkillPill from '@/components/ui/SkillPill';
import skillsData from '@/content/skills.json';

const tabs = ['Languages & Frameworks', 'Tools & Platforms', 'Capabilities'] as const;
type Tab = (typeof tabs)[number];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Skills</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Technical Toolkit</h2>
        <p className="text-gray-500 mb-8">Breadth and depth, without the wall of text.</p>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'Languages & Frameworks' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillsData.languages.map((skill) => (
              <SkillPill key={skill.name} name={skill.name} proficiency={skill.proficiency} />
            ))}
          </div>
        )}

        {activeTab === 'Tools & Platforms' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillsData.tools.map((skill) => (
              <SkillPill key={skill.name} name={skill.name} proficiency={skill.proficiency} />
            ))}
          </div>
        )}

        {activeTab === 'Capabilities' && (
          <div className="flex flex-wrap gap-3">
            {skillsData.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-4 py-2 bg-brand-50 text-brand-800 border border-brand-200 rounded-xl text-sm font-medium hover:bg-brand-100 transition-colors"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
