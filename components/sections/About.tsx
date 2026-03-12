'use client';
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function About() {
  const chartData = {
    labels: ['Logistics', 'Supply Chain', 'Retail / FMCG', 'Research', 'Consulting'],
    datasets: [
      {
        data: [40, 30, 20, 5, 5],
        backgroundColor: [
          '#3B82F6',
          '#60A5FA',
          '#93C5FD',
          '#7C3AED',
          '#A78BFA',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 12,
          font: { family: 'Inter', size: 12 },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; raw: unknown }) => ` ${ctx.label}: ${ctx.raw}%`,
        },
      },
    },
    animation: { duration: 1000, easing: 'easeOutQuart' as const },
  };

  return (
    <section id="about" className="py-20 px-6" style={{ background: '#F8FAFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">About</span>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
              Data, Decisions, and the<br />
              <span className="gradient-text">Stories Between Them</span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Sadana Erland is a data analyst who believes the most powerful thing a
                dataset can do is <strong>change a decision</strong>. He works at the
                intersection of logistics, supply chain, and business intelligence —
                translating complex operational data into clear, actionable insights.
              </p>
              <p>
                His approach is methodical but narrative-driven: every analysis begins
                with a question and ends with a recommendation. He has worked across
                industries including logistics, retail, and FMCG, building dashboards,
                automating reporting pipelines, and surfacing patterns that drive cost
                savings and efficiency gains.
              </p>
              <p>
                When he&apos;s not wrangling data, he writes about analytics and data
                storytelling on Medium — because the best analysis is the one that
                gets <em>read</em>.
              </p>
            </div>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['3+ Years Experience', 'Logistics Domain', 'Python & SQL', 'Power BI', 'Data Storytelling'].map(t => (
                <span key={t} className="tag-blue">{t}</span>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-700">Industries Worked In</h3>
            <div className="w-full max-w-xs" aria-label="Donut chart: industries worked in">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
