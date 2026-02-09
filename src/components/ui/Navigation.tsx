'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
      <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
        <svg width="28" height="28" viewBox="0 0 255 238" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.5774 90.0969L7.96997 118.714L36.5872 147.321L65.1946 118.704L36.5774 90.0969Z" stroke="#304FFC" strokeWidth="11.2712" strokeMiterlimit="10" />
          <path d="M206.31 73.5117L206.085 40.2615L172.948 40.1488L127.299 85.6846L81.6503 40.1488L48.5128 40.2615L48.2878 73.5117L93.9362 119.048L49.0769 163.907L49.3019 197.157L82.4394 197.27L127.299 152.523L172.159 197.27L205.296 197.157L205.522 163.907L160.662 119.048L206.31 73.5117Z" stroke="#304FFC" strokeWidth="11.2712" strokeMiterlimit="10" />
          <path d="M183.204 95.716H150.292V31.1318L126.735 7.91299L103.178 31.1318V95.716H71.3933" stroke="#304FFC" strokeWidth="11.2712" strokeMiterlimit="10" />
          <path d="M70.4917 142.83H103.179V206.287L126.735 229.506L150.292 206.287V142.83H183.204" stroke="#304FFC" strokeWidth="11.2712" strokeMiterlimit="10" />
          <path d="M218.011 90.0969L189.404 118.714L218.021 147.321L246.629 118.704L218.011 90.0969Z" stroke="#304FFC" strokeWidth="11.2712" strokeMiterlimit="10" />
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
          href="https://www.linkedin.com/in/eatiq"
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
