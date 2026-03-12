'use client';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Tooltip, Legend, Filler, Title,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Tooltip, Legend, Filler, Title);

const years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019',
    '2020', '2021', '2022', '2023', '2024', '2025'];

const gdpData = [4.9, 3.6, 4.5, 4.8, 5.0, 5.7, 5.5, 6.3, 6.0, 4.6, 6.2, 6.5, 6.2, 5.6, 5.0, 4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.1, 5.0, 4.9];
const inflData = [3.7, 11.5, 11.9, 6.6, 6.1, 10.5, 13.1, 6.4, 9.8, 4.8, 5.1, 5.4, 4.3, 8.4, 8.4, 6.4, 3.5, 3.8, 3.2, 2.8, 2.0, 1.6, 4.2, 3.7, 2.5, 2.3];
const unempData = [6.1, 8.1, 9.1, 9.5, 9.8, 11.2, 10.3, 9.1, 8.5, 7.9, 7.1, 6.6, 6.1, 6.2, 5.9, 6.2, 5.6, 5.5, 5.3, 5.2, 7.1, 6.5, 5.8, 5.3, 4.8, 4.7];

const lineOptions = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: { legend: { position: 'bottom' as const } },
    scales: {
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: (v: any) => `${v}%` } },
        x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } },
    },
};

