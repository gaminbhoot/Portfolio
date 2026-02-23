// src/pages/ProjectSummary.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { ArrowLeft, ExternalLink, Code2, Layers, Zap, ChevronRight, X, ZoomIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// GitHub SVG Icon
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// AirPlay SVG Icon
const AirPlayIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
    <polygon points="12 15 17 21 7 21 12 15"/>
  </svg>
);

// Lightbox Component
function ImageLightbox({ image, alt, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Close lightbox"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt={alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-indigo-400/60" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-400/60" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-indigo-400/60" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-indigo-400/60" />
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-mono text-gray-300 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          Click anywhere or press ESC to close
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectSummary() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightboxImage, setLightboxImage] = useState(null);
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const overviewCardRef = useRef(null);
  const screenshotsCardRef = useRef(null);
  const techCardRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overviewCardRef.current, { opacity: 0, y: 50, rotateX: 10 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: overviewCardRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.fromTo(screenshotsCardRef.current, { opacity: 0, y: 50, rotateX: 10 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: screenshotsCardRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.utils.toArray(".tech-pill").forEach((pill, index) => { gsap.fromTo(pill, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: "back.out(1.5)", scrollTrigger: { trigger: overviewCardRef.current, start: "top 70%", toggleActions: "play none none reverse" } }); });
      gsap.utils.toArray(".screenshot-thumb").forEach((thumb, index) => { gsap.fromTo(thumb, { opacity: 0, scale: 0.9, rotateY: -15 }, { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, delay: 0.3 + index * 0.1, ease: "back.out(1.3)", scrollTrigger: { trigger: screenshotsCardRef.current, start: "top 70%", toggleActions: "play none none reverse" } }); });
      gsap.utils.toArray(".tech-highlight-card").forEach((card, index) => { gsap.fromTo(card, { opacity: 0, y: 40, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, delay: index * 0.1, ease: "back.out(1.2)", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });
      gsap.utils.toArray(".parallax-card").forEach((card, i) => { gsap.to(card, { scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 }, y: -20 * (i % 2 === 0 ? 1 : 0.8), ease: "none" }); });
      ScrollTrigger.create({ trigger: techCardRef.current, start: "top center", end: "bottom center", onEnter: () => gsap.to(techCardRef.current, { boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)", duration: 0.6 }), onLeave: () => gsap.to(techCardRef.current, { boxShadow: "none", duration: 0.6 }), onEnterBack: () => gsap.to(techCardRef.current, { boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)", duration: 0.6 }), onLeaveBack: () => gsap.to(techCardRef.current, { boxShadow: "none", duration: 0.6 }) });
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, [project]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({ x: (e.clientX - rect.left - rect.width / 2) / rect.width, y: (e.clientY - rect.top - rect.height / 2) / rect.height });
      }
    };
    const hero = heroRef.current;
    if (hero) { hero.addEventListener('mousemove', handleMouseMove); return () => hero.removeEventListener('mousemove', handleMouseMove); }
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Project not found</h2>
          <Link to="/projects" className="text-indigo-400 hover:text-indigo-300 transition-colors">Return to Projects</Link>
        </div>
      </div>
    );
  }

  const summary = project.summary;

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden" ref={containerRef} style={{ perspective: "1500px" }}>
      
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox image={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
        )}
      </AnimatePresence>

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/5 to-indigo-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      {/* Top Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 shadow-lg shadow-indigo-500/50">
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        layoutId={`hero-image-${id}`}
        className="w-full h-[70vh] md:h-[85vh] relative z-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <motion.img src={project.heroImage || project.thumbnail} className="w-full h-full object-cover" alt={project.title} style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`, transition: 'transform 0.3s ease-out' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
        <motion.div className="absolute inset-0 opacity-30 pointer-events-none" animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(113, 196, 255, 0.03) 50%, transparent 100%)', backgroundSize: '100% 200%' }} />
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-lg border border-white/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-3 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 backdrop-blur-sm">{project.category}</span>
                  <span className="text-xs font-mono text-gray-200">{project.year}</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-400/50 to-transparent" />
                </div>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{project.title}</h1>
                {project.subtitle && <p className="text-lg md:text-xl text-gray-200 font-light max-w-3xl">{project.subtitle}</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-12 relative z-10">
        
        {/* Back Button + Action Buttons Row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-all duration-300 hover:gap-3"
          >
            <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-indigo-400/50 group-hover:bg-indigo-400/10 transition-all duration-300">
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
            <span className="font-mono text-sm">Back to Projects</span>
          </Link>

          {/* Divider */}
          {(project.githubLink || project.prototypeLink) && (
            <div className="w-[1px] h-5 bg-white/20 mx-1" />
          )}

          {/* GitHub Button */}
          {project.githubLink && (
            <button
              onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-xs font-mono"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </button>
          )}

          {/* Preview Button */}
          {project.prototypeLink && (
            <button
              onClick={() => window.open(project.prototypeLink, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-xs font-mono"
            >
              <AirPlayIcon />
              <span>Preview</span>
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="space-y-6">
          
          {/* Row 1: Overview + Screenshots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Project Overview Card */}
            <div ref={overviewCardRef} className="relative group parallax-card" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-indigo-400/40 hover:bg-black/50 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-indigo-400 to-transparent group-hover:w-12 transition-all duration-500" />
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">Overview</span>
                  </div>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed group-hover:text-gray-100 transition-colors duration-300">{summary.tagline}</p>
                </div>
                {summary.architecture && (
                  <div className="mb-6 pb-6 border-b border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={16} className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">Architecture</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{summary.architecture}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} className="text-indigo-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {summary.keyTechnologies.map((tech, index) => (
                      <span key={index} className="tech-pill px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200 text-xs font-mono hover:border-indigo-400/50 hover:bg-indigo-400/10 hover:text-indigo-300 hover:scale-110 transition-all duration-300 cursor-default">{tech}</span>
                    ))}
                  </div>
                </div>
                {summary.metrics && summary.metrics.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={16} className="text-indigo-400" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">Key Metrics</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {summary.metrics.slice(0, 3).map((metric, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                          <span className="text-gray-300 font-mono">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Screenshots Grid */}
            {summary.showcaseImages && summary.showcaseImages.length > 0 && (
              <div ref={screenshotsCardRef} className="relative group parallax-card" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-purple-400/40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-[2px] bg-gradient-to-r from-indigo-400 to-transparent" />
                      <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Screenshots</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-[calc(100%-3rem)]">
                    {summary.showcaseImages.slice(0, 4).map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }} className="screenshot-thumb relative group/img cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-indigo-400/30 transition-all duration-300 hover:scale-105" style={{ transformStyle: "preserve-3d" }} onClick={() => setLightboxImage({ src: item.image, alt: item.title })}>
                        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-all duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <div className="w-full">
                            <p className="text-white text-xs font-semibold line-clamp-2 mb-1">{item.title}</p>
                            <div className="flex items-center gap-1 text-indigo-400">
                              <ZoomIn size={12} />
                              <span className="text-[10px] font-mono">Expand</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <span className="text-[10px] font-mono text-indigo-400 font-bold">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Technical Highlights */}
          <div ref={techCardRef} className="relative group parallax-card rounded-2xl" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-indigo-400/30">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={18} className="text-indigo-400" />
                <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Technical Implementation</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary.technicalHighlights.map((highlight, index) => (
                  <div key={index} className="tech-highlight-card relative group/card p-5 rounded-xl bg-gradient-to-br from-black/30 to-black/50 border border-white/10 hover:border-indigo-400/30 hover:bg-black/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 border-2 border-gray-900 flex items-center justify-center shadow-lg group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
                      <span className="text-white font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 mt-2 text-sm group-hover/card:text-indigo-300 transition-colors duration-300">{highlight.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300">{highlight.description}</p>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-indigo-400/20 group-hover/card:border-indigo-400/60 group-hover/card:w-8 group-hover/card:h-8 transition-all duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-white font-semibold mb-1">Ready for the deep dive?</p>
                <p className="text-gray-300 text-xs font-mono">Complete documentation with problem statement, design goals, and results</p>
              </div>
              <Link to={`/project/${project.id}`} className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/60 hover:shadow-xl hover:scale-110 active:scale-95 whitespace-nowrap overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </div>
                <span className="relative font-mono text-sm uppercase tracking-wider">View Full Details</span>
                <ChevronRight size={18} className="relative group-hover/btn:translate-x-1 transition-transform duration-300" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 rounded-xl opacity-0 group-hover/btn:opacity-50 blur transition-opacity duration-500 -z-10" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}