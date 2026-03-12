'use client';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Filler);

export default function DemandForecastingPage() {
    // Forecast vs Actual — sample SKU
    const forecastData = {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
        datasets: [
            {
                label: 'Actual Sales',
                data: [42, 48, 39, 55, 60, 52, 58, 45, 62, 67, 53, 59],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59,130,246,0.1)',
                tension: 0.3, pointRadius: 4, fill: false,
            },
            {
                label: 'XGBoost Forecast',
                data: [44, 46, 41, 53, 62, 50, 56, 47, 60, 65, 55, 57],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16,185,129,0.1)',
                borderDash: [5, 3],
                tension: 0.3, pointRadius: 3, fill: false,
            },
        ],
    };

    const forecastOpts = {
        responsive: true,
        plugins: { legend: { position: 'bottom' as const } },
        scales: {
            y: { grid: { color: 'rgba(0,0,0,0.04)' }, title: { display: true, text: 'Units Sold' } },
            x: { grid: { display: false }, title: { display: true, text: 'Week (Q3 2023 Pilot)' } },
        },
    };

    // Model accuracy comparison
    const modelData = {
        labels: ['Manual Reorder\n(Gut-Feel)', 'ARIMA', 'Linear Trend', 'XGBoost (Selected)'],
        datasets: [{
            label: 'MAPE (%)',
            data: [19.1, 14.3, 12.8, 8.3],
            backgroundColor: ['rgba(239,68,68,0.7)', 'rgba(245,158,11,0.7)', 'rgba(59,130,246,0.6)', 'rgba(34,197,94,0.8)'],
            borderColor: ['#EF4444', '#F59E0B', '#3B82F6', '#22C55E'],
            borderWidth: 2, borderRadius: 6,
        }],
    };

    const modelOpts = {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` MAPE: ${ctx.raw}%` } } },
        scales: {
            y: { min: 0, max: 25, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Before/After impact
    const impactData = {
        labels: ['Overstock Incidents', 'Stockout Events\n(Top 20 SKUs)', 'Inventory Holding Cost'],
        datasets: [
            { label: 'Before (Baseline)', data: [100, 100, 100], backgroundColor: 'rgba(239,68,68,0.7)', borderColor: '#EF4444', borderWidth: 2, borderRadius: 4 },
            { label: 'After Pilot (Q3 2023)', data: [70, 78, 82], backgroundColor: 'rgba(34,197,94,0.7)', borderColor: '#22C55E', borderWidth: 2, borderRadius: 4 },
        ],
    };

    const impactOpts = {
        responsive: true,
        plugins: { legend: { position: 'bottom' as const }, tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}% of baseline` } } },
        scales: {
            y: { min: 0, max: 120, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="py-16 px-6" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%)' }}>
                <div className="max-w-5xl mx-auto">
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
                        Inventory Analytics · Machine Learning · Laku6
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Demand Forecasting<br /><span className="text-blue-300">for Inventory Optimization</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        Built a demand signal system at Laku6 comparing ARIMA, XGBoost, and linear trend models — XGBoost won with 8.3% MAPE, reducing overstock incidents by approximately 30% in pilot zones.
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[['Best Model', 'XGBoost', 'text-green-400', 'MAPE: 8.3%'], ['vs. Manual Process', '19.1%', 'text-red-400', 'Was MAPE before'], ['Overstock Reduction', '~30%', 'text-yellow-300', 'Pilot Q3 2023']].map(([l, v, c, n]) => (
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
                    <p className="text-gray-600 leading-relaxed">Conducted during my role as <strong>Operations Data Analyst at Laku6</strong>. As a second-hand device marketplace, demand varies by device category, condition grade, and region, while supply is inbound-driven and hard to predict. Overstock of lower-demand models and stockouts of high-demand ones were consistently affecting operational efficiency. The challenge: build a reliable demand signal without cloud infrastructure.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Forecast vs Actual</h2>
                    <p className="text-gray-500 mb-6">Sample SKU from the Q3 2023 pilot. XGBoost closely tracks actual sales with MAPE of 8.3%, compared to 19.1% from the prior manual process.</p>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <Line data={forecastData} options={forecastOpts} />
                    </div>
                </section>

                <section>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-1">Model Accuracy Comparison</h3>
                            <p className="text-xs text-gray-500 mb-4">Lower MAPE = better. XGBoost's lag features captured branching patterns ARIMA couldn't.</p>
                            <Bar data={modelData} options={modelOpts} />
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-1">Before vs After: Pilot Impact</h3>
                            <p className="text-xs text-gray-500 mb-4">Indexed to 100% baseline. Results from Q3 2023 pilot across 3 warehouse zones.</p>
                            <Bar data={impactData} options={impactOpts} />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">Method</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            ['Data Ingestion', 'Python + pandas merging CSVs from 8 warehouse zones'],
                            ['Feature Engineering', 'Lag features (7d, 14d, 30d), rolling averages, zone fixed effects'],
                            ['Model Selection', 'Compared ARIMA, XGBoost, Linear — XGBoost won on MAPE (8.3%)'],
                            ['Output', 'Weekly reorder quantity per SKU per zone'],
                            ['Delivery', 'Auto-generated Google Sheets report every Monday morning'],
                            ['Infrastructure', 'Zero cloud dependency — runs in under 3 minutes on a standard laptop'],
                        ].map(([t, d]) => (
                            <div key={t} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="text-xs font-semibold text-brand-600 mb-1">{t}</div>
                                <p className="text-xs text-gray-600 leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-l-4 border-blue-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Reflection</h2>
                    <p className="text-gray-600 leading-relaxed">Start simple. XGBoost outperformed ARIMA — not because it was more sophisticated, but because lag features captured zone-level patterns better than ARIMA's time-only structure. The biggest time saver was building a solid data ingestion pipeline first, so model iteration was fast.</p>
                </section>
            </div>
        </main>
    );
}
