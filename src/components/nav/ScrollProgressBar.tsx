import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Only show progress bar after scrolling down a bit
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}; 