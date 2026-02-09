// src/pages/ProjectDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowLeft, ChevronRight, Eye, X, ZoomIn } from "lucide-react";

function renderFormattedContent(text) {
  if (!text || typeof text !== "string") {
    return null;
  }

  // Match numbered items like "(1) something"
  const itemRegex = /\(\d+\)\s*([^()]+)/g;

  const items = [];
  let match;

  while ((match = itemRegex.exec(text)) !== null) {
    items.push(match[1].trim().replace(/,$/, ""));
  }

  // ❗ GUARD: no numbered list found
  if (items.length === 0) {
    return <p>{text}</p>;
  }

  // Intro = text before first (1)
  const intro = text.split(/\(1\)/)[0].trim();

  // Conclusion = text after the last list item
  const lastItemText = items[items.length - 1];
  const conclusionIndex =
    text.lastIndexOf(lastItemText) + lastItemText.length;

  const conclusion = text.slice(conclusionIndex).trim();

  return (
    <div className="space-y-6">
      {intro && <p>{intro}</p>}

      <ul className="space-y-3 pl-6 border-l border-indigo-400/30">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-indigo-400 font-mono">
              {i + 1}.
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {conclusion && <p>{conclusion}</p>}
    </div>
  );
}

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

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [activeSection, setActiveSection] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightboxImage, setLightboxImage] = useState(null);
  const heroRef = useRef(null);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle Scroll Spy (Active Link Highlight)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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

  // Get next project
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

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

      {/* Top Progress Bar with gradient */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 shadow-lg shadow-indigo-500/50"
      >
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500" />
      </motion.div>

      {/* Hero Section with Parallax */}
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
        
        {/* Title Overlay with glass effect */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT: Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-24">
            <Link 
              to="/projects" 
              className="group inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 mb-12 transition-all duration-300"
            >
              <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-indigo-400/50 group-hover:bg-indigo-400/10 transition-all duration-300">
                <ArrowLeft size={16} />
              </div>
              <span className="font-mono text-sm">Back to Projects</span>
            </Link>

            {/* Navigation menu with glass effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl border border-white/10" />
              <div className="relative p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Eye size={14} className="text-indigo-400" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Contents
                  </h4>
                </div>
                
                <div className="space-y-1">
                  {project.sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`group block py-2 px-3 rounded-lg transition-all duration-300 ${
                        activeSection === section.id 
                          ? "bg-indigo-400/10 text-indigo-400 font-semibold" 
                          : "text-gray-300 hover:text-gray-100 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm flex-1">
                          {section.title}
                        </span>
                        <ChevronRight 
                          size={14} 
                          className={`transition-transform duration-300 ${
                            activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Scrollable Content */}
          <main className="lg:col-span-9 space-y-24 md:space-y-32">
            
            {/* Mobile Back Button */}
            <Link 
              to="/projects" 
              className="lg:hidden inline-flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="font-mono text-sm">Back</span>
            </Link>

            {project.sections.map((section, index) => (
              <motion.section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-400 to-transparent rounded-full" />
                  <h2 
                    className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {section.title}
                  </h2>
                </div>

                {/* Content with enhanced styling */}
                <div className="section-content text-base md:text-lg leading-relaxed text-gray-100 font-light mb-8">
                  {renderFormattedContent(section.content)}
                </div>

                {/* Image with lightbox functionality */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {section.image ? (
                    <div 
                      className="relative rounded-xl h-64 md:h-96 w-full overflow-hidden cursor-pointer"
                      onClick={() => setLightboxImage({ 
                        src: section.image, 
                        alt: section.title 
                      })}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Zoom overlay indicator */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                          <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30">
                            <ZoomIn size={32} className="text-white" />
                          </div>
                        </div>
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
                      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 h-64 md:h-96 w-full overflow-hidden flex items-center justify-center">
                      <p className="text-sm font-mono text-gray-400">
                        [ Project Image: {section.title} ]
                      </p>
                      
                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
                    </div>
                  )}
                </div>
              </motion.section>
            ))}

            {/* Next Project Teaser */}
            {nextProject && (
              <motion.div 
                className="pt-16 md:pt-24 mt-16 md:mt-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent mb-12" />
                
                <h3 className="text-xs font-mono text-gray-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <ChevronRight size={14} />
                  Next Project
                </h3>
                
                <Link to={`/project/${nextProject.id}`} className="group block">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <h4 
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 transition-all duration-300 group-hover:tracking-wide"
                        style={{ 
                          fontFamily: "'Orbitron', sans-serif",
                          background: 'linear-gradient(135deg, #ffffff 0%, #71C4FF 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {nextProject.title}
                      </h4>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest px-2 py-1 rounded border border-indigo-400/30 bg-indigo-400/5">
                          {nextProject.category}
                        </span>
                        <span className="text-xs font-mono text-gray-300">
                          {nextProject.year}
                        </span>
                        <div className="flex-1 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-transparent transition-all duration-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}