'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
}

export function Magnetic({ children, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scale = useTransform([x, y], (latest: number[]) => {
    const distance = Math.sqrt(latest[0] * latest[0] + latest[1] * latest[1]);
    const maxDistance = 150;
    return 1 + Math.min(distance / maxDistance, 1) * 0.15;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hovered) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = {
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    };

    x.set(distance.x * 0.3);
    y.set(distance.y * 0.3);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        x: springX,
        y: springY,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
