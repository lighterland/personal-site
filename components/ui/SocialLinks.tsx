import { SiGithub, SiMedium } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

interface SocialLinksProps {
  isDark?: boolean;
  size?: number;
}

const links = [
  {
    href: 'https://www.linkedin.com/in/barklight/',
    label: 'LinkedIn',
    icon: FaLinkedin,
    hoverClass: 'hover:text-blue-400',
  },
  {
    href: 'https://github.com/lighterland',
    label: 'GitHub',
    icon: SiGithub,
    hoverClass: 'hover:text-white',
  },
  {
    href: 'https://medium.com/@barklight',
    label: 'Medium',
    icon: SiMedium,
    hoverClass: 'hover:text-green-400',
  },
];

export default function SocialLinks({ isDark = false, size = 22 }: SocialLinksProps) {
  const baseColor = isDark ? 'text-gray-400' : 'text-blue-200';

  return (
    <div className="flex items-center gap-5">
      {links.map(({ href, label, icon: Icon, hoverClass }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${baseColor} ${hoverClass} transition-colors duration-200 hover:scale-110 transform`}
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
