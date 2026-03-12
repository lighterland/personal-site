'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateTrendData } from '@/lib/utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TrendSimulator() {
  const [growthRate, setGrowthRate] = useState(10);
  const [seasonality, setSeasonality] = useState(5);
  const [noise, setNoise] = useState(3);
  const [data, setData] = useState(() => generateTrendData(10, 5, 3));

  const regenerate = useCallback(() => {
    setData(generateTrendData(growthRate, seasonality, noise));
  }, [growthRate, seasonality, noise]);

  useEffect(() => {
    const id = setTimeout(regenerate, 80);
    return () => clearTimeout(id);
  }, [growthRate, seasonality, noise, regenerate]);

  const chartData = {
    labels: months,
    datasets: [{
      label: 'Revenue Index',
      data,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.08)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointRadius: 3,
      pointHoverRadius: 6,
    }],
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
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 0 },
    },
    animation: { duration: 0 },
  };

  return (
    <div className="playground-card">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg">📈 Trend Simulator</h3>
        <p className="text-slate-400 text-sm mt-1">Adjust parameters and watch the trend respond.</p>
      </div>

      <div className="chart-container mb-5" style={{ height: 200 }} aria-label="Interactive trend line chart">
        <Line data={chartData} options={options} />
      </div>

      <div className="space-y-4">
        {[
          { label: 'Growth Rate', value: growthRate, set: setGrowthRate, min: 0, max: 30, suffix: '%' },
          { label: 'Seasonality', value: seasonality, set: setSeasonality, min: 0, max: 10, suffix: '' },
          { label: 'Noise Level', value: noise, set: setNoise, min: 0, max: 10, suffix: '' },
        ].map(({ label, value, set, min, max, suffix }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{label}</span>
              <span className="text-brand-400 font-mono">{value}{suffix}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              className="w-full"
              aria-label={label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
