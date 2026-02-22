// src/pages/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowUpRight, Folder } from "lucide-react";

// GitHub SVG Icon
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// AirPlay SVG Icon
const AirPlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
    <polygon points="12 15 17 21 7 21 12 15"/>
  </svg>
);

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      return () => grid.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleLinkClick = (e, url) => {
    if (!url) return;
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen pt-4 px-6 md:px-12 pb-20 relative overflow-hidden">
      
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #71C4FF 0%, transparent 70%)',
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-[100px] animate-pulse" 
          style={{ animationDuration: '8s' }} 
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
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-lg"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase relative"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #9c9dff 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Selected <span style={{ WebkitTextFillColor: '#818cf8' }}>Works</span>
          </h1>
        </div>
        
        <motion.div 
          className="h-[2px] w-full relative overflow-hidden rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 opacity-50 animate-shimmer" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-gray-200 font-mono text-sm tracking-wider flex items-center gap-2"
        >
          <Folder size={16} className="text-indigo-400" />
          Explore my carefully crafted projects
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div 
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 relative"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.1 * index,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Link to={`/project-summary/${project.id}`}>
              <div 
                className="group cursor-pointer relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                
                {/* Main card container */}
                <div className="relative">
                  
                  {/* Image Wrapper with glass morphism */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm aspect-[4/3] mb-6 shadow-2xl">
                    
                    {/* Gradient overlay removed - CRT glitch used instead */}
                    
                    {/* Animated grain texture */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
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
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
                    
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={hoveredId === project.id ? {
                        backgroundPosition: ['0% 0%', '0% 100%']
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(113, 196, 255, 0.05) 50%, transparent 100%)',
                        backgroundSize: '100% 200%'
                      }}
                    />

                    {/* CRT Glitch overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 overflow-hidden" style={{ transition: 'opacity 0.15s ease' }}>
                      <div className="absolute inset-0 crt-scanlines" />
                      <div className="absolute inset-0 crt-bars" />
                      <div className="absolute inset-0 crt-rgb-fringe" />
                      <div className="absolute inset-0 crt-vignette" />
                      <div className="absolute inset-0 crt-pixel-blocks" />
                    </div>

                    {/* GitHub + Prototype Buttons — stacked on right side */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                      
                      {/* GitHub Button */}
                      {project.githubLink && (
                        <motion.button
                          onClick={(e) => handleLinkClick(e, project.githubLink)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                          title="View GitHub Repo"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center text-gray-200 hover:text-white bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <GitHubIcon />
                        </motion.button>
                      )}

                      {/* Prototype / AirPlay Button */}
                      {project.prototypeLink && (
                        <motion.button
                          onClick={(e) => handleLinkClick(e, project.prototypeLink)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.25, delay: 0.12 }}
                          title="View Prototype"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center text-gray-200 hover:text-white bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <AirPlayIcon />
                        </motion.button>
                      )}

                    </div>

                  </div>

                  {/* Text Info with enhanced styling */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 
                        className="text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:tracking-wide"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                        }}
                      >
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-2 py-1 rounded border border-indigo-400/30 bg-indigo-400/5">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-gray-200">
                          {project.year}
                        </span>
                      </div>
                      
                      {/* Progress bar decoration */}
                      <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-transparent transition-all duration-700 rounded-full" />
                    </div>
                    
                    {/* Arrow button with enhanced effects */}
                    <motion.div 
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className="absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #71C4FF, #60496e)'
                        }}
                      />
                      <div className="relative p-3 rounded-full border border-white/20 text-white/60 bg-white/5 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-lg">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Index number watermark */}
                  <div 
                    className="absolute -top-8 -left-4 text-[120px] font-black opacity-[0.15] group-hover:opacity-[0.20] transition-opacity duration-500 pointer-events-none select-none"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }

        /* -- CRT Scanlines -- */
        .crt-scanlines {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0, 0, 0, 0.13) 3px,
            rgba(0, 0, 0, 0.13) 4px
          );
          animation: crt-flicker 0.145s infinite steps(1);
          border-radius: inherit;
        }

        /* -- Horizontal glitch bars -- */
        .crt-bars {
          background: transparent;
          animation: crt-bars 2.95s infinite steps(1);
          border-radius: inherit;
        }

        /* -- RGB colour fringe on edges -- */
        .crt-rgb-fringe {
          box-shadow:
            inset 2px 0 0 rgba(255, 30, 30, 0.07),
            inset -2px 0 0 rgba(30, 180, 255, 0.07),
            inset 0 2px 0 rgba(30, 255, 100, 0.04),
            inset 0 -2px 0 rgba(255, 30, 180, 0.04);
          animation: crt-rgb 2.2s infinite steps(1);
          border-radius: inherit;
        }

        /* -- Edge vignette flicker -- */
        .crt-vignette {
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.22) 100%);
          animation: crt-flicker 0.22s infinite steps(1);
          border-radius: inherit;
        }

        @keyframes crt-flicker {
          0%   { opacity: 1; }
          25%  { opacity: 0.92; }
          50%  { opacity: 1; }
          75%  { opacity: 0.96; }
          100% { opacity: 1; }
        }

        @keyframes crt-bars {
          0%   { background: transparent; }
          7%   { background: linear-gradient(to bottom, transparent 20%, rgba(255,30,30,0.09) 22%, rgba(255,30,30,0.09) 25%, transparent 27%); }
          13%  { background: transparent; }
          22%  { background: linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.06) 57%, rgba(255,255,255,0.06) 60%, transparent 62%); }
          25%  { background: linear-gradient(to bottom, transparent 55%, rgba(30,255,100,0.07) 57%, rgba(30,255,100,0.07) 60%, transparent 62%); }
          30%  { background: transparent; }
          41%  { background: linear-gradient(to bottom, transparent 70%, rgba(30,140,255,0.09) 72%, rgba(30,140,255,0.09) 75%, transparent 77%); }
          46%  { background: transparent; }
          58%  { background: linear-gradient(to bottom, transparent 38%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 42%, transparent 44%); }
          61%  { background: transparent; }
          70%  { background: linear-gradient(to bottom, transparent 10%, rgba(255,30,30,0.07) 12%, rgba(255,30,30,0.07) 15%, transparent 17%); }
          73%  { background: linear-gradient(to bottom, transparent 10%, rgba(30,140,255,0.08) 12%, rgba(30,140,255,0.08) 15%, transparent 17%); }
          77%  { background: transparent; }
          88%  { background: linear-gradient(to bottom, transparent 62%, rgba(30,255,100,0.06) 64%, rgba(30,255,100,0.06) 67%, transparent 69%); }
          91%  { background: linear-gradient(to bottom, transparent 62%, rgba(255,255,255,0.05) 64%, rgba(255,255,255,0.05) 67%, transparent 69%); }
          95%  { background: transparent; }
          100% { background: transparent; }
        }

        @keyframes crt-rgb {
          0%   { box-shadow: inset 2px 0 0 rgba(255,30,30,0.07), inset -2px 0 0 rgba(30,180,255,0.07), inset 0 2px 0 rgba(30,255,100,0.04), inset 0 -2px 0 rgba(255,30,180,0.04); }
          20%  { box-shadow: inset 3px 0 0 rgba(255,30,30,0.10), inset -1px 0 0 rgba(30,180,255,0.05), inset 0 1px 0 rgba(30,255,100,0.03), inset 0 -3px 0 rgba(255,30,180,0.06); }
          40%  { box-shadow: inset 1px 0 0 rgba(255,30,30,0.05), inset -3px 0 0 rgba(30,180,255,0.09), inset 0 3px 0 rgba(30,255,100,0.05), inset 0 -1px 0 rgba(255,30,180,0.03); }
          60%  { box-shadow: inset 2px 0 0 rgba(255,30,30,0.08), inset -2px 0 0 rgba(30,180,255,0.08), inset 0 2px 0 rgba(30,255,100,0.04), inset 0 -2px 0 rgba(255,30,180,0.04); }
          80%  { box-shadow: inset 1px 0 0 rgba(255,30,30,0.06), inset -1px 0 0 rgba(30,180,255,0.06), inset 0 1px 0 rgba(30,255,100,0.02), inset 0 -1px 0 rgba(255,30,180,0.05); }
          100% { box-shadow: inset 2px 0 0 rgba(255,30,30,0.07), inset -2px 0 0 rgba(30,180,255,0.07), inset 0 2px 0 rgba(30,255,100,0.04), inset 0 -2px 0 rgba(255,30,180,0.04); }
        }

        /* -- Pixel block glitch -- */
        .crt-pixel-blocks {
          animation: pixel-blocks 3.95s infinite steps(1);
          border-radius: inherit;
          opacity: 0.55;
        }

        @keyframes pixel-blocks {
          0%   { background: transparent; }

          6%   {
            background:
              linear-gradient(90deg, transparent 12%, rgba(255,30,30,0.18) 12%, rgba(255,30,30,0.18) 22%, transparent 22%),
              linear-gradient(90deg, transparent 60%, rgba(30,140,255,0.14) 60%, rgba(30,140,255,0.14) 68%, transparent 68%);
            background-size: 100% 6px, 100% 4px;
            background-position: 0 28%, 0 52%;
            background-repeat: no-repeat;
          }
          9%   { background: transparent; }

          18%  {
            background:
              linear-gradient(90deg, transparent 35%, rgba(30,255,100,0.15) 35%, rgba(30,255,100,0.15) 48%, transparent 48%),
              linear-gradient(90deg, transparent 5%,  rgba(255,200,30,0.12) 5%,  rgba(255,200,30,0.12) 14%, transparent 14%),
              linear-gradient(90deg, transparent 70%, rgba(255,30,30,0.13) 70%, rgba(255,30,30,0.13) 82%, transparent 82%);
            background-size: 100% 5px, 100% 3px, 100% 4px;
            background-position: 0 65%, 0 20%, 0 80%;
            background-repeat: no-repeat;
          }
          21%  { background: transparent; }

          33%  {
            background:
              linear-gradient(90deg, transparent 50%, rgba(30,140,255,0.16) 50%, rgba(30,140,255,0.16) 65%, transparent 65%),
              linear-gradient(90deg, transparent 20%, rgba(255,30,180,0.12) 20%, rgba(255,30,180,0.12) 30%, transparent 30%);
            background-size: 100% 7px, 100% 3px;
            background-position: 0 40%, 0 70%;
            background-repeat: no-repeat;
          }
          35%  {
            background:
              linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 65%, transparent 65%);
            background-size: 100% 7px;
            background-position: 0 40%;
            background-repeat: no-repeat;
          }
          38%  { background: transparent; }

          52%  {
            background:
              linear-gradient(90deg, transparent 8%,  rgba(255,30,30,0.14) 8%,  rgba(255,30,30,0.14) 18%, transparent 18%),
              linear-gradient(90deg, transparent 75%, rgba(30,255,100,0.11) 75%, rgba(30,255,100,0.11) 88%, transparent 88%);
            background-size: 100% 4px, 100% 5px;
            background-position: 0 55%, 0 30%;
            background-repeat: no-repeat;
          }
          55%  { background: transparent; }

          67%  {
            background:
              linear-gradient(90deg, transparent 30%, rgba(30,140,255,0.17) 30%, rgba(30,140,255,0.17) 50%, transparent 50%),
              linear-gradient(90deg, transparent 55%, rgba(255,200,30,0.13) 55%, rgba(255,200,30,0.13) 62%, transparent 62%),
              linear-gradient(90deg, transparent 2%,  rgba(255,30,180,0.10) 2%,  rgba(255,30,180,0.10) 10%, transparent 10%);
            background-size: 100% 5px, 100% 3px, 100% 6px;
            background-position: 0 15%, 0 75%, 0 50%;
            background-repeat: no-repeat;
          }
          70%  { background: transparent; }

          81%  {
            background:
              linear-gradient(90deg, transparent 42%, rgba(255,255,255,0.07) 42%, rgba(255,255,255,0.07) 58%, transparent 58%),
              linear-gradient(90deg, transparent 18%, rgba(255,30,30,0.13) 18%, rgba(255,30,30,0.13) 26%, transparent 26%);
            background-size: 100% 4px, 100% 6px;
            background-position: 0 88%, 0 35%;
            background-repeat: no-repeat;
          }
          83%  { background: transparent; }

          92%  {
            background:
              linear-gradient(90deg, transparent 65%, rgba(30,255,100,0.14) 65%, rgba(30,255,100,0.14) 80%, transparent 80%),
              linear-gradient(90deg, transparent 28%, rgba(30,140,255,0.12) 28%, rgba(30,140,255,0.12) 38%, transparent 38%);
            background-size: 100% 3px, 100% 5px;
            background-position: 0 60%, 0 20%;
            background-repeat: no-repeat;
          }
          95%  { background: transparent; }
          100% { background: transparent; }
        }

                /* -- Chromatic Aberration on image hover -- */
        .crt-img {
          transition: filter 0.15s steps(2), transform 0.7s ease, brightness 0.7s ease;
        }
        .group:hover .crt-img {
          animation: chroma-shift 3.45s infinite steps(1), img-jitter 3.45s infinite steps(1);
        }

        @keyframes img-jitter {
          0%   { transform: translate(0, 0) scale(1.1); }
          8%   { transform: translate(-2px, 0.5px) scale(1.1); }
          14%  { transform: translate(0, 0) scale(1.1); }
          28%  { transform: translate(2px, -0.5px) scale(1.1); }
          34%  { transform: translate(-1.5px, 0px) scale(1.1); }
          38%  { transform: translate(0, 0) scale(1.1); }
          55%  { transform: translate(1.5px, 0.5px) scale(1.1); }
          61%  { transform: translate(0, 0) scale(1.1); }
          74%  { transform: translate(-2px, -0.5px) scale(1.1); }
          78%  { transform: translate(1px, 0px) scale(1.1); }
          82%  { transform: translate(0, 0) scale(1.1); }
          93%  { transform: translate(-1px, 0.5px) scale(1.1); }
          97%  { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        @keyframes chroma-shift {
          0%   { filter: none; }
          8%   { filter: drop-shadow(2.5px 0 0 rgba(255,20,20,0.55)) drop-shadow(-2.5px 0 0 rgba(0,210,255,0.55)); }
          14%  { filter: none; }
          28%  { filter: drop-shadow(3px 1px 0 rgba(255,20,20,0.48)) drop-shadow(-2px -1px 0 rgba(0,210,255,0.48)); }
          34%  { filter: drop-shadow(1.5px 0 0 rgba(255,20,20,0.60)) drop-shadow(-3px 0 0 rgba(0,210,255,0.60)); }
          38%  { filter: none; }
          55%  { filter: drop-shadow(2px 0 0 rgba(255,20,20,0.42)) drop-shadow(-3.5px 0 0 rgba(0,210,255,0.42)); }
          61%  { filter: none; }
          74%  { filter: drop-shadow(3.5px -1px 0 rgba(255,20,20,0.52)) drop-shadow(-2px 1px 0 rgba(0,210,255,0.52)); }
          78%  { filter: drop-shadow(1px 0 0 rgba(255,20,20,0.38)) drop-shadow(-2.5px 0 0 rgba(0,210,255,0.38)); }
          82%  { filter: none; }
          93%  { filter: drop-shadow(2.5px 0.5px 0 rgba(255,20,20,0.50)) drop-shadow(-1.5px -0.5px 0 rgba(0,210,255,0.50)); }
          97%  { filter: none; }
          100% { filter: none; }
        }

                /* On mobile: always show the link buttons regardless of hover state */
        @media (max-width: 767px) {
          .project-link-btn {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}