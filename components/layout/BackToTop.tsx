'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setVisible(total > 0 && scrolled / total > 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
      style={{ animation: 'fadeInUp 0.3s ease-out' }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
