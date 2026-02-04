import React from "react";

/**
 * =========================================================
 * GLASS TERMINAL COMPONENT (16:9 ASPECT RATIO)
 * =========================================================
 *
 * Aspect Ratio:
 * - Locked to 16:9 (same ratio as 1920x1080)
 * - Responsive, ratio-based (NOT pixel-based)
 *
 * ---------------------------------------------------------
 * QUICK PRESETS (copy into props)
 *
 * 1) DARK / PREMIUM
 *    tint="neutral"
 *    mode="dark"
 *    headerOpacity={0.22}
 *    bodyOpacity={0.07}
 *
 * 2) CYBER / TECH
 *    tint="indigo"
 *    mode="dark"
 *    headerOpacity={0.18}
 *    bodyOpacity={0.08}
 *
 * =========================================================
 */

export default function Terminal({
  title = "skills.sh",
  subtitle = "scrollable skill index",

  /* =========================
     GLASS CONTROLS
     ========================= */
  headerOpacity = 0.55,
  bodyOpacity = 0.2,
  tint = "neutral",
  mode = "dark",

  children,
  className = "",
}) {
  /* =========================
     TINT COLOR MAP
     ========================= */
  const tintMap = {
    neutral: {
      light: "255,255,255",
      dark: "20,20,25",
    },
    indigo: {
      light: "99,102,241",
      dark: "49,46,129",
    },
    emerald: {
      light: "16,185,129",
      dark: "6,78,59",
    },
    rose: {
      light: "244,63,94",
      dark: "136,19,55",
    },
  };

  const rgb = tintMap[tint]?.[mode] || tintMap.neutral.dark;

  return (
    <div
      className={`
        relative w-full max-w-4xl mx-auto
        aspect-[16/9]              /* 🔑 16:9 RATIO LOCK */
        rounded-2xl border border-white/10
        backdrop-blur-xl
        shadow-2xl shadow-black/40
        overflow-hidden            /* keeps glass clean */
        ${className}
      `}
    >
      {/* =========================
          TERMINAL HEADER
          ========================= */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-white/10"
        style={{
          backgroundColor: `rgba(${rgb}, ${headerOpacity})`,
        }}
      >
        {/* Window dots */}
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>

        <div className="text-xs tracking-widest text-white/70 font-mono">
          {title}
        </div>

        <div className="text-[10px] text-white/40 font-mono hidden sm:block">
          {subtitle}
        </div>
      </div>

      {/* =========================
          TERMINAL BODY (fills remaining space)
          ========================= */}
      <div
        className="flex flex-col h-[calc(100%-40px)] px-4 py-4"
        style={{
          backgroundColor: `rgba(${rgb}, ${bodyOpacity})`,
        }}
      >
        {/* Prompt */}
        <div className="mb-3 text-sm font-mono text-indigo-400">
          <span className="text-green-400">➜</span>{" "}
          <span className="text-cyan-400">~/skills</span>{" "}
          <span className="text-white/60">$</span> list
        </div>

        {/* Scrollable content MUST grow */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
