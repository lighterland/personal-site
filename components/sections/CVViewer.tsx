'use client';
import { Download, FileText } from 'lucide-react';

export default function CVViewer() {
  return (
    <section id="cv" className="py-20 px-6" style={{ background: '#F8FAFF' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">CV</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-1">
              Curriculum Vitae
            </h2>
            <p className="text-gray-500">Download or read inline.</p>
          </div>
          <a
            href="/cv/sadana-erland-cv.pdf"
            download="sadana-erland-cv.pdf"
            className="btn-primary whitespace-nowrap"
            aria-label="Download CV PDF"
          >
            <Download size={18} />
            Download CV (PDF)
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="card overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">sadana-erland-cv.pdf</span>
          </div>
          <div className="relative bg-gray-50" style={{ height: '700px' }}>
            <iframe
              src="/cv/sadana-erland-cv.pdf"
              width="100%"
              height="100%"
              title="Sadana Erland CV"
              aria-label="Embedded curriculum vitae PDF"
              className="border-0"
              style={{ minHeight: '500px' }}
            />
            {/* Fallback overlay - hidden by default, shown via noscript or if iframe fails */}
            <noscript>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-4">
                <FileText size={48} className="text-gray-400" />
                <p className="text-gray-600">PDF viewer requires JavaScript.</p>
                <a
                  href="/cv/sadana-erland-cv.pdf"
                  download
                  className="btn-primary"
                >
                  <Download size={16} /> Download CV Instead
                </a>
              </div>
            </noscript>
          </div>
        </div>

        {/* Fallback link */}
        <p className="text-sm text-gray-400 text-center mt-4">
          PDF not loading?{' '}
          <a
            href="/cv/sadana-erland-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 underline hover:text-brand-700"
          >
            Open CV in a new tab
          </a>
        </p>
      </div>
    </section>
  );
}
