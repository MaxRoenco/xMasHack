import React from 'react';

const SmoothPath = () => {
  return (
    <div className="relative">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 600">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1"/>
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        <path
          d="M -100,300 
             C 100,300 200,200 400,200 
             C 600,200 650,400 800,400 
             C 950,400 1000,300 1200,300"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          filter="url(#glow)"
          className="path-glow"
        />
      </svg>
      <style jsx>{`
        .path-glow {
          filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.5));
        }
      `}</style>
    </div>
  );
};

export default SmoothPath;