import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../components/profile/ProfileCard";
import { usePageMeta } from "../lib/usePageMeta";

gsap.registerPlugin(ScrollTrigger);

// ── Module-level constants — evaluated once, never cause re-renders ──────────
// (hover: none) catches phones + tablets reliably, same pattern as Projects.jsx
const IS_TOUCH_DEVICE =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

// Age is purely a function of today's date — stable for the entire session
const getAge = () => {
  const dob = new Date(2005, 5, 24);
  const now = new Date();
  let a = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) a--;
  return a;
};
const AGE = getAge();

export default function TerminalHero() {
  usePageMeta({
    title: "Jay Joshi | AI/ML Engineer & Frontend Developer",
    description:
      "AI/ML engineer and frontend developer building real-time vision systems, secure tools, and production-ready web experiences.",
    path: "/",
  });

  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const aboutOutputRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [time, setTime] = useState(
    () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // isDesktop only needed for ProfileCard tilt — use matchMedia, not innerWidth
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Clock — 60s interval is fine, no change needed
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleResumeDownload = () => {
    // Use a persistent <a> rather than creating one per click
    const link = document.createElement("a");
    link.href = "/JAY JOSHI RESUME.pdf";
    link.download = "JAY_JOSHI_RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── TERMINAL ENTRANCE ──────────────────────────────────────────
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
        ".hero-word",
        { opacity: 0, y: 30, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.2)" },
        "-=0.4"
      );
      tl.fromTo(".command-line", { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .to(".command-line", { x: "+=2", duration: 0.05, repeat: 2, yoyo: true, ease: "none" });
      tl.fromTo(
        ".role-line",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo(
        ".status-card",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.5"
      );
      tl.fromTo(
        ".resume-card",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
        "-=0.3"
      );

      // ── ABOUT OUTPUT – SCROLL TRIGGERED ───────────────────────────
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

      // ── SCROLL GLOW — skip on touch (boxShadow forces repaint) ────
      if (!IS_TOUCH_DEVICE) {
        ScrollTrigger.create({
          trigger: terminalRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to(terminalRef.current, {
            boxShadow: "0 0 80px rgba(99,102,241,0.6), 0 0 40px rgba(168,85,247,0.4)",
            duration: 0.5,
          }),
          onLeave: () => gsap.to(terminalRef.current, {
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            duration: 0.5,
          }),
          onEnterBack: () => gsap.to(terminalRef.current, {
            boxShadow: "0 0 80px rgba(99,102,241,0.6), 0 0 40px rgba(168,85,247,0.4)",
            duration: 0.5,
          }),
          onLeaveBack: () => gsap.to(terminalRef.current, {
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            duration: 0.5,
          }),
        });

        // Resume card pulse — desktop only, it's a nice-to-have not critical UX
        gsap.to(".resume-card", {
          boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          repeat: 3,
          yoyo: true,
          duration: 1,
          delay: 2,
          ease: "power1.inOut",
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const hi = (s) => <span className="text-indigo-400">{s}</span>;

  const statusCards = [
    { label: "LOCAL TIME", value: time, color: "text-indigo-300" },
    { label: "STATUS", value: "AVAILABLE", color: "text-green-400", dot: true },
    { label: "FOCUS", value: "AI/ML · Frontend", color: "text-white/70" },
    { label: "MODE", value: "BUILD", color: "text-white/70" },
  ];

  return (
    <div ref={containerRef}>
      <section className="relative z-20 min-h-[70vh] flex items-start justify-center px-6 pt-16 pb-24">
        <div className="w-full max-w-5xl mx-auto">
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

              <div className="command-line">
                <span className="text-indigo-400">jay@system:~$version</span>{" "}
                <span className="text-white">v1.0.06 — stable. updates ongoing.</span>
                <span className="cursor text-indigo-400">▋</span>
              </div>

              {/* ── HEADING — LCP element ─────────────────── */}
              <h1
                className="hero-title text-3xl md:text-5xl font-black tracking-tight uppercase"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">Still</span>{" "}
                <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">Learning.</span>
                <br />
                <span className="hero-word inline-block hover:text-indigo-400 hover:scale-105 transition-all duration-300 cursor-default">Still</span>{" "}
                <span className="hero-word inline-block text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-default">Shipping.</span>
              </h1>

              {/* ── ABOUT COMMAND OUTPUT ─────────────────────────── */}
              <div ref={aboutOutputRef} className="pt-2 space-y-4">

                <div className="about-command">
                  <span className="text-indigo-400">jay@system:~$</span>{" "}
                  <span className="text-white">about --me</span>
                </div>
                <div className="role-line flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm">
                  <span className="text-indigo-400">role:</span>
                  <span className="text-white/90">AI/ML Engineer</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/90">Frontend Development</span>
                  <span className="text-white/20">·</span>
                  <span className="text-green-400/80">Open to Internships</span>
                </div>

                <div className="about-divider h-px w-full bg-white/10" />

                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 pt-1">

                  <div className="flex-1 space-y-3 text-s leading-relaxed">
                    {[
                      <span>I'm a {hi(`${AGE} year old`)} computer science student based in {hi("Noida")}, interested in {hi("intelligent systems")} and practical problem solving.</span>,
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
                      enableTilt={isDesktop}
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

                {/* ── STATUS BAR ─────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs mt-6 pt-4 border-t border-white/10">

                  {statusCards.map(({ label, value, color, dot }) => (
                    <div
                      key={label}
                      className="status-card group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:border hover:border-white/20"
                    >
                      <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">{label}</p>
                      <p className={`${color} group-hover:opacity-80 transition-colors duration-300 font-semibold flex items-center gap-2`}>
                        {value}
                        {dot && <span className="inline-block w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse" />}
                      </p>
                    </div>
                  ))}

                  <button
                    onClick={handleResumeDownload}
                    className="
                      resume-card
                      relative overflow-hidden
                      p-3 rounded-lg
                      border border-indigo-400/40
                      bg-indigo-500/10
                      text-left
                      transition-all duration-300
                      hover:scale-105
                      hover:bg-indigo-500/20
                      hover:border-indigo-400/70
                      hover:shadow-lg hover:shadow-indigo-500/30
                      active:scale-95
                      group
                      cursor-pointer
                    "
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
                    <p className="text-indigo-300/70 group-hover:text-indigo-300 transition-colors duration-300 uppercase tracking-widest text-[10px] font-bold">
                      RESUME
                    </p>
                    <p className="text-indigo-300 font-semibold flex items-center gap-1.5 mt-0.5">
                      Download
                      <svg
                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                      </svg>
                    </p>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /*
          breathe + breathe-subtle animate opacity only — compositor-friendly.
          Gated behind prefers-reduced-motion as before.
          On touch devices, status-card breathe is skipped — 4 simultaneous
          infinite animations on low-end mobile GPUs adds up.
        */
        @media (prefers-reduced-motion: no-preference) {
          .cursor, .cursor-2 {
            animation: blink 1.2s ease-in-out infinite;
          }
          .hero-title {
            animation: breathe-subtle 5s ease-in-out infinite;
          }
        }

        /* status-card breathe only on devices that support hover (desktop) */
        @media (prefers-reduced-motion: no-preference) and (hover: hover) {
          .status-card {
            animation: breathe 4.5s ease-in-out infinite;
          }
          .status-card:nth-child(2) { animation-delay: 0.6s; }
          .status-card:nth-child(3) { animation-delay: 1.2s; }
          .status-card:nth-child(4) { animation-delay: 1.8s; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes breathe-subtle {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.92; }
        }
      `}</style>
    </div>
  );
}