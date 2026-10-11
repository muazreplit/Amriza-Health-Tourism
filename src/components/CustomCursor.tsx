import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'card' | 'timeline' | 'text'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics spring for outer trailing ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable on precise pointer devices (not mobile / touch)
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveBtn = target.closest('button, a, [role="button"]');
      const interactiveCard = target.closest('.glass-card, [data-cursor="card"]');
      const interactiveTimeline = target.closest('[data-cursor="timeline"]');

      if (interactiveBtn) {
        setCursorState('button');
      } else if (interactiveTimeline) {
        setCursorState('timeline');
      } else if (interactiveCard) {
        setCursorState('card');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const getRingVariants = () => {
    switch (cursorState) {
      case 'button':
        return {
          scale: 1.8,
          borderColor: 'rgba(13, 126, 121, 0.85)',
          backgroundColor: 'rgba(29, 188, 181, 0.15)',
        };
      case 'card':
        return {
          scale: 1.4,
          borderColor: 'rgba(13, 126, 121, 0.65)',
          backgroundColor: 'rgba(29, 188, 181, 0.08)',
        };
      case 'timeline':
        return {
          scale: 0.6,
          borderColor: 'rgba(13, 126, 121, 0.95)',
          backgroundColor: 'rgba(29, 188, 181, 0.4)',
        };
      default:
        return {
          scale: 1,
          borderColor: 'rgba(13, 126, 121, 0.45)',
          backgroundColor: 'rgba(29, 188, 181, 0.05)',
        };
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={getRingVariants()}
        transition={{ duration: 0.2 }}
      />

      {/* Direct Inner Glowing Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#1dbcb5] shadow-[0_0_8px_#1dbcb5] pointer-events-none -translate-x-1/2 -translate-y-1/2 border border-white"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  );
};
