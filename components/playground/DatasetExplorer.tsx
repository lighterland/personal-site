'use client';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChevronUp, ChevronDown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const rawData = [
  { category: 'Electronics', revenue: 485000, units: 2100, price: 231, yoy: 18 },
  { category: 'Apparel', revenue: 312000, units: 8400, price: 37, yoy: 5 },
  { category: 'Home & Garden', revenue: 278000, units: 4200, price: 66, yoy: 12 },
  { category: 'Books', revenue: 94000, units: 9600, price: 10, yoy: -8 },
  { category: 'Sports', revenue: 201000, units: 3100, price: 65, yoy: 22 },
  { category: 'Beauty', revenue: 167000, units: 5200, price: 32, yoy: 31 },
  { category: 'Food & Drink', revenue: 389000, units: 12800, price: 30, yoy: 9 },
  { category: 'Toys', revenue: 143000, units: 3700, price: 39, yoy: -3 },
  { category: 'Tools', revenue: 98000, units: 1400, price: 70, yoy: 7 },
  { category: 'Pet Supplies', revenue: 127000, units: 4100, price: 31, yoy: 19 },
];

type Col = 'category' | 'revenue' | 'units' | 'price' | 'yoy';
type Metric = 'revenue' | 'units' | 'yoy';

const fmt = (key: Col, val: number | string): string => {
  if (key === 'revenue') return `$${(Number(val) / 1000).toFixed(0)}k`;
  if (key === 'yoy') return `${val}%`;
  return String(val);
};

export default function DatasetExplorer() {
  const [selected, setSelected] = useState<number | null>(null);
  const [metric, setMetric] = useState<Metric>('revenue');
  const [sortCol, setSortCol] = useState<Col>('revenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...rawData].sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol];
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
    return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const handleSort = (col: Col) => {
    if (col === sortCol) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const chartData = {
    labels: sorted.map(d => d.category),
    datasets: [{
      label: metric,
      data: sorted.map(d => d[metric]),
      backgroundColor: sorted.map((_, i) =>
        sorted[i] === sorted.find((_, j) => j === selected)
          ? 'rgba(59,130,246,0.9)' : 'rgba(99,102,241,0.4)'
      ),
      borderColor: sorted.map((_, i) =>
        sorted[i] === sorted.find((_, j) => j === selected) ? '#3B82F6' : 'rgba(99,102,241,0.6)'
      ),
      borderWidth: 1.5,
      borderRadius: 4,
    }],
  };

  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: { raw: unknown }) => ` ${c.raw}` } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 9 }, maxRotation: 45 } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', font: { size: 9 } } },
    },
    animation: { duration: 200 },
  };

  const cols: { key: Col; label: string }[] = [
    { key: 'category', label: 'Category' }, { key: 'revenue', label: 'Revenue' },
    { key: 'units', label: 'Units' }, { key: 'price', label: 'Avg Price' }, { key: 'yoy', label: 'YoY%' },
  ];

  return (
    <div className="playground-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">🔍 Dataset Explorer</h3>
          <p className="text-slate-400 text-sm mt-1">Click a row. Sort to find patterns.</p>
        </div>
        <select value={metric} onChange={e => setMetric(e.target.value as Metric)}
          className="text-xs bg-slate-700 text-slate-200 border border-slate-600 rounded-lg px-2 py-1.5 outline-none"
          aria-label="Select chart metric"
        >
          <option value="revenue">Revenue</option>
          <option value="units">Units</option>
          <option value="yoy">YoY Growth</option>
        </select>
      </div>

      <div className="chart-container mb-4" style={{ height: 140 }} aria-label="Category comparison bar chart">
        <Bar data={chartData} options={options} />
      </div>

      {/* Mini table */}
      <div className="overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full text-xs" aria-label="Product category dataset">
          <thead>
            <tr className="bg-slate-800/60">
              {cols.map(c => (
                <th key={c.key} onClick={() => handleSort(c.key)}
                  className="px-2 py-2 text-left text-slate-400 cursor-pointer hover:text-white transition-colors select-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {c.label}
                    {sortCol === c.key && (sortDir === 'desc' ? <ChevronDown size={10} /> : <ChevronUp size={10} />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.category} onClick={() => setSelected(i === selected ? null : i)}
                className={`cursor-pointer border-t border-slate-700/50 transition-colors ${i === selected ? 'bg-brand-600/20' : 'hover:bg-slate-700/30'}`}
              >
                <td className="px-2 py-1.5 text-slate-200 font-medium">{row.category}</td>
                <td className="px-2 py-1.5 text-slate-300">{fmt('revenue', row.revenue)}</td>
                <td className="px-2 py-1.5 text-slate-300">{row.units.toLocaleString()}</td>
                <td className="px-2 py-1.5 text-slate-300">${row.price}</td>
                <td className={`px-2 py-1.5 font-medium ${row.yoy > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {row.yoy > 0 ? '+' : ''}{row.yoy}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
