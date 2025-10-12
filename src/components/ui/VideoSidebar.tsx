'use client';

import { useState } from 'react';
import Link from 'next/link';

type VideoSidebarProps = {
  title: string;
  description: string;
  company: string;
  isLocked: boolean;
  unlockCode?: string;
  onUnlock?: () => void;
};

export default function VideoSidebar({
  title,
  description,
  company,
  isLocked,
  unlockCode,
  onUnlock,
}: VideoSidebarProps) {
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

  // Only show sidebar when locked
  if (!isLocked) return null;

  return (
    <div className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 w-96 z-20 space-y-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </Link>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <p className="text-white/60 text-sm font-medium mb-2">{company}</p>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {isLocked && (
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
              <p className="text-red-400 text-sm ml-5">
                Incorrect code. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

