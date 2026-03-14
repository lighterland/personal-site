'use client';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    Filler,
    ScatterController,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ScatterController,
    Tooltip,
    Legend,
    Title,
    Filler
);

export default function TheLookPage() {

    // BCG Matrix: Scatter Plot — all 4 quadrants
    // x = Relative Market Share (0–1), y = Market Growth Rate (can be negative)
    // Dividing lines: x=0.5 (share), y=10% (growth)
    // Stars: high share + high growth | Q-Marks: low share + high growth
    // Cash Cows: high share + low/neg growth | Dogs: low share + low/neg growth

    const BCG_X_MID = 0.5;  // dividing line: relative market share
    const BCG_Y_MID = 10;   // dividing line: market growth rate %

    // Custom plugin: draws quadrant lines + emoji labels directly on canvas
    const bcgQuadrantPlugin = {
        id: 'bcgQuadrants',
        afterDatasetsDraw(chart: any) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea) return;
            const xMid = scales.x.getPixelForValue(BCG_X_MID);
            const yMid = scales.y.getPixelForValue(BCG_Y_MID);
            const { left, right, top, bottom } = chartArea;

            ctx.save();

            // Quadrant background fills
            const fills = [
                { x: xMid, y: top,   w: right - xMid, h: yMid - top,    color: 'rgba(59,130,246,0.06)'  }, // Star (top-right)
                { x: left, y: top,   w: xMid - left,  h: yMid - top,    color: 'rgba(251,146,60,0.06)'  }, // Q-Mark (top-left)
                { x: xMid, y: yMid,  w: right - xMid, h: bottom - yMid, color: 'rgba(34,197,94,0.06)'   }, // Cash Cow (bottom-right)
                { x: left, y: yMid,  w: xMid - left,  h: bottom - yMid, color: 'rgba(239,68,68,0.06)'   }, // Dog (bottom-left)
            ];
            fills.forEach(({ x, y, w, h, color }) => {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, w, h);
            });

            // Dividing lines
            ctx.setLineDash([6, 4]);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(100,116,139,0.4)';
            ctx.beginPath(); ctx.moveTo(xMid, top); ctx.lineTo(xMid, bottom); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(left, yMid); ctx.lineTo(right, yMid); ctx.stroke();
            ctx.setLineDash([]);

            // Quadrant labels (emoji + text)
            const labels = [
                { text: '⭐ Stars',          x: xMid + (right - xMid) * 0.15, y: top + 22,    color: '#1D4ED8' },
                { text: '❓ Question Marks', x: left + (xMid - left) * 0.12,  y: top + 22,    color: '#C2410C' },
                { text: '🐄 Cash Cows',      x: xMid + (right - xMid) * 0.15, y: bottom - 12, color: '#15803D' },
                { text: '🐕 Dogs',           x: left + (xMid - left) * 0.12,  y: bottom - 12, color: '#B91C1C' },
            ];
            ctx.font = 'bold 12px Inter, sans-serif';
            labels.forEach(({ text, x, y, color }) => {
                ctx.fillStyle = color;
                ctx.fillText(text, x, y);
            });

            ctx.restore();
        },
    };

    const bcgData = {
        datasets: [
            {
                label: '⭐ Stars (High Share, High Growth)',
                data: [
                    { x: 0.82, y: 22, label: 'Sweaters' },
                    { x: 0.78, y: 18, label: 'Tops & Tees' },
                    { x: 0.72, y: 15, label: 'Shorts' },
                ],
                backgroundColor: 'rgba(59,130,246,0.88)',
                borderColor: '#2563EB',
                borderWidth: 1.5,
                pointRadius: 11,
                pointHoverRadius: 14,
            },
            {
                label: '❓ Question Marks (Low Share, High Growth)',
                data: [
                    { x: 0.38, y: 28, label: 'Swim' },
                    { x: 0.42, y: 25, label: 'Fashion Hoodies & Sweatshirts' },
                    { x: 0.32, y: 19, label: 'Suit & Sport Coats' },
                    { x: 0.28, y: 14, label: 'Accessories' },
                ],
                backgroundColor: 'rgba(251,146,60,0.88)',
                borderColor: '#EA580C',
                borderWidth: 1.5,
                pointRadius: 11,
                pointHoverRadius: 14,
            },
            {
                label: '🐄 Cash Cows (High Share, Low/Neg Growth)',
                data: [
                    { x: 0.80, y: 3,   label: 'Dresses' },
                    { x: 0.68, y: -2,  label: 'Jeans' },
                    { x: 0.62, y: 5,   label: 'Active' },
                ],
                backgroundColor: 'rgba(34,197,94,0.85)',
                borderColor: '#16A34A',
                borderWidth: 1.5,
                pointRadius: 11,
                pointHoverRadius: 14,
            },
            {
                label: '🐕 Dogs (Low Share, Low/Neg Growth)',
                data: [
                    { x: 0.28, y: -8,  label: 'Leggings' },
                    { x: 0.22, y: -5,  label: 'Maternity' },
                    { x: 0.18, y: -10, label: 'Skirts' },
                    { x: 0.32, y: -3,  label: 'Socks' },
                    { x: 0.24, y: -6,  label: 'Suits' },
                    { x: 0.15, y: -9,  label: 'Blazers & Jackets' },
                    { x: 0.26, y: -12, label: 'Jumpsuits & Rompers' },
                ],
                backgroundColor: 'rgba(239,68,68,0.85)',
                borderColor: '#DC2626',
                borderWidth: 1.5,
                pointRadius: 11,
                pointHoverRadius: 14,
            },
        ],
    };

    const bcgOptions: any = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 11 }, padding: 14, boxWidth: 12 } },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        const d = ctx.raw as { x: number; y: number; label: string };
                        return ` ${d.label} — RMS: ${d.x.toFixed(2)}, Growth: ${d.y > 0 ? '+' : ''}${d.y}%`;
                    },
                },
            },
            bcgQuadrants: bcgQuadrantPlugin,
        },
        scales: {
            x: {
                min: 0,
                max: 1,
                title: { display: true, text: 'Relative Market Share →', font: { size: 12 }, color: '#6B7280' },
                grid: { color: (ctx: any) => Math.abs(ctx.tick.value - BCG_X_MID) < 0.001 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.05)' },
                ticks: { callback: (v: any) => v.toFixed(1) },
            },
            y: {
                min: -20,
                max: 35,
                title: { display: true, text: 'Market Growth Rate (%)', font: { size: 12 }, color: '#6B7280' },
                grid: { color: (ctx: any) => {
                    if (Math.abs(ctx.tick.value - BCG_Y_MID) < 0.5) return 'rgba(0,0,0,0)';
                    if (ctx.tick.value === 0) return 'rgba(107,114,128,0.4)';
                    return 'rgba(0,0,0,0.05)';
                }},
                ticks: { callback: (v: any) => `${v > 0 ? '+' : ''}${v}%` },
            },
        },
    };

    // Category Retention Horizontal Bar
    const retentionCategories = [
        'Dresses', 'Sleep & Lounge', 'Suits', 'Tops & Tees', 'Active', 'Shorts',
        'Maternity', 'Fashion Hoodies', 'Outerwear', 'Jeans', 'Leggings', 'Blazers & Jackets',
    ];
    const retentionValues = [51.2, 49.7, 49.7, 49.5, 49.3, 49.1, 48.8, 48.5, 48.1, 47.9, 47.5, 47.0];

    const retentionData = {
        labels: retentionCategories,
        datasets: [
            {
                label: 'Repeat Buyer Rate (%)',
                data: retentionValues,
                backgroundColor: retentionValues.map(v =>
                    v >= 50 ? 'rgba(59,130,246,0.85)' : v < 48 ? 'rgba(239,68,68,0.75)' : 'rgba(167,139,250,0.80)'
                ),
                borderColor: retentionValues.map(v =>
                    v >= 50 ? '#3B82F6' : v < 48 ? '#EF4444' : '#7C3AED'
                ),
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const retentionOptions = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}% repeat buyers` } },
        },
        scales: {
            x: { min: 44, max: 54, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            y: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
    };

    // Cohort Retention Heatmap Table
    // Rows = acquisition month (Jan–Dec 2022)
    // Columns = Month 0 through Month 11 (retention at each interval)
    // null = data not yet available (incomplete cohort window)
    const cohortMonths = ['Jan\'22','Feb\'22','Mar\'22','Apr\'22','May\'22','Jun\'22','Jul\'22','Aug\'22','Sep\'22','Oct\'22','Nov\'22','Dec\'22'];
    const cohortMatrix: (number | null)[][] = [
        // M0    M1    M2    M3    M4    M5    M6    M7    M8    M9   M10   M11
        [100,   22,   14,   10,    8,    8,    9,    7,    6,    6,    5,    5],  // Jan
        [100,   20,   13,    9,    8,    8,    8,    7,    6,    5,    5,    5],  // Feb
        [100,   21,   13,    9,    8,    8,    8,    6,    6,    5,    4,    4],  // Mar
        [100,   20,   12,    9,    8,    7,    8,    6,    5,    5,    4,    4],  // Apr
        [100,   21,   13,    9,    8,    8,    9,    7,    6,    6,    5,    5],  // May
        [100,   22,   13,   10,    9,    8,    9,    7,    6,    6,    5,    5],  // Jun
        [100,   23,   14,   10,    9,    9,   10,    8,    7,    6,    6,    6],  // Jul
        [100,   28,   18,   13,   12,   11,   13,   10,    9,    8,  null, null], // Aug
        [100,   30,   20,   14,   13,   12,   14,   11,   10,  null, null, null], // Sep
        [100,   27,   18,   13,   12,   11,   12,    9,  null, null, null, null], // Oct
        [100,   25,   16,   12,   11,   10,   11,  null, null, null, null, null], // Nov
        [100,   24,   15,   11,   10,   10,  null, null, null, null, null, null], // Dec
    ];

    // Returns a blue-intensity background color based on retention value
    function cohortCellColor(val: number | null, isM0: boolean): string {
        if (val === null) return 'transparent';
        if (isM0) return '#1D4ED8';
        // Scale 0–30% -> light to dark blue
        const intensity = Math.min(val / 30, 1);
        const r = Math.round(240 - intensity * 180);
        const g = Math.round(245 - intensity * 110);
        const b = Math.round(255 - intensity * 10);
        return `rgb(${r},${g},${b})`;
    }
    function cohortTextColor(val: number | null, isM0: boolean): string {
        if (val === null) return '#D1D5DB';
        if (isM0) return '#FFFFFF';
        return val >= 15 ? '#1E3A8A' : '#374151';
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="py-16 px-6" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%)' }}>
                <div className="max-w-5xl mx-auto">
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-8 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
                        eCommerce Analytics · SQL · BCG Strategy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        TheLook eCommerce:<br />
                        <span className="text-blue-300">Revenue & Retention Optimization</span>
                    </h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        Using SQL-driven BCG matrix analysis and cohort modeling to guide 2023 resource reallocation —
                        identifying 7 underperforming categories to deprioritize, 4 to accelerate, and the August–December
                        seasonal window where loyalty investment yields the highest return.
                    </p>
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl">
                        {[
                            { label: '"Dog" Categories Found', value: '7', color: 'text-red-400', note: 'Candidates for deprioritization' },
                            { label: 'Avg Cohort Retention', value: '~7%', color: 'text-yellow-300', note: 'Platform-wide structural churn' },
                            { label: 'Peak Retention Window', value: 'Aug–Dec', color: 'text-green-400', note: 'Festive season uplift' },
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
                        Heading into 2023, the business faced resource pressure. Budget needed to be cut somewhere — but without data,
                        "cut somewhere" becomes "cut randomly." Leadership needed to know: <strong>which product categories are genuinely
                        worth protecting, and which are quietly draining resources?</strong>
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        A second problem ran in parallel: customer retention was low across the board, sitting around 7% on average.
                        Was this a product-level issue (some categories just don't retain) or a platform-level one (no loyalty mechanism
                        regardless of category)? The answer would determine whether the solution was a product cull or a CRM investment.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        {[['Source', 'TheLook (Looker)'], ['Type', 'Synthetic eCommerce'], ['Period', '2021–2022'], ['Method', 'SQL · BCG · Cohort']].map(([k, v]) => (
                            <div key={k} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="text-xs text-gray-500 font-medium mb-1">{k}</div>
                                <div className="text-sm font-semibold text-gray-800">{v}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Methodology */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytical Framework</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            {
                                n: '01', icon: '📊', title: 'BCG Matrix',
                                desc: 'Calculated Relative Market Share and Market Growth Rate per category (2021 vs 2022 revenue). Mapped all categories into four strategic quadrants.',
                                tag: 'SQL CTEs',
                            },
                            {
                                n: '02', icon: '🔁', title: 'Retention Analysis',
                                desc: 'Computed the % of repeat unique buyers vs. total unique buyers per category in 2022 — revealing whether retention was product-specific or platform-wide.',
                                tag: 'SQL Window Functions',
                            },
                            {
                                n: '03', icon: '📅', title: 'Cohort Analysis',
                                desc: 'Grouped users by their first purchase month in 2022 and tracked month-by-month retention across 11 subsequent months. Surfaces seasonal behavioral patterns.',
                                tag: 'SQL Cohort CTEs',
                            },
                        ].map(({ n, icon, title, desc, tag }) => (
                            <div key={n} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <div className="text-2xl mb-3">{icon}</div>
                                <div className="text-xs text-blue-600 font-semibold mb-1">{n}</div>
                                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SQL snippet */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">SQL Logic: BCG Matrix Construction</h2>
                    <p className="text-gray-600 mb-5 leading-relaxed">
                        The BCG matrix required calculating two metrics per category: <strong>Relative Market Share</strong> (category revenue / top-category revenue)
                        and <strong>Market Growth Rate</strong> (2022 revenue vs 2021). Below is the CTE structure:
                    </p>
                    <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono overflow-x-auto">
                        <pre className="text-green-400 whitespace-pre">{`WITH revenue_by_category AS (
  SELECT
    category,
    SUM(CASE WHEN EXTRACT(YEAR FROM created_at) = 2021 THEN revenue END) AS rev_2021,
    SUM(CASE WHEN EXTRACT(YEAR FROM created_at) = 2022 THEN revenue END) AS rev_2022
  FROM orders
  GROUP BY category
),
market_metrics AS (
  SELECT
    category,
    rev_2022,
    rev_2021,
    rev_2022 / MAX(rev_2022) OVER () AS relative_market_share,
    (rev_2022 - rev_2021) / rev_2021 * 100 AS market_growth_rate
  FROM revenue_by_category
)
SELECT
  category,
  ROUND(relative_market_share, 2) AS rms,
  ROUND(market_growth_rate, 1) AS mgr,
  CASE
    WHEN relative_market_share >= 0.5 AND market_growth_rate >= 10 THEN 'Star'
    WHEN relative_market_share < 0.5 AND market_growth_rate >= 10 THEN 'Question Mark'
    WHEN relative_market_share >= 0.5 AND market_growth_rate < 10 THEN 'Cash Cow'
    ELSE 'Dog'
  END AS bcg_quadrant
FROM market_metrics
ORDER BY bcg_quadrant, rms DESC;`}</pre>
                    </div>
                </section>

                {/* BCG Chart */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">BCG Matrix: Category Portfolio Map</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        All product categories mapped across two axes: <strong>Relative Market Share</strong> (x) and <strong>Market Growth Rate</strong> (y).
                        The dashed dividing lines split the chart into four strategic quadrants. <span className="text-red-500 font-semibold">Dogs</span> (bottom-left) show both low share and negative growth — seven categories landed here.
                        <span className="text-blue-600 font-semibold"> Stars</span> and <span className="text-orange-500 font-semibold">Question Marks</span> are the growth opportunities.
                    </p>
                    <Scatter data={bcgData} options={bcgOptions} plugins={[bcgQuadrantPlugin]} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        {[
                            { label: '⭐ Stars', desc: 'High share + High growth → Scale', color: 'bg-blue-50 border-blue-200' },
                            { label: '❓ Question Marks', desc: 'Low share + High growth → Invest selectively', color: 'bg-purple-50 border-purple-200' },
                            { label: '🐄 Cash Cows', desc: 'High share + Low growth → Protect margin', color: 'bg-green-50 border-green-200' },
                            { label: '🐕 Dogs', desc: 'Low share + Low growth → Deprioritize', color: 'bg-red-50 border-red-200' },
                        ].map(({ label, desc, color }) => (
                            <div key={label} className={`rounded-xl p-3 border text-xs ${color}`}>
                                <div className="font-bold text-gray-800 mb-1">{label}</div>
                                <div className="text-gray-600">{desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Retention Chart */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Retention — A Uniform Story</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Retention rates across all categories cluster tightly between <strong>47% and 51%</strong>. No category stands out as a retention driver.
                        This uniformity is the finding — it means the retention problem is <strong>not in the product</strong>, it's in the platform.
                        A loyalty program or re-engagement system will benefit all categories equally.
                    </p>
                    <div className="space-y-2">
                        {retentionCategories.map((cat, i) => {
                            const val = retentionValues[i];
                            const barColor = val >= 50 ? '#3B82F6' : val < 48 ? '#EF4444' : '#8B5CF6';
                            const barWidth = ((val - 44) / (54 - 44)) * 100;
                            return (
                                <div key={cat} className="flex items-center gap-3">
                                    <span className="text-xs text-gray-600 w-36 text-right shrink-0">{cat}</span>
                                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                                            style={{ width: `${barWidth}%`, backgroundColor: barColor }}
                                        >
                                            <span className="text-white text-xs font-semibold">{val}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-4">Category repeat buyer rate (%) · 2022 data · Blue ≥50%, Purple 48–50%, Red &lt;48%</p>
                </section>

                {/* Cohort Heatmap Table */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Cohort Analysis: The Seasonal Signal</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Each row is a customer cohort (acquisition month). Each column tracks what % of that cohort returned in Month 1, Month 2, and so on.
                        The deeper the blue, the higher the retention. Notice how <strong>August–December cohorts</strong> hold retention significantly better
                        in early months — the festive season effect is visible row by row.
                    </p>

                    {/* Legend */}
                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 flex-wrap">
                        <span className="font-medium text-gray-700">Retention intensity:</span>
                        {[['Low (~5%)', 'bg-blue-100'], ['Medium (~12%)', 'bg-blue-300'], ['High (~22%)', 'bg-blue-500'], ['M0 (100%)', 'bg-blue-700']].map(([label, cls]) => (
                            <span key={label} className="flex items-center gap-1.5">
                                <span className={`inline-block w-4 h-4 rounded ${cls}`} />
                                {label}
                            </span>
                        ))}
                        <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-4 rounded border border-gray-200 bg-white" />— = No data yet</span>
                    </div>

                    {/* Heatmap Table */}
                    <div className="overflow-x-auto">
                        <table className="text-xs border-collapse w-full min-w-max">
                            <thead>
                                <tr>
                                    <th className="text-left px-3 py-2 text-gray-500 font-semibold w-20 sticky left-0 bg-gray-50 z-10">Cohort</th>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <th key={i} className="px-2 py-2 text-center text-gray-500 font-semibold w-14">
                                            M{i}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cohortMatrix.map((row, ri) => (
                                    <tr key={cohortMonths[ri]}>
                                        <td className="px-3 py-1.5 font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 whitespace-nowrap">{cohortMonths[ri]}</td>
                                        {row.map((val, ci) => {
                                            const isM0 = ci === 0;
                                            const isEmpty = val === null;
                                            return (
                                                <td
                                                    key={ci}
                                                    className="px-2 py-1.5 text-center rounded-sm transition-all"
                                                    style={{
                                                        backgroundColor: cohortCellColor(val, isM0),
                                                        color: cohortTextColor(val, isM0),
                                                        fontWeight: isM0 ? 700 : 500,
                                                        border: '2px solid #F3F4F6',
                                                        minWidth: '3rem',
                                                    }}
                                                    title={isEmpty ? 'No data yet' : `${val}% retained`}
                                                >
                                                    {isEmpty ? '–' : `${val}%`}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-4">Rows = 2022 acquisition cohorts · Columns = month since first purchase (M0–M11) · — = insufficient data window</p>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategic Recommendations</h2>
                    <p className="text-gray-500 mb-8">Four actions grounded in the three analytical outputs.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                n: '01', title: 'Deprioritize the 7 Dogs', color: 'text-red-600 bg-red-50',
                                desc: 'Reduce marketing spend, promotional placement, and inventory depth for Leggings, Maternity, Socks, Skirts, Suits, Blazers & Jackets, and Jumpsuits. Redirect budget to Stars.',
                                stat: '7 categories · est. 15–20% budget freed',
                            },
                            {
                                n: '02', title: 'Accelerate Stars & Question Marks', color: 'text-blue-600 bg-blue-50',
                                desc: 'Swim, Fashion Hoodies & Sweatshirts, Sweaters, and Suit & Sport Coats show high growth potential. Increase ad spend, hero placement, and inventory for the August–December peak.',
                                stat: '4 categories · high-growth trajectory',
                            },
                            {
                                n: '03', title: 'Launch Platform-Wide Loyalty Program', color: 'text-purple-600 bg-purple-50',
                                desc: 'Since retention is uniform across categories, a platform-level loyalty mechanism (points, VIP tiers, post-purchase email flows) will lift all categories simultaneously.',
                                stat: 'Addresses structural ~7% cohort retention',
                            },
                            {
                                n: '04', title: 'Align Campaigns to Aug–Dec Window', color: 'text-green-600 bg-green-50',
                                desc: 'Cohort data shows retention is highest for August–December acquisitions. Time loyalty program launches, re-engagement campaigns, and seasonal promos to this window.',
                                stat: 'Festive uplift · highest ROI deployment',
                            },
                        ].map(({ n, title, color, desc, stat }) => (
                            <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${color} mb-3`}>{n}</div>
                                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                                <div className="text-xs text-gray-400 italic">{stat}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact Table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Decision Matrix</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Category', 'BCG Quadrant', 'Retention', 'Recommended Action'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['Swim', 'Star', '~49%', 'Scale investment'],
                                    ['Fashion Hoodies', 'Star / Q-Mark', '~48%', 'Scale investment'],
                                    ['Sweaters', 'Star', '~49%', 'Scale investment'],
                                    ['Leggings', 'Dog', '~47.5%', 'Deprioritize'],
                                    ['Maternity', 'Dog', '~48.8%', 'Deprioritize'],
                                    ['Socks', 'Dog', '~47%', 'Deprioritize'],
                                    ['Blazers & Jackets', 'Dog', '47.0%', 'Deprioritize'],
                                ].map(([cat, quad, ret, action]) => (
                                    <tr key={cat} className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5 text-gray-700 font-medium">{cat}</td>
                                        <td className={`px-5 py-3.5 font-semibold ${quad.includes('Dog') ? 'text-red-500' : 'text-blue-600'}`}>{quad}</td>
                                        <td className="px-5 py-3.5 text-gray-500">{ret}</td>
                                        <td className={`px-5 py-3.5 font-semibold ${action === 'Scale investment' ? 'text-green-600' : 'text-red-500'}`}>{action}</td>
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
                        The BCG matrix is a strategic framework — but like all frameworks, its value depends on the precision of inputs.
                        Anchoring RMS and MGR to actual revenue deltas (2021 vs 2022) gave the quadrants real meaning instead of arbitrary placement.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3">
                        The retention finding was counterintuitive: <strong>all categories are equally bad at retaining customers.</strong>
                        Usually, mixed results guide you toward specific problem areas. Uniformity tells you the problem is systemic — and
                        that discovery changed the entire direction of the recommendation, from "fix underperforming categories" to "build a loyalty platform."
                        Good analysis sometimes tells you to look somewhere completely different.
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                        Dataset:{' '}
                        <a href="https://console.cloud.google.com/marketplace/product/bigquery-public-data/thelook-ecommerce" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
                            TheLook eCommerce (BigQuery Public Dataset)
                        </a>
                    </p>
                </section>
            </div>
        </main>
    );
}
