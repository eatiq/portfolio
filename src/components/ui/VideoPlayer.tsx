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
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const draggingRef = useRef(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!draggingRef.current && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  const scheduleHideControls = useCallback(() => {
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused && !draggingRef.current) {
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
      clearControlsTimeout();
    }
  }, [scheduleHideControls]);

  // Seek to a position given a clientX coordinate — uses ref directly so it never goes stale
  const seekTo = (clientX: number) => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track || !video.duration) return;

    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const fraction = x / rect.width;
    video.currentTime = fraction * video.duration;
    setProgress(fraction);
  };

  // Pointer down on the scrubber track or handle — starts continuous drag
  const onScrubPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Capture pointer on the track element for smooth continuous drag
    const target = trackRef.current;
    if (target) {
      target.setPointerCapture(e.pointerId);
    }

    draggingRef.current = true;
    clearControlsTimeout();
    seekTo(e.clientX);
  };

  const onScrubPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    seekTo(e.clientX);
  };

  const onScrubPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const target = trackRef.current;
    if (target) {
      target.releasePointerCapture(e.pointerId);
    }

    if (videoRef.current && !videoRef.current.paused) {
      scheduleHideControls();
    }
  };

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    // Don't toggle play if clicking near the bottom scrubber area
    const container = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - container.top;
    if (clickY > container.height - 50) return;
    togglePlay();
  }, [togglePlay]);

  // Optically centered play icon
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
              <div
                ref={trackRef}
                className="relative h-8 flex items-end touch-none"
                style={{ cursor: 'pointer' }}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={onScrubPointerDown}
                onPointerMove={onScrubPointerMove}
                onPointerUp={onScrubPointerUp}
                onPointerCancel={onScrubPointerUp}
              >
                {/* Track: frosted glass pill */}
                <div className="w-full h-[5px] rounded-full bg-black/15 backdrop-blur-md overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/80"
                    style={{
                      width: `${progress * 100}%`,
                      transition: draggingRef.current ? 'none' : 'width 0.1s ease',
                    }}
                  />
                </div>
                {/* Scrub handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white"
                  style={{
                    left: `calc(${progress * 100}% - 7px)`,
                    boxShadow: '0 0 0 2px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.15)',
                    pointerEvents: 'none', // handle is visual only, track captures all events
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
