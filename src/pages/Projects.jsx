import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Projects = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { 
          opacity: 0, 
          y: -60,
          rotateX: -30,
          filter: "blur(10px)" 
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          filter: "blur(0px)", 
          duration: 1.2, 
          ease: "power4.out" 
        }
      );

      // Content reveal
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1
          ref={headerRef}
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ 
            fontFamily: "'Orbitron', sans-serif",
            transformStyle: "preserve-3d"
          }}
        >
          Projects
        </h1>

        <p className="project-reveal mt-3 text-gray-200 max-w-3xl">
          A collection of projects I've built — from web applications to AI experiments.
        </p>

        {/* Divider */}
        <div className="project-reveal mt-6 h-px w-full bg-white/10" />
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="project-reveal rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 hover:border-indigo-400/50 hover:scale-105 transition-all duration-500 group">
            <h3 className="text-xl font-black uppercase mb-3 group-hover:text-indigo-400 transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Coming Soon
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Projects section under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;