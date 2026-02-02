import React from "react";

const GlassOverlay = ({
  tint = "rgba(20, 20, 25, 0.55)",
  blur = 18,
  opacity = 1,
}) => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      style={{ opacity }}
    >
      {/* Main tinted glass layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: tint,
          backdropFilter: `blur(${blur}px) saturate(120%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(120%)`,
        }}
      />

      {/* Subtle top highlight (glass sheen) */}
      <div
        className="absolute top-0 left-0 w-full h-[160px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Optional soft edge darkening for depth */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
};

export default GlassOverlay;
