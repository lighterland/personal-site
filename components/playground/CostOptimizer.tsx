'use client';
import { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function calcSavings(transport: number, warehouse: number, tech: number) {
  // Hard-coded savings model: tech investment reduces transport costs
  const transportSaving = transport * 0.12 + tech * 0.18;
  const warehouseSaving = warehouse * 0.10 + tech * 0.08;
  const techSaving = tech * 0.15;
  return [
    Math.round(transportSaving * 10) / 10,
    Math.round(warehouseSaving * 10) / 10,
    Math.round(techSaving * 10) / 10,
  ];
}

export default function CostOptimizer() {
  const [transport, setTransport] = useState(40);
  const [warehouse, setWarehouse] = useState(35);
  const [tech, setTech] = useState(25);

  const total = transport + warehouse + tech;
  const savings = calcSavings(transport, warehouse, tech);
  const totalSaving = savings.reduce((a, b) => a + b, 0);

  const overBudget = total > 100;

  const chartData = {
    labels: ['Transport', 'Warehouse', 'Technology'],
    datasets: [{
      label: 'Projected Savings (%)',
      data: savings,
      backgroundColor: ['rgba(59,130,246,0.8)', 'rgba(124,58,237,0.8)', 'rgba(16,185,129,0.8)'],
      borderColor: ['#3B82F6', '#7C3AED', '#10B981'],
      borderWidth: 1.5,
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx: { raw: unknown }) => ` ${ctx.raw}% savings` } },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 0, max: 40 },
    },
    animation: { duration: 300 },
  };

  return (
    <div className="playground-card">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg">⚙️ Cost Optimizer</h3>
        <p className="text-slate-400 text-sm mt-1">How would you allocate the budget? See the projected impact.</p>
      </div>

      {/* Budget bar */}
      <div className="mb-5 p-3 rounded-lg bg-white/5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-300">Budget Allocated</span>
          <span className={`font-mono font-bold ${overBudget ? 'text-red-400' : 'text-green-400'}`}>
            {total}% / 100%
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${overBudget ? 'bg-red-500' : 'bg-brand-500'}`}
            style={{ width: `${Math.min(total, 100)}%` }}
          />
        </div>
        {overBudget && <p className="text-red-400 text-xs mt-1">⚠ Over budget! Reduce one area.</p>}
      </div>

      {/* Savings metric */}
      <div className="mb-4 text-center">
        <span className="text-3xl font-bold text-green-400 font-mono">{totalSaving.toFixed(1)}%</span>
        <span className="text-slate-400 text-sm ml-2">projected total savings</span>
      </div>

      <div className="chart-container mb-5" style={{ height: 160 }} aria-label="Projected savings by category bar chart">
        <Bar data={chartData} options={options} />
      </div>

      <div className="space-y-3">
        {[
          { label: '🚚 Transport Budget', value: transport, set: setTransport, color: '#3B82F6' },
          { label: '🏭 Warehouse Budget', value: warehouse, set: setWarehouse, color: '#7C3AED' },
          { label: '💻 Technology Investment', value: tech, set: setTech, color: '#10B981' },
        ].map(({ label, value, set, color }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{label}</span>
              <span className="font-mono text-sm" style={{ color }}>{value}%</span>
            </div>
            <input type="range" min={0} max={60} value={value}
              onChange={e => set(Number(e.target.value))}
              className="w-full" aria-label={label}
              style={{ accentColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
