'use client';

import { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';

type UnlockPromptProps = {
  onUnlock: (code: string) => void;
  error?: boolean;
};

export default function UnlockPrompt({ onUnlock, error }: UnlockPromptProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(code);
  };

  return (
    <FadeIn delay={0.5}>
      <div className="mb-12">
        <div className="max-w-md mx-auto">

          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-background border-2 border-foreground rounded-full overflow-hidden transition-colors focus-within:border-foreground/30">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Unlock code"
                className="flex-1 px-6 py-4 font-semibold bg-transparent outline-none placeholder:text-foreground/40"
                autoFocus
              />
              <button
                type="submit"
                className="px-8 py-4 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
              >
                Unlock
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-3 ml-6">Incorrect code. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </FadeIn>
  );
}

