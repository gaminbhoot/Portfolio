import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formFocused, setFormFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.contact-badge',
        { opacity: 0, y: -20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo('.contact-heading .word',
        { opacity: 0, y: 80, rotationX: -60 },
        {
          opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo('.contact-subtext',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo('.header-divider',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.2, delay: 0.6, ease: 'power3.inOut',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      // Info panel animation
      gsap.fromTo('.info-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );

      // Form animation
      gsap.fromTo('.form-row',
        { opacity: 0, x: 50, filter: 'blur(8px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 72%', toggleActions: 'play none none reverse' }
        }
      );

      // Parallax orb
      gsap.to('.contact-orb', {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticEffect = useCallback((e, element) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    gsap.to(element, { x, y, duration: 0.4, ease: 'power2.out', overwrite: true });
  }, []);

  const handleMagneticReset = useCallback((element) => {
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    gsap.to(btn, {
      scale: 0.97, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        e.target.reset();
      }
    });
  }, []);

  const contactLinks = useMemo(() => [
    {
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com',
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'jay05.joshi@gmail.com',
      note: 'Preferred channel',
    },
    {
      href: 'https://linkedin.com/in/gaminbhoot',
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/gaminbhoot',
      note: 'Connect professionally',
    },
    {
      href: 'https://github.com/gaminbhoot',
      icon: <Github size={18} />,
      label: 'GitHub',
      value: 'github.com/gaminbhoot',
      note: 'View my work',
    },
  ], []);

  return (
    <div ref={containerRef} className="contact-page container mx-auto px-6 pt-2 pb-16 text-white relative overflow-hidden">

      {/* ── Background ── */}
      <div className="contact-noise-bg" />
      <div className="contact-orb" />
      <div className="contact-orb contact-orb-2" />

      {/* ── HEADER ── */}
      <div ref={headerRef} className="mb-12 relative">

        <h1
          className="contact-heading text-4xl md:text-6xl font-black tracking-tight leading-none mb-4 perspective-1000"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="word inline-block">Let's</span>{' '}
          <span className="word inline-block">Work</span>{' '}
          <span className="word inline-block text-indigo-400">Together</span>
        </h1>

        <p className="contact-subtext text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
          I'm open to hybrid roles, internships, and freelance projects. Reach out —
          <span className="text-indigo-300 font-medium">  I'd be happy to connect</span>.
        </p>

        <div className="header-divider mt-6 h-px bg-gradient-to-r from-indigo-500/60 via-purple-500/40 to-transparent" />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* ── LEFT: INFO PANEL (2 cols) ── */}
        <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-4">

          {/* Availability card */}
          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="contact-icon-wrap">
                <Briefcase size={16} className="text-indigo-300" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Current Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">Employment</span>
                <span className="contact-status-pill contact-status-open">Open to Work</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">Role Type</span>
                <span className="text-white/90 text-xs font-medium">Hybrid / Internship</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">Start Date</span>
                <span className="text-white/90 text-xs font-medium">Within 2 weeks</span>
              </div>
            </div>
          </div>

          {/* Location & timezone */}
          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="contact-icon-wrap">
                <MapPin size={16} className="text-indigo-300" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Location</span>
            </div>
            <p className="text-white text-sm font-semibold">Noida, India</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={13} className="text-white/40" />
              <span className="text-white/50 text-[10px]">UTC +5:30 · IST</span>
            </div>
          </div>

          {/* Direct contact links */}
          <div className="info-card contact-glass-card flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="contact-icon-wrap">
                <Mail size={16} className="text-indigo-300" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">Direct Channels</span>
            </div>
            <div className="space-y-1">
              {contactLinks.map(({ href, icon, label, value, note }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row group"
                >
                  <span className="contact-link-icon-wrap">{icon}</span>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">{label}</p>
                    <p className="text-white/85 group-hover:text-white text-xs font-medium truncate transition-colors duration-200">{value}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className="text-[9px] text-indigo-400/50 group-hover:text-indigo-300/80 transition-colors duration-200">{note}</span>
                    <ChevronRight size={13} className="text-white/20 group-hover:text-indigo-300/60 mt-0.5 transition-colors duration-200 group-hover:translate-x-0.5 transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: INQUIRY FORM (3 cols) ── */}
        <div ref={formRef} className="lg:col-span-3">
          <div className="contact-glass-card relative overflow-hidden">

            {/* Card top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />



            {submitted ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon">
                  <Send size={22} className="text-indigo-300" />
                </div>
                <p className="text-white font-semibold text-base mt-3">Message Received!</p>
                <p className="text-white/50 text-sm mt-1">Thank you for reaching out. I'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Name
                      {formFocused === 'name' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="contact-input"
                      onFocus={() => setFormFocused('name')}
                      onBlur={() => setFormFocused(null)}
                    />
                    <div className={`contact-input-line ${formFocused === 'name' ? 'contact-input-line-active' : ''}`} />
                  </div>

                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Email
                      {formFocused === 'email' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="contact-input"
                      onFocus={() => setFormFocused('email')}
                      onBlur={() => setFormFocused(null)}
                    />
                    <div className={`contact-input-line ${formFocused === 'email' ? 'contact-input-line-active' : ''}`} />
                  </div>
                </div>

                {/* Company + Role row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Company
                      {formFocused === 'company' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Google, Startup Inc."
                      className="contact-input"
                      onFocus={() => setFormFocused('company')}
                      onBlur={() => setFormFocused(null)}
                    />
                    <div className={`contact-input-line ${formFocused === 'company' ? 'contact-input-line-active' : ''}`} />
                  </div>

                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Inquiry Type
                      {formFocused === 'type' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <select
                      className="contact-input contact-select"
                      onFocus={() => setFormFocused('type')}
                      onBlur={() => setFormFocused(null)}
                    >
                      <option value="" disabled selected>select --type</option>
                      <option value="full-time">Full-time Role</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance / Contract</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                    <div className={`contact-input-line ${formFocused === 'type' ? 'contact-input-line-active' : ''}`} />
                  </div>
                </div>

                {/* Subject */}
                <div className="form-row group relative">
                  <label className="contact-label">
                    <span className="text-indigo-400/60">›</span> Subject
                    {formFocused === 'subject' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Frontend Engineer @ Acme Corp"
                    className="contact-input"
                    onFocus={() => setFormFocused('subject')}
                    onBlur={() => setFormFocused(null)}
                  />
                  <div className={`contact-input-line ${formFocused === 'subject' ? 'contact-input-line-active' : ''}`} />
                </div>

                {/* Message */}
                <div className="form-row group relative">
                  <label className="contact-label">
                    <span className="text-indigo-400/60">›</span> Message
                    {formFocused === 'message' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="What are you building?"
                    className="contact-input"
                    onFocus={() => setFormFocused('message')}
                    onBlur={() => setFormFocused(null)}
                    style={{ resize: 'none' }}
                  />
                  <div className={`contact-input-line ${formFocused === 'message' ? 'contact-input-line-active' : ''}`} />
                </div>

                {/* Submit */}
                <div className="form-row pt-1">
                  <button
                    type="submit"
                    className="submit-btn contact-submit-btn group"
                    onMouseMove={(e) => handleMagneticEffect(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMagneticReset(e.currentTarget)}
                  >
                    <div className="contact-submit-sheen" />
                    <Send size={15} className="relative z-10" />
                    <span className="relative z-10 font-mono text-sm tracking-[0.2em] font-bold">TRANSMIT</span>
                    <span className="relative z-10 font-mono text-[10px] text-white/60 ml-auto tracking-widest hidden md:block">[ ENTER ]</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Background ── */
        .contact-noise-bg {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .contact-orb {
          position: absolute; top: -160px; right: -200px;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%);
          pointer-events: none; filter: blur(30px);
        }
        .contact-orb-2 {
          top: auto; bottom: -200px; right: auto; left: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%);
        }



        /* ── Heading ── */
        .perspective-1000 { perspective: 1000px; }

        /* ── Glass card ── */
        .contact-glass-card {
          background: rgba(15,15,20,0.75);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
          position: relative; z-index: 1;
          transition: border-color 0.3s ease;
        }
        .contact-glass-card:hover {
          border-color: rgba(99,102,241,0.15);
        }

        /* ── Icon wrap ── */
        .contact-icon-wrap {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          flex-shrink: 0;
        }

        /* ── Status pill ── */
        .contact-status-pill {
          font-size: 10px; font-weight: 600; padding: 3px 10px;
          border-radius: 999px; letter-spacing: 0.03em;
        }
        .contact-status-open {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          color: #86efac;
        }

        /* ── Contact link rows ── */
        .contact-link-row {
          display: flex; align-items: center;
          padding: 10px 10px; border-radius: 10px;
          border: 1px solid transparent;
          transition: background 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
        }
        .contact-link-row:hover {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.15);
        }
        .contact-link-icon-wrap {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.18);
          color: rgba(165,180,252,0.9); flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .contact-link-row:hover .contact-link-icon-wrap {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.3);
        }

        /* ── Form labels ── */
        .contact-label {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.85);
          margin-bottom: 8px;
          transition: color 0.3s;
        }

        /* ── Inputs ── */
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-radius: 0;
          padding: 8px 0;
          outline: none;
          color: rgba(255,255,255,0.95);
          font-size: 17px;
          font-family: 'Courier New', Courier, monospace;
          transition: border-color 0.4s ease, padding-left 0.3s ease;
        }
        .contact-input::placeholder {
          color: rgba(129,140,248,0.35);
          font-family: 'Courier New', Courier, monospace;
          font-style: italic;
        }
        .contact-input:focus {
          border-bottom-color: rgba(129,140,248,0.6);
          box-shadow: none;
          background: transparent;
        }
        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:focus {
          -webkit-text-fill-color: rgba(255,255,255,0.95) !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }

        /* ── Select ── */
        .contact-select {
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(165,180,252,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .contact-select option {
          background: #0f0f14; color: rgba(255,255,255,0.9);
        }

        /* ── Input underline (unused now, kept for compat) ── */
        .contact-input-line {
          height: 1px; background: rgba(99,102,241,0); margin-top: -1px;
          transition: background 0.3s ease;
        }
        .contact-input-line-active { background: rgba(99,102,241,0.5); }

        /* ── Submit button ── */
        .contact-submit-btn {
          position: relative; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 55%, #7c3aed 100%);
          color: white; font-size: 15px; font-weight: 600;
          padding: 14px 20px; border-radius: 12px;
          border: 1px solid rgba(129,140,248,0.3);
          overflow: hidden; cursor: pointer;
          box-shadow: 0 8px 32px rgba(79,70,229,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.2s ease;
        }
        .contact-submit-btn:hover {
          box-shadow: 0 12px 40px rgba(79,70,229,0.5), 0 0 20px rgba(129,140,248,0.15), inset 0 1px 0 rgba(255,255,255,0.15);
          border-color: rgba(129,140,248,0.5);
        }

        .contact-submit-sheen {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .contact-submit-btn:hover .contact-submit-sheen {
          transform: translateX(100%);
        }

        /* ── Success state ── */
        .contact-success-msg {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 48px 24px; text-align: center;
          animation: fade-in-up 0.5s ease;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          box-shadow: 0 0 24px rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}