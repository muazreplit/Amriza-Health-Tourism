import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-[#14b8a6] via-[#1dbcb5] to-[#2dd4bf] origin-left shadow-[0_0_8px_rgba(29,188,181,0.6)]"
      />
    </div>
  );
};
