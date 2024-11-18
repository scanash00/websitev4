'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  imageUrl?: string;
}

export function Card3D({ children, className = '', imageUrl }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/2.5 to-white/5 p-6 transition-colors hover:border-white/20"
      >
        {imageUrl && (
          <div
            style={{
              transform: 'translateZ(100px)',
              transformStyle: 'preserve-3d',
            }}
            className="absolute -right-6 -top-6 h-24 w-24"
          >
            <Image
              src={imageUrl}
              alt="Project preview"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        )}
        <div
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </div>
      {hovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            transform: 'translateZ(50px)',
          }}
        />
      )}
    </motion.div>
  );
}
