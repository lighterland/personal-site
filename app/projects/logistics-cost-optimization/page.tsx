'use client';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    ArcElement, Tooltip, Legend, Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function LogisticsPage() {
    // Carrier cost per kg (illustrative from analysis)
    const carrierCostData = {
        labels: ['Carrier A', 'Carrier B', 'Carrier C', 'Carrier D', 'Carrier E'],
        datasets: [{
            label: 'Avg Cost / kg (IDR)',
            data: [18400, 16200, 14800, 13500, 12100],
            backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(245,158,11,0.8)', 'rgba(59,130,246,0.7)', 'rgba(59,130,246,0.5)', 'rgba(34,197,94,0.7)'],
            borderColor: ['#EF4444', '#F59E0B', '#3B82F6', '#3B82F6', '#22C55E'],
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    // Root causes of cost overruns - doughnut
    const rootCauseData = {
        labels: ['Carrier concentration (no renegotiation)', 'Empty return trips (22%)', 'Route redundancy (8 city pairs)'],
        datasets: [{
            data: [48, 32, 20],
            backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(245,158,11,0.8)', 'rgba(59,130,246,0.8)'],
            borderColor: ['#EF4444', '#F59E0B', '#3B82F6'],
            borderWidth: 2,
        }],
    };

    // Routes contributing to overruns vs total
    const routeData = {
        labels: ['Routes driving overruns', 'Efficient routes'],
        datasets: [{
            label: '% of Routes',
            data: [14, 86],
            backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(34,197,94,0.7)'],
            borderColor: ['#EF4444', '#22C55E'],
            borderWidth: 2,
            borderRadius: 6,
        },
        {
            label: '% of Total Cost Overruns',
            data: [41, 59],
            backgroundColor: ['rgba(239,68,68,0.4)', 'rgba(34,197,94,0.3)'],
            borderColor: ['#EF4444', '#22C55E'],
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    const barOpts = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    const groupedOpts = {
        responsive: true,
        plugins: { legend: { position: 'bottom' as const } },
        scales: {
            y: { max: 100, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    const doughnutOpts = {
        responsive: true,
        plugins: { legend: { position: 'bottom' as const, labels: { font: { size: 11 } } } },
        cutout: '55%',
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="py-16 px-6" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%)' }}>
                <div className="max-w-5xl mx-auto">
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
                        Logistics · Operations Analytics · Laku6
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Logistics Cost<br /><span className="text-blue-300">Optimization Analysis</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        An operational cost investigation at Laku6 — identifying ~$68K in potential annual savings by diagnosing carrier inefficiencies, empty return trips, and route redundancy.
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[['Savings Identified', '~$68K', 'text-green-400', 'Potential annual'], ['Routes Causing Overruns', '14%', 'text-red-400', 'Drive 41% of cost overruns'], ['Cost Recovery via Recon.', '~10%', 'text-yellow-300', 'From 3PL invoice matching']].map(([l, v, c, n]) => (
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
                    <p className="text-gray-600 leading-relaxed">
                        During my role as <strong>Operations Data Analyst at Laku6 (Carousell Group)</strong>, logistics cost control was a critical lever. Laku6 handles the full lifecycle of pre-owned devices — acquisition, grading, refurbishment, and redistribution — making outbound shipping one of the largest operational cost lines. Regional decisions were being made without a unified data view. This analysis changed that.
                    </p>
                </section>

                {/* Carrier cost chart */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrier Cost Efficiency</h2>
                    <p className="text-gray-500 mb-6">Average shipping cost per kg by carrier — 14% of routes drove 41% of all cost overruns. Two carriers held 60% of volume with no contract renegotiation in 3 years.</p>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <Bar data={carrierCostData} options={barOpts} />
                    </div>
                </section>

                {/* Pareto + root cause */}
                <section>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-1">Route Concentration (Pareto)</h3>
                            <p className="text-xs text-gray-500 mb-4">14% of routes driving 41% of total cost overruns — a classic Pareto pattern.</p>
                            <Bar data={routeData} options={groupedOpts} />
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-1">Root Causes of Overruns</h3>
                            <p className="text-xs text-gray-500 mb-4">Carrier concentration, empty returns, and route redundancy together explain nearly all excess cost.</p>
                            <Doughnut data={rootCauseData} options={doughnutOpts} />
                        </div>
                    </div>
                </section>

                {/* What was built */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">What Was Built</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: 'Shipping Cost Reconciliation Model', desc: 'Line-by-line comparison of internal dispatch records vs 3PL invoices. Recovered approximately 10% in overcharged operational costs. Became a recurring financial control process.' },
                            { title: 'Operational Reporting Dashboard', desc: 'Looker Studio dashboard with daily cost per shipment, cost per kg by carrier, and zone-level efficiency metrics — adopted by 5 regional operations teams.' },
                            { title: 'Order Grouping Redesign', desc: 'New dispatching logic batching outbound orders by zone and weight bracket — reducing partial-capacity dispatches and achieving an estimated 30% cost efficiency improvement.' },
                            { title: 'Automated Daily Reports', desc: 'Python scripts replacing manual daily extraction. Reduced reporting lead time by up to 80% across warehouse and logistics departments.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <h4 className="font-semibold text-gray-900 text-sm mb-2">{title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">Outcomes</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Area', 'Finding', 'Outcome'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['Order grouping', 'Inefficient batching', '~30% estimated cost efficiency improvement'],
                                    ['3PL reconciliation', 'Systematic billing discrepancies', '~10% in operational costs recovered'],
                                    ['Reporting', 'Manual daily process', 'Up to 80% reduction in lead times'],
                                    ['Savings identified', 'Route & carrier analysis', '~$68K potential annual savings'],
                                ].map(([a, b, c]) => (
                                    <tr key={a} className="bg-white hover:bg-gray-50">
                                        <td className="px-5 py-3.5 font-medium text-gray-700">{a}</td>
                                        <td className="px-5 py-3.5 text-gray-500">{b}</td>
                                        <td className="px-5 py-3.5 text-green-600 font-semibold">{c}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="border-l-4 border-blue-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Reflection</h2>
                    <p className="text-gray-600 leading-relaxed">Data quality was the biggest challenge. Investing early in a robust reconciliation pipeline — before doing any cost analysis — was what made the downstream insights credible. The breakthrough came from asking: <strong><em>"What do our most efficient routes have in common?"</em></strong> — which reframed the analysis from cost-cutting to best-practice replication.</p>
                </section>
            </div>
        </main>
    );
}
