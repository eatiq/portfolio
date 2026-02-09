'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/motion', label: 'Motion' },
    { href: '/video', label: 'Video' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
      <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="currentColor" fillOpacity="0.1" />
          <text x="14" y="19" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="600">E</text>
        </svg>
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm tracking-tight transition-colors ${
              pathname === link.href
                ? 'text-foreground'
                : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://www.linkedin.com/in/ehsanatiq/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-tight px-4 py-2 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
        >
          Reach out
        </a>
      </div>
    </nav>
  );
}
