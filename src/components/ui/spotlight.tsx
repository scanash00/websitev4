'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rect, setRect] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    if (!ref.current) return;
    const updateRect = () => {
      if (!ref.current) return;
      const clientRect = ref.current.getBoundingClientRect();
      setRect({
        width: clientRect.width,
        height: clientRect.height,
        left: clientRect.left,
        top: clientRect.top,
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    const { left, top } = rect;
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen overflow-hidden bg-background"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(14, 165, 233, 0.1), transparent 40%)`,
        }}
      />
    </motion.div>
  );
}
