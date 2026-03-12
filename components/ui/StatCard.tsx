'use client';
import { useEffect, useRef, useState } from 'react';
import { animateCounter } from '@/lib/utils';

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
  decimals?: number;
}

export default function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  icon,
  decimals = 0,
}: StatCardProps) {
  const [displayed, setDisplayed] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter(0, value, 1500, setDisplayed);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const display =
    decimals > 0
      ? (displayed / Math.pow(10, decimals)).toFixed(decimals)
      : displayed.toString();

  return (
    <div ref={ref} className="card p-6 text-center">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-4xl font-bold text-brand-700 mb-1 font-mono">
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}
