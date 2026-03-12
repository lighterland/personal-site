'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    title: 'Start with the raw data...',
    caption: 'A messy scatter of 50 data points across two variables. No story yet.',
    highlight: 'none',
  },
  {
    title: 'Identify the outliers...',
    caption: 'Three anomalies sit far from the cluster — potential data errors or truly exceptional cases.',
    highlight: 'outliers',
  },
  {
    title: 'Find the trend...',
    caption: 'A regression line emerges — a positive correlation between variables becomes clear.',
    highlight: 'trend',
  },
  {
    title: 'Segment by category...',
    caption: 'Two distinct clusters appear when we color by group. The pattern was hidden by aggregation.',
    highlight: 'segments',
  },
  {
    title: 'The insight: Cluster A is 3× more efficient than Cluster B.',
    caption: 'Cluster A achieves higher output values at lower input cost — a clear priority signal for the business.',
    highlight: 'insight',
  },
];

// Generate stable scatter data
function makePoints(n: number, seed: number) {
  const pts = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const x = ((s >>> 0) % 900) / 100;
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const noise = ((s >>> 0) % 200 - 100) / 100;
    const y = 1.2 * x + noise + 1;
    const group = x > 5 ? 'A' : 'B';
    pts.push({ x: Math.max(0.5, x), y: Math.max(0.5, y), group });
  }
  return pts;
}

const allPoints = makePoints(47, 42);
const outliers = [
  { x: 1.5, y: 8.2, group: 'B' },
  { x: 8.0, y: 1.0, group: 'A' },
  { x: 5.0, y: 9.5, group: 'A' },
];
const allData = [...allPoints, ...outliers];

export default function DataStoryAnimation() {
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    draw();
  }, [step]);

  function toCanvas(val: number, min: number, max: number, size: number, pad: number) {
    return pad + ((val - min) / (max - min)) * (size - 2 * pad);
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const PAD = 36;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = toCanvas(i, 0, 10, W, PAD);
      ctx.beginPath(); ctx.moveTo(x, PAD); ctx.lineTo(x, H - PAD); ctx.stroke();
      const y = toCanvas(i, 0, 10, H, PAD);
      ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(99,102,241,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(PAD, PAD); ctx.lineTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();

    // Regression line (steps 2+) — y = 1.2x + 1, flip Y with (H - toCanvas)
    if (step >= 2) {
      ctx.strokeStyle = step >= 4 ? '#8B5CF6' : '#F59E0B';
      ctx.lineWidth = 2; ctx.setLineDash([6, 3]);
      ctx.beginPath();
      // x=0 → y=1 (low left), x=10 → y=13 (high right), flipped for canvas coords
      ctx.moveTo(toCanvas(0, 0, 10, W, PAD), H - toCanvas(1, 0, 10, H, PAD));
      ctx.lineTo(toCanvas(10, 0, 10, W, PAD), H - toCanvas(13, 0, 10, H, PAD));
      ctx.stroke(); ctx.setLineDash([]);
    }

    // Draw points
    allData.forEach(({ x, y, group }, i) => {
      const cx = toCanvas(x, 0, 10, W, PAD);
      const cy = H - toCanvas(y, 0, 10, H, PAD);
      const isOutlier = i >= allPoints.length;

      let color = 'rgba(148,163,184,0.7)';
      if (isOutlier && step >= 1) color = '#EF4444';
      else if (step >= 3) color = group === 'A' ? '#3B82F6' : '#A78BFA';

      const r = step >= 4 ? 5.5 : 4.5;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Insight ring for group A only
      if (step >= 4 && group === 'A' && !isOutlier) {
        ctx.strokeStyle = 'rgba(59,130,246,0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.stroke();
      }
      // Outlier ring
      if (isOutlier && step >= 1) {
        ctx.strokeStyle = 'rgba(239,68,68,0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.stroke();
      }
    });

    // Labels
    ctx.fillStyle = '#64748B'; ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Input Variable', W / 2 - 40, H - 5);
    ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Output Variable', -40, 0); ctx.restore();

    // Insight badge
    if (step >= 4) {
      const bx = toCanvas(7, 0, 10, W, PAD);
      const by = H - toCanvas(9.5, 0, 10, H, PAD);
      ctx.fillStyle = 'rgba(59,130,246,0.9)';
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect?: (x: number, y: number, w: number, h: number, r: number) => void })
        .roundRect?.(bx - 40, by - 16, 80, 22, 6);
      ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText('Cluster A (3× efficient)', bx - 38, by - 1);
    }
  }

  return (
    <div className="playground-card col-span-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold text-xl">📖 Data Story</h3>
          <p className="text-slate-400 text-sm mt-1">Watch raw data become an insight. Press Next to advance.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">Step</span>
          <span className="text-brand-400 font-mono font-bold">{step + 1} / {STEPS.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-slate-700 mb-5">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={320}
        className="w-full rounded-xl border border-slate-700"
        aria-label={`Data story step ${step + 1}: ${STEPS[step].title}`}
      />

      {/* Narrative text */}
      <div className="mt-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700 min-h-[72px]">
        <h4 className="text-white font-semibold mb-1 text-sm">{STEPS[step].title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{STEPS[step].caption}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous step"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Step dots */}
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? 'bg-brand-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { if (step < STEPS.length - 1) setStep(s => s + 1); else setStep(0); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-500 transition-all"
          aria-label={step < STEPS.length - 1 ? 'Next step' : 'Restart story'}
        >
          {step < STEPS.length - 1 ? 'Next' : 'Restart'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
