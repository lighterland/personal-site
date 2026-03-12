'use client';
import TrendSimulator from '@/components/playground/TrendSimulator';
import CostOptimizer from '@/components/playground/CostOptimizer';
import PatternGuesser from '@/components/playground/PatternGuesser';
import DatasetExplorer from '@/components/playground/DatasetExplorer';
import DataStoryAnimation from '@/components/playground/DataStoryAnimation';

export default function Playground() {
  return (
    <section id="playground" className="py-20 px-6 playground-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-400" />
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Interactive</span>
            <div className="w-8 h-0.5 bg-brand-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Data Playground
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Explore data ideas. No code required.
          </p>
        </div>

        {/* Widget grid: 2x2 + 1 full-width */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <TrendSimulator />
          <CostOptimizer />
          <PatternGuesser />
          <DatasetExplorer />
        </div>

        {/* Full-width story widget */}
        <DataStoryAnimation />
      </div>
    </section>
  );
}
