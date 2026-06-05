// src/pages/ProjectSummary.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { ExternalLink, Code2, Layers, Zap, ChevronRight, ZoomIn } from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";
import { GitHubIcon, AirPlayIcon, ImageLightbox, BackgroundOrbs, ProgressBar, ProjectBackButton, ProjectHero } from "../components/project/ProjectCommon";
import { useHeroParallax } from "../lib/useHeroParallax";
import { animateCardReveal, setupGlowOnScroll } from "../lib/gsapHelpers";



function OverviewCard({ overviewCardRef, summary }) {
  return (
    <div ref={overviewCardRef} className="relative group parallax-card" style={{ transformStyle: "preserve-3d" }}>
      {/* Glow removed for solid aesthetic */}
      <div className="relative h-full p-8 rounded-2xl bg-[var(--panel-bg,#0e0f14)] border border-[var(--border-color,#161722)] transition-all duration-500 hover:border-accent/40 hover:bg-[var(--sidebar-bg,#0f1015)] hover:shadow-2xl hover:shadow-accent/10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-transparent group-hover:w-12 transition-all duration-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent group-hover:text-accent-hover transition-colors duration-300">Overview</span>
          </div>
          <p className="text-lg md:text-xl font-light leading-relaxed mb-6" style={{ color: 'var(--text-main)' }}>{summary.tagline}</p>
          
          {summary.projectMeta && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 group-hover:bg-white/[0.04] transition-colors duration-300">
              {summary.projectMeta.problem && (
                <div className="md:col-span-2">
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Problem</p>
                  <p className="text-sm text-gray-300 leading-snug">{summary.projectMeta.problem}</p>
                </div>
              )}
              {summary.projectMeta.role && (
                <div>
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">My Role</p>
                  <p className="text-sm text-white font-medium leading-snug">{summary.projectMeta.role}</p>
                </div>
              )}
              {summary.projectMeta.result && (
                <div>
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">The Result</p>
                  <p className="text-sm text-gray-300 leading-snug">{summary.projectMeta.result}</p>
                </div>
              )}
              {summary.projectMeta.status && !summary.projectMeta.result && (
                <div>
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">Result / Status</p>
                  <p className="text-sm text-gray-200">{summary.projectMeta.status}</p>
                </div>
              )}
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
  );
}

function ScreenshotsGrid({ screenshotsCardRef, showcaseImages, setLightboxImage }) {
  if (!showcaseImages || showcaseImages.length === 0) return null;
  return (
    <div ref={screenshotsCardRef} className="relative group parallax-card" style={{ transformStyle: "preserve-3d" }}>
      {/* Glow removed for solid aesthetic */}
      <div className="relative h-full p-8 rounded-2xl bg-[var(--panel-bg,#0e0f14)] border border-[var(--border-color,#161722)] transition-all duration-500 hover:border-purple-400/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-transparent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent">Screenshots</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 h-[calc(100%-3rem)]">
          {showcaseImages.slice(0, 4).map((item, index) => (
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
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[var(--sidebar-bg,#0f1015)] border border-[var(--border-color,#161722)] flex items-center justify-center">
                <span className="text-[10px] font-mono text-accent font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnicalImplementation({ techCardRef, technicalHighlights }) {
  if (!technicalHighlights || technicalHighlights.length === 0) return null;
  return (
    <div ref={techCardRef} className="relative group parallax-card rounded-2xl" style={{ transformStyle: "preserve-3d" }}>
      {/* Glow removed for solid aesthetic */}
      <div className="relative p-8 rounded-2xl bg-[var(--panel-bg,#0e0f14)] border border-[var(--border-color,#161722)] transition-all duration-500 hover:border-accent/30">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={18} className="text-accent" />
          <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--text-main)' }}>Technical Implementation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicalHighlights.map((highlight, index) => (
            <div key={index} className="tech-highlight-card relative group/card p-5 rounded-xl bg-[var(--sidebar-bg,#0f1015)] border border-[var(--border-color,#161722)] hover:border-accent/40 hover:bg-[var(--active-tab-bg,#0b0c10)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-hover border-2 border-gray-900 flex items-center justify-center shadow-lg group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
                <span className="keep-white font-mono text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-semibold mb-2 mt-2 text-sm group-hover/card:text-accent-hover transition-colors duration-300" style={{ color: 'var(--text-main)' }}>{highlight.title}</h3>
              <p className="text-xs leading-relaxed group-hover/card:opacity-90 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{highlight.description}</p>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/20 group-hover/card:border-accent/60 group-hover/card:w-8 group-hover/card:h-8 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaFooter({ projectId }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="relative group">
      {/* Glow removed for solid aesthetic */}
      <div className="relative p-6 rounded-2xl bg-[var(--panel-bg,#0e0f14)] border border-[var(--border-color,#161722)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Ready for the deep dive?</p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Complete documentation with problem statement, design goals, and results</p>
        </div>
        <Link to={`/project/${projectId}`} className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent hover:to-accent text-white font-semibold transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/60 hover:shadow-xl hover:scale-110 active:scale-95 whitespace-nowrap overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          </div>
          <span className="relative font-mono text-sm uppercase tracking-wider">View Full Details</span>
          <ChevronRight size={18} className="relative group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

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
      gsap.fromTo(overviewCardRef.current.querySelector(".tech-pill"), { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)", scrollTrigger: { trigger: overviewCardRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      gsap.fromTo(screenshotsCardRef.current.querySelector(".screenshot-thumb"), { opacity: 0, scale: 0.9, rotateY: -15 }, { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.3)", scrollTrigger: { trigger: screenshotsCardRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      animateCardReveal(gsap, ".tech-highlight-card");
      gsap.utils.toArray(".parallax-card").forEach((card, i) => { gsap.to(card, { scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 }, y: -20 * (i % 2 === 0 ? 1 : 0.8), ease: "none" }); });
      setupGlowOnScroll(ScrollTrigger, gsap, techCardRef);
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, [project]);

  useHeroParallax(heroRef, heroImageRef);

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
      <ProjectHero
        heroRef={heroRef}
        heroImageRef={heroImageRef}
        id={id}
        project={project}
      />

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color,#161722)] bg-[var(--sidebar-bg,#0f1015)] text-gray-300 hover:text-white hover:bg-[var(--active-tab-bg,#0b0c10)] transition-all duration-300 text-xs font-mono"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </button>
          )}

          {/* Preview Button */}
          {project.prototypeLink && (
            <button
              onClick={() => window.open(project.prototypeLink, '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color,#161722)] bg-[var(--sidebar-bg,#0f1015)] text-gray-300 hover:text-white hover:bg-[var(--active-tab-bg,#0b0c10)] transition-all duration-300 text-xs font-mono"
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
            <OverviewCard overviewCardRef={overviewCardRef} summary={summary} />
            <ScreenshotsGrid screenshotsCardRef={screenshotsCardRef} showcaseImages={summary.showcaseImages} setLightboxImage={setLightboxImage} />
          </div>

          {/* Row 2: Technical Highlights */}
          <TechnicalImplementation techCardRef={techCardRef} technicalHighlights={summary.technicalHighlights} />

          {/* CTA Footer */}
          <CtaFooter projectId={project.id} />

        </motion.div>
      </div>
    </div>
  );
}
