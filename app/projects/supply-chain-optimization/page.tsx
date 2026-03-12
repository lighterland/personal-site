'use client';
import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    Filler,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    Filler
);

export default function SupplyChainPage() {
    // Chart: Stock availability (doughnut)
    const stockData = {
        labels: ['Ready Stock (17%)', 'Backorder / On-Demand (83%)'],
        datasets: [{
            data: [17, 83],
            backgroundColor: ['#3B82F6', '#FCA5A5'],
            borderColor: ['#2563EB', '#EF4444'],
            borderWidth: 2,
        }],
    };

    // Chart: Shipping mode split (doughnut)
    const shippingData = {
        labels: ['Standard Class (93%)', 'Same Day / First Class (7%)'],
        datasets: [{
            data: [93, 7],
            backgroundColor: ['#60A5FA', '#34D399'],
            borderColor: ['#3B82F6', '#10B981'],
            borderWidth: 2,
        }],
    };

    // Chart: Before / After late delivery (bar)
    const deliveryData = {
        labels: ['Current Rate', 'Target (Post-Strategy)'],
        datasets: [{
            label: 'Late Delivery Rate (%)',
            data: [57, 19],
            backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(34,197,94,0.8)'],
            borderColor: ['#EF4444', '#22C55E'],
            borderWidth: 2,
            borderRadius: 8,
        }],
    };

    // Chart: Seasonality (bar)
    const seasonalityData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Order Volume Index',
                data: [88, 85, 92, 90, 95, 93, 97, 94, 91, 72, 65, 60],
                backgroundColor: 'rgba(59,130,246,0.6)',
                borderColor: '#3B82F6',
                borderWidth: 1.5,
                borderRadius: 4,
            },
            {
                label: 'Stock Availability Index',
                data: [75, 75, 76, 74, 75, 74, 76, 75, 74, 75, 76, 75],
                backgroundColor: 'rgba(251,191,36,0.5)',
                borderColor: '#F59E0B',
                borderWidth: 1.5,
                borderRadius: 4,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 12 } },
        },
        cutout: '60%',
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}%` } },
        },
        scales: {
            y: { beginAtZero: true, max: 70, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    const seasonalityOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const },
        },
        scales: {
            y: { beginAtZero: false, min: 50, ticks: { callback: (v: any) => `${v}` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
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
                        Supply Chain Analytics · Self-Project · Public Dataset
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Supply Chain Optimization:<br />
                        <span className="text-blue-300">Reducing Late Deliveries from 57% to 19%</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        A root-cause analysis on 180,000+ order records from the public DataCo Smart Supply Chain dataset,
                        diagnosing why 57% of shipments were delayed — and proposing a three-pillar strategy to cut that to 19%.
                    </p>
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[
                            { label: 'Current Late Rate', value: '57%', color: 'text-red-400', note: 'Baseline 2015–2017' },
                            { label: 'Target', value: '19%', color: 'text-green-400', note: 'Goal FY 2018' },
                            { label: 'Revenue Impact', value: '−15%', color: 'text-yellow-300', note: 'Transaction decline 2017' },
                        ].map(({ label, value, color, note }) => (
                            <div key={label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                                <div className="text-blue-200 text-xs font-medium mb-1">{label}</div>
                                <div className={`text-3xl font-bold ${color}`}>{value}</div>
                                <div className="text-blue-300/60 text-xs mt-1">{note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

                {/* Dataset */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Dataset</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        The <strong>DataCo Smart Supply Chain Dataset</strong> (Kaggle) covers a global retail organization's full order lifecycle — provisioning, production, sales, and commercial distribution — across 180,000+ transactions from 2015 to 2017.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[['Source', 'DataCo / Kaggle'], ['Records', '180,000+'], ['Period', '2015–2017'], ['Tools', 'SQL · Python · Tableau']].map(([k, v]) => (
                            <div key={k} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="text-xs text-gray-500 font-medium mb-1">{k}</div>
                                <div className="text-sm font-semibold text-gray-800">{v}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Root Cause Analysis + Charts */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Root Cause Analysis</h2>
                    <p className="text-gray-500 mb-8">Three overlapping problems, each measurable from the data.</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Cause 1 */}
                        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 text-lg mb-4">⚠️</div>
                            <h3 className="font-bold text-gray-900 mb-2">Critical Stock Levels</h3>
                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                Only <strong>17%</strong> of products were available for immediate shipping. 83% of orders triggered backordering, accounting for roughly 46% of all delays.
                            </p>
                            <Doughnut data={stockData} options={doughnutOptions} />
                        </div>

                        {/* Cause 2 */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-lg mb-4">🚚</div>
                            <h3 className="font-bold text-gray-900 mb-2">Shipping Mode Trap</h3>
                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                <strong>93%</strong> of shipments used Standard Class (2–4 day transit). Combined with production backlogs, hitting delivery promises became mathematically impossible.
                            </p>
                            <Doughnut data={shippingData} options={doughnutOptions} />
                        </div>

                        {/* Cause 3 */}
                        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-lg mb-4">📅</div>
                            <h3 className="font-bold text-gray-900 mb-2">Planning Errors</h3>
                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                ~<strong>11%</strong> of shipments were capable of on-time delivery but still classified as late — a pure scheduling error in production planning (PPIC).
                            </p>
                            <div className="space-y-3">
                                {[['Planning Accuracy', 89, 'bg-purple-400'], ['Error Rate', 11, 'bg-red-400']].map(([label, pct, cls]) => (
                                    <div key={label as string}>
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>{label}</span>
                                            <span className="font-bold">{pct}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`${cls} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seasonality */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Seasonality Gap</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Order volume peaks in Q1–Q3 then drops sharply in Q4. Stock availability stayed flat year-round — meaning inventory was most constrained precisely when demand was highest. This mismatch amplified all three root causes.
                    </p>
                    <Bar data={seasonalityData} options={seasonalityOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Index values illustrative — directional from dataset patterns</p>
                </section>

                {/* Before / After */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">The Target: 57% → 19%</h2>
                    <p className="text-gray-600 mb-8">A 67% improvement in delivery reliability — sufficient to reverse the 2017 revenue decline.</p>
                    <div className="max-w-sm mx-auto">
                        <Bar data={deliveryData} options={barOptions} />
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategic Recommendations</h2>
                    <p className="text-gray-500 mb-8">Three targeted interventions, each addressing one root cause.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                n: '01', title: 'Inventory Optimization', color: 'text-blue-600 bg-blue-50',
                                desc: 'Implement forecast-based stocking for the top 10 subcategories — targeting Ready Stock from 17% up to 46%, aligned to Q1–Q3 demand peaks.',
                                bullets: ['Forecast-per-month logic', 'High-demand season focus'],
                            },
                            {
                                n: '02', title: 'Dynamic Logistics Upgrade', color: 'text-green-600 bg-green-50',
                                desc: 'Auto-escalate to Same Day / First Class shipping when stock is unavailable at order time — compensating for production lead time.',
                                bullets: ['Auto-upgrade when stock = 0', 'Cost vs. speed evaluation'],
                            },
                            {
                                n: '03', title: 'PPIC Process Reform', color: 'text-purple-600 bg-purple-50',
                                desc: 'Establish dedicated production-planning coordination, align scheduling to the 3-day lead-time standard, and reduce variance tracking errors.',
                                bullets: ['3-day lead-time alignment', 'Reduce schedule variance < 2%'],
                            },
                        ].map(({ n, title, color, desc, bullets }) => (
                            <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${color} mb-3`}>{n}</div>
                                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                                <ul className="space-y-1.5">
                                    {bullets.map(b => (
                                        <li key={b} className="flex items-center gap-2 text-xs text-gray-500">
                                            <span className="text-blue-500">▸</span> {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Projected Impact</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Metric', 'Baseline', 'Target'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['Late Delivery Rate', '57%', '19%'],
                                    ['Ready Stock Rate', '17%', '46%'],
                                    ['PPIC Scheduling Error', '~11%', '< 2%'],
                                    ['Transaction Decline', '−15% YoY', 'Stabilised'],
                                ].map(([metric, base, target]) => (
                                    <tr key={metric} className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5 text-gray-700 font-medium">{metric}</td>
                                        <td className="px-5 py-3.5 text-red-500">{base}</td>
                                        <td className="px-5 py-3.5 text-green-600 font-semibold">{target}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Reflection */}
                <section className="border-l-4 border-blue-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Reflection</h2>
                    <p className="text-gray-600 leading-relaxed">
                        The key analytical instinct this project reinforced: <strong>the bottleneck is rarely where the symptom appears.</strong> Late deliveries looked like a logistics problem. The data showed they were an inventory and planning problem. That distinction — invisible without the data — is what makes the recommendations credible rather than generic. Working through a full dataset from diagnosis to roadmap is a different muscle than producing a dashboard; this project was practice for exactly that.
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                        Dataset: <a href="https://www.kaggle.com/datasets/shashwatwork/dataco-smart-supply-chain-for-big-data-analysis" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">DataCo Smart Supply Chain for Big Data Analysis</a> (Kaggle)
                    </p>
                </section>
            </div>
        </main>
    );
}
