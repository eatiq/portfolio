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
    const scrubber = scrubberRef.current;
    if (scrubber) {
      const rect = scrubber.getBoundingClientRect();
      if (e.clientY >= rect.top - 16) return;
    }
    togglePlay();
  }, [togglePlay]);

  // Play icon SVG — optically centered with slight right offset for the triangle shape
  const PlayIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.22-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" fill="white" />
    </svg>
  );

  const PauseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
    </svg>
  );

  // Scrubber bar component — reused in both states
  const ScrubberBar = ({ refProp }: { refProp?: React.RefObject<HTMLDivElement | null> }) => (
    <div
      ref={refProp}
      className="relative h-6 flex items-end cursor-pointer"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        if (refProp?.current === null && e.currentTarget) {
          (scrubberRef as React.MutableRefObject<HTMLDivElement | null>).current = e.currentTarget;
        }
        handleScrubStart(e);
      }}
      onTouchStart={(e) => {
        if (refProp?.current === null && e.currentTarget) {
          (scrubberRef as React.MutableRefObject<HTMLDivElement | null>).current = e.currentTarget;
        }
        handleScrubStart(e);
      }}
    >
      {/* Track: frosted glass pill for visibility on any background */}
      <div className="w-full h-[5px] rounded-full bg-black/15 backdrop-blur-md overflow-hidden">
        {/* Progress fill */}
        <motion.div
          className="h-full rounded-full bg-white/80"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
      {/* Scrub handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white"
        style={{
          left: `calc(${progress * 100}% - 7px)`,
          boxShadow: '0 0 0 2px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.15)',
        }}
        initial={false}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.15 }}
      />
    </div>
  );

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

      {/* Persistent pause overlay when paused and controls have faded */}
      {!isPlaying && !showControls && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center pl-[2px]">
              <PlayIcon />
            </div>
          </div>
          {/* Scrubber at bottom */}
          <div className="w-full px-4 pb-4">
            <ScrubberBar refProp={scrubberRef} />
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
                style={{ paddingLeft: isPlaying ? '0px' : '2px' }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isPlaying ? <PlayIcon /> : <PauseIcon />}
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
              <ScrubberBar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
