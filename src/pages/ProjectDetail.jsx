// src/pages/ProjectDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowLeft, ChevronRight, Eye, X, ZoomIn, Menu } from "lucide-react";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const AirPlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
    <polygon points="12 15 17 21 7 21 12 15"/>
  </svg>
);

function renderFormattedContent(text, isFirst = false) {
  if (!text || typeof text !== "string") return null;

  const itemRegex = /\(\d+\)\s*([^()]+)/g;
  const items = [];
  let match;
  while ((match = itemRegex.exec(text)) !== null)
    items.push(match[1].trim().replace(/,$/, ""));

  if (items.length === 0) {
    return (
      <p>
        {isFirst && (
          <span
            className="float-left text-[4.5rem] leading-[0.8] mr-3 mt-1 font-black text-indigo-400 select-none"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {text[0]}
          </span>
        )}
        {isFirst ? text.slice(1) : text}
      </p>
    );
  }

  const intro = text.split(/\(1\)/)[0].trim();
  const lastItemText = items[items.length - 1];
  const conclusion = text.slice(text.lastIndexOf(lastItemText) + lastItemText.length).trim();
  return (
    <div className="space-y-5">
      {intro && <p>{intro}</p>}
      <ul className="space-y-3 pl-6 border-l border-indigo-400/30">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-indigo-400 font-mono shrink-0">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {conclusion && <p>{conclusion}</p>}
    </div>
  );
}

function PullQuote({ text }) {
  return (
    <blockquote className="relative my-10 pl-6 border-l-2 border-indigo-400">
      <span
        className="absolute -top-5 -left-1 text-6xl text-indigo-400/25 font-black leading-none select-none"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >"</span>
      <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic">{text}</p>
    </blockquote>
  );
}

function SectionImage({ src, alt, caption, onOpen, eager }) {
  if (!src) return null;
  return (
    <div className="group relative -mx-4 md:-mx-10 mt-8">
      <div
        className="relative rounded-xl overflow-hidden h-64 md:h-[28rem] cursor-pointer"
        onClick={() => onOpen({ src, alt })}
      >
        <img
          src={src} alt={alt}
          loading={eager ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30">
              <ZoomIn size={32} className="text-white" />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}
        />
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-indigo-400/30 opacity-0 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-500 pointer-events-none" />
      </div>
      {caption && (
        <p className="mt-3 ml-6 text-xs font-mono text-gray-400 border-l border-indigo-400/30 pl-3">{caption}</p>
      )}
    </div>
  );
}

function ImageLightbox({ image, alt, onClose }) {
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
        {corners.map((c, i) => <div key={i} className={`absolute ${c} w-16 h-16 border-indigo-400/60`} />)}
      </motion.div>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-mono text-gray-300 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        Click anywhere or press ESC to close
      </p>
    </motion.div>
  );
}