export default function IndonesiaMacroPage() {
    const macroChart = {
        labels: years,
        datasets: [
            { label: 'GDP Growth (%)', data: gdpData, borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.1)', tension: 0.3, fill: false, pointRadius: 2 },
            { label: 'Inflation (%)', data: inflData, borderColor: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.3, fill: false, pointRadius: 2 },
            { label: 'Unemployment (%)', data: unempData, borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.3, fill: false, pointRadius: 2 },
        ],
    };

    const corrChart = {
        labels: ['Inflation ↔ Unemployment', 'GDP ↔ Unemployment', 'GDP ↔ Inflation'],
        datasets: [{
            label: 'Pearson Correlation',
            data: [0.76, 0.04, 0.23],
            backgroundColor: ['rgba(239,68,68,0.75)', 'rgba(59,130,246,0.75)', 'rgba(245,158,11,0.75)'],
            borderColor: ['#EF4444', '#3B82F6', '#F59E0B'],
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    const corrOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { min: -0.1, max: 1.0, ticks: { callback: (v: any) => v.toFixed(2) }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    const regressionChart = {
        labels: ['GDP Growth', 'Inflation'],
        datasets: [{
            label: 'Regression Coefficient',
            data: [-0.165, 0.450],
            backgroundColor: ['rgba(59,130,246,0.7)', 'rgba(239,68,68,0.7)'],
            borderColor: ['#3B82F6', '#EF4444'],
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    const regrOptions = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` β = ${ctx.raw}` } } },
        scales: {
            y: { ticks: { callback: (v: any) => v.toFixed(2) }, grid: { color: 'rgba(0,0,0,0.04)' } },
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
                        Academic Research · Economics · Econometrics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Indonesia&apos;s Macroeconomic Journey:<br />
                        <span className="text-blue-300">GDP, Inflation & Unemployment (2000–2025)</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        A 25-year macroeconomic study using World Bank and BPS data — revealing inflation as the dominant driver
                        of unemployment (R² = 0.596), not GDP growth.
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[['R² Value', '0.596', 'text-green-400', 'Model fit'], ['Inflation β', '+0.450', 'text-yellow-300', 'Significant (p=0.000)'], ['GDP β', '−0.165', 'text-blue-300', 'Not significant (p=0.313)']].map(([l, v, c, n]) => (
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

                {/* Main line chart */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">25-Year Macroeconomic Trends</h2>
                    <p className="text-gray-500 mb-6">GDP growth, inflation, and unemployment from 2000 to 2025. Data: World Bank & BPS Indonesia.</p>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <Line data={macroChart} options={lineOptions} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Sources: <a href="https://data.worldbank.org/country/indonesia" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">World Bank Open Data</a> · <a href="https://www.bps.go.id" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">BPS Statistics Indonesia</a></p>
                </section>

                {/* Key periods */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Economic Periods</h2>
                    <div className="space-y-4">
                        {[
                            { period: '2000–2007', tag: 'Recovery & Reform', color: 'bg-blue-50 border-blue-200', desc: 'Post-crisis recovery drove GDP from 4.9% to 6.3%. Fuel subsidy cuts in 2005–2006 spiked inflation to ~13%, keeping unemployment above 10%.' },
                            { period: '2008–2009', tag: 'Global Crisis — Resilient', color: 'bg-green-50 border-green-200', desc: "Indonesia's domestic consumption-driven economy avoided recession. GDP slowed to 4.6% but never went negative. Unemployment gradually declined." },
                            { period: '2010–2019', tag: 'Stable Decade', color: 'bg-yellow-50 border-yellow-200', desc: 'GDP held at 5–6%. Inflation anchored around 2–3%. Unemployment fell from 7.1% to 5.2% as Bank Indonesia\'s targeting framework matured.' },
                            { period: '2020', tag: 'COVID-19 Shock', color: 'bg-red-50 border-red-200', desc: 'GDP fell to −2.1% — first recession since 1998. Unemployment spiked to 7.1%. Inflation fell simultaneously (demand shock, not supply).' },
                            { period: '2021–2025', tag: 'Recovery', color: 'bg-purple-50 border-purple-200', desc: 'GDP returned to ~5%. Inflation settled 2–2.5%. Unemployment declined to approximately 4.8% by 2024.' },
                        ].map(({ period, tag, color, desc }) => (
                            <div key={period} className={`flex gap-4 p-5 rounded-xl border ${color}`}>
                                <div className="flex-shrink-0 w-24 text-xs font-mono font-bold text-gray-700">{period}</div>
                                <div>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{tag}</span>
                                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Correlation + Regression charts side by side */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistical Analysis</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-1">Pearson Correlations</h3>
                            <p className="text-xs text-gray-500 mb-4">The 0.76 between Inflation & Unemployment is the key finding.</p>
                            <Bar data={corrChart} options={corrOptions} />
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-1">OLS Regression Coefficients</h3>
                            <p className="text-xs text-gray-500 mb-4">Model: Unemployment = β₀ + β₁·GDP + β₂·Inflation. R² = 0.596</p>
                            <Bar data={regressionChart} options={regrOptions} />
                        </div>
                    </div>
                </section>

                {/* Results table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Regression Results</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Variable', 'Coefficient', 'p-value', 'Significance'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[['Constant', '5.34', '0.000', '✓ Significant'], ['GDP Growth', '−0.165', '0.313', '✗ Not significant'], ['Inflation', '+0.450', '0.000', '✓ Strongly significant']].map(([v, c, p, s]) => (
                                    <tr key={v} className="bg-white hover:bg-gray-50">
                                        <td className="px-5 py-3.5 text-gray-700 font-medium">{v}</td>
                                        <td className="px-5 py-3.5 font-mono text-gray-800">{c}</td>
                                        <td className="px-5 py-3.5 font-mono text-gray-500">{p}</td>
                                        <td className={`px-5 py-3.5 text-xs font-semibold ${s.startsWith('✓') ? 'text-green-600' : 'text-red-400'}`}>{s}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Reflection */}
                <section className="border-l-4 border-blue-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Key Takeaway</h2>
                    <p className="text-gray-600 leading-relaxed">
                        <strong>Inflation control is a labour market policy, not just a monetary one.</strong> The near-zero correlation between GDP growth and unemployment challenges the intuitive assumption and points to a more nuanced policy prescription: stable prices matter more for employment than headline growth.
                    </p>
                </section>
            </div>
        </main>
    );
}
