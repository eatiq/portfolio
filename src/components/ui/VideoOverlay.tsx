'use client';

import { useState } from 'react';
import Link from 'next/link';

type VideoOverlayProps = {
  title: string;
  description: string;
  company: string;
  isLocked: boolean;
  unlockCode?: string;
  onUnlock?: () => void;
};

export default function VideoOverlay({
  title,
  description,
  company,
  isLocked,
  unlockCode,
  onUnlock,
}: VideoOverlayProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === unlockCode) {
      setError(false);
      onUnlock?.();
    } else {
      setError(true);
    }
  };

  // Only show overlay when locked
  if (!isLocked) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-12 md:hidden">
      {/* Centered Content */}
      <div className="pointer-events-auto space-y-6 max-w-md w-full">
        <div className="text-left">
          <p className="text-white/60 text-sm font-medium mb-2">{company}</p>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter unlock code"
              className="flex-1 px-5 py-3 text-white bg-transparent outline-none placeholder:text-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Unlock
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect code. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* Back button at top */}
      <div className="absolute top-6 left-6 pointer-events-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

