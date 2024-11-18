'use client';

import React from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black" />
      {/* White particles with proper styling and animation */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
        />
      ))}
    </div>
  );
}
