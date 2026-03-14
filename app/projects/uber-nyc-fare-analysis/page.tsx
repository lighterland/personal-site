'use client';
import {
    Chart as ChartJS,
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
import { Bar, Line } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(
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

export default function UberNYCPage() {

    // Chart 1: Quarterly Revenue Trend
    const quarterlyRevenueData = {
        labels: ['Q1 2012', 'Q2 2012', 'Q3 2012', 'Q4 2012', 'Q1 2013', 'Q2 2013', 'Q3 2013', 'Q4 2013', 'Q1 2014', 'Q2 2014', 'Q3 2014', 'Q4 2014', 'Q1 2015', 'Q2 2015'],
        datasets: [
            {
                label: 'Quarterly Revenue ($)',
                data: [34200, 42800, 51300, 48700, 58900, 71400, 84500, 80200, 96500, 112000, 103800, 107400, 114200, 119600],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59,130,246,0.12)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: (ctx: any) => {
                    const idx = ctx.dataIndex;
                    return idx === 10 ? '#EF4444' : '#3B82F6';
                },
                pointBorderColor: (ctx: any) => {
                    const idx = ctx.dataIndex;
                    return idx === 10 ? '#DC2626' : '#2563EB';
                },
                borderWidth: 2.5,
            },
        ],
    };

    const quarterlyRevenueOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => ` $${ctx.raw.toLocaleString()}`,
                    afterLabel: (ctx: any) => ctx.dataIndex === 10 ? '⚠ Lyft entered NYC (Q3 2014)' : '',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: { callback: (v: any) => `$${(v / 1000).toFixed(0)}K` },
                grid: { color: 'rgba(0,0,0,0.04)' },
            },
            x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 11 } } },
        },
    };

    // Chart 2: Hourly Revenue vs Trip Count
    const hourlyLabels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const hourlyRevenueData = {
        labels: hourlyLabels,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Revenue ($)',
                data: [24100, 18600, 13200, 8400, 6200, 8900, 14700, 23100, 32400, 36200, 38100, 40300, 43200, 44100, 45800, 46900, 48700, 51200, 53900, 57580, 55300, 52100, 46800, 38900],
                backgroundColor: 'rgba(59,130,246,0.7)',
                borderColor: '#3B82F6',
                borderWidth: 1,
                borderRadius: 4,
                yAxisID: 'y',
            },
            {
                type: 'line' as const,
                label: 'Trip Count',
                data: [3100, 2400, 1700, 1100, 800, 1150, 1900, 2980, 4180, 4660, 4910, 5190, 5570, 5680, 5910, 6050, 6280, 6610, 6950, 9266, 7130, 6720, 6040, 5010],
                borderColor: '#F59E0B',
                backgroundColor: 'transparent',
                tension: 0.4,
                pointRadius: 3,
                borderWidth: 2,
                yAxisID: 'y1',
            },
        ],
    };

    const hourlyOptions: any = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: { callback: (v: any) => `$${(v / 1000).toFixed(0)}K` },
                grid: { color: 'rgba(0,0,0,0.04)' },
            },
            y1: {
                type: 'linear',
                position: 'right',
                ticks: { callback: (v: any) => v.toLocaleString() },
                grid: { drawOnChartArea: false },
            },
            x: { grid: { display: false } },
        },
    };

    // Chart 3: Distance Distribution
    const distanceData = {
        labels: ['0–2 km (Short)', '2–4 km (Medium)', '4+ km (Long)'],
        datasets: [
            {
                label: 'Share of Trips (%)',
                data: [52.3, 34.6, 13.1],
                backgroundColor: 'rgba(59,130,246,0.8)',
                borderColor: '#3B82F6',
                borderWidth: 1.5,
                borderRadius: 6,
            },
            {
                label: 'Avg Fare ($)',
                data: [6.48, 10.26, 14.27],
                backgroundColor: 'rgba(167,139,250,0.8)',
                borderColor: '#7C3AED',
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const distanceOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
            tooltip: { callbacks: { label: (ctx: any) => ctx.dataset.label === 'Avg Fare ($)' ? ` $${ctx.raw}` : ` ${ctx.raw}%` } },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Chart 4: Competitive Benchmark
    const competitiveData = {
        labels: ['Customer Retention', 'Driver Satisfaction'],
        datasets: [
            {
                label: 'Uber',
                data: [54, 48],
                backgroundColor: 'rgba(59,130,246,0.85)',
                borderColor: '#3B82F6',
                borderWidth: 1.5,
                borderRadius: 6,
            },
            {
                label: 'Lyft',
                data: [68, 52],
                backgroundColor: 'rgba(239,68,68,0.8)',
                borderColor: '#EF4444',
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const competitiveOptions = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}%` } },
        },
        scales: {
            x: { beginAtZero: true, max: 100, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            y: { grid: { display: false } },
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
                        Ride-hailing Analytics · RevoU FSDA Capstone
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Analyzing Uber Fares in NYC:<br />
                        <span className="text-blue-300">Reversing a Lyft-Driven Revenue Decline</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        A deep-dive into 200,000 Uber rides across New York City — identifying what Lyft's entry actually caused,
                        where pricing opportunities exist, and how to hit a $213K H2 2015 revenue target using linear regression and
                        competitive benchmarking.
                    </p>
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[
                            { label: 'Total Revenue (Dataset)', value: '$857K', color: 'text-blue-300', note: '200K rides, NYC' },
                            { label: 'Avg Fare per Trip', value: '$8.80', color: 'text-green-400', note: 'Baseline metric' },
                            { label: 'H2 2015 Target', value: '$213K', color: 'text-yellow-300', note: '12,324 trips required' },
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

                {/* Context */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        In <strong>Q3 2014</strong>, Lyft launched in New York City. Uber's response to that single event is the core of this analysis.
                        Gross bookings fell <strong>7.30%</strong> and trip growth dropped <strong>6.58%</strong> quarter-over-quarter.
                        A forward-looking revenue model projected a further <strong>4.87% decline</strong> in full-year 2015 if no corrective action was taken.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        The challenge: turn historical fare and trip data into a concrete revenue strategy. Not just "grow trips" — but precisely
                        how many trips, priced how, optimised for which customer segments, benchmarked accurately against the competitor.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        {[['Source', 'Kaggle (3 datasets)'], ['Records', '200,000+ rides'], ['Period', 'May 2011–Jun 2015'], ['Method', 'Python · Regression · T-Test']].map(([k, v]) => (
                            <div key={k} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="text-xs text-gray-500 font-medium mb-1">{k}</div>
                                <div className="text-sm font-semibold text-gray-800">{v}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Chart 1: Revenue Trend */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">The Lyft Effect — Visible in the Data</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Quarterly revenue was on a consistent upward trajectory from 2012 through Q2 2014. Then Lyft entered NYC.
                        The <span className="text-red-500 font-semibold">red dot</span> marks Q3 2014 — the first visible revenue dip in 10 consecutive growth quarters.
                        A two-sample t-test confirmed this was statistically significant (<strong>p = 0.014</strong>, below α = 0.05).
                    </p>
                    <Line data={quarterlyRevenueData} options={quarterlyRevenueOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Quarterly revenue trend — red point marks Q3 2014 Lyft NYC entry · Values are directional from dataset patterns</p>
                </section>

                {/* Chart 2: Hourly Demand */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Where Demand Lives: Hour by Hour</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        19:00 (7 PM) is the single highest-value hour: <strong>$57,580 revenue from 9,266 trips</strong>.
                        Weekend nights create a distinct secondary peak that standard pricing didn't fully capture —
                        a concentrated surge pricing opportunity.
                    </p>
                    <Bar data={hourlyRevenueData as any} options={hourlyOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Hourly revenue (bars, left axis) vs. trip count (line, right axis) — 24-hour profile across full dataset</p>
                </section>

                {/* Chart 3: Distance */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Distance Drives Fare — and Product Mix Opportunity</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Over <strong>52% of rides are under 2 km</strong> at an average fare of just $6.48. Long rides (4+ km) earn 2.2× that.
                        Shifting even 5% of short-ride volume toward premium options (UberBlack, UberSUV) meaningfully increases average fare
                        without requiring more total trips.
                    </p>
                    <Bar data={distanceData} options={distanceOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Trip segment distribution (%) vs. average fare per segment ($)</p>
                </section>

                {/* Chart 4: Competitive */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">The Competitor Gap: Uber vs. Lyft</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Benchmarked against Lyft's Boston market data, Uber trails on both key loyalty metrics.
                        A <strong>14-point retention gap</strong> and <strong>4-point driver satisfaction gap</strong> — both compound over time through referrals
                        and service quality degradation. Closing these gaps is as strategically important as pricing.
                    </p>
                    <div className="max-w-lg mx-auto">
                        <Bar data={competitiveData} options={competitiveOptions} />
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-3">Uber vs. Lyft — Customer Retention and Driver Satisfaction rates (%)</p>
                </section>

                {/* Regression */}
                <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue Forecasting: The Model</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Linear regression on trips vs. revenue produced the following model, validated against historical quarters:
                    </p>
                    <div className="bg-gray-900 rounded-xl p-5 font-mono text-green-400 text-sm mb-6">
                        Revenue = −517.05 + 8.897 × (Trips)
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        To hit the H2 2015 target of <strong>$213,862</strong>, Uber NYC needs <strong>12,324 trips</strong> in 6 months.
                        The model frames the strategy simply: every initiatives — surge pricing, premium product mix, driver incentives, loyalty
                        programs — serves a single measurable goal.
                    </p>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategic Recommendations</h2>
                    <p className="text-gray-500 mb-8">Three levers, each grounded in a specific analytical finding.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                n: '01', title: 'Surge Pricing Windows', color: 'text-blue-600 bg-blue-50',
                                desc: 'Implement surge pricing during the identified 19:00 peak and weekend late-night windows. These periods have high demand and low price sensitivity — the ideal surge profile.',
                                bullets: ['7 PM weekday pricing tier', 'Weekend 10 PM–2 AM surge window'],
                            },
                            {
                                n: '02', title: 'Premium Product Push', color: 'text-purple-600 bg-purple-50',
                                desc: 'Shift 5–10% of short-ride volume (< 2 km) to UberBlack or UberSUV via in-app promotions, increasing average fare from $6.48 without requiring more total trips.',
                                bullets: ['UberBlack/SUV acquisition promos', 'Short-trip premium upsell banner'],
                            },
                            {
                                n: '03', title: 'Retention & Driver Program', color: 'text-green-600 bg-green-50',
                                desc: 'Close the 14-point customer retention gap and 4-point driver satisfaction gap vs. Lyft through a loyalty tier program and high-rated driver incentives.',
                                bullets: ['Tiered loyalty points system', 'Top-driver bonus & recognition'],
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

                {/* Impact Table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">The Revenue Roadmap</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Metric', 'Baseline', 'Target'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['H2 2015 Revenue Target', '–', '$213,862'],
                                    ['Trips Required (Model)', '–', '12,324'],
                                    ['Avg Fare per Trip', '$8.80', '$13.00+ (premium mix)'],
                                    ['Customer Retention', '54%', '65%+ (close Lyft gap)'],
                                    ['Driver Satisfaction', '48%', '52%+ (match Lyft)'],
                                    ['Q3 2014 Booking Decline', '−7.3%', 'Reversed to +5%'],
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
                        The key instinct this project reinforced: <strong>correlation is only valuable when you can explain the mechanism.</strong>
                        The t-test told us Lyft mattered — but it was the hourly, distance, and competitive analyses that showed <em>how</em> to respond.
                        A revenue decline without a mechanism is just noise. A revenue decline with a mechanism — evening peak underpricing,
                        short-ride dominance, retention gap — becomes a strategy. That translation from statistical finding to operational lever
                        is what this project practised.
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                        Dataset:{' '}
                        <a href="https://www.kaggle.com/datasets/yasserh/uber-fares-dataset" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
                            Uber Fares Dataset
                        </a>{' · '}
                        <a href="https://www.kaggle.com/datasets/brllrb/uber-and-lyft-dataset-boston-ma" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
                            Uber and Lyft Dataset Boston
                        </a>{' '}
                        (Kaggle) · RevoU FSDA Group Project
                    </p>
                </section>
            </div>
        </main>
    );
}