// Top-right Table of Contents with added scrollability to prevent overflow
function TableOfContentsMenu({ sections, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-6 z-[60]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white shadow-xl hover:border-indigo-400/50 hover:bg-indigo-400/10 transition-all duration-300 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} className="transition-transform duration-300 group-hover:rotate-90" /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-4 w-64 md:w-60 bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-400/20 shrink-0">
              <Eye size={14} className="text-indigo-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400/80">Contents</span>
            </div>
            
            {/* Added max-h, overflow-y-auto, and custom scrollbar classes here */}
            <div className="space-y-1 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`group/nav block py-2.5 px-3 rounded transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-indigo-400/15 text-indigo-300 font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500 group-hover/nav:text-indigo-400/70 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm flex-1 leading-snug">{section.title}</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 shrink-0 ${
                        activeSection === section.id
                          ? "translate-x-0.5 opacity-100 text-indigo-400"
                          : "opacity-0 -translate-x-2 group-hover/nav:opacity-60 group-hover/nav:translate-x-0"
                      }`}
                    />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sidebar is fixed, outside the document flow entirely.
// IntersectionObserver watches a sentinel at the bottom of the hero.
// When hero exits viewport → sidebar fades in. Clean, no JS scroll math.
function FloatingSidebar({ project, hasLinks }) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Invisible sentinel pinned to the bottom of the hero */}
      <div ref={sentinelRef} className="absolute top-[85vh] left-0 w-px h-px pointer-events-none" />

      <motion.aside
        initial={false}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16, pointerEvents: visible ? 'auto' : 'none' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block lg:col-span-3 sticky self-start"
        style={{ top: 'calc(50vh - 240px)' }}
      >
        <Link to="/projects" className="group inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 mb-6 transition-all duration-300 hover:gap-3">
          <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-indigo-400/50 group-hover:bg-indigo-400/10 transition-all duration-300">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </div>
          <span className="font-mono text-sm">Back to Projects</span>
        </Link>

        {hasLinks && (
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-500/20 via-purple-500/20 to-indigo-500/20 rounded-lg blur-sm opacity-60" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-500/30 via-purple-500/30 to-indigo-500/30 rounded-lg animate-pulse" style={{ animationDuration: '3s' }} />

            <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-400/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400/80">Quick Access</span>
                </div>
                <div className="space-y-2">
                  {project.githubLink && (
                    <motion.button onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')} whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="w-full group/btn relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-center gap-2.5 px-3 py-2.5 rounded bg-white/5 border border-white/10 group-hover/btn:border-indigo-400/40 group-hover/btn:bg-white/10 transition-all duration-300">
                        <GitHubIcon /><span className="text-xs font-mono text-gray-200 group-hover/btn:text-white transition-colors">View on GitHub</span>
                        <div className="ml-auto w-1 h-1 rounded-full bg-indigo-400/0 group-hover/btn:bg-indigo-400 transition-all duration-300" />
                      </div>
                    </motion.button>
                  )}
                  {project.prototypeLink && (
                    <motion.button onClick={() => window.open(project.prototypeLink, '_blank', 'noopener,noreferrer')} whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="w-full group/btn relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-center gap-2.5 px-3 py-2.5 rounded bg-white/5 border border-white/10 group-hover/btn:border-purple-400/40 group-hover/btn:bg-white/10 transition-all duration-300">
                        <AirPlayIcon /><span className="text-xs font-mono text-gray-200 group-hover/btn:text-white transition-colors">View Prototype</span>
                        <div className="ml-auto w-1 h-1 rounded-full bg-purple-400/0 group-hover/btn:bg-purple-400 transition-all duration-300" />
                      </div>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [activeSection, setActiveSection] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightboxImage, setLightboxImage] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute("id");
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      setMousePosition({ x: (e.clientX - rect.left - rect.width / 2) / rect.width, y: (e.clientY - rect.top - rect.height / 2) / rect.height });
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Project not found</h2>
        <Link to="/projects" className="text-indigo-400 hover:text-indigo-300 transition-colors">Return to Projects</Link>
      </div>
    </div>
  );

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const hasLinks = project.githubLink || project.prototypeLink;

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">

      <AnimatePresence>
        {lightboxImage && <ImageLightbox image={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />}
      </AnimatePresence>

      <TableOfContentsMenu sections={project.sections} activeSection={activeSection} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/5 to-indigo-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 shadow-lg shadow-indigo-500/50">
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500" />
      </motion.div>

      {/* Hero */}
      <motion.div ref={heroRef} layoutId={`hero-image-${id}`} className="w-full h-[70vh] md:h-[85vh] relative z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <motion.img src={project.heroImage || project.thumbnail} className="w-full h-full object-cover" alt={project.title}
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`, transition: 'transform 0.3s ease-out' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
        <motion.div className="absolute inset-0 opacity-30 pointer-events-none"
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(113, 196, 255, 0.03) 50%, transparent 100%)', backgroundSize: '100% 200%' }} />
        {['top-8 left-8 border-t-2 border-l-2', 'top-8 right-8 border-t-2 border-r-2', 'bottom-8 left-8 border-b-2 border-l-2', 'bottom-8 right-8 border-b-2 border-r-2'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-20 h-20 border-indigo-400/40 pointer-events-none`} />
        ))}
        <motion.div style={{ opacity }} className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-lg border border-white/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-3 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 backdrop-blur-sm">{project.category}</span>
                  <span className="text-xs font-mono text-gray-200">{project.year}</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-400/50 to-transparent" />
                </div>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {project.title}
                </h1>
                {project.subtitle && <p className="text-lg md:text-xl text-gray-200 font-light max-w-3xl">{project.subtitle}</p>}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content grid — items-start is critical, lets sticky work inside a grid column */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <FloatingSidebar project={project} hasLinks={hasLinks} />

          <main className="lg:col-span-9">

          <Link to="/projects" className="lg:hidden group inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 mb-12 transition-all duration-300 hover:gap-3">
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-mono text-sm">Back</span>
          </Link>

          <div className="space-y-20 md:space-y-28 max-w-[65ch]">
            {project.sections.map((section, index) => {
              const isImageFirst = section.layout === "image-first";
              const isTextOnly = section.layout === "text-only";
              return (
                <motion.section key={section.id} id={section.id} className="scroll-mt-24"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-8 bg-indigo-400 rounded-full" />
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {section.title}
                  </h2>

                  {isImageFirst && (
                    <SectionImage src={section.image} alt={section.title} caption={section.caption} onOpen={setLightboxImage} eager={index === 0} />
                  )}

                  <div className={`text-base md:text-[1.05rem] leading-[1.9] text-gray-200/85 font-light ${isImageFirst ? 'mt-8' : ''}`}>
                    {renderFormattedContent(section.content, index === 0)}
                  </div>

                  {section.pullQuote && <PullQuote text={section.pullQuote} />}

                  {!isImageFirst && !isTextOnly && (
                    <SectionImage src={section.image} alt={section.title} caption={section.caption} onOpen={setLightboxImage} eager={index === 0} />
                  )}
                </motion.section>
              );
            })}

            {nextProject && (
              <motion.div className="pt-16 md:pt-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent mb-12" />
                <h3 className="text-xs font-mono text-gray-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <ChevronRight size={14} />Next Project
                </h3>
                <Link to={`/project/${nextProject.id}`} className="group block">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 transition-all duration-300 group-hover:tracking-wide"
                        style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {nextProject.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-2 py-1 rounded border border-indigo-400/30 bg-indigo-400/5">{nextProject.category}</span>
                        <span className="text-xs font-mono text-gray-300">{nextProject.year}</span>
                        <div className="flex-1 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-transparent transition-all duration-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
          </main>
        </div>
      </div>
    </div>
  );
}