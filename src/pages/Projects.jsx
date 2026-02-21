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
                
                {/* Glow effect behind card */}
                <div 
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(113, 196, 255, 0.1), rgba(96, 73, 110, 0.1))',
                  }}
                />

                {/* Main card container */}
                <div className="relative">
                  
                  {/* Image Wrapper with glass morphism */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm aspect-[4/3] mb-6 shadow-2xl">
                    
                    {/* Gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(113, 196, 255, 0.08) 0%, rgba(96, 73, 110, 0.08) 100%)'
                      }}
                    />
                    
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
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
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

                    {/* GitHub + Prototype Buttons — stacked on right side */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                      
                      {/* GitHub Button */}
                      {project.githubLink && (
                        <motion.button
                          onClick={(e) => handleLinkClick(e, project.githubLink)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                          title="View GitHub Repo"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center text-gray-200 hover:text-white active:scale-95"
                          style={{
                            background: 'rgba(30, 30, 35, 0.55)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(200, 200, 210, 0.18)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.15) translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.45), 0 0 12px rgba(180,180,220,0.18), inset 0 1px 0 rgba(255,255,255,0.12)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
                          }}
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
                          transition={{ duration: 0.25, delay: 0.12 }}
                          title="View Prototype"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center text-gray-200 hover:text-white active:scale-95"
                          style={{
                            background: 'rgba(30, 30, 35, 0.55)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(200, 200, 210, 0.18)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.15) translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.45), 0 0 12px rgba(180,180,220,0.18), inset 0 1px 0 rgba(255,255,255,0.12)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
                          }}
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
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
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