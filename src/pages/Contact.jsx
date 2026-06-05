import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Clock, Briefcase, ChevronRight, Link2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageMeta } from '../lib/usePageMeta';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

// ── Constants & Helpers ──────────────────────────────────────────────────────
const IS_TOUCH_DEVICE = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
const PREFERS_REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CONTACT_LINKS = [
  { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com', icon: <Mail size={18} />, label: 'Email', value: 'jay05.joshi@gmail.com', note: 'Preferred channel' },
  { href: 'https://linkedin.com/in/gaminbhoot', icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/gaminbhoot', note: 'Connect professionally' },
  { href: 'https://github.com/gaminbhoot', icon: <Github size={18} />, label: 'GitHub', value: 'github.com/gaminbhoot', note: 'View my work' },
];

// ── Sub-Component: Input Field (Fixes focus logic & accessibility) ─────────────
const ContactInput = ({ label, name, type = "text", placeholder, focused, onFocus, onBlur, isTextArea = false }) => {
  const InputTag = isTextArea ? 'textarea' : 'input';
  return (
    <div className="form-row group relative">
      <label className="contact-label">
        <span style={{ color: "var(--accent-color)" }}>›</span> {label}
        {focused && <span className="text-green-400/70 normal-case tracking-normal ml-2 font-mono text-[10px]">(editing)</span>}
      </label>
      <InputTag
        name={name}
        type={type}
        placeholder={placeholder}
        className="contact-input"
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur()}
        {...(isTextArea ? { rows: 4 } : {})}
      />
      <div className={`contact-input-line ${focused ? 'contact-input-line-active' : ''}`} />
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  usePageMeta({
    title: 'Contact | Jay Joshi',
    description: 'Get in touch with Jay Joshi for internships, hybrid roles, freelance projects, and technical collaboration.',
    path: '/contact',
  });

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formFocused, setFormFocused] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  // 1. Animations Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      // If user prefers reduced motion, don't run heavy animations
      if (PREFERS_REDUCED_MOTION) return;

      const tl = gsap.timeline();

      // Header Animations
      gsap.fromTo('.contact-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } });
      gsap.fromTo('.contact-heading .word', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } });
      gsap.fromTo('.contact-subtext', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } });
      gsap.fromTo('.header-divider', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } });

      // Info & Form Stagger
      gsap.fromTo('.info-card', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: infoRef.current, start: 'top 75%' } });
      gsap.fromTo('.form-row', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: formRef.current, start: 'top 72%' } });

      // Orb Parallax
      gsap.to('.contact-orb', {
        y: -60,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      });
    }, containerRef);

    return () => ctx.revert(); // Proper cleanup
  }, []);

  // 2. Magnetic Effect Handlers
  const handleMagneticEffect = useCallback((e) => {
    if (IS_TOUCH_DEVICE || PREFERS_REDUCED_MOTION) return;
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.1;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.1;
    gsap.to(element, { x, y, duration: 0.4, ease: 'power2.out', overwrite: true });
  }, []);

  const handleMagneticReset = useCallback((element) => {
    if (IS_TOUCH_DEVICE || PREFERS_REDUCED_MOTION) return;
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  }, []);

  // 3. Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/mnjgywzg', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="contact-page container mx-auto px-6 pt-2 pb-16 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="contact-noise-bg" />
      <div className="contact-orb" />
      <div className="contact-orb contact-orb-2" />

      {/* HEADER */}
      <header ref={headerRef} className="mb-12 relative">
        <h1 className="contact-heading text-4xl md:text-6xl font-black tracking-tight leading-none mb-4 perspective-1000" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <span className="word inline-block">Let's</span>{' '}
          <span className="word inline-block">Work</span>{' '}
          <span className="word inline-block" style={{ color: "var(--accent-color)" }}>Together</span>
        </h1>
        <p className="contact-subtext text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
          I'm open to hybrid roles, internships, and freelance projects. Reach out — <span className="font-medium" style={{ color: "var(--accent-hover, var(--accent-color))" }}> I'd be happy to connect</span>.
        </p>
        <div className="header-divider mt-6 h-px" style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--accent-color) 60%, transparent), color-mix(in srgb, var(--accent-hover, var(--accent-color)) 40%, transparent), transparent)" }} />
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        
        {/* LEFT PANEL */}
        <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-4 h-full">
          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap"><Briefcase size={16} style={{ color: "var(--accent-color)" }} /></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Current Status</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/60 uppercase tracking-[0.12em] font-medium">Employment</span>
                <span className="contact-status-pill contact-status-open">Open to Work</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/60 uppercase tracking-[0.12em] font-medium">Role Type</span>
                <span className="text-[13px] text-white/90 font-semibold">Hybrid / Internship</span>
              </div>
            </div>
          </div>

          <div className="info-card contact-glass-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap"><MapPin size={16} style={{ color: "var(--accent-color)" }} /></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Location</span>
            </div>
            <p className="text-[15px] text-white font-bold leading-tight">Noida, India</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={12} className="text-white/50" />
              <span className="text-[10px] text-white/55 tracking-wide">UTC +5:30 · IST</span>
            </div>
          </div>

          <div className="info-card contact-glass-card flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="contact-icon-wrap"><Link2 size={16} style={{ color: "var(--accent-color)" }} /></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Direct Channels</span>
            </div>
            <div className="space-y-1">
              {CONTACT_LINKS.map(({ href, icon, label, value, note }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="contact-link-row group">
                  <span className="contact-link-icon-wrap">{icon}</span>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-[10px] text-white/55 uppercase tracking-[0.15em] font-semibold mb-0.5">{label}</p>
                    <p className="text-[13px] text-white/85 group-hover:text-white font-medium truncate transition-colors duration-200">{value}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className="contact-note-text text-[10px] transition-colors duration-200 text-right leading-tight">{note}</span>
                    <ChevronRight size={12} className="contact-chevron mt-1 transition-all duration-200" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (FORM) */}
        <div ref={formRef} className="lg:col-span-3 h-full">
          <div className="contact-glass-card relative overflow-hidden h-full" style={{ background: 'rgba(0,0,0,0.27)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, var(--accent-color), var(--accent-hover, var(--accent-color)), transparent)" }} />

            {status === 'success' ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon"><Send size={22} style={{ color: "var(--accent-color)" }} /></div>
                <p className="text-white font-semibold text-base mt-3">Message Received!</p>
                <p className="text-white/70 text-sm mt-1">Thanks for reaching out — I'll get back to you shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-5 py-2.5 rounded-lg border text-xs font-mono uppercase tracking-widest hover:bg-[var(--accent-color)]/20 transition-all"
                  style={{
                    borderColor: "color-mix(in srgb, var(--accent-color) 30%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--accent-color) 10%, transparent)",
                    color: "var(--accent-color)"
                  }}
                >
                  ← Send another message
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <Send size={22} className="text-red-400" />
                </div>
                <p className="text-white font-semibold text-base mt-3">Something went wrong.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/50 text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all">
                  ← Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full" style={{ gap: '1.25rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ContactInput label="Name" name="name" placeholder="Full Name" focused={formFocused === 'name'} onFocus={(v) => setFormFocused(v)} onBlur={() => setFormFocused(null)} />
                  <ContactInput label="Email" name="email" type="email" placeholder="email@example.com" focused={formFocused === 'email'} onFocus={(v) => setFormFocused(v)} onBlur={() => setFormFocused(null)} />
                </div>
                <ContactInput label="Subject" name="subject" placeholder="Frontend Engineer @ Acme Corp" focused={formFocused === 'subject'} onFocus={(v) => setFormFocused(v)} onBlur={() => setFormFocused(null)} />
                <ContactInput label="Message" name="message" isTextArea={true} placeholder="What are you building?" focused={formFocused === 'message'} onFocus={(v) => setFormFocused(v)} onBlur={() => setFormFocused(null)} />

                <div className="form-row pt-4 mt-auto">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`submit-btn contact-submit-btn group ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onMouseMove={handleMagneticEffect}
                    onMouseLeave={handleMagneticReset}
                  >
                    <span className="relative z-10 font-sans text-sm tracking-widest font-semibold uppercase flex items-center justify-center gap-3">
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
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

    </div>
  );
}
