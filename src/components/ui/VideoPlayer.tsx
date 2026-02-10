'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VideoPlayerProps = {
  src: string;
  className?: string;
};

export default function VideoPlayer({ src, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    // Show the icon briefly on toggle
    setShowIcon(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 800);
  }, []);

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-fill rounded-2xl"
      />

      {/* Persistent pause icon when paused */}
      {!isPlaying && !showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-1"
            >
              <path d="M8 5v14l11-7L8 5z" fill="white" />
            </svg>
          </div>
        </div>
      )}

      {/* Animated icon on toggle */}
      <AnimatePresence>
        {showIcon && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              {isPlaying ? (
                /* Play icon (just toggled to play) */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                  <path d="M8 5v14l11-7L8 5z" fill="white" />
                </svg>
              ) : (
                /* Pause icon (just toggled to pause) */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
