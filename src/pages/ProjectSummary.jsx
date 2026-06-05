// src/pages/ProjectSummary.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { ExternalLink, Code2, Layers, Zap, ChevronRight, ZoomIn } from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";
import { GitHubIcon, AirPlayIcon, ImageLightbox, BackgroundOrbs, ProgressBar, ProjectBackButton } from "../components/project/ProjectCommon";



export default function ProjectSummary() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  usePageMeta({
    title: project
      ? `${project.title} | Project Summary | Jay Joshi`
      : "Project Summary Not Found | Jay Joshi",
    description:
      project?.summary?.tagline ||
      "Detailed project summary for Jay Joshi's engineering portfolio.",
    path: `/project-summary/${id || ""}`,
    image: project?.heroImage || project?.thumbnail || "/jay1.webp",
    noindex: !project,
  });

  const [lightboxImage, setLightboxImage] = useState(null);
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
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
      ScrollTrigger.create({ trigger: techCardRef.current, start: "top center", end: "bottom center", onEnter: () => gsap.to(techCardRef.current, { boxShadow: "0 0 40px rgba(var(--accent-rgb), 0.3)", duration: 0.6 }), onLeave: () => gsap.to(techCardRef.current, { boxShadow: "none", duration: 0.6 }), onEnterBack: () => gsap.to(techCardRef.current, { boxShadow: "0 0 40px rgba(var(--accent-rgb), 0.3)", duration: 0.6 }), onLeaveBack: () => gsap.to(techCardRef.current, { boxShadow: "none", duration: 0.6 }) });
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, [project]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroImageRef.current && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        heroImageRef.current.style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0) scale(1.1)`;
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
          <Link to="/projects" className="text-accent hover:text-accent-hover transition-colors">Return to Projects</Link>
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

      <BackgroundOrbs />

      <ProgressBar scaleX={scaleX} />

      {/* Hero Section */}
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
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-accent/40 pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-accent/40 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-accent/40 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-accent/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pointer-events-none">
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
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-12 relative z-10">
        
        {/* Back Button + Action Buttons Row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <ProjectBackButton className="mb-0" />

          {/* Divider */}
          {(project.githubLink || project.prototypeLink) && (
            <div className="w-[1px] h-5 bg-white/20 mx-1" />
          )}

          {/* GitHub Button */}
          {project.githubLink && (
            <button
              onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/[0.04] hover:border-white/30 transition-all duration-300 text-xs font-mono"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </button>
          )}

          {/* Preview Button */}
          {project.prototypeLink && (
            <button
              onClick={() => window.open(project.prototypeLink, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/[0.04] hover:border-white/30 transition-all duration-300 text-xs font-mono"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-accent/40 hover:bg-black/50 hover:shadow-2xl hover:shadow-accent/10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-transparent group-hover:w-12 transition-all duration-500" />
                    <span className="text-xs font-mono uppercase tracking-widest text-accent group-hover:text-accent-hover transition-colors duration-300">Overview</span>
                  </div>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed group-hover:text-gray-100 transition-colors duration-300 mb-6">{summary.tagline}</p>
                  
                  {/* Recruiter specific fast-facts table */}
                  {summary.projectMeta && (
                    <div className="grid grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6">
                      {summary.projectMeta.role && (
                        <div>
                          <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">My Role</p>
                          <p className="text-sm text-gray-200">{summary.projectMeta.role}</p>
                        </div>
                      )}
                      {summary.projectMeta.status && (
                        <div>
                          <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">Result / Status</p>
                          <p className="text-sm text-gray-200">{summary.projectMeta.status}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!summary.projectMeta && id === "ai-motion-tracker" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 group-hover:bg-white/[0.04] transition-colors duration-300">
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Problem</p>
                        <p className="text-sm text-gray-300 leading-snug">Legacy detection relies on background subtraction with zero cross-frame identity tracking.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">My Role</p>
                        <p className="text-sm text-white font-medium leading-snug">Sole Engineer (Architecture, ML pipeline, full-stack deployment)</p>
                      </div>
                      <div className="md:col-span-2 mt-1">
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Result</p>
                        <p className="text-sm text-gray-300 leading-snug">Built a real-time YOLOv8 + Deep SORT tracking pipeline with spatial heatmap analytics streamed via Flask.</p>
                      </div>
                    </div>
                  )}

                  {!summary.projectMeta && id === "octawipe" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 group-hover:bg-white/[0.04] transition-colors duration-300">
                      <div className="md:col-span-2">
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Problem</p>
                        <p className="text-sm text-gray-300 leading-snug">E-waste processing lacks verifiable, cross-platform drive wiping with cryptographic proof of destruction.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">My Role</p>
                        <p className="text-sm text-white font-medium leading-snug">Research & Frontend Developer</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Result</p>
                        <p className="text-sm text-gray-300 leading-snug">Engineered a NIST/DoD-compliant sanitization system distributed via PXE network boot and Live USB.</p>
                      </div>
                    </div>
                  )}

                  {!summary.projectMeta && id === "sysaware-ml-optimizer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 group-hover:bg-white/[0.04] transition-colors duration-300">
                      <div className="md:col-span-2">
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Problem</p>
                        <p className="text-sm text-gray-300 leading-snug">Predicting raw memory footprints and dynamic latency bottlenecks for PyTorch models across heterogeneous hardware is highly inaccurate using static parameter estimations.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">My Role</p>
                        <p className="text-sm text-white font-medium leading-snug">Machine Learning Engineer (Optimization, Profiling, Toolkit dev)</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Result</p>
                        <p className="text-sm text-gray-300 leading-snug">Developed a dynamic quantizer and hardware profiler toolkit for fast, automated model translation to INT8/FP16 pipelines.</p>
                      </div>
                    </div>
                  )}
                </div>
                {summary.architecture && (
                  <div className="mb-6 pb-6 border-b border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={16} className="text-accent group-hover:text-accent-hover transition-colors duration-300" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-accent group-hover:text-accent-hover transition-colors duration-300">Architecture</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{summary.architecture}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} className="text-accent" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-accent">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {summary.keyTechnologies.map((tech, index) => (
                      <span key={index} className="tech-pill px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-gray-200 text-xs font-mono hover:border-accent/50 hover:bg-accent/10 hover:text-accent-hover hover:scale-110 transition-all duration-300 cursor-default">{tech}</span>
                    ))}
                  </div>
                </div>
                {summary.metrics && summary.metrics.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={16} className="text-accent" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-accent">Key Metrics</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {summary.metrics.slice(0, 3).map((metric, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
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
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-accent/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-purple-400/40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-transparent" />
                      <span className="text-xs font-mono uppercase tracking-widest text-accent">Screenshots</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-[calc(100%-3rem)]">
                    {summary.showcaseImages.slice(0, 4).map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }} className="screenshot-thumb relative group/img cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-105" style={{ transformStyle: "preserve-3d" }} onClick={() => setLightboxImage({ src: item.image, alt: item.title })}>
                        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-all duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <div className="w-full">
                            <p className="text-white text-xs font-semibold line-clamp-2 mb-1">{item.title}</p>
                            <div className="flex items-center gap-1 text-accent">
                              <ZoomIn size={12} />
                              <span className="text-[10px] font-mono">Expand</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <span className="text-[10px] font-mono text-accent font-bold">{String(index + 1).padStart(2, '0')}</span>
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
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:border-accent/30">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={18} className="text-accent" />
                <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>Technical Implementation</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary.technicalHighlights.map((highlight, index) => (
                  <div key={index} className="tech-highlight-card relative group/card p-5 rounded-xl bg-gradient-to-br from-black/30 to-black/50 border border-white/10 hover:border-accent/30 hover:bg-black/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-hover border-2 border-gray-900 flex items-center justify-center shadow-lg group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
                      <span className="text-white font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 mt-2 text-sm group-hover/card:text-accent-hover transition-colors duration-300">{highlight.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300">{highlight.description}</p>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/20 group-hover/card:border-accent/60 group-hover/card:w-8 group-hover/card:h-8 transition-all duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-purple-500/20 opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10 backdrop-blur-sm border border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-white font-semibold mb-1">Ready for the deep dive?</p>
                <p className="text-gray-300 text-xs font-mono">Complete documentation with problem statement, design goals, and results</p>
              </div>
              <Link to={`/project/${project.id}`} className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent hover:to-accent text-white font-semibold transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/60 hover:shadow-xl hover:scale-110 active:scale-95 whitespace-nowrap overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </div>
                <span className="relative font-mono text-sm uppercase tracking-wider">View Full Details</span>
                <ChevronRight size={18} className="relative group-hover/btn:translate-x-1 transition-transform duration-300" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-purple-400 to-accent rounded-xl opacity-0 group-hover/btn:opacity-50 blur transition-opacity duration-500 -z-10" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
