'use client';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    Tooltip, Legend, Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export default function ReportingAutomationPage() {
    // Time comparison bar
    const timeData = {
        labels: ['Before Automation', 'After Automation'],
        datasets: [{
            label: 'Time to Produce Report (minutes)',
            data: [240, 15],
            backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(34,197,94,0.8)'],
            borderColor: ['#EF4444', '#22C55E'],
            borderWidth: 2, borderRadius: 8,
        }],
    };

    const timeOpts = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw} min` } } },
        scales: {
            y: { max: 280, ticks: { callback: (v: any) => `${v} min` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Error rate comparison
    const errorData = {
        labels: ['Manual Process', 'Automated Pipeline'],
        datasets: [{
            label: 'Estimated Error Rate',
            data: [100, 8],
            backgroundColor: ['rgba(239,68,68,0.7)', 'rgba(34,197,94,0.7)'],
            borderColor: ['#EF4444', '#22C55E'],
            borderWidth: 2, borderRadius: 8,
        }],
    };

    const errorOpts = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}% of baseline` } } },
        scales: {
            y: { max: 120, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Hours reclaimed per year
    const hoursData = {
        labels: ['Reporting (reclaimed)', 'Analysis (gained)', 'Ad-hoc requests (reduced)'],
        datasets: [{
            label: 'Estimated Annual Hours Impact',
            data: [200, 120, 80],
            backgroundColor: ['rgba(59,130,246,0.75)', 'rgba(16,185,129,0.75)', 'rgba(245,158,11,0.75)'],
            borderColor: ['#3B82F6', '#10B981', '#F59E0B'],
            borderWidth: 2, borderRadius: 6,
        }],
    };

    const hoursOpts = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` ~${ctx.raw} hrs/year` } } },
        scales: {
            y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: (v: any) => `${v}h` } },
            x: { grid: { display: false } },
        },
        indexAxis: 'y' as const,
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="py-16 px-6" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%)' }}>
                <div className="max-w-5xl mx-auto">
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
                        Process Automation · Python · Laku6
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Automated Reporting<br /><span className="text-blue-300">Pipeline</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        A Python pipeline built at Laku6 that replaced 4 hours of manual weekly reporting with a 15-minute automated process — reclaiming 200+ analyst hours per year.
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[['Time Before', '4 hours', 'text-red-400', 'Every Monday manually'], ['Time After', '15 min', 'text-green-400', '6:15 AM, automatic'], ['Hours Reclaimed', '>200/yr', 'text-yellow-300', 'Redirected to analysis']].map(([l, v, c, n]) => (
                            <div key={l} className="bg-white/10 rounded-xl p-4 border border-white/10">
                                <div className="text-blue-200 text-xs font-medium mb-1">{l}</div>
                                <div className={`text-3xl font-bold ${c}`}>{v}</div>
                                <div className="text-blue-300/60 text-xs mt-1">{n}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Context</h2>
                    <p className="text-gray-600 leading-relaxed">Built during my time as <strong>Operations Data Analyst at Laku6 (Carousell Group)</strong>. The operations analytics team was spending 4+ hours every Monday pulling data from 6 different systems, cleaning it, and assembling the weekly KPI summary for senior management. Across a lean team, this was a significant recurring cost — and entirely eliminatable. The key insight: 70% of that time wasn't analysis. It was copy-paste and reformatting.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">The Impact in Numbers</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Report Production Time</h3>
                            <Bar data={timeData} options={timeOpts} />
                            <p className="text-xs text-center text-gray-400 mt-2">Minutes per report</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Error Rate vs Baseline</h3>
                            <Bar data={errorData} options={errorOpts} />
                            <p className="text-xs text-center text-gray-400 mt-2">Human handling eliminated</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Annual Hours Reclaimed</h3>
                            <Bar data={hoursData} options={hoursOpts} />
                            <p className="text-xs text-center text-gray-400 mt-2">Approximate estimates</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">How It Was Built</h2>
                    <div className="space-y-3">
                        {[
                            ['1 · Audit', 'Mapped all 6 data sources, identified overlapping fields, built a unified data dictionary with stakeholders.'],
                            ['2 · Extraction', 'Python (pandas + openpyxl + gspread) to pull from each source automatically — ERP export, Excel trackers, Tableau extract, Google Sheets, finance email summary.'],
                            ['3 · Standardization', 'Lookup tables to resolve conflicting regional codes and metric definitions across sources.'],
                            ['4 · Transformation', 'A single pandas transformation script producing a clean, analysis-ready table every run.'],
                            ['5 · Output', 'Auto-generated Looker Studio report pushed via API — dynamic, drill-through capable, and ready by 6:15 AM.'],
                            ['6 · Scheduling', 'Windows Task Scheduler runs the pipeline every Monday at 6:00 AM.'],
                        ].map(([step, desc]) => (
                            <div key={step} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <span className="text-brand-600 font-bold text-xs flex-shrink-0 mt-0.5 w-20">{step}</span>
                                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-l-4 border-blue-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Reflection</h2>
                    <p className="text-gray-600 leading-relaxed">The hardest part wasn't the code — it was getting agreement on <strong><em>which</em> version of each metric was "correct."</strong> Building the data dictionary with stakeholders first saved weeks of downstream confusion. Documentation is not optional; it's the product.</p>
                </section>
            </div>
        </main>
    );
}
