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
  const scrubberTrackRef = useRef<HTMLDivElement>(null);
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
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2500);
  }, []);

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

  // Scrubber: seek video based on click/drag X position relative to track
  const seekToPosition = useCallback((clientX: number) => {
    const video = videoRef.current;
    const track = scrubberTrackRef.current;
    if (!video || !track || !video.duration) return;

    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const fraction = x / rect.width;
    video.currentTime = fraction * video.duration;
    setProgress(fraction);
  }, []);

  const handleScrubStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    seekToPosition(clientX);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();
      const cx = 'touches' in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
      seekToPosition(cx);
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (videoRef.current && !videoRef.current.paused) {
        scheduleHideControls();
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [seekToPosition, scheduleHideControls]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    // Don't toggle play if clicking near the bottom scrubber area
    const container = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - container.top;
    const containerHeight = container.height;
    if (clickY > containerHeight - 50) return; // bottom 50px reserved for scrubber
    togglePlay();
  }, [togglePlay]);

  // Optically centered play icon (triangle needs slight right nudge)
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

  // Scrubber bar — frosted glass style
  const ScrubberBar = () => (
    <div
      ref={scrubberTrackRef}
      className="relative h-8 flex items-end cursor-pointer"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleScrubStart}
      onTouchStart={handleScrubStart}
    >
      {/* Track: frosted glass pill */}
      <div className="w-full h-[5px] rounded-full bg-black/15 backdrop-blur-md overflow-hidden">
        <div
          className="h-full rounded-full bg-white/80"
          style={{ width: `${progress * 100}%`, transition: isDragging ? 'none' : 'width 0.1s ease' }}
        />
      </div>
      {/* Scrub handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white transition-transform hover:scale-[1.3] active:scale-[1.15]"
        style={{
          left: `calc(${progress * 100}% - 7px)`,
          boxShadow: '0 0 0 2px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.15)',
        }}
      />
    </div>
  );

  // Controls visible = either showControls animation OR paused without animation
  const controlsVisible = showControls || !isPlaying;

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

      {/* Controls overlay */}
      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            className="absolute inset-0 flex flex-col"
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
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </motion.div>
            </div>

            {/* Scrubber bar at bottom */}
            <motion.div
              className="px-4 pb-4"
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
