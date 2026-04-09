import { SiGithub, SiMedium } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="inline-flex items-center gap-1.5 text-sm text-gray-400">
          © 2026 Erland Sadana. Built with data and coffee <Coffee size={14} className="ml-0.5" />
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/barklight/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/lighterland"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://medium.com/@barklight"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <SiMedium size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
