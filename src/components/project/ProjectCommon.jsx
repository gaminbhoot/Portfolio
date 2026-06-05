import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

export const GitHubIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

export const AirPlayIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
    <polygon points="12 15 17 21 7 21 12 15"/>
  </svg>
);

export function ImageLightbox({ image, alt, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const corners = ['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group">
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt={alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        {corners.map((c, i) => <div key={i} className={`absolute ${c} w-16 h-16 border-accent/60`} />)}
      </motion.div>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-mono text-gray-300 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        Click anywhere or press ESC to close
      </p>
    </motion.div>
  );
}

export function BackgroundOrbs() {
  return null;
}

export function ProgressBar({ scaleX }) {
  return (
    <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 shadow-lg shadow-accent/50">
      <div className="w-full h-full bg-gradient-to-r from-accent via-accent to-purple-500" />
    </motion.div>
  );
}

export function ProjectBackButton({ className = 'mb-6' }) {
  return (
    <Link to="/projects" className={`group inline-flex items-center gap-2 text-gray-200 hover:text-accent transition-all duration-300 hover:gap-3 ${className}`}>
      <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
      </div>
      <span className="font-mono text-sm">Back to Projects</span>
    </Link>
  );
}

export function ProjectHero({ heroRef, heroImageRef, id, project, opacity }) {
  return (
    <motion.div
      ref={heroRef}
      layoutId={`hero-image-${id}`}
      className="w-full h-[70vh] md:h-[85vh] relative z-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
      <motion.img ref={heroImageRef} src={project.heroImage || project.thumbnail} className="w-full h-full object-cover" alt={project.title} style={{ transform: 'translate3d(0px, 0px, 0px) scale(1.1)', transition: 'transform 0.3s ease-out', willChange: 'transform' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
      <motion.div className="absolute inset-0 opacity-30 pointer-events-none" animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(113, 196, 255, 0.03) 50%, transparent 100%)', backgroundSize: '100% 200%' }} />
      {['top-8 left-8 border-t-2 border-l-2', 'top-8 right-8 border-t-2 border-r-2', 'bottom-8 left-8 border-b-2 border-l-2', 'bottom-8 right-8 border-b-2 border-r-2'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-20 h-20 border-accent/40 pointer-events-none`} />
      ))}
      <motion.div style={opacity ? { opacity } : undefined} className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-lg border border-white/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-accent uppercase tracking-widest px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">{project.category}</span>
                <span className="text-xs font-mono text-gray-200">{project.year}</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{project.title}</h1>
              {project.subtitle && <p className="text-lg md:text-xl text-gray-200 font-light max-w-3xl">{project.subtitle}</p>}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
