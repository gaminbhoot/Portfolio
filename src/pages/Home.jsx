import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../components/profile/ProfileCard";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalHero() {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const aboutOutputRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const age = (() => {
    const dob = new Date(2005, 5, 24); // 24 June 2005 (month is 0-indexed)
    const now = new Date();
    let a = now.getFullYear() - dob.getFullYear();
    const beforeBirthday =
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
    if (beforeBirthday) a--;
    return a;
  })();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── TERMINAL ENTRANCE ─────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        terminalRef.current,
        { opacity: 0, scale: 0.95, rotateX: -15, y: 50 },
        { opacity: 1, scale: 1, rotateX: 0, y: 0, duration: 1.2, ease: "power4.out" }
      );
      tl.fromTo(
        ".terminal-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
        "-=0.8"
      );
      tl.fromTo(
        ".boot-line",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.4"
      );
      tl.fromTo(
        ".system-log",
        { opacity: 0, x: -20, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.12 },
        "-=0.3"
      );
      tl.fromTo(".command-line", { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .to(".command-line", { x: "+=2", duration: 0.05, repeat: 2, yoyo: true, ease: "none" });
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 30, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.2)" },
        "-=0.3"
      );
      tl.fromTo(
        ".status-card",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.5"
      );

      // ── ABOUT OUTPUT – SCROLL TRIGGERED ──────────────────────────
      gsap.fromTo(".about-command",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: aboutOutputRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".about-divider",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1, duration: 0.8, ease: "power2.inOut",
          scrollTrigger: { trigger: aboutOutputRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".about-line",
        { opacity: 0, x: -16, filter: "blur(3px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.13, ease: "power2.out",
          scrollTrigger: { trigger: aboutOutputRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: aboutOutputRef.current, start: "top 72%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".after-prompt",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: ".after-prompt", start: "top 90%", toggleActions: "play none none none" },
        }
      );

      // ── AMBIENT LOOPS ─────────────────────────────────────────────
      gsap.to(".cursor",  { opacity: 0, repeat: -1, yoyo: true, duration: 0.6, ease: "power1.inOut" });
      gsap.to(".cursor-2",{ opacity: 0, repeat: -1, yoyo: true, duration: 0.6, ease: "power1.inOut" });
      gsap.to(".system-log", {
        opacity: 0.5, repeat: -1, yoyo: true, duration: 3,
        stagger: { each: 0.8, repeat: -1 }, ease: "sine.inOut",
      });
      gsap.to(".boot-line",    { opacity: 0.6, repeat: -1, yoyo: true, duration: 4,   ease: "sine.inOut" });
      gsap.to(".command-line", { opacity: 0.7, repeat: -1, yoyo: true, duration: 3.5, ease: "sine.inOut" });
      gsap.to(".status-card",  {
        opacity: 0.85, repeat: -1, yoyo: true, duration: 4.5,
        stagger: { each: 0.6, repeat: -1 }, ease: "sine.inOut",
      });
      gsap.to(".hero-title", { opacity: 0.92, repeat: -1, yoyo: true, duration: 5, ease: "sine.inOut" });

      // ── SCROLL FX ─────────────────────────────────────────────────

      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top center", end: "bottom center",
        onEnter:      () => gsap.to(terminalRef.current, { boxShadow: "0 0 80px rgba(99,102,241,0.6), 0 0 40px rgba(168,85,247,0.4)", duration: 0.5 }),
        onLeave:      () => gsap.to(terminalRef.current, { boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", duration: 0.5 }),
        onEnterBack:  () => gsap.to(terminalRef.current, { boxShadow: "0 0 80px rgba(99,102,241,0.6), 0 0 40px rgba(168,85,247,0.4)", duration: 0.5 }),
        onLeaveBack:  () => gsap.to(terminalRef.current, { boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", duration: 0.5 }),
      });
      gsap.to(".system-log", {
        scrollTrigger: { trigger: ".system-log", start: "top 30%", end: "bottom top", scrub: 0.5 },
        opacity: 0.9, x: -8, ease: "none",
      });
      gsap.to(".boot-line", {
        scrollTrigger: { trigger: ".boot-line", start: "top 40%", end: "bottom top", scrub: 1 },
        x: -15, opacity: 0.85, ease: "none",
      });
      gsap.to(".command-line", {
        scrollTrigger: { trigger: ".command-line", start: "top 50%", end: "bottom top", scrub: 1 },
        x: 8, opacity: 0.85, ease: "none",
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const hi = (s) => <span className="text-indigo-400">{s}</span>;

  return (
    <div ref={containerRef}>
      <section className="relative z-20 min-h-[70vh] flex items-start justify-center px-6 pt-16 pb-24">
        <div className="w-full max-w-5xl mx-auto">

          {/*
            The terminal wrapper uses a ::before pseudo for the frosted glass effect
            instead of backdrop-filter directly on this element.
            This means NO filter/backdrop on the element that contains the card —
            so the card's own backdrop-filter, perspective, and gradient-text
            all render through a clean compositing context.
          */}
          <div
            ref={terminalRef}
            className="terminal-shell rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ perspective: "1200px" }}
          >

            {/* ── HEADER ──────────────────────────────────────────── */}
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

            {/* ── BODY ────────────────────────────────────────────── */}
            <div className="px-6 py-8 font-mono text-sm md:text-base space-y-4">

              <div className="boot-line text-indigo-400">jay@system:~$ boot</div>

              <div className="text-white/60 text-xs space-y-1">
                <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">[ OK ] core modules loaded</p>
                <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">[ OK ] animation engine ready</p>
                <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">[ OK ] interface initialized</p>
              </div>

              <div className="command-line pt-4">
                <span className="text-indigo-400">jay@system:~$</span>{" "}
                <span className="text-white">Yes, this is a portfolio. No, it's not finished</span>
                <span className="cursor text-indigo-400">▋</span>
              </div>

              <h1
                className="hero-title text-3xl md:text-5xl font-black tracking-tight uppercase pt-6"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">Engineering</span>{" "}
                <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">Solutions</span>
                <br />
                <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">That</span>{" "}
                <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">Actually</span>{" "}
                <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">Work</span>
              </h1>

              {/* ── ABOUT COMMAND OUTPUT ─────────────────────────── */}
              <div ref={aboutOutputRef} className="pt-6 space-y-4">

                <div className="about-command">
                  <span className="text-indigo-400">jay@system:~$</span>{" "}
                  <span className="text-white">about --me</span>
                </div>

                <div className="about-divider h-px w-full bg-white/10" />

                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 pt-1">

                  {/* stdout lines */}
                  <div className="flex-1 space-y-3 text-s leading-relaxed">
                    {[
                      <span>I'm a {hi(`${age} year old`)} computer science student in {hi("Noida")}, interested in {hi("intelligent systems")} and practical problem solving.</span>,
                      <span>{hi("Theory. Structure. Execution.")} Turning ideas into working systems.</span>,
                      <span>I prefer {hi("simplicity")} over cleverness, {hi("principles")} over shortcuts.</span>,
                      <span>Moving {hi("beyond academic projects")} into production ready systems.</span>,
                    ].map((line, i) => (
                      <p key={i} className="about-line">
                        <span className="text-indigo-400/70 mr-2 select-none">›</span>
                        <span className="text-white/80">{line}</span>
                      </p>
                    ))}
                  </div>

                  <div
                    ref={cardRef}
                    className="flex-1 flex items-center justify-center lg:justify-end w-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <ProfileCard
                      name="Jay Joshi"
                      title="B.Tech CSE Student"
                      handle="gaminbhoot"
                      status="Online"
                      contactText="Contact Me"
                      avatarUrl="/jay1.webp"
                      grainUrl="/grain.webp"
                      iconUrl="/iconpattern.png"
                      showUserInfo={true}
                      enableTilt={true}
                      onContactClick={() => navigate("/contact")}
                      showBehindGlow
                      behindGlowColor="rgba(125, 190, 255, 0.4)"
                    />
                  </div>
                </div>

                <div className="after-prompt pt-1">
                  <span className="text-indigo-400">jay@system:~$</span>{" "}
                  <span className="cursor-2 text-indigo-400">▋</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-6 pt-4 border-t border-white/10">
                  {[
                    { label: "LOCAL TIME", value: time, color: "text-indigo-300" },
                    { label: "STATUS", value: "AVAILABLE", color: "text-green-400", dot: true },
                    { label: "FOCUS", value: "Web · Data Science · AI", color: "text-white/70" },
                    { label: "MODE", value: "BUILD", color: "text-white/70" },
                  ].map(({ label, value, color, dot }) => (
                    <div key={label} className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20">
                      <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">{label}</p>
                      <p className={`${color} group-hover:opacity-80 transition-colors duration-300 font-semibold flex items-center gap-2`}>
                        {value}
                        {dot && <span className="inline-block w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse" />}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inject the frosted glass via CSS so backdrop-filter never touches the element that parents the card */}
      <style>{`
        .terminal-shell {
          background: rgba(0, 0, 0, 0.45);
          position: relative;
        }
        .terminal-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 0;
          pointer-events: none;
        }
        .terminal-shell > * {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}