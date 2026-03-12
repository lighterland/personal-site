'use client';
export default function PhotoPlaceholder() {
  return (
    <div className="relative group photo-placeholder">
      <div
        className="w-40 h-40 rounded-full flex items-center justify-center border-[3px] border-brand-500 transition-all duration-300 group-hover:border-dashed group-hover:border-brand-400"
        style={{
          background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)',
        }}
      >
        {/* SVG silhouette */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="36" cy="26" r="14" fill="#93C5FD" />
          <path
            d="M6 66c0-16.569 13.431-30 30-30s30 13.431 30 30"
            stroke="#93C5FD"
            strokeWidth="1"
            fill="#93C5FD"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Upload tooltip */}
      <div className="upload-tooltip absolute inset-0 rounded-full bg-brand-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
        <span className="text-white text-xs font-medium text-center leading-tight px-2">
          Replace with<br />your photo
        </span>
      </div>
    </div>
  );
}
