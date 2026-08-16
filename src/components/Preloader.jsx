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
    }, 2200);

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
            width="320"
            height="320"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible -translate-y-8 sm:-translate-y-10"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <g
              transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
            >
              {/* Path 1: J Body */}
              <motion.path
                d="M3164 3005 c-20 -34 -26 -61 -29 -112 -1 -38 -11 -90 -22 -118 -11 -27 -28 -75 -38 -105 -9 -30 -44 -110 -76 -178 -33 -67 -59 -126 -59 -130 0 -4 -11 -24 -25 -44 -14 -20 -25 -42 -25 -49 0 -28 -163 -292 -274 -444 -221 -301 -336 -436 -552 -650 -298 -294 -393 -363 -883 -645 -40 -23 -90 -58 -111 -76 -32 -29 -45 -34 -87 -34 -41 0 -57 -6 -88 -30 -21 -16 -41 -30 -44 -30 -3 0 -35 -5 -71 -10 -121 -18 -238 17 -304 91 -189 209 -36 562 399 921 109 90 434 288 625 382 253 124 685 264 1113 361 70 16 110 35 74 35 -30 0 -365 -72 -402 -86 -22 -9 -159 -53 -305 -99 -328 -103 -603 -218 -718 -299 -26 -18 -99 -64 -162 -101 -306 -182 -534 -387 -652 -585 -27 -47 -60 -98 -73 -115 -76 -101 -91 -271 -31 -349 18 -24 45 -63 62 -88 70 -110 149 -128 397 -93 l185 26 157 80 c87 44 198 110 247 145 49 35 91 64 93 64 6 0 158 101 215 143 24 17 71 57 105 87 33 31 89 79 125 107 80 63 136 122 272 283 58 69 113 132 123 140 10 8 49 56 86 105 37 50 110 146 163 215 129 168 195 262 239 342 20 36 55 88 76 116 37 47 81 129 81 152 0 14 81 170 126 242 33 53 54 111 74 203 5 22 22 79 39 127 35 97 38 133 15 142 -27 10 -33 7 -60 -39z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.1 },
                  opacity: { duration: 0.3, delay: 0.1 },
                  fillOpacity: { duration: 0.4, delay: 0.7, ease: "easeIn" },
                }}
              />

              {/* Path 0: Top Flourish */}
              <motion.path
                d="M3475 3223 c-213 -12 -530 -35 -575 -43 -30 -5 -117 -20 -192 -34 -76 -14 -198 -37 -271 -51 -73 -13 -209 -43 -303 -66 -93 -23 -178 -42 -189 -42 -11 0 -65 -15 -120 -32 -145 -47 -192 -58 -211 -51 -9 3 -27 -3 -41 -14 -14 -11 -41 -22 -62 -26 -20 -3 -74 -23 -121 -44 -47 -21 -146 -57 -220 -80 -212 -67 -299 -121 -285 -177 11 -46 35 -53 101 -29 55 19 111 55 153 97 48 49 90 69 148 69 49 0 64 7 169 78 28 18 92 45 149 62 55 16 134 41 175 55 86 28 144 43 355 90 83 18 179 41 215 50 36 9 79 19 95 21 17 1 66 12 110 23 117 30 484 83 605 88 58 3 152 7 210 11 562 30 789 8 1145 -108 115 -38 213 -66 218 -61 12 12 -362 143 -489 170 -158 35 -548 57 -769 44z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.25 },
                  opacity: { duration: 0.3, delay: 0.25 },
                  fillOpacity: { duration: 0.4, delay: 0.75, ease: "easeIn" },
                }}
              />

              {/* Path 9: ay */}
              <motion.path
                d="M5385 2200 c-62 -11 -247 -103 -510 -255 -345 -199 -486 -263 -520 -235 -43 36 22 173 139 293 110 113 146 187 91 187 -44 0 -182 -201 -245 -358 -7 -18 -18 -31 -24 -29 -11 4 -212 -62 -316 -103 -114 -46 -255 -76 -266 -58 -8 12 43 93 97 156 57 67 60 84 18 105 -44 21 -85 8 -189 -60 -266 -172 -622 -345 -650 -317 -25 26 99 205 212 306 175 157 250 198 382 209 69 6 93 12 109 27 70 70 -108 71 -218 1 -22 -14 -56 -31 -75 -39 -38 -15 -113 -77 -259 -215 -170 -161 -203 -206 -205 -289 -2 -77 23 -78 204 -14 36 13 97 42 135 64 39 23 115 67 170 99 55 31 129 74 165 95 138 80 216 91 162 22 -123 -157 -150 -234 -84 -240 37 -4 61 5 205 72 120 56 307 134 365 152 l42 13 0 -40 c0 -53 15 -79 45 -79 59 0 235 76 400 173 373 220 534 298 595 289 26 -4 29 -8 35 -63 7 -58 6 -62 -35 -132 -24 -40 -67 -115 -98 -167 -30 -52 -73 -122 -95 -155 -22 -33 -58 -89 -80 -125 -22 -36 -108 -157 -191 -270 -358 -486 -472 -695 -556 -1024 -48 -185 -48 -196 -16 -196 22 0 24 3 19 38 -5 39 43 245 77 332 30 75 141 311 165 350 109 174 182 277 246 345 20 22 63 78 94 125 32 47 70 101 85 120 54 68 268 396 321 492 30 53 62 99 72 101 10 3 15 11 11 20 -3 8 8 34 25 57 16 22 33 55 36 71 4 17 13 42 21 57 20 39 17 58 -12 81 -28 22 -35 23 -99 11z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.5 },
                  opacity: { duration: 0.3, delay: 0.5 },
                  fillOpacity: { duration: 0.4, delay: 1.1, ease: "easeIn" },
                }}
              />
            </g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
