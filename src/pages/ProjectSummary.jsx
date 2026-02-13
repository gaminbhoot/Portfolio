// src/pages/ProjectSummary.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowLeft, ExternalLink, Code2, Layers, Zap, ChevronRight, X, ZoomIn } from "lucide-react";

// Lightbox Component
function ImageLightbox({ image, alt, onClose }) {
  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Close lightbox"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-indigo-400/60" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-400/60" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-indigo-400/60" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-indigo-400/60" />
      </motion.div>

      {/* Hint text */}
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

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Project not found
          </h2>
          <Link to="/projects" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const summary = project.summary;

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            image={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/5 to-indigo-500/5 blur-[100px] animate-pulse" 
          style={{ animationDuration: '6s' }} 
        />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-[100px] animate-pulse" 
          style={{ animationDuration: '8s', animationDelay: '1s' }} 
        />
      </div>

      {/* Top Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 shadow-lg shadow-indigo-500/50"
      >
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500" />
      </motion.div>

      {/* Hero Section - Matching ProjectDetail for smooth transition */}
      <motion.div 
        ref={heroRef}
        layoutId={`hero-image-${id}`}
        className="w-full h-[70vh] md:h-[85vh] relative z-0 overflow-hidden cursor-pointer group"
        onClick={() => setLightboxImage({ 
          src: project.heroImage || project.thumbnail, 
          alt: project.title 
        })}
      >
        {/* Zoom indicator */}
        <div className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
            <ZoomIn size={16} className="text-white" />
            <span className="text-xs font-mono text-white">Click to expand</span>
          </div>
        </div>

        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Parallax image */}
        <motion.img 
          src={project.heroImage || project.thumbnail} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt={project.title}
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
        
        {/* Scan lines effect */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(113, 196, 255, 0.03) 50%, transparent 100%)',
            backgroundSize: '100% 200%'
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-indigo-400/40 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-indigo-400/40 pointer-events-none" />
        
        {/* Title Overlay with glass effect - matching ProjectDetail */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              {/* Glass card behind title */}
              <div className="absolute -inset-6 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-xl rounded-2xl border border-white/10" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-3 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-gray-200">
                    {project.year}
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-400/50 to-transparent" />
                </div>
                
                <h1 
                  className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4"
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {project.title}
                </h1>
                
                {project.subtitle && (
                  <p className="text-lg md:text-xl text-gray-200 font-light max-w-3xl">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 relative z-10">
        
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="group inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 mb-8 transition-all duration-300"
        >
          <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-indigo-400/50 group-hover:bg-indigo-400/10 transition-all duration-300">
            <ArrowLeft size={16} />
          </div>
          <span className="font-mono text-sm">Back to Projects</span>
        </Link>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            {summary.tagline}
          </p>
        </motion.div>

        {/* Architecture Overview */}
        {summary.architecture && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl" />
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={18} className="text-indigo-400" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400">
                  System Architecture
                </h3>
              </div>
              <p className="text-gray-200 font-mono text-sm leading-relaxed">
                {summary.architecture}
              </p>
            </div>
          </motion.div>
        )}

        {/* Key Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 size={20} className="text-indigo-400" />
            <h2 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Key Technologies
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summary.keyTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                <div className="relative flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-indigo-400/30 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm font-mono">{tech}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap size={20} className="text-indigo-400" />
            <h2 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Technical Implementation
            </h2>
          </div>
          
          <div className="space-y-6">
            {summary.technicalHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-indigo-400/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-400/10 border border-indigo-400/30 flex items-center justify-center">
                      <span className="text-indigo-400 font-mono text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        {summary.metrics && summary.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Performance Metrics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summary.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  <div className="relative p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-indigo-400/30 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-gray-200 font-mono text-sm">{metric}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Screenshots Gallery */}
        {summary.showcaseImages && summary.showcaseImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Project Screenshots
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summary.showcaseImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                  className="relative group cursor-pointer"
                  onClick={() => setLightboxImage({ 
                    src: item.image, 
                    alt: item.title 
                  })}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm aspect-video">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Zoom overlay indicator */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30">
                          <ZoomIn size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Title overlay on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <div className="h-[2px] w-12 bg-indigo-400 rounded-full" />
                    </div>
                    
                    {/* Grain texture overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                      }}
                    />
                    
                    {/* Corner accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-12 group-hover:h-12 pointer-events-none" />
                    
                    {/* Image number badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <span className="text-xs font-mono text-indigo-400 font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="text-center text-gray-400 text-sm font-mono mt-6"
            >
              {summary.showcaseImages.length} selected screenshots from implementation
            </motion.p>
          </motion.div>
        )}

        {/* View Full Project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="text-center">
            <p className="text-gray-300 mb-6 text-sm font-mono">
              Want to see the complete project documentation?
            </p>
            
            <Link 
              to={`/project/${project.id}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              <span className="font-mono uppercase tracking-wider">View Full Project Details</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <p className="text-gray-400 mt-4 text-xs font-mono">
              Includes: Problem Statement • Design Goals • Full Architecture • Results • Future Scope
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}