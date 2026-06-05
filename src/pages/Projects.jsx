// src/pages/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowUpRight, Folder } from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";
import { GitHubIcon, AirPlayIcon } from "../components/project/ProjectCommon";
import "./Projects.css";



// Evaluated once at module load — no re-renders, no useEffect, no setState.
// (hover: none) targets any device incapable of true hover: phones, tablets, stylus-only.
const IS_TOUCH_DEVICE =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

export default function Projects() {
  usePageMeta({
    title: "Projects | Jay Joshi",
    description:
      "Explore Jay Joshi's project portfolio in AI/ML systems, computer vision, and secure full-stack engineering.",
    path: "/projects",
  });

  const [hoveredId, setHoveredId] = useState(null);
  const gridRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    // Skip mouse tracking entirely on touch devices — no listener, no setState, no repaints
    if (IS_TOUCH_DEVICE) return;

    const handleMouseMove = (e) => {
      if (orbRef.current && gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        orbRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("mousemove", handleMouseMove);
      return () => grid.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleLinkClick = (e, url) => {
    if (!url) return;
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen pt-4 px-6 md:px-12 pb-20 relative overflow-hidden">

      {/* Animated background gradient orbs — mouse-tracking orb skipped on touch */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {!IS_TOUCH_DEVICE && (
          <div
            ref={orbRef}
            className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-10"
            style={{
              background: "radial-gradient(circle, #71C4FF 0%, transparent 70%)",
              left: "0px",
              top: "0px",
              transform: "translate3d(-300px, -300px, 0)",
              transition: "transform 0.3s ease-out",
              willChange: "transform",
            }}
          />
        )}
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/5 to-purple-500/5 blur-[100px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-20 relative"
      >
        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-[var(--accent-color)]/10 to-purple-500/10 rounded-2xl blur-lg"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase relative"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(135deg, #ffffff 0%, var(--accent-hover, #4f46e5) 50%, var(--accent-color) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Selected <span style={{ WebkitTextFillColor: "var(--accent-color)" }}>Works</span>
          </h1>
        </div>

        <motion.div
          className="h-[2px] w-full relative overflow-hidden rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)] to-transparent opacity-50 animate-shimmer" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-gray-200 font-mono text-sm tracking-wider flex items-center gap-2"
        >
          <Folder size={16} style={{ color: "var(--accent-color)" }} />
          Explore my carefully crafted projects
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex flex-col h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link to={`/project-summary/${project.id}`} className="block h-full">
              <div
                className="group cursor-pointer relative h-full flex flex-col"
                // Touch devices: no hover handlers → hoveredId stays null forever
                // → all Framer Motion animate conditions that check hoveredId are always false
                // → zero JS animation work on mobile
                onMouseEnter={IS_TOUCH_DEVICE ? undefined : () => setHoveredId(project.id)}
                onMouseLeave={IS_TOUCH_DEVICE ? undefined : () => setHoveredId(null)}
              >
                <div className="relative flex flex-col h-full">

                  {/* Image Wrapper */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] aspect-[4/3] mb-6 shadow-2xl shrink-0">

                    {/* Animated grain texture */}
                    <div
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px 200px",
                      }}
                    />

                    <motion.img
                      layoutId={`hero-image-${project.id}`}
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105 crt-img"
                    />

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[var(--accent-color)]/50 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16" />

                    {/* Scan line motion — not rendered at all on touch */}
                    {!IS_TOUCH_DEVICE && (
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        animate={
                          hoveredId === project.id
                            ? { backgroundPosition: ["0% 0%", "0% 100%"] }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent-color) 5%, transparent) 50%, transparent 100%)",
                          backgroundSize: "100% 200%",
                        }}
                      />
                    )}

                    {/* CRT Glitch overlay — not rendered at all on touch */}
                    {!IS_TOUCH_DEVICE && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 overflow-hidden"
                        style={{ transition: "opacity 0.15s ease" }}
                      >
                        <div className="absolute inset-0 crt-scanlines" />
                        <div className="absolute inset-0 crt-bars" />
                        <div className="absolute inset-0 crt-rgb-fringe" />
                        <div className="absolute inset-0 crt-vignette" />
                        <div className="absolute inset-0 crt-pixel-blocks" />
                      </div>
                    )}

                    {/* GitHub + Prototype Buttons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                      {[
                        { link: project.githubLink, delay: 0.05, title: "View GitHub Repo", icon: <GitHubIcon size={18} /> },
                        { link: project.prototypeLink, delay: 0.12, title: "View Prototype", icon: <AirPlayIcon size={18} /> }
                      ].map((btn, i) => btn.link && (
                        <motion.button
                          key={i}
                          onClick={(e) => handleLinkClick(e, btn.link)}
                          initial={IS_TOUCH_DEVICE ? false : { opacity: 0, x: 20 }}
                          animate={
                            IS_TOUCH_DEVICE
                              ? { opacity: 1, x: 0 }
                              : hoveredId === project.id
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 20 }
                          }
                          whileHover={IS_TOUCH_DEVICE ? undefined : { scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.25, delay: btn.delay }}
                          title={btn.title}
                          className="w-11 h-11 rounded-full flex items-center justify-center text-gray-200 hover:text-white bg-white/[0.02] border border-white/10 shadow-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                        >
                          {btn.icon}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="flex justify-between items-start gap-4 flex-grow">
                    <div className="flex-1 flex flex-col h-full">
                      <h3
                        className="text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:tracking-wide flex-grow"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-3 mt-4 shrink-0">
                        <span
                          className="text-xs font-mono uppercase tracking-widest px-2 py-1 rounded border"
                          style={{
                            color: "var(--accent-color)",
                            borderColor: "color-mix(in srgb, var(--accent-color) 30%, transparent)",
                            backgroundColor: "color-mix(in srgb, var(--accent-color) 5%, transparent)",
                          }}
                        >
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-gray-200">
                          {project.year}
                        </span>
                      </div>

                      <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[var(--accent-color)] via-[var(--accent-hover,var(--accent-color))] to-transparent transition-all duration-700 rounded-full shrink-0" />
                    </div>

                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={IS_TOUCH_DEVICE ? undefined : { scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, var(--accent-color), var(--accent-hover, var(--accent-color)))" }}
                      />
                      <div className="relative p-3 rounded-full border border-white/20 text-white/60 bg-white/[0.02] group-hover:bg-gradient-to-br group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover,var(--accent-color))] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-lg">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Index number watermark */}
                  <div
                    className="absolute -top-8 -left-4 text-[120px] font-black opacity-[0.15] group-hover:opacity-[0.20] transition-opacity duration-500 pointer-events-none select-none"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
