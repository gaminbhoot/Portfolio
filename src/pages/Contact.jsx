import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, Send, ArrowRight, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const linksRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [formFocused, setFormFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerText = headerRef.current.querySelectorAll('.word');
      gsap.fromTo(headerText,
        { opacity: 0, y: 100, rotationX: -90 },
        {
          opacity: 1, y: 0, rotationX: 0, duration: 1.4, stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo('.header-line',
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.2, delay: 0.5, ease: "power3.inOut",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      // Contact links
      const links = linksRef.current.querySelectorAll('.contact-link');
      gsap.fromTo(links,
        { opacity: 0, x: -80, rotation: -5, scale: 0.9 },
        {
          opacity: 1, x: 0, rotation: 0, scale: 1, duration: 1, stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: linksRef.current, start: "top 75%", toggleActions: "play none none reverse" }
        }
      );

      // Form fields
      const formFields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(formFields,
        { opacity: 0, x: 60, filter: "blur(10px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 70%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo('.submit-btn',
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.6)",
          scrollTrigger: { trigger: '.submit-btn', start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.to('.float-element', {
        y: -20, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3
      });

      gsap.to('.parallax-layer', {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.5,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticEffect = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const planeIcon = element.querySelector('.plane-icon');
    if (planeIcon) gsap.to(planeIcon, { rotation: angle + 45, duration: 0.2, ease: "power1.out", overwrite: true });
    gsap.to(element, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out", overwrite: true });
  };

  const handleMagneticReset = (element) => {
    const planeIcon = element.querySelector('.plane-icon');
    if (planeIcon) gsap.to(planeIcon, { rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    gsap.to(btn, {
      scale: 0.95, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => alert("Message feature integration coming soon! Feel free to use the direct email link for now.")
    });
  };

  return (
    <div ref={containerRef} className="contact-page container mx-auto px-6 pt-2 pb-12 text-white relative overflow-hidden">

      {/* ── Background noise layer ── */}
      <div className="contact-noise-bg" />

      {/* ── Floating decorative elements ── */}
      <div className="absolute top-20 right-10 float-element opacity-15 pointer-events-none">
        <Send size={40} className="text-indigo-400" />
      </div>
      <div className="absolute bottom-40 left-10 float-element opacity-15 pointer-events-none" style={{ animationDelay: '1s' }}>
        <Send size={30} className="text-indigo-300" />
      </div>

      {/* -- Glowing orb -- */}
      <div className="contact-orb" />

      {/* ── HEADER ── */}
      <div ref={headerRef} className="border-b border-white/10 pb-6 mb-10 mt-0 relative overflow-hidden">

        {/* Signal badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="contact-signal-dot" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-400">
            Signal Open · Accepting Transmissions
          </span>
        </div>

        <h1
          className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none perspective-1000 relative"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {/* Glitch ghost layers */}
          <span className="contact-glitch-ghost contact-glitch-ghost-r" aria-hidden="true">GET IN TOUCH</span>
          <span className="contact-glitch-ghost contact-glitch-ghost-b" aria-hidden="true">GET IN TOUCH</span>

          {/* Actual words */}
          <span className="word inline-block relative z-10">Get</span>{' '}
          <span className="word inline-block relative z-10">In</span>{' '}
          <span className="word inline-block relative z-10 text-indigo-400">Touch</span>
        </h1>

        <div className="header-line absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />
      </div>

      {/* ── MAIN CARD ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl relative parallax-layer mt-10 contact-card overflow-hidden"
        style={{ background: "transparent", overflow: 'visible' }}
      >
        {/* Corner accents */}
        <div className="contact-corner contact-corner-tl" />
        <div className="contact-corner contact-corner-tr" />
        <div className="contact-corner contact-corner-bl" />
        <div className="contact-corner contact-corner-br" />

        {/* ── LEFT: TERMINAL READOUT ── */}
        <div ref={linksRef} className="p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative z-10 rounded-l-2xl term-panel" style={{ background: "rgba(30,30,38,0.60)" }}>

          {/* Terminal header bar */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="font-mono text-[9px] text-white/55 tracking-widest ml-2">contacts.sh</span>
            <span className="ml-auto font-mono text-[9px] text-white/40 tracking-widest term-blink-text">LIVE</span>
          </div>

          {/* Boot sequence */}
          <div className="font-mono text-xs space-y-0.5 mb-3 contact-link">
            <p className="text-indigo-300/90">[  0.001] <span className="text-white/80">initializing contact protocol...</span></p>
            <p className="text-white/55">[  0.042] <span className="text-white/80">channels: OK</span></p>
            <p className="text-indigo-300/90 term-flicker">[  0.089] <span className="text-white/80">awaiting transmission</span><span className="term-cursor">▋</span></p>
          </div>

          {/* Contact entries as stdout */}
          <div className="space-y-1 mt-auto">
            {[
              { href: "https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com", icon: <Mail size={16} />, key: "EMAIL", value: "jay05.joshi@gmail.com", flag: "--primary" },
              { href: "https://github.com/gaminbhoot",      icon: <Github size={16} />,   key: "GITHUB",   value: "@gaminbhoot", flag: "--open"    },
              { href: "https://linkedin.com/in/gaminbhoot", icon: <Linkedin size={16} />, key: "LINKEDIN", value: "Jay Joshi",   flag: "--connect" },
            ].map(({ href, icon, key, value, flag }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link term-entry group"
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="text-indigo-300/90 shrink-0">{icon}</span>
                <div className="flex flex-col ml-3 flex-1 min-w-0">
                  <span className="font-mono text-[9px] text-indigo-300/60 uppercase tracking-widest">{key}</span>
                  <span className="text-white/90 group-hover:text-white font-mono text-[13px] font-medium transition-colors duration-200 truncate term-entry-value">{value}</span>
                </div>
                <span className="text-indigo-400/30 font-mono text-[9px] ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">{flag}</span>
              </a>
            ))}

            {/* Location entry */}
            <div className="contact-link term-entry" style={{ cursor: 'default' }}>
              <span className="text-indigo-300/90 shrink-0"><MapPin size={16} /></span>
              <div className="flex flex-col ml-3 flex-1">
                <span className="font-mono text-[9px] text-indigo-300/60 uppercase tracking-widest">LOCATION</span>
                <span className="text-white/90 font-mono text-[13px] font-medium">Noida, India</span>
              </div>
              <span className="text-indigo-400/30 font-mono text-[9px] ml-2 shrink-0">UTC+5:30</span>
            </div>
          </div>


        </div>

        {/* ── RIGHT: TERMINAL FORM ── */}
        <div
          ref={formRef}
          className="p-5 md:p-6 relative z-10 term-panel"
          style={{ borderTopRightRadius: 16, borderBottomRightRadius: 16, background: 'rgba(6,6,8,0.82)' }}
        >
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="font-mono text-[9px] text-green-400/80 tracking-widest ml-2">compose.sh</span>
            <span className="ml-auto font-mono text-[9px] text-white/45 tracking-widest">PID 2406</span>
          </div>

          {/* Prompt line */}
          <div className="font-mono text-xs mb-4 contact-link">
            <span className="text-indigo-400 font-bold">jay@portfolio:~$</span>
            <span className="text-white"> send --interactive</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'name',    label: 'YOUR NAME', type: 'text',  placeholder: 'Full Name',              tag: 'input'    },
              { id: 'email',   label: 'EMAIL',     type: 'email', placeholder: 'email@example.com',      tag: 'input'    },
              { id: 'message', label: 'MESSAGE',   type: 'text',  placeholder: 'What are you building?', tag: 'textarea' },
            ].map(({ id, label, type, placeholder, tag }) => (
              <div key={id} className="form-field group relative">
                {/* Prompt label */}
                <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] mb-2 transition-colors duration-300"
                  style={{ color: formFocused === id ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)' }}>
                  <span className="text-indigo-400/50">›</span>
                  <span>--{label.toLowerCase()}</span>
                  {formFocused === id && <span className="text-green-400/70 normal-case tracking-normal ml-1 font-mono">(editing)</span>}
                </label>
                {tag === 'textarea' ? (
                  <textarea
                    rows="3"
                    required
                    placeholder={placeholder}
                    className="contact-input w-full font-mono text-sm"
                    onFocus={() => setFormFocused(id)}
                    onBlur={() => setFormFocused(null)}
                    style={{ resize: 'none' }}
                  />
                ) : (
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    className="contact-input w-full font-mono text-sm"
                    onFocus={() => setFormFocused(id)}
                    onBlur={() => setFormFocused(null)}
                  />
                )}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-indigo-400/80 to-purple-400/60 transition-all duration-500 group-focus-within:w-full" />
              </div>
            ))}

            {/* Submit row */}
            <div className="-mx-5 md:-mx-6 px-5 md:px-6 py-3 -mb-5 md:-mb-6 border-t border-white/[0.06] mt-4">
              {/* Command preview */}
              <p className="font-mono text-[9px] text-white/20 mb-3 tracking-widest">
                <span className="text-indigo-300/90">jay@portfolio:~$</span><span className="text-white/60"> transmit --encrypt --sign</span>
              </p>
              <button
                type="submit"
                className="submit-btn contact-submit-btn group"
                onMouseMove={(e) => handleMagneticEffect(e, e.currentTarget)}
                onMouseLeave={(e) => handleMagneticReset(e.currentTarget)}
              >
                <div className="contact-submit-sweep" />
                <div className="contact-submit-fringe" />
                <Send size={15} className="plane-icon relative z-10" />
                <span className="relative z-10 font-mono text-sm tracking-[0.2em] font-bold">TRANSMIT</span>
                <span className="relative z-10 font-mono text-[10px] text-white/60 ml-auto tracking-widest hidden md:block">[ ENTER ]</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        /* ── Page background effects ── */
        .contact-noise-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .contact-orb {
          position: absolute;
          top: -120px;
          right: -180px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%);
          pointer-events: none;
          animation: orb-drift 8s ease-in-out infinite alternate;
          filter: blur(20px);
        }

        @keyframes orb-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-40px, 30px) scale(1.1); }
        }

        /* ── Signal dot ── */
        .contact-signal-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 8px #818cf8, 0 0 16px rgba(129,140,248,0.4);
          animation: signal-pulse 2s ease-in-out infinite;
        }

        @keyframes signal-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── Header glitch ghosts ── */
        .contact-glitch-ghost {
          position: absolute;
          top: 0; left: 0;
          font-family: 'Orbitron', sans-serif;
          font-size: inherit;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          pointer-events: none;
          white-space: nowrap;
        }
        .contact-glitch-ghost-r {
          color: rgba(255, 30, 60, 0.15);
          animation: ghost-r 4s infinite steps(1);
          clip-path: inset(0 0 60% 0);
        }
        .contact-glitch-ghost-b {
          color: rgba(30, 140, 255, 0.15);
          animation: ghost-b 4s infinite steps(1);
          clip-path: inset(40% 0 0 0);
        }

        @keyframes ghost-r {
          0%   { transform: translate(0, 0); clip-path: inset(0 0 60% 0); }
          10%  { transform: translate(-3px, 1px); clip-path: inset(10% 0 50% 0); }
          15%  { transform: translate(2px, 0); clip-path: inset(0 0 60% 0); }
          40%  { transform: translate(0, 0); clip-path: inset(0 0 60% 0); }
          42%  { transform: translate(-4px, -1px); clip-path: inset(5% 0 55% 0); }
          44%  { transform: translate(0, 0); clip-path: inset(0 0 60% 0); }
          100% { transform: translate(0, 0); }
        }

        @keyframes ghost-b {
          0%   { transform: translate(0, 0); clip-path: inset(40% 0 0 0); }
          20%  { transform: translate(3px, -1px); clip-path: inset(45% 0 0 0); }
          24%  { transform: translate(0, 0); clip-path: inset(40% 0 0 0); }
          65%  { transform: translate(0, 0); }
          67%  { transform: translate(4px, 1px); clip-path: inset(35% 0 5% 0); }
          70%  { transform: translate(0, 0); clip-path: inset(40% 0 0 0); }
          100% { transform: translate(0, 0); }
        }

        /* ── Card decoration ── */
        .contact-card {
          box-shadow: none;
        }

        /* Corner accents */
        .contact-corner {
          position: absolute;
          width: 20px; height: 20px;
          pointer-events: none;
          z-index: 20;
          animation: corner-flicker 8s infinite steps(1);
        }
        .contact-corner-tl { top: -1px; left: -1px; border-top: 2px solid #818cf8; border-left: 2px solid #818cf8; border-radius: 16px 0 0 0; }
        .contact-corner-tr { top: -1px; right: -1px; border-top: 2px solid #818cf8; border-right: 2px solid #818cf8; border-radius: 0 16px 0 0; animation-delay: 0.4s; }
        .contact-corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid #818cf8; border-left: 2px solid #818cf8; border-radius: 0 0 0 16px; animation-delay: 0.8s; }
        .contact-corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid #818cf8; border-right: 2px solid #818cf8; border-radius: 0 0 16px 0; animation-delay: 1.2s; }

        @keyframes corner-flicker {
          0%   { opacity: 0.45; filter: none; }
          30%  { opacity: 0.45; filter: none; }
          32%  { opacity: 0.75; filter: drop-shadow(0 0 3px rgba(129,140,248,0.5)); }
          35%  { opacity: 0.45; filter: none; }
          75%  { opacity: 0.45; filter: none; }
          77%  { opacity: 0.65; filter: drop-shadow(1px 0 0 rgba(255,30,30,0.6)) drop-shadow(-1px 0 0 rgba(30,140,255,0.6)); }
          80%  { opacity: 0.45; filter: none; }
          100% { opacity: 0.45; filter: none; }
        }

        /* ── Form inputs ── */
        .contact-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 8px 0;
          outline: none;
          color: white;
          font-size: 14px;
          transition: border-color 0.5s ease, padding-left 0.3s ease;
        }
        .contact-input::placeholder { color: rgba(156,163,175,0.5); }
        .contact-input:focus { border-bottom-color: rgba(129,140,248,0.5); }

        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }

        /* ── Submit button ── */
        .contact-submit-btn {
          position: relative;
          width: 100%;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%);
          color: white;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(129,140,248,0.3);
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          box-shadow: 0 8px 32px rgba(79,70,229,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .contact-submit-btn:hover {
          box-shadow: 0 12px 48px rgba(79,70,229,0.5), 0 0 24px rgba(129,140,248,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
          border-color: rgba(129,140,248,0.5);
        }

        .contact-submit-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(113,196,255,0.05) 50%, transparent 100%);
          background-size: 100% 200%;
          animation: submit-sweep 2s linear infinite;
          pointer-events: none;
        }
        @keyframes submit-sweep {
          from { background-position: 0% 0%; }
          to   { background-position: 0% 100%; }
        }

        .contact-submit-fringe {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          opacity: 0;
          pointer-events: none;
          box-shadow:
            inset 2px 0 0 rgba(255,30,30,0.1),
            inset -2px 0 0 rgba(30,180,255,0.1);
          transition: opacity 0.3s;
        }
        .contact-submit-btn:hover .contact-submit-fringe { opacity: 1; }

        /* ── Perspective ── */
        .perspective-1000 { perspective: 1000px; }

        /* ── Terminal panel ── */
        .term-panel {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.06) 3px,
            rgba(0,0,0,0.06) 4px
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Terminal dots */
        .term-dot {
          display: inline-block;
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .term-dot-red    { background: rgba(255,90,90,0.6); }
        .term-dot-yellow { background: rgba(255,200,60,0.6); }
        .term-dot-green  { background: rgba(60,220,100,0.6); }

        /* Blinking LIVE text */
        .term-blink-text {
          animation: term-blink 1.4s infinite steps(1);
        }
        @keyframes term-blink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Inline cursor */
        .term-cursor {
          display: inline-block;
          color: rgba(129,140,248,0.8);
          animation: term-blink 0.8s infinite steps(1);
          margin-left: 2px;
        }

        /* Occasional flicker on boot line */
        .term-flicker {
          animation: term-line-flicker 5s infinite steps(1);
        }
        @keyframes term-line-flicker {
          0%   { opacity: 1; }
          92%  { opacity: 1; }
          93%  { opacity: 0.3; }
          94%  { opacity: 1; }
          96%  { opacity: 0.5; }
          97%  { opacity: 1; }
          100% { opacity: 1; }
        }

        /* Contact entry rows */
        .term-entry {
          display: flex;
          align-items: center;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          transition: background 0.2s;
          border-radius: 4px;
          padding-left: 4px;
          padding-right: 4px;
        }
        .term-entry:hover {
          background: rgba(99,102,241,0.06);
        }
        .term-entry-value {
          animation: term-value-glitch 8s infinite steps(1);
        }
        @keyframes term-value-glitch {
          0%   { opacity: 0.8; transform: translateX(0); filter: none; }
          94%  { opacity: 0.8; transform: translateX(0); filter: none; }
          95%  { opacity: 0.5; transform: translateX(-1px); filter: drop-shadow(1px 0 0 rgba(255,30,30,0.4)) drop-shadow(-1px 0 0 rgba(30,140,255,0.4)); }
          96%  { opacity: 0.8; transform: translateX(0); filter: none; }
          97%  { opacity: 0.6; transform: translateX(1px); filter: drop-shadow(-1px 0 0 rgba(255,30,30,0.3)); }
          98%  { opacity: 0.8; transform: translateX(0); filter: none; }
          100% { opacity: 0.8; }
        }

        /* Green status pulse dot */
        .term-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
          box-shadow: 0 0 4px rgba(74,222,128,0.6);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* Contact input override for mono */
        .contact-input {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          color: rgba(255,255,255,0.95);
          border-bottom-color: rgba(129,140,248,0.2);
        }
        .contact-input::placeholder {
          font-family: 'Courier New', Courier, monospace;
          color: rgba(129,140,248,0.35);
          font-style: italic;
        }
        .contact-input:focus {
          border-bottom-color: rgba(129,140,248,0.6) !important;
        }
      `}</style>
    </div>
  );
}