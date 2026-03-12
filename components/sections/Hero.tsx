'use client';
import { Download, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import SocialLinks from '@/components/ui/SocialLinks';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%)' }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid opacity-40" />

      {/* Radial highlight */}
      <div className="absolute inset-0 bg-radial-blue pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)'
        }}
      />

      {/* Floating decorative orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 py-24 max-w-3xl">
        {/* Photo */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden ring-4 ring-brand-400/20">
            <Image
              src="/pp.png"
              alt="Sadana Erland"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Sadana Erland
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
          <h2 className="text-lg md:text-xl font-medium text-blue-200 tracking-wide">
            Data Analyst · Storyteller · Problem Solver
          </h2>
        </div>

        {/* Tagline */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
          <p className="text-base md:text-lg text-blue-100/80 max-w-xl leading-relaxed">
            Turning complex operational data into clear, actionable decisions.
            Specializing in logistics, supply chain analytics, and data storytelling.
          </p>
        </div>

        {/* Social links */}
        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
          <SocialLinks isDark={false} size={24} />
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}
        >
          <button
            onClick={() => scrollTo('portfolio')}
            className="btn-primary text-base px-8 py-3"
          >
            View My Work
          </button>
          <a
            href="/cv/sadana-erland-cv.pdf"
            download
            className="btn-secondary text-base px-8 py-3 text-white border-blue-300 hover:bg-white/10"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-10 animate-bounce text-blue-300/60 hover:text-blue-300 transition-colors"
          aria-label="Scroll down"
          style={{ animation: 'fadeInUp 0.6s ease-out 1.2s both' }}
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
