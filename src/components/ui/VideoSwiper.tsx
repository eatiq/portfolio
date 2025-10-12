'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Video = {
  id: string;
  url: string;
};

type VideoSwiperProps = {
  videos: Video[];
  isLocked: boolean;
  children: (currentIndex: number) => React.ReactNode;
};

export default function VideoSwiper({ videos, isLocked, children }: VideoSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (isLocked) return;
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isLocked) return;
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (isLocked || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -minSwipeDistance;
    const isSwipeUp = distance > minSwipeDistance;

    if (isSwipeUp && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isSwipeDown && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isLocked) return;
      e.preventDefault();
      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentIndex, videos.length, isLocked]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mobile: Full screen TikTok style */}
      <div className="md:hidden">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(-${currentIndex * 100}vh)`,
          }}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="h-screen w-full relative">
              <video
                src={video.url}
                className={`w-full h-full object-cover ${isLocked ? 'blur-lg' : ''}`}
                loop
                playsInline
                autoPlay={!isLocked && index === currentIndex}
                muted={index !== currentIndex}
              />
            </div>
          ))}
        </div>
        {children(currentIndex)}
        
        {/* Back button when unlocked */}
        {!isLocked && (
          <div className="absolute top-6 left-6 z-20">
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
        )}
      </div>

      {/* Desktop/Tablet: YouTube Shorts style - centered */}
      <div className="hidden md:flex items-center justify-center h-full bg-black/90">
        <div className="relative w-full max-w-md h-full flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden max-h-[90vh]">
            <video
              src={videos[currentIndex].url}
              className={`w-full h-auto max-h-[90vh] ${isLocked ? 'blur-lg' : ''}`}
              controls={!isLocked}
              loop
              playsInline
              autoPlay={!isLocked}
            />
          </div>
          {children(currentIndex)}
          
          {/* Back button when unlocked */}
          {!isLocked && (
            <div className="absolute top-8 left-8 z-20">
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
            </div>
          )}
        </div>
      </div>

      {/* Navigation dots - only show when unlocked */}
      {!isLocked && videos.length > 1 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white h-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

