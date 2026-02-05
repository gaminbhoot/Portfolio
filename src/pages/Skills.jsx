import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "../components/Terminal";
import ScrollArea from "../components/ScrollArea";
import ScrollList from "../components/ScrollList";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load sequence
      const tl = gsap.timeline();

      // Header enters with 3D rotation
      tl.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: -50,
          rotateX: -45,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Description slides in from left
      tl.fromTo(
        ".desc-reveal",
        {
          opacity: 0,
          x: -40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Divider expands
      tl.fromTo(
        ".divider-reveal",
        {
          scaleX: 0,
          transformOrigin: "left",
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

      // Terminal reveals with scale and rotation
      tl.fromTo(
        terminalRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotateX: 15,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.3)",
        },
        "-=0.3"
      );

      // Simple, natural fade-in for perspective cards
      gsap.utils.toArray(".perspective-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Terminal floats and tilts on scroll
      gsap.to(terminalRef.current, {
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
        rotateX: -5,
        scale: 0.98,
        ease: "none",
      });

      // Cards parallax individually
      gsap.utils.toArray(".perspective-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -30 * (i % 2 === 0 ? 1 : 0.7),
          ease: "none",
        });
      });

      // Terminal border glow on scroll
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
            duration: 0.6,
          });
        },
        onLeave: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "none",
            duration: 0.6,
          });
        },
        onEnterBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
            duration: 0.6,
          });
        },
        onLeaveBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "none",
            duration: 0.6,
          });
        },
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Node.js",
    "Python",
    "Computer Vision",
    "YOLOv8",
    "Neural Networks",
    "Machine Learning",
    "Git & GitHub",
  ];

  return (
    <div
      ref={containerRef}
      className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Page Header */}
      <div 
        ref={headerRef}
        className="max-w-5xl mx-auto mb-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Skills
        </h1>

        <p className="desc-reveal mt-3 text-gray-200 max-w-3xl">
          A curated stack of tools, technologies, and systems I've actually built
          with — not just listed.
        </p>

        {/* Thin divider with expand animation */}
        <div className="divider-reveal mt-6 h-px w-full bg-white/10" />
      </div>

      {/* Terminal Section */}
      <div 
        ref={terminalRef}
        className="max-w-4xl mx-auto w-full rounded-3xl overflow-hidden" // Added width and radius
        style={{ transformStyle: "preserve-3d" }}
      >
        <Terminal title="skills.sh" subtitle=" ">
          <ScrollArea maxHeight={600} theme="none" smooth className="pr-2">
            <ScrollList
              data={skills}
              itemHeight={88}
              renderItem={(skill, index) => (
                <div
                  className="
                    skill-item
                    h-full w-full flex items-center
                    border border-white/10
                    bg-white/5 backdrop-blur-md
                    px-6
                    transition-all duration-300
                    hover:bg-white/10
                    hover:border-indigo-400/40
                    hover:scale-105
                    hover:shadow-lg hover:shadow-indigo-500/20
                  "
                  style={{
                    borderRadius: 50,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="text-sm font-mono text-indigo-400 mr-4 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-wide transition-all duration-300">
                    {skill}
                  </span>
                </div>
              )}
            />
          </ScrollArea>
        </Terminal>
      </div>

      {/* Skills Perspective Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ perspective: "1500px" }}
        >

          {/* Card 1 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-indigo-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-indigo-300 transition-colors duration-300">
              Frontend Engineering
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              I focus on building interfaces that feel intentional — not just visually,
              but structurally. Clean component boundaries, predictable state flow, and
              motion that supports understanding rather than distracting from it.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-700" />
          </div>

          {/* Card 2 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-purple-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-purple-300 transition-colors duration-300">
              Motion & Interaction
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              Animation, for me, is a communication tool. Subtle transitions, scroll-based
              focus, and timing choices help guide attention and make complex interfaces
              feel natural and responsive.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700" />
          </div>

          {/* Card 3 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-cyan-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              Applied AI & Logic
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              My AI-related work leans toward practical application — understanding how
              models behave, where they fail, and how to integrate them into systems that
              solve real problems rather than demo-only scenarios.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700" />
          </div>

          {/* Card 4 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-green-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-green-300 transition-colors duration-300">
              Engineering Mindset
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              I value clarity over cleverness. Whether it's frontend code or model logic,
              I try to build things that are understandable, maintainable, and resilient
              to change over time.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-700" />
          </div>

        </div>
      </div>

    </div>
  );
}