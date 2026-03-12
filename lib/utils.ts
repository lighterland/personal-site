// Simple classnames utility
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// Animated counter using requestAnimationFrame
export function animateCounter(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) {
  const start = performance.now();
  
  function update(currentTime: number) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(from + (to - from) * eased);
    onUpdate(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      onComplete?.();
    }
  }
  
  requestAnimationFrame(update);
}

// Format date string
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// Tag color map
export function getTagColor(tag: string): string {
  const blue = ['Python', 'SQL', 'R', 'Power BI', 'Tableau', 'Logistics', 'Supply Chain'];
  const purple = ['Machine Learning', 'Statistics', 'Forecasting', 'A/B Testing'];
  if (blue.some(b => tag.toLowerCase().includes(b.toLowerCase()))) return 'tag-blue';
  if (purple.some(p => tag.toLowerCase().includes(p.toLowerCase()))) return 'tag-purple';
  return 'tag-gray';
}

// Generate trend data for playground
export function generateTrendData(growthRate: number, seasonality: number, noise: number): number[] {
  return Array.from({ length: 12 }, (_, i) => {
    const trend = 100 * Math.pow(1 + growthRate / 100, i);
    const seasonal = seasonality * 20 * Math.sin((i / 12) * 2 * Math.PI);
    const random = noise * (Math.random() - 0.5) * 30;
    return Math.max(0, Math.round(trend + seasonal + random));
  });
}
