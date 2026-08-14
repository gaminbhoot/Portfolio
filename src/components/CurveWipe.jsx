import React from "react";
import { motion } from "framer-motion";

// Bencodes-style curved wipe: black overlay with arched top
export default function CurveWipe({ isVisible }) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isVisible ? "0%" : "100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ display: isVisible ? "block" : "none" }}
    >
      {/* Black fill */}
      <div className="absolute inset-0 bg-black" />
      {/* Curved top edge — SVG wave */}
      <div className="absolute -top-[80px] left-0 w-full h-[80px] overflow-hidden">
        <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z"
            fill="black"
            initial={{ d: "M0,80 Q720,80 1440,80 L1440,80 L0,80 Z" }}
            animate={{ d: isVisible ? "M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" : "M0,80 Q720,80 1440,80 L1440,80 L0,80 Z" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
