import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Clock, Briefcase, ChevronRight, Link2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageMeta } from '../lib/usePageMeta';

gsap.registerPlugin(ScrollTrigger);

// ── Module-level constant — same pattern across all pages ─────────────────────
const IS_TOUCH_DEVICE =
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// ── Static data — no deps, no reason to live inside the component ─────────────
const CONTACT_LINKS = [
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
];

export default function Contact() {
  usePageMeta({
    title: 'Contact | Jay Joshi',
    description:
      'Get in touch with Jay Joshi for internships, hybrid roles, freelance projects, and technical collaboration.',
    path: '/contact',
  });

  const containerRef = useRef(null);
  const headerRef    = useRef(null);
  const formRef      = useRef(null);
  const infoRef      = useRef(null);

  const [formFocused,  setFormFocused]  = useState(null);
  const [submitted,    setSubmitted]    = useState(false);
  const [submitError,  setSubmitError]  = useState(false);
  const [inquiryType,  setInquiryType]  = useState('');
  const [customType,   setCustomType]   = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-badge',
        { opacity: 0, y: -20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.contact-heading .word',
        { opacity: 0, y: 80, rotationX: -60 },
        {
          opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.contact-subtext',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.header-divider',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.2, delay: 0.6, ease: 'power3.inOut',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.info-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.form-row',
        { opacity: 0, x: 50, filter: 'blur(8px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      );

      // Orb parallax — skip on touch (blurred radial gradient + scrub = expensive repaint every scroll frame)
      if (!IS_TOUCH_DEVICE) {
        gsap.to('.contact-orb', {
          y: -60,
          scrollTrigger: {
            trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic effect — only wired up via onMouseMove which never fires on touch,
  // but keeping the guard explicit makes the intent clear
  const handleMagneticEffect = useCallback((e, element) => {
    if (IS_TOUCH_DEVICE) return;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.1;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.1;
    gsap.to(element, { x, y, duration: 0.4, ease: 'power2.out', overwrite: true });
  }, []);

  const handleMagneticReset = useCallback((element) => {
    if (IS_TOUCH_DEVICE) return;
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  }, []);

  // Bug fix: inquiryType was missing from the deps array — stale closure meant
  // the "other" branch would always read the initial empty string value.
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    gsap.to(btn, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });

    const formData = new FormData(e.target);
    if (inquiryType === 'other') {
      formData.set('inquiry_type', customType);
    }

    try {
      const response = await fetch('https://formspree.io/f/mnjgywzg', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setSubmitError(false);
        setSubmitted(true);
        e.target.reset();
        setInquiryType('');
        setCustomType('');
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    }
  }, [inquiryType, customType]); // ← fixed: deps now match what the callback reads

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
          <span className="text-indigo-300 font-medium"> I'd be happy to connect</span>.
        </p>
        <div className="header-divider mt-6 h-px bg-gradient-to-r from-indigo-500/60 via-purple-500/40 to-transparent" />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

        {/* ── LEFT: INFO PANEL ── */}
        <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-4 h-full">

          {/* Availability card */}
          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap">
                <Briefcase size={16} className="text-indigo-300" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Current Status</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-medium">Employment</span>
                <span className="contact-status-pill contact-status-open">Open to Work</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-medium">Role Type</span>
                <span className="text-[13px] text-white/90 font-semibold">Hybrid / Internship</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-medium">Start Date</span>
                <span className="text-[13px] text-white/90 font-semibold">Within 2 weeks</span>
              </div>
            </div>
          </div>

          {/* Location & timezone */}
          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap">
                <MapPin size={16} className="text-indigo-300" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Location</span>
            </div>
            <p className="text-[15px] text-white font-bold leading-tight">Noida, India</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={12} className="text-white/30" />
              <span className="text-[10px] text-white/35 tracking-wide">UTC +5:30 · IST</span>
            </div>
          </div>

          {/* Direct contact links */}
          <div className="info-card contact-glass-card flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap">
                <Link2 size={16} className="text-indigo-300" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Direct Channels</span>
            </div>
            <div className="space-y-1">
              {CONTACT_LINKS.map(({ href, icon, label, value, note }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row group"
                >
                  <span className="contact-link-icon-wrap">{icon}</span>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.15em] font-semibold mb-0.5">{label}</p>
                    <p className="text-[13px] text-white/85 group-hover:text-white font-medium truncate transition-colors duration-200">{value}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className="text-[10px] text-indigo-400/45 group-hover:text-indigo-300/75 transition-colors duration-200 text-right leading-tight">{note}</span>
                    <ChevronRight size={12} className="text-white/20 group-hover:text-indigo-300/60 mt-1 transition-colors duration-200 group-hover:translate-x-0.5 transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: INQUIRY FORM ── */}
        <div ref={formRef} className="lg:col-span-3 h-full">
          <div className="contact-glass-card relative overflow-hidden h-full" style={{ background: 'rgba(0,0,0,0.27)' }}>

            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />

            {submitted ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon">
                  <Send size={22} className="text-indigo-300" />
                </div>
                <p className="text-white font-semibold text-base mt-3">Message Received!</p>
                <p className="text-white/50 text-sm mt-1">
                  Thanks for reaching out — I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2.5 rounded-lg border border-indigo-400/30 bg-indigo-400/10 text-indigo-300 text-xs font-mono uppercase tracking-widest hover:bg-indigo-400/20 hover:border-indigo-400/50 hover:text-indigo-200 transition-all duration-300"
                >
                  ← Send another message
                </button>
              </div>
            ) : submitError ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <Send size={22} className="text-red-400" />
                </div>
                <p className="text-white font-semibold text-base mt-3">Something went wrong.</p>
                <p className="text-white/50 text-sm mt-1">
                  Please email me directly at{' '}
                  <a href="mailto:jay05.joshi@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    jay05.joshi@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setSubmitError(false)}
                  className="mt-6 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/50 text-xs font-mono uppercase tracking-widest hover:bg-white/10 hover:text-white/70 transition-all duration-300"
                >
                  ← Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full" style={{ gap: '1.25rem' }}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Name
                      {formFocused === 'name' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input type="text" name="name" required placeholder="Full Name" className="contact-input"
                      onFocus={() => setFormFocused('name')} onBlur={() => setFormFocused(null)} />
                    <div className={`contact-input-line ${formFocused === 'name' ? 'contact-input-line-active' : ''}`} />
                  </div>

                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Email
                      {formFocused === 'email' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input type="email" name="email" required placeholder="email@example.com" className="contact-input"
                      onFocus={() => setFormFocused('email')} onBlur={() => setFormFocused(null)} />
                    <div className={`contact-input-line ${formFocused === 'email' ? 'contact-input-line-active' : ''}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Company
                      {formFocused === 'company' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <input type="text" name="company" placeholder="Google, Startup Inc." className="contact-input"
                      onFocus={() => setFormFocused('company')} onBlur={() => setFormFocused(null)} />
                    <div className={`contact-input-line ${formFocused === 'company' ? 'contact-input-line-active' : ''}`} />
                  </div>

                  <div className="form-row group relative">
                    <label className="contact-label">
                      <span className="text-indigo-400/60">›</span> Inquiry Type
                      {formFocused === 'type' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                    </label>
                    <select name="inquiry_type" className="contact-input contact-select"
                      value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}
                      onFocus={() => setFormFocused('type')} onBlur={() => setFormFocused(null)}
                    >
                      <option value="" disabled>select --type</option>
                      <option value="full-time">Full-time Role</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance / Contract</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                    {inquiryType === 'other' && (
                      <input type="text" name="custom_inquiry_type" placeholder="Enter your inquiry type"
                        className="contact-input mt-3" value={customType}
                        onChange={(e) => setCustomType(e.target.value)} />
                    )}
                    <div className={`contact-input-line ${formFocused === 'type' ? 'contact-input-line-active' : ''}`} />
                  </div>
                </div>

                <div className="form-row group relative">
                  <label className="contact-label">
                    <span className="text-indigo-400/60">›</span> Subject
                    {formFocused === 'subject' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                  </label>
                  <input type="text" name="subject" required placeholder="Frontend Engineer @ Acme Corp" className="contact-input"
                    onFocus={() => setFormFocused('subject')} onBlur={() => setFormFocused(null)} />
                  <div className={`contact-input-line ${formFocused === 'subject' ? 'contact-input-line-active' : ''}`} />
                </div>

                <div className="form-row group relative">
                  <label className="contact-label">
                    <span className="text-indigo-400/60">›</span> Message
                    {formFocused === 'message' && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
                  </label>
                  <textarea name="message" rows="4" required placeholder="What are you building?"
                    className="contact-input" style={{ resize: 'none' }}
                    onFocus={() => setFormFocused('message')} onBlur={() => setFormFocused(null)} />
                  <div className={`contact-input-line ${formFocused === 'message' ? 'contact-input-line-active' : ''}`} />
                </div>

                <div className="form-row pt-4 mt-auto">
                  <button
                    type="submit"
                    className="submit-btn contact-submit-btn group"
                    onMouseMove={IS_TOUCH_DEVICE ? undefined : (e) => handleMagneticEffect(e, e.currentTarget)}
                    onMouseLeave={IS_TOUCH_DEVICE ? undefined : (e) => handleMagneticReset(e.currentTarget)}
                  >
                    <span className="relative z-10 font-sans text-sm tracking-widest font-semibold uppercase flex items-center justify-center gap-3">
                      Send Message
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                    <div className="contact-submit-hover-state" />
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
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 24px;
          position: relative; z-index: 1;
          transition: border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;

          /*
            backdrop-filter reduced on touch — blur(6px) across multiple
            stacked cards is one of the costliest mobile GPU operations.
            blur(6px) gives the same frosted feel at roughly half the fill cost.
          */
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        /* Restore full blur on desktop where GPU is adequate */
        @media (hover: hover) {
          .contact-glass-card {
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          }
        }

        /*
          Hover lift — desktop only.
          On touch, :hover persists after tap-release and looks broken.
          transform + box-shadow change also forces layout recalc on mobile.
        */
        @media (hover: hover) {
          .contact-glass-card:hover {
            background: rgba(0,0,0,0.27);
            border-color: rgba(99,102,241,0.5);
            box-shadow: 0 20px 40px rgba(99,102,241,0.2);
            transform: translateY(-2px) scale(1.01);
          }
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
          font-size: 10px; font-weight: 700; padding: 3px 10px;
          border-radius: 999px; letter-spacing: 0.06em;
        }
        .contact-status-open {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          color: #86efac;
        }

        /* ── Contact link rows ── */
        .contact-link-row {
          display: flex; align-items: center;
          padding: 10px; border-radius: 10px;
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
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5);
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
          font-size: 15px;
          font-family: 'Courier New', Courier, monospace;
          transition: border-color 0.4s ease;
        }
        .contact-input::placeholder {
          color: rgba(129,140,248,0.35);
          font-family: 'Courier New', Courier, monospace;
          font-style: italic; font-size: 13px;
        }
        .contact-input:focus {
          border-bottom-color: rgba(129,140,248,0.6);
          box-shadow: none; background: transparent;
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
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }
        .contact-select option {
          background: #0f172a; color: #e2e8f0;
          font-family: 'Courier New', Courier, monospace;
        }

        /* ── Input underline ── */
        .contact-input-line {
          height: 1px; background: rgba(99,102,241,0); margin-top: -1px;
          transition: background 0.3s ease;
        }
        .contact-input-line-active { background: rgba(99,102,241,0.5); }

        /* ── Submit Button ── */
        .contact-submit-btn {
          position: relative; width: 100%;
          background: rgba(139,92,246,0.05);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          color: rgba(237,233,254,0.95);
          padding: 16px 24px; overflow: hidden; cursor: pointer;
          box-shadow: 0 2px 12px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.25s ease;
        }
        .contact-submit-btn:hover {
          transform: translateY(-1.5px);
          background: rgba(139,92,246,0.14);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 6px 20px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.16);
        }
        .contact-submit-btn::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(circle at 30% 20%, rgba(167,139,250,0.25), transparent 65%);
          opacity: 0.5; pointer-events: none;
        }
        .contact-submit-hover-state {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.04);
          opacity: 0; transition: opacity 0.25s ease;
        }
        .contact-submit-btn:hover .contact-submit-hover-state { opacity: 1; }

        /* ── Success / Error state ── */
        .contact-success-msg {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 48px 24px; text-align: center;
          animation: fade-in-up 0.5s ease;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
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
