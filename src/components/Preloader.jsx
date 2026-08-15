import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Module-level guard: resets to false on every full page reload / hard refresh,
// but stays true across client-side SPA navigations (opening/closing project pages).
export let hasPlayedIntro = false;

export default function Preloader({ onLoadingComplete }) {
  const [shouldPlay] = useState(() => !hasPlayedIntro);
  const [visible, setVisible] = useState(shouldPlay);

  useEffect(() => {
    if (!shouldPlay) {
      if (onLoadingComplete) onLoadingComplete();
      return;
    }

    hasPlayedIntro = true;

    // Lock scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldPlay, onLoadingComplete]);

  if (!shouldPlay) return null;

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    if (onLoadingComplete) onLoadingComplete();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.1,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.3, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          <motion.svg
            width="150"
            height="85"
            viewBox="0 0 180 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-visible"
          >
            {/* Letter J */}
            <motion.path
              d="M 32 24 H 68 M 54 24 V 64 C 54 77 40 81 26 73"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
            />
            {/* Letter a */}
            <motion.path
              d="M 106 42 C 100 34 86 34 78 42 C 70 50 70 62 78 70 C 86 78 100 78 106 70 M 106 36 V 76"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
            />
            {/* Letter y */}
            <motion.path
              d="M 124 38 L 138 62 M 154 38 L 132 82 C 126 92 116 94 108 88"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
