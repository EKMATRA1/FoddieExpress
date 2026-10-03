import React from 'react';

interface FoddieLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'badge' | 'white' | 'red';
}

/**
 * Official Foddie Cloche Logo with 7 Radiating Rays
 * Matches the user-provided cloche serving dome logo with shine highlight and sunburst rays.
 */
export const FoddieLogo: React.FC<FoddieLogoProps> = ({
  className = 'w-6 h-6',
  variant = 'badge',
}) => {
  // If variant is 'badge', it renders the red rounded container with the white cloche logo inside
  if (variant === 'badge') {
    return (
      <div
        className={`rounded-full bg-[#EB1700] flex items-center justify-center p-1.5 shadow-2xs select-none shrink-0 ${className}`}
      >
        <svg
          viewBox="0 0 100 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* 7 Radiating Rays */}
          {/* Ray 1: Far Left (horizontal) */}
          <line x1="8" y1="46" x2="16" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 2: Lower Left (30 deg) */}
          <line x1="13" y1="36" x2="20" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 3: Upper Left (60 deg) */}
          <line x1="24" y1="21" x2="29" y2="13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 4: Center Top (90 deg vertical) */}
          <line x1="50" y1="14" x2="50" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 5: Upper Right (60 deg) */}
          <line x1="71" y1="13" x2="76" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 6: Lower Right (30 deg) */}
          <line x1="80" y1="32" x2="87" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 7: Far Right (horizontal) */}
          <line x1="84" y1="46" x2="92" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Cloche Knob on top */}
          <path
            d="M48 24.5C48 23.4 48.9 22.5 50 22.5C51.1 22.5 52 23.4 52 24.5C52 25.1 51.5 25.7 51 25.9V26.5H49V25.9C48.5 25.7 48 25.1 48 24.5Z"
            fill="currentColor"
          />

          {/* Left Shine Reflection Crescent on Dome */}
          <path
            d="M24.5 45C25.5 35 30 28.5 35.5 26.5C34.5 28.5 33.5 31.5 33 45H24.5Z"
            fill="currentColor"
          />

          {/* Main Dome Body */}
          <path
            d="M37 45C38 31.5 44 26.5 50 26.5C57.5 26.5 75 32 75.5 45H37Z"
            fill="currentColor"
          />

          {/* Base Platter Tray (Rounded Bar) */}
          <rect x="22" y="47.5" width="56" height="3.5" rx="1.75" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // Pure SVG icon (white or red based on variant/currentColor)
  const colorClass = variant === 'red' ? 'text-[#EB1700]' : 'text-white';

  return (
    <svg
      viewBox="0 0 100 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${colorClass} shrink-0 select-none`}
    >
      {/* 7 Radiating Rays */}
      {/* Ray 1: Far Left (horizontal) */}
      <line x1="8" y1="46" x2="16" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 2: Lower Left (30 deg) */}
      <line x1="13" y1="36" x2="20" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 3: Upper Left (60 deg) */}
      <line x1="24" y1="21" x2="29" y2="13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 4: Center Top (90 deg vertical) */}
      <line x1="50" y1="14" x2="50" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 5: Upper Right (60 deg) */}
      <line x1="71" y1="13" x2="76" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 6: Lower Right (30 deg) */}
      <line x1="80" y1="32" x2="87" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ray 7: Far Right (horizontal) */}
      <line x1="84" y1="46" x2="92" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* Cloche Knob on top */}
      <path
        d="M48 24.5C48 23.4 48.9 22.5 50 22.5C51.1 22.5 52 23.4 52 24.5C52 25.1 51.5 25.7 51 25.9V26.5H49V25.9C48.5 25.7 48 25.1 48 24.5Z"
        fill="currentColor"
      />

      {/* Left Shine Reflection Crescent on Dome */}
      <path
        d="M24.5 45C25.5 35 30 28.5 35.5 26.5C34.5 28.5 33.5 31.5 33 45H24.5Z"
        fill="currentColor"
      />

      {/* Main Dome Body */}
      <path
        d="M37 45C38 31.5 44 26.5 50 26.5C57.5 26.5 75 32 75.5 45H37Z"
        fill="currentColor"
      />

      {/* Base Platter Tray (Rounded Bar) */}
      <rect x="22" y="47.5" width="56" height="3.5" rx="1.75" fill="currentColor" />
    </svg>
  );
};
