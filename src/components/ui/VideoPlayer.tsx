'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VideoPlayerProps = {
  src: string;
  className?: string;
  aspectRatio?: 'auto' | 'square';
};

export default function VideoPlayer({ src, className = '', aspectRatio = 'auto' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!isDragging && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [isDragging]);

  // Auto-hide controls after a delay when playing
  const scheduleHideControls = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused && !isDragging) {
        setShowControls(false);
      }
    }, 2500);
  }, [isDragging]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowControls(true);
      scheduleHideControls();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
      // Keep controls visible when paused
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
  }, [scheduleHideControls]);

  // Scrubber interaction
  const handleScrub = useCallback((clientX: number) => {
    const video = videoRef.current;
    const scrubber = scrubberRef.current;
    if (!video || !scrubber || !video.duration) return;

    const rect = scrubber.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const fraction = x / rect.width;
    video.currentTime = fraction * video.duration;
    setProgress(fraction);
  }, []);

  const handleScrubStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    handleScrub(clientX);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      const cx = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      handleScrub(cx);
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (isPlaying) scheduleHideControls();
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [handleScrub, isPlaying, scheduleHideControls]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    // Don't toggle if clicking on the scrubber area
    const scrubber = scrubberRef.current;
    if (scrubber) {
      const rect = scrubber.getBoundingClientRect();
      if (e.clientY >= rect.top - 16) return;
    }
    togglePlay();
  }, [togglePlay]);

  return (
    <div
      className={`relative cursor-pointer group ${aspectRatio === 'square' ? 'aspect-square' : ''} overflow-hidden ${className}`}
      onClick={handleContainerClick}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full rounded-2xl ${aspectRatio === 'square' ? 'h-full object-cover' : ''}`}
      />

      {/* Persistent pause overlay when paused */}
      {!isPlaying && !showControls && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path d="M8 5v14l11-7L8 5z" fill="white" />
            </svg>
          </div>
        </div>
      )}

      {/* Scrubber — always visible when paused */}
      {!isPlaying && !showControls && (
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div
            ref={scrubberRef}
            className="relative h-6 flex items-end cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleScrubStart}
            onTouchStart={handleScrubStart}
          >
            {/* Track background */}
            <div className="w-full h-[3px] rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              {/* Progress fill */}
              <motion.div
                className="h-full rounded-full bg-white/70"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            {/* Scrub handle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-black/30"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
              initial={false}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 1.2 }}
            />
          </div>
        </div>
      )}

      {/* Animated icon + scrubber on toggle */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute inset-0 flex flex-col pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Center play/pause icon */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
                  </svg>
                )}
              </motion.div>
            </div>

            {/* Scrubber bar at bottom */}
            <motion.div
              className="px-4 pb-4 pointer-events-auto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div
                ref={!isPlaying ? undefined : scrubberRef}
                className="relative h-6 flex items-end cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => {
                  // Assign ref dynamically for the playing state scrubber
                  if (scrubberRef.current === null) {
                    scrubberRef.current = e.currentTarget;
                  }
                  handleScrubStart(e);
                }}
                onTouchStart={(e) => {
                  if (scrubberRef.current === null) {
                    scrubberRef.current = e.currentTarget;
                  }
                  handleScrubStart(e);
                }}
              >
                <div className="w-full h-[3px] rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-white/70"
                    style={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-black/30"
                  style={{ left: `calc(${progress * 100}% - 6px)` }}
                  initial={false}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 1.2 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
