'use client';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RefreshCw, TrendingUp, Minus, TrendingDown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Trend = 'uptrend' | 'flat' | 'downtrend';

interface Dataset {
  label: string;
  data: number[];
  answer: Trend;
  explanation: string;
}

const datasets: Dataset[] = [
  {
    label: 'E-commerce Sales',
    data: [120, 118, 125, 130, 135, 128, 150, 180, 175, 190, 220, 250],
    answer: 'uptrend',
    explanation: 'Seasonal spike in H2, driven by holiday shopping surge.',
  },
  {
    label: 'Website Traffic',
    data: [300, 298, 305, 295, 302, 299, 280, 285, 295, 300, 298, 302],
    answer: 'flat',
    explanation: 'Stable organic traffic with minor fluctuations — no significant trend.',
  },
  {
    label: 'Support Tickets',
    data: [80, 75, 70, 72, 68, 65, 78, 60, 55, 50, 48, 45],
    answer: 'downtrend',
    explanation: 'Steady improvement in product quality reduced support load.',
  },
  {
    label: 'Inventory Cost',
    data: [200, 210, 195, 215, 220, 205, 225, 230, 215, 235, 240, 228],
    answer: 'uptrend',
    explanation: 'Rising raw material prices drove cyclical inventory cost growth.',
  },
  {
    label: 'Delivery Times (hrs)',
    data: [48, 46, 47, 45, 46, 44, 45, 50, 43, 42, 44, 41],
    answer: 'downtrend',
    explanation: 'Route optimization and carrier changes gradually cut delivery times.',
  },
];

export default function PatternGuesser() {
  const [datasetIdx, setDatasetIdx] = useState(0);
  const [phase, setPhase] = useState<'guess' | 'reveal'>('guess');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const ds = datasets[datasetIdx];

  const guess = (trend: Trend) => {
    const correct = trend === ds.answer;
    setLastResult(correct);
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setPhase('reveal');
  };

  const next = () => {
    setDatasetIdx((i) => (i + 1) % datasets.length);
    setPhase('guess');
    setLastResult(null);
  };

  const partialData = phase === 'guess' ? ds.data.slice(0, 6) : ds.data;
  const labels = months.slice(0, partialData.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: ds.label,
        data: partialData,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#3B82F6',
      },
      ...(phase === 'reveal' ? [{
        label: 'Revealed',
        data: [...Array(6).fill(null), ...ds.data.slice(6)],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.08)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: '#10B981',
      }] : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
    },
    animation: { duration: 600 },
  };

  return (
    <div className="playground-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">🎯 Trend Guesser</h3>
          <p className="text-slate-400 text-sm mt-1">Can you predict what comes next?</p>
        </div>
        <div className="text-right">
          <div className="text-brand-400 font-mono font-bold">{score.correct}/{score.total}</div>
          <div className="text-slate-500 text-xs">correct</div>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-sm text-slate-300 font-medium">{ds.label}</span>
        {phase === 'guess' && (
          <span className="text-slate-500 text-xs ml-2">(first 6 months shown)</span>
        )}
      </div>

      <div className="chart-container mb-5" style={{ height: 180 }} aria-label="Trend guessing chart">
        <Line data={chartData} options={options} />
      </div>

      {phase === 'guess' ? (
        <div>
          <p className="text-slate-300 text-sm mb-3 text-center">What happens in the next 6 months?</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { label: '📈 Uptrend', value: 'uptrend' as Trend, icon: TrendingUp, color: 'border-green-500 hover:bg-green-500/20' },
              { label: '➡ Flat', value: 'flat' as Trend, icon: Minus, color: 'border-yellow-500 hover:bg-yellow-500/20' },
              { label: '📉 Downtrend', value: 'downtrend' as Trend, icon: TrendingDown, color: 'border-red-500 hover:bg-red-500/20' },
            ]).map(({ label, value, color }) => (
              <button key={value} onClick={() => guess(value)}
                className={`py-3 rounded-xl border text-white text-sm font-medium transition-all duration-200 ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-xl p-4 ${lastResult ? 'bg-green-500/15 border border-green-500/30' : 'bg-red-500/15 border border-red-500/30'}`}>
          <p className="font-bold text-sm mb-1" style={{ color: lastResult ? '#34D399' : '#F87171' }}>
            {lastResult ? '✓ Correct!' : '✗ Not quite!'}
          </p>
          <p className="text-slate-300 text-xs mb-3">{ds.explanation}</p>
          <button onClick={next} className="flex items-center gap-2 text-brand-400 text-sm font-semibold hover:text-brand-300 transition-colors">
            <RefreshCw size={14} /> Next Dataset
          </button>
        </div>
      )}
    </div>
  );
}
