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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const draggingRef = useRef(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update progress bar as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!draggingRef.current && video.duration) {
        setProgress(video.currentTime / video.duration);
        setCurrentTime(video.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
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

  const seekTo = (clientX: number) => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track || !video.duration) return;

    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const fraction = x / rect.width;
    video.currentTime = fraction * video.duration;
    setProgress(fraction);
    setCurrentTime(fraction * video.duration);
  };

  const onScrubPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = trackRef.current;
    if (target) {
      target.setPointerCapture(e.pointerId);
    }

    draggingRef.current = true;
    setIsScrubbing(true);
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
    setIsScrubbing(false);

    const target = trackRef.current;
    if (target) {
      target.releasePointerCapture(e.pointerId);
    }

    if (videoRef.current && !videoRef.current.paused) {
      scheduleHideControls();
    }
  };

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - container.top;
    // Don't toggle play if clicking in the bottom control bar area
    if (clickY > container.height - 60) return;
    togglePlay();
  }, [togglePlay]);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
    if (isPlaying) {
      scheduleHideControls();
    }
  }, [isPlaying, scheduleHideControls]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying && !draggingRef.current) {
      setShowControls(false);
      clearControlsTimeout();
    }
  }, [isPlaying]);

  // Format time as m:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.22-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" fill="white" />
    </svg>
  );

  const PauseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
    </svg>
  );

  const controlsVisible = showControls || !isPlaying;

  return (
    <div
      className={`relative cursor-pointer group ${aspectRatio === 'square' ? 'aspect-square' : ''} overflow-hidden ${className}`}
      onClick={handleContainerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            className="absolute inset-0 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Subtle gradient at bottom for contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent rounded-b-2xl pointer-events-none" />

            {/* Bottom control bar */}
            <motion.div
              className="relative z-10 px-4 pb-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {/* Scrubber track */}
              <div
                ref={trackRef}
                className="relative h-6 flex items-center touch-none mb-2"
                style={{ cursor: 'pointer' }}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={onScrubPointerDown}
                onPointerMove={onScrubPointerMove}
                onPointerUp={onScrubPointerUp}
                onPointerCancel={onScrubPointerUp}
              >
                {/* Track background */}
                <div className="w-full h-[3px] rounded-full bg-white/20 overflow-hidden transition-all duration-150"
                  style={{ height: isScrubbing ? '5px' : '3px' }}
                >
                  {/* Progress fill */}
                  <div
                    className="h-full rounded-full bg-white/90"
                    style={{
                      width: `${progress * 100}%`,
                      transition: draggingRef.current ? 'none' : 'width 0.15s ease-out',
                    }}
                  />
                </div>
                {/* Scrub handle — only visible on hover/scrub */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white"
                  style={{
                    left: `calc(${progress * 100}% - 5px)`,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    pointerEvents: 'none',
                  }}
                  animate={{
                    width: isScrubbing ? 12 : 10,
                    height: isScrubbing ? 12 : 10,
                    opacity: 1,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>

              {/* Play/pause button + time */}
              <div className="flex items-center gap-3">
                <button
                  className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
                  style={{ paddingLeft: isPlaying ? '0px' : '1px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <span className="text-[11px] font-medium text-white/70 tabular-nums tracking-wide select-none">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
