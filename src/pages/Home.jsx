import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalHero() {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Terminal entrance with depth
      tl.fromTo(
        terminalRef.current,
        {
          opacity: 0,
          scale: 0.95,
          rotateX: -15,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Header dots cascade
      tl.fromTo(
        ".terminal-dot",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

      // Boot command with typewriter feel
      tl.fromTo(
        ".boot-line",
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

      // System logs appear sequentially
      tl.fromTo(
        ".system-log",
        {
          opacity: 0,
          x: -20,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Command line with glitch
      tl.fromTo(
        ".command-line",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
        }
      ).to(".command-line", {
        x: "+=2",
        duration: 0.05,
        repeat: 2,
        yoyo: true,
        ease: "none",
      });

      // Hero title - words slide up individually
      tl.fromTo(
        ".hero-word",
        {
          opacity: 0,
          y: 30,
          rotateX: -20,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

      // Status cards slide and fade
      tl.fromTo(
        ".status-card",
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Cursor blink
      gsap.to(".cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "power1.inOut",
      });

      // Soft periodic fade on system logs - breathing effect
      gsap.to(".system-log", {
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 3,
        stagger: {
          each: 0.8,
          repeat: -1,
        },
        ease: "sine.inOut",
      });

      // Boot line gentle pulse
      gsap.to(".boot-line", {
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      // Command line soft breathing
      gsap.to(".command-line", {
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
      });

      // Status cards subtle pulse - staggered
      gsap.to(".status-card", {
        opacity: 0.85,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        stagger: {
          each: 0.6,
          repeat: -1,
        },
        ease: "sine.inOut",
      });

      // Hero title very subtle breathing
      gsap.to(".hero-title", {
        opacity: 0.92,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });

      // SCROLL-BASED ANIMATIONS
      
      // Pin terminal while applying scale and rotation effects
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top top",
        end: "+=500",
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamic scale and rotation based on scroll progress
          gsap.to(terminalRef.current, {
            scale: 1 - progress * 0.08,
            rotateX: progress * 8,
            y: progress * -20,
            duration: 0,
          });
        },
      });

      // Parallax effect on hero title - minimal fade
      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
        scale: 0.98,
        opacity: 0.95,
        ease: "none",
      });

      // Status cards shift subtly on scroll - highly visible
      gsap.utils.toArray(".status-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "bottom top",
            scrub: 1,
          },
          x: (i % 2 === 0 ? -20 : 20),
          y: i * 8,
          opacity: 0.85,
          scale: 0.97,
          rotation: (i % 2 === 0 ? -2 : 2),
          ease: "none",
        });
      });

      // Terminal border glow intensifies on scroll with pulsing
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 80px rgba(99, 102, 241, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)",
            duration: 0.5,
          });
        },
        onLeave: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 80px rgba(99, 102, 241, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)",
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
          });
        },
      });

      // System logs drift subtly - stay readable
      gsap.to(".system-log", {
        scrollTrigger: {
          trigger: ".system-log",
          start: "top 30%",
          end: "bottom top",
          scrub: 0.5,
        },
        opacity: 0.9,
        x: -8,
        ease: "none",
      });

      // Boot line shifts on scroll - highly visible
      gsap.to(".boot-line", {
        scrollTrigger: {
          trigger: ".boot-line",
          start: "top 40%",
          end: "bottom top",
          scrub: 1,
        },
        x: -15,
        opacity: 0.85,
        ease: "none",
      });

      // Command line glitches out on scroll - clearly readable
      gsap.to(".command-line", {
        scrollTrigger: {
          trigger: ".command-line",
          start: "top 50%",
          end: "bottom top",
          scrub: 1,
        },
        x: 8,
        opacity: 0.85,
        ease: "none",
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-[70vh] flex items-center px-6"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div
          ref={terminalRef}
          className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* TERMINAL HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex gap-2">
              <span className="terminal-dot h-3 w-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50" />
              <span className="terminal-dot h-3 w-3 rounded-full bg-yellow-400/70 hover:bg-yellow-400 transition-colors duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/50" />
              <span className="terminal-dot h-3 w-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-white/50 hover:text-white/80 transition-colors duration-300">
              portfolio.boot
            </span>
          </div>

          {/* TERMINAL BODY */}
          <div className="px-6 py-8 font-mono text-sm md:text-base space-y-4">
            <div className="boot-line text-indigo-400">jay@system:~$ boot</div>

            <div className="text-white/60 text-xs space-y-1">
              <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
                [ OK ] core modules loaded
              </p>
              <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
                [ OK ] animation engine ready
              </p>
              <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
                [ OK ] interface initialized
              </p>
            </div>

            <div className="command-line pt-4">
              <span className="text-indigo-400">jay@system:~$</span>{" "}
              <span className="text-white">
                Yes, this is a portfolio. No, it's not finished
              </span>
              <span className="cursor text-indigo-400">▋</span>
            </div>

            {/* HERO STATEMENT */}
            <h1
              className="hero-title text-3xl md:text-5xl font-black tracking-tight uppercase pt-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">
                Engineering
              </span>{" "}
              <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">
                Interfaces
              </span>
              <br />
              <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">
                That
              </span>{" "}
              <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">
                Actually
              </span>{" "}
              <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">
                Work
              </span>
            </h1>

            {/* STATUS BAR */}
            <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20">
                <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  LOCAL TIME
                </p>
                <p className="text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 font-semibold">
                  {time}
                </p>
              </div>
              <div className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20">
                <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  STATUS
                </p>
                <p className="text-green-400 group-hover:text-green-300 transition-colors duration-300 font-semibold flex items-center gap-2">
                  AVAILABLE
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse" />
                </p>
              </div>
              <div className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20">
                <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  FOCUS
                </p>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-semibold">
                  Web · Motion · AI
                </p>
              </div>
              <div className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20">
                <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  MODE
                </p>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-semibold">
                  BUILD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add spacing below for scroll effect demo */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}