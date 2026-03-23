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

export default function NovaPayFraudDetectionPage() {

    // ═══════════════════════════════════════════
    // PART 1: BEHAVIORAL ANALYTICS CHARTS
    // ═══════════════════════════════════════════

    // Chart 1: Monthly Fraud Rate — exact values from PDF Slide 6
    const monthlyFraudData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Fraud Flag Rate (%)',
                data: [33.09, 31.92, 31.93, 31.90, 31.60, 32.38, 32.14, 32.71, 31.20, 32.25, 31.85, 32.55],
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239,68,68,0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#EF4444',
                borderWidth: 2.5,
            },
            {
                label: 'Average (~32.1%)',
                data: Array(12).fill(32.1),
                borderColor: 'rgba(156,163,175,0.5)',
                borderDash: [6, 4],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
            },
        ],
    };

    const monthlyFraudOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}%` } },
        },
        scales: {
            y: { min: 29, max: 35, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Chart 2: Failed Transactions — exact values from PDF Slide 13
    // Fraud: mean 3.0, Non-Fraud: mean 2.0
    const failedTxnData = {
        labels: ['Fraudulent Transactions', 'Non-Fraud Transactions'],
        datasets: [
            {
                label: 'Avg Failed Attempts (7-day)',
                data: [3.0, 2.0],
                backgroundColor: ['rgba(239,68,68,0.85)', 'rgba(59,130,246,0.85)'],
                borderColor: ['#DC2626', '#2563EB'],
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const failedTxnOptions = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw} avg failed attempts in 7 days` } },
        },
        scales: {
            x: { beginAtZero: true, max: 4, ticks: { callback: (v: any) => v.toFixed(1) }, grid: { color: 'rgba(0,0,0,0.04)' } },
            y: { grid: { display: false }, ticks: { font: { size: 12, weight: 'bold' as const } } },
        },
    };

    // Chart 3: Chi-Square Test Results — exact p-values from PDF Slide 11
    const chiSquareData = {
        labels: ['Is_Weekend', 'Device_Type', 'Auth_Method', 'Txn_Category', 'Location', 'IP_Flag', 'Card_Type', 'Prev_Fraud_Activity'],
        datasets: [
            {
                label: 'p-value (Chi-Square)',
                data: [0.16, 0.35, 0.40, 0.50, 0.75, 0.85, 0.95, 1.00],
                backgroundColor: 'rgba(156,163,175,0.6)',
                borderColor: '#9CA3AF',
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const chiSquareOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` p = ${ctx.raw.toFixed(2)} — ${ctx.raw < 0.05 ? '✓ Significant' : '✗ Not significant'}` } },
        },
        scales: {
            y: {
                beginAtZero: true, max: 1.1,
                ticks: { callback: (v: any) => v.toFixed(1) },
                grid: { color: (ctx: any) => Math.abs(ctx.tick.value - 0.05) < 0.01 ? 'rgba(239,68,68,0.5)' : 'rgba(0,0,0,0.04)' },
            },
            x: { grid: { display: false }, ticks: { font: { size: 9 }, maxRotation: 45 } },
        },
    };

    // Chart 4: Mann-Whitney U Results — exact p-values from PDF Slide 12
    const mannWhitneyData = {
        labels: ['Auth_Fraud_Rate', 'Risk_Score', 'Failed_Count_7d', 'Daily_Txn_Count', 'Txn_Amount', 'Account_Balance', 'Card_Age', 'User_Age'],
        datasets: [
            {
                label: 'p-value (Mann-Whitney U)',
                data: [0.00, 0.00, 0.00, 0.10, 0.25, 0.45, 0.50, 1.00],
                backgroundColor: (ctx: any) => ctx.raw < 0.05 ? 'rgba(34,197,94,0.8)' : 'rgba(156,163,175,0.6)',
                borderColor: (ctx: any) => ctx.raw < 0.05 ? '#16A34A' : '#9CA3AF',
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const mannWhitneyOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` p = ${ctx.raw < 0.01 ? '< 0.001' : ctx.raw.toFixed(2)}${ctx.raw < 0.05 ? ' ✓ Significant' : ' ✗ Not significant'}` } },
        },
        scales: {
            y: {
                beginAtZero: true, max: 1.1,
                ticks: { callback: (v: any) => v.toFixed(1) },
                grid: { color: (ctx: any) => Math.abs(ctx.tick.value - 0.05) < 0.01 ? 'rgba(239,68,68,0.5)' : 'rgba(0,0,0,0.04)' },
            },
            x: { grid: { display: false }, ticks: { font: { size: 9 }, maxRotation: 45 } },
        },
    };

    // ═══════════════════════════════════════════
    // PART 2: ML PIPELINE CHARTS
    // ═══════════════════════════════════════════

    // Chart 5: Feature Importance — exact from PDF Slide 20
    // #1 failed_transaction_count_7d: ~0.33, #2 risk_score_bin: ~0.22, #3 transaction_auth_fraud_rate: ~0.09
    const featureImportanceData = {
        labels: ['failed_transaction_count_7d', 'risk_score_bin', 'transaction_auth_fraud_rate', 'account_balance', 'transaction_distance'],
        datasets: [
            {
                label: 'Importance Score',
                data: [0.33, 0.22, 0.09, 0.04, 0.03],
                backgroundColor: [
                    'rgba(59,130,246,0.9)',
                    'rgba(99,102,241,0.85)',
                    'rgba(139,92,246,0.8)',
                    'rgba(167,139,250,0.6)',
                    'rgba(196,181,253,0.5)',
                ],
                borderColor: ['#2563EB', '#4F46E5', '#7C3AED', '#8B5CF6', '#A78BFA'],
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const featureImportanceOptions = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` Importance: ${(ctx.raw * 100).toFixed(0)}%` } },
        },
        scales: {
            x: { beginAtZero: true, max: 0.4, ticks: { callback: (v: any) => `${(v * 100).toFixed(0)}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            y: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold' as const } } },
        },
    };

    // Chart 6: Model Comparison — exact from PDF Slide 19-20
    // Model 1: Precision 0.99, Recall 1.00, Accuracy 1.00
    // Model 2: Precision 0.89, Recall 1.00, Accuracy 0.96
    const modelComparisonData = {
        labels: ['Precision', 'Recall', 'Accuracy'],
        datasets: [
            {
                label: 'Model 1 (Raw — Overfit)',
                data: [99, 100, 100],
                backgroundColor: 'rgba(239,68,68,0.7)',
                borderColor: '#DC2626',
                borderWidth: 1.5,
                borderRadius: 6,
            },
            {
                label: 'Model 2 (Binned — Selected) ✓',
                data: [89, 100, 96],
                backgroundColor: 'rgba(34,197,94,0.8)',
                borderColor: '#16A34A',
                borderWidth: 1.5,
                borderRadius: 6,
            },
        ],
    };

    const modelComparisonOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.raw}%` } },
        },
        scales: {
            y: { min: 80, max: 102, ticks: { callback: (v: any) => `${v}%` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    // Confusion Matrix — exact from PDF Slide 20 (test set of 15,000)
    // TN: 9575, FP: 605, FN: 1, TP: 4819
    const cm = { tp: 4819, fp: 605, fn: 1, tn: 9575 };

    // Chart 7: Adaptive Threshold Timeline — ±0.05 tolerance from PDF Slide 22
    const thresholdData = {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        datasets: [
            {
                label: 'Median Risk Score Deviation',
                data: [0.00, 0.02, -0.01, 0.03, 0.02, 0.04, 0.06, 0.08],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59,130,246,0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: (ctx: any) => Math.abs(ctx.raw) > 0.05 ? '#EF4444' : '#3B82F6',
                pointBorderColor: (ctx: any) => Math.abs(ctx.raw) > 0.05 ? '#DC2626' : '#2563EB',
                borderWidth: 2.5,
            },
            {
                label: 'Soft Alert (+0.05)',
                data: Array(8).fill(0.05),
                borderColor: 'rgba(251,191,36,0.5)',
                borderDash: [6, 4],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Soft Alert (−0.05)',
                data: Array(8).fill(-0.05),
                borderColor: 'rgba(251,191,36,0.5)',
                borderDash: [6, 4],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Hard Review (+0.10)',
                data: Array(8).fill(0.10),
                borderColor: 'rgba(239,68,68,0.4)',
                borderDash: [4, 2],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Hard Review (−0.10)',
                data: Array(8).fill(-0.10),
                borderColor: 'rgba(239,68,68,0.4)',
                borderDash: [4, 2],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
            },
        ],
    };

    const thresholdOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const, labels: { font: { family: 'Inter', size: 11 }, padding: 14, boxWidth: 12 } },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        if (ctx.datasetIndex === 0) {
                            const v = ctx.raw;
                            const status = Math.abs(v) > 0.1 ? ' 🔴 Hard Review' : Math.abs(v) > 0.05 ? ' 🟡 Soft Alert' : ' ✓ OK';
                            return ` Deviation: ${v > 0 ? '+' : ''}${v.toFixed(2)}${status}`;
                        }
                        return ` ${ctx.dataset.label}`;
                    },
                },
            },
        },
        scales: {
            y: { min: -0.12, max: 0.14, ticks: { callback: (v: any) => `${v > 0 ? '+' : ''}${v.toFixed(2)}` }, grid: { color: 'rgba(0,0,0,0.04)' } },
            x: { grid: { display: false } },
        },
    };

    function cmColor(type: 'tp' | 'fp' | 'fn' | 'tn') {
        return type === 'tp' ? '#DCFCE7' : type === 'tn' ? '#DBEAFE' : type === 'fp' ? '#FEF3C7' : '#FEE2E2';
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="py-16 px-6" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 40%, #7F1D1D 80%, #312E81 100%)' }}>
                <div className="max-w-5xl mx-auto">
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-red-300 hover:text-white mb-8 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-xs font-semibold uppercase tracking-wider mb-5">
                        Fintech · Fraud Detection · EDA → ML Pipeline
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        Fraud Detection System<br />
                        <span className="text-red-300">at NovaPay</span>
                    </h1>
                    <p className="text-red-100/80 text-lg max-w-3xl leading-relaxed mb-8">
                        End-to-end fraud detection — from statistical EDA proving behavioral velocity is the true fraud signal,
                        to a Random Forest classifier achieving 89% precision and 100% recall, with a dual-layer adaptive
                        threshold system for production monitoring. Analyzing 50,000 transactions across 5 cities.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
                        {[
                            { label: 'Total Fraud (2023)', value: '$1.6M', color: 'text-red-400', note: 'Out of $4.96M total' },
                            { label: 'Fraud Rate', value: '32.1%', color: 'text-yellow-300', note: 'By transaction count' },
                            { label: 'Model Precision', value: '89.26%', color: 'text-green-400', note: 'Exceeds >80% target' },
                            { label: 'Recall', value: '100%', color: 'text-indigo-300', note: 'Only 1 missed case' },
                        ].map(({ label, value, color, note }) => (
                            <div key={label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                                <div className="text-red-200 text-xs font-medium mb-1">{label}</div>
                                <div className={`text-3xl font-bold ${color}`}>{value}</div>
                                <div className="text-red-300/60 text-xs mt-1">{note}</div>
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
                        NovaPay's fraud monitoring system flagged <strong>32.1% of all transactions</strong> as potentially
                        fraudulent throughout 2023 — a rate so stable it looked more like noise than signal.
                        With <strong>$1.6 million</strong> in confirmed fraud out of $4.96M total, the team needed to answer:
                        which signals actually discriminate fraud, which features are adding noise, and can a
                        <strong> predictive model achieving &gt;80% precision</strong> replace the static rule-based system within 3 months?
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        This project covers the <strong>full journey</strong>: behavioral analytics → hypothesis testing (Chi-Square + Mann-Whitney U) →
                        feature engineering → Random Forest training → model evaluation → adaptive production monitoring design.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                        {[
                            ['Source', 'Kaggle Dataset'],
                            ['Records', '50,000 txns'],
                            ['Users', '8,963 unique'],
                            ['Features', '21 raw → 37 processed'],
                            ['Cities', 'London · Mumbai · NYC · Sydney · Tokyo'],
                        ].map(([k, v]) => (
                            <div key={k} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="text-xs text-gray-500 font-medium mb-1">{k}</div>
                                <div className="text-sm font-semibold text-gray-800">{v}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Methodology */}
                <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                phase: 'Phase 1', title: 'Exploratory Data Analysis',
                                steps: ['Data profiling & cleaning (21 features)', 'Monthly fraud rate temporal analysis', 'Chi-Square test on 8 categorical features', 'Mann-Whitney U test on 8 numerical features', 'Behavioral segmentation & distribution comparison'],
                            },
                            {
                                phase: 'Phase 2', title: 'Machine Learning Pipeline',
                                steps: ['Feature selection from EDA insights', 'Feature engineering (risk_score_bin)', 'Random Forest classifier training', 'Two-model comparison (raw vs binned)', 'Confusion matrix & performance evaluation'],
                            },
                            {
                                phase: 'Phase 3', title: 'Production Monitoring',
                                steps: ['Adaptive threshold design (±0.05 / ±0.10)', 'Quarterly drift monitoring system', 'Soft alert vs Hard review triggers', 'Retraining decision framework'],
                            },
                        ].map(({ phase, title, steps }) => (
                            <div key={phase} className="bg-white rounded-xl p-5 border border-blue-100">
                                <div className="text-xs font-bold text-blue-600 uppercase mb-2">{phase}</div>
                                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                                <ol className="space-y-1.5">
                                    {steps.map((s, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-gray-600">
                                            <span className="text-blue-400 font-mono text-xs mt-0.5">{i + 1}.</span> {s}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ PHASE 1: BEHAVIORAL ANALYTICS ═══ */}
                <div className="flex items-center gap-3 pt-4">
                    <div className="h-px flex-1 bg-red-200" />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Phase 1 — Behavioral Analytics</span>
                    <div className="h-px flex-1 bg-red-200" />
                </div>

                {/* Chart 1: Monthly Fraud Rate */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">The 32% That Never Moved</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Across all 12 months of 2023, the fraud flag rate stayed between <strong>31.20% and 33.09%</strong> — an unusually
                        stable band for actual fraud behavior. Real fraud spikes around events and attack campaigns.
                        This flatness suggests the system is measuring its own static thresholds, not real fraud patterns.
                        The average rate of <strong>32.1%</strong> remained virtually unchanged month-to-month.
                    </p>
                    <Line data={monthlyFraudData} options={monthlyFraudOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Monthly fraud flag rate (%) — 2023 · Dashed line = 32.1% annual average</p>
                </section>

                {/* Chart 2: Failed Transactions */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">The Behavioral Gap: Failed Transaction Velocity</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Fraudulent transactions show an average of <strong>3.0 failed attempts</strong> in the prior 7-day window vs.
                        <strong> 2.0 for legitimate transactions</strong>. While this 1.5× gap is statistically significant (p &lt; 0.001),
                        it reveals the "trial and error" pattern: fraud actors test stolen credentials repeatedly before a successful breach.
                        This velocity metric is one of the strongest behavioral discriminators in the dataset.
                    </p>
                    <div className="max-w-lg mx-auto">
                        <Bar data={failedTxnData} options={failedTxnOptions} />
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-3">Average failed_transaction_count_7d — Fraud (red: 3.0) vs. Non-Fraud (blue: 2.0)</p>
                </section>

                {/* Chart 3: Chi-Square Results */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Chi-Square Test: Categorical Features — All Noise</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Chi-Square independence tests on all <strong>8 categorical features</strong> returned p-values well above the
                        α = 0.05 threshold. Weekend transactions (p = 0.16), device type (p = 0.35), authentication method (p = 0.40),
                        location (p = 0.75), and even previous fraudulent activity flags (p = 1.00) — none provide statistically
                        significant fraud discrimination. The red dashed line marks the 0.05 significance threshold; every bar sits far above it.
                    </p>
                    <Bar data={chiSquareData} options={chiSquareOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Chi-Square p-values for 8 categorical features — all above α = 0.05 (red line) — zero are significant</p>
                </section>

                {/* Chart 4: Mann-Whitney U Results */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Mann-Whitney U Test: Where the Signal Lives</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Mann-Whitney U tests on <strong>8 numerical features</strong> draw a clean dividing line.
                        <span className="text-green-600 font-semibold"> Three features</span> are highly significant (p &lt; 0.001):
                        <strong> transaction_auth_fraud_rate</strong>, <strong>risk_score</strong>, and <strong>failed_transaction_count_7d</strong>.
                        The remaining five — daily transaction count, transaction amount, account balance, card age, and user age — provide
                        no significant discrimination.
                    </p>
                    <Bar data={mannWhitneyData} options={mannWhitneyOptions} />
                    <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-green-500" /> p &lt; 0.05 — Significant</span>
                        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-gray-400" /> p &gt; 0.05 — Not significant</span>
                        <span>Red line = α = 0.05</span>
                    </div>
                </section>

                {/* Evidence Table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Hypothesis Testing Results</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Feature', 'Test', 'p-value', 'Verdict'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['Is_Weekend', 'Chi-Square', '0.16', false],
                                    ['Device_Type', 'Chi-Square', '0.35', false],
                                    ['Authentication_Method', 'Chi-Square', '0.40', false],
                                    ['Transaction_Category', 'Chi-Square', '0.50', false],
                                    ['Location', 'Chi-Square', '0.75', false],
                                    ['IP_Address_Flag', 'Chi-Square', '0.85', false],
                                    ['Card_Type', 'Chi-Square', '0.95', false],
                                    ['Previous_Fraudulent_Activity', 'Chi-Square', '1.00', false],
                                    ['Transaction_Auth_Fraud_Rate', 'Mann-Whitney U', '< 0.001', true],
                                    ['Risk_Score', 'Mann-Whitney U', '< 0.001', true],
                                    ['Failed_Transaction_Count_7d', 'Mann-Whitney U', '< 0.001', true],
                                    ['Daily_Transaction_Count', 'Mann-Whitney U', '0.10', false],
                                    ['Transaction_Amount', 'Mann-Whitney U', '0.25', false],
                                    ['Account_Balance', 'Mann-Whitney U', '0.45', false],
                                    ['Card_Age', 'Mann-Whitney U', '0.50', false],
                                    ['User_Age', 'Mann-Whitney U', '1.00', false],
                                ].map(([f, t, p, sig]) => (
                                    <tr key={f as string} className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-gray-700 font-medium font-mono text-xs">{f as string}</td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">{t as string}</td>
                                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{p as string}</td>
                                        <td className={`px-4 py-3 font-semibold text-xs ${sig ? 'text-green-600' : 'text-gray-400'}`}>
                                            {sig ? '✓ Significant' : '✗ Not significant'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-3">16 features tested · Only 3 numerical features pass α = 0.05 significance threshold</p>
                </section>

                {/* ═══ PHASE 2: ML PIPELINE ═══ */}
                <div className="flex items-center gap-3 pt-4">
                    <div className="h-px flex-1 bg-indigo-200" />
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Phase 2 — ML Pipeline</span>
                    <div className="h-px flex-1 bg-indigo-200" />
                </div>

                {/* Feature Engineering */}
                <section className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Engineering: risk_score_bin</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Raw risk scores are sensitive to outliers and can cause models to overfit on extreme values.
                        By binning into discrete categories, the model gains robustness while preserving the rank ordering.
                        This single engineering decision is what separates the overfit Model 1 from the production-ready Model 2.
                    </p>
                    <div className="bg-gray-900 rounded-xl p-5 font-mono text-green-400 text-sm overflow-x-auto">
                        <pre>{`# Feature engineering — risk score binning
bins = [0, 20, 40, 60, 80, 100]
labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High']
df['risk_score_bin'] = pd.cut(
    df['risk_score'], bins=bins, labels=labels
)

# 21 raw features → 37 processed features after encoding
# Model 2 with binned features → 89.26% precision, ~100% recall`}</pre>
                    </div>
                </section>

                {/* Chart 5: Feature Importance */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Importance: What Drives the Model</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Random Forest feature importance confirms the EDA: <strong>failed_transaction_count_7d</strong> (33%)
                        is the single most predictive feature, followed by <strong>risk_score_bin</strong> (22%) and
                        <strong> transaction_auth_fraud_rate</strong> (9%). Together, the top three features account for
                        <strong> 64% of the model's predictive power</strong>. Account balance and transaction distance play minor roles.
                    </p>
                    <div className="max-w-xl mx-auto">
                        <Bar data={featureImportanceData} options={featureImportanceOptions} />
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-3">Random Forest feature importance — Model 2 (binned) · Top 5 features by Gini importance</p>
                </section>

                {/* Chart 6: Model Comparison */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Model Comparison: Why 89% Beats 99%</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Model 1 (raw features) achieved <strong className="text-red-500">99% precision, 100% recall, 100% accuracy</strong> —
                        suspiciously perfect. This is a classic overfitting signature: the model memorized training patterns rather
                        than learning generalizable rules. <strong className="text-green-600">Model 2</strong> (with risk_score_bin)
                        delivers <strong>89.26% precision, ~100% recall, 96.16% accuracy</strong> — a robust, deployable solution that
                        exceeds the &gt;80% precision mandate.
                    </p>
                    <div className="max-w-lg mx-auto">
                        <Bar data={modelComparisonData} options={modelComparisonOptions} />
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-3">Model 1 (overfit, red) vs. Model 2 (production-ready, green) · Random Forest classifier</p>
                </section>

                {/* Confusion Matrix */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Confusion Matrix: Near-Perfect Detection</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Model 2's confusion matrix on a <strong>15,000-record test set</strong> shows only <strong>1 false negative</strong> —
                        virtually every real fraud case is detected. The 605 false positives represent a significant
                        improvement over the original 32% noise rate, reducing investigation workload while maintaining safety.
                    </p>
                    <div className="max-w-md mx-auto">
                        <div className="grid grid-cols-3 gap-0 text-center">
                            <div />
                            <div className="p-3 text-xs font-bold text-gray-500 uppercase">Predicted Fraud</div>
                            <div className="p-3 text-xs font-bold text-gray-500 uppercase">Predicted Clean</div>
                            <div className="p-3 text-xs font-bold text-gray-500 uppercase flex items-center justify-center">Actual Fraud</div>
                            <div className="p-5 rounded-tl-xl border-2 border-white" style={{ backgroundColor: cmColor('tp') }}>
                                <div className="text-2xl font-bold text-green-700">{cm.tp.toLocaleString()}</div>
                                <div className="text-xs text-green-600 mt-1">True Positive</div>
                            </div>
                            <div className="p-5 rounded-tr-xl border-2 border-white" style={{ backgroundColor: cmColor('fn') }}>
                                <div className="text-2xl font-bold text-red-700">{cm.fn}</div>
                                <div className="text-xs text-red-600 mt-1">False Negative</div>
                            </div>
                            <div className="p-3 text-xs font-bold text-gray-500 uppercase flex items-center justify-center">Actual Clean</div>
                            <div className="p-5 rounded-bl-xl border-2 border-white" style={{ backgroundColor: cmColor('fp') }}>
                                <div className="text-2xl font-bold text-amber-700">{cm.fp}</div>
                                <div className="text-xs text-amber-600 mt-1">False Positive</div>
                            </div>
                            <div className="p-5 rounded-br-xl border-2 border-white" style={{ backgroundColor: cmColor('tn') }}>
                                <div className="text-2xl font-bold text-blue-700">{cm.tn.toLocaleString()}</div>
                                <div className="text-xs text-blue-600 mt-1">True Negative</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-4">Model 2 confusion matrix · Test set: 15,000 records · TN=9,575 · FP=605 · FN=1 · TP=4,819</p>
                </section>

                {/* ═══ PHASE 3: PRODUCTION MONITORING ═══ */}
                <div className="flex items-center gap-3 pt-4">
                    <div className="h-px flex-1 bg-amber-200" />
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Phase 3 — Production Monitoring</span>
                    <div className="h-px flex-1 bg-amber-200" />
                </div>

                {/* Chart 7: Adaptive Threshold */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Adaptive Threshold: Dual-Layer Monitoring</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        A deployed model without monitoring is a model waiting to fail. This dual-layer system tracks quarterly
                        deviation in median risk scores. A <strong className="text-amber-600">Soft Alert at ±0.05</strong> triggers
                        threshold review, while a <strong className="text-red-600">Hard Review at ±0.10</strong> mandates immediate
                        retraining. In the simulation below, Q3 2024 crosses the soft alert threshold, and Q4 2024
                        approaches the hard review boundary.
                    </p>
                    <Line data={thresholdData} options={thresholdOptions} />
                    <p className="text-xs text-center text-gray-400 mt-3">Quarterly risk score deviation — blue = OK, red = exceeds soft alert threshold · Dual tolerance bands shown</p>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategic Recommendations</h2>
                    <p className="text-gray-500 mb-8">Five actions spanning the full detection pipeline.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                n: '01', title: 'Deploy Model 2', color: 'text-green-600 bg-green-50',
                                desc: 'Deploy the binned-feature Random Forest as the primary classifier. 89.26% precision and ~100% recall meet the >80% precision mandate with near-perfect detection.',
                            },
                            {
                                n: '02', title: 'Drop Demographic Features', color: 'text-gray-600 bg-gray-50',
                                desc: 'Remove all 8 categorical features from alert scoring. Chi-Square confirmed none provide significant discrimination — they only inflate false positives.',
                            },
                            {
                                n: '03', title: 'Dual-Layer Monitoring', color: 'text-amber-600 bg-amber-50',
                                desc: 'Implement the adaptive threshold system: Soft Alert at ±0.05 deviation for review, Hard Review at ±0.10 for mandatory retraining. Run quarterly.',
                            },
                            {
                                n: '04', title: 'Add Velocity Checks', color: 'text-blue-600 bg-blue-50',
                                desc: 'Build on failed_transaction_count_7d: add per-hour frequency, amount deviation from user baseline, and rapid geographic shifts.',
                            },
                            {
                                n: '05', title: 'Device Fingerprinting', color: 'text-purple-600 bg-purple-50',
                                desc: 'While device type alone showed no significance, composite fingerprinting (browser + OS + hardware) could add a behavioral dimension.',
                            },
                        ].map(({ n, title, color, desc }) => (
                            <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${color} mb-3`}>{n}</div>
                                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact Table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Summary</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>{['Metric', 'Before (Rule-Based)', 'After (Model 2 RF)'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    ['Precision', '~68% (estimated)', '89.26%'],
                                    ['Recall', '~85% (estimated)', '~100% (1 FN in 15K)'],
                                    ['Accuracy', '~72% (estimated)', '96.16%'],
                                    ['False Positive Rate', '~32% of all alerts', '~4% of alerts (605/15K)'],
                                    ['False Negatives', 'Unknown', '1 (near-zero)'],
                                    ['Features Used', '21 raw (unfiltered)', '37 (engineered + selected)'],
                                    ['Monitoring', 'None', 'Dual-layer adaptive threshold'],
                                ].map(([m, b, a]) => (
                                    <tr key={m} className="bg-white hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5 text-gray-700 font-medium">{m}</td>
                                        <td className="px-5 py-3.5 text-red-500">{b}</td>
                                        <td className="px-5 py-3.5 text-green-600 font-semibold">{a}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Tools */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools & Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'Matplotlib', 'Seaborn', 'Chi-Square Test', 'Mann-Whitney U Test', 'Google Colab', 'Kaggle'].map(t => (
                            <span key={t} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{t}</span>
                        ))}
                    </div>
                </section>

                {/* Reflection */}
                <section className="border-l-4 border-indigo-500 pl-6 py-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Reflection</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Two key takeaways from this end-to-end project. First, <strong>the most intuitive features were the least useful</strong> —
                        all 8 categorical features (location, device type, transaction category, even previous fraud flags)
                        provided zero discrimination. Meanwhile, behavioral velocity metrics told the whole story.
                        Second, <strong>a 99% model isn't always better than an 89% one</strong>. Model 1 was brittle
                        despite perfect metrics; Model 2 sacrificed precision for generalization. In production ML, robustness beats
                        perfection — and deploying without monitoring is flying without instruments.
                    </p>
                    <div className="flex flex-col gap-2 text-xs text-gray-400 mt-4">
                        <p>
                            Dataset:{' '}
                            <a href="https://www.kaggle.com/datasets/samayashar/fraud-detection-transactions-dataset" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
                                Fraud Detection Transactions Dataset
                            </a>
                            {' '}(Kaggle)
                        </p>
                        <p>
                            Full analysis:{' '}
                            <a href="https://colab.research.google.com/drive/10_ARkv1GpIuVyQq899GcEufRAsleO8fx" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">
                                View Google Colab Notebook
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
