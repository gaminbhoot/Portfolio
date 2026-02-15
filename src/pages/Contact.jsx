import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Send, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with split text effect
      const headerText = headerRef.current.querySelectorAll('.word');
      gsap.fromTo(
        headerText,
        { 
          opacity: 0, 
          y: 100,
          rotationX: -90,
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Underline animation
      gsap.fromTo(
        '.header-line',
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact links - cascading reveal with rotation
      const links = linksRef.current.querySelectorAll('.contact-link');
      gsap.fromTo(
        links,
        {
          opacity: 0,
          x: -80,
          rotation: -5,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form fields - stagger from right with blur
      const formFields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(
        formFields,
        {
          opacity: 0,
          x: 60,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Button reveal with scale
      gsap.fromTo(
        '.submit-btn',
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: '.submit-btn',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3
      });

      // Parallax effect on main container
      gsap.to('.parallax-layer', {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect with continuous tracking
  const handleMagneticEffect = (e, element) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Calculate angle for plane rotation (pointing towards mouse)
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    
    // Find the Send icon within the button and rotate it
    const planeIcon = element.querySelector('.plane-icon');
    if (planeIcon) {
      gsap.to(planeIcon, {
        rotation: angle + 45, // Add 45 to adjust for icon's default orientation
        duration: 0.2,
        ease: "power1.out",
        overwrite: true
      });
    }

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true
    });
  };

  const handleMagneticReset = (element) => {
    const planeIcon = element.querySelector('.plane-icon');
    if (planeIcon) {
      gsap.to(planeIcon, {
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    }
    
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Button success animation
    const btn = e.target.querySelector('button');
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert("Message feature integration coming soon! Feel free to use the direct email link for now.");
      }
    });
  };

  return (
    <div ref={containerRef} className="container mx-auto px-6 pt-2 pb-12 text-white relative overflow-hidden">
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 float-element opacity-20">
        <Send size={40} className="text-indigo-400" />
      </div>
      <div className="absolute bottom-40 left-10 float-element opacity-20" style={{ animationDelay: '1s' }}>
        <Send size={30} className="text-indigo-300" />
      </div>

      {/* HEADER */}
      <div ref={headerRef} className="border-b border-white/10 pb-6 mb-10 mt-0 relative overflow-hidden">
        <h1 
          className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none perspective-1000" 
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="word inline-block">Get</span>{' '}
          <span className="word inline-block">In</span>{' '}
          <span className="word inline-block text-indigo-400">Touch</span>
        </h1>
        <div className="header-line absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />
      </div>

      {/* MAIN BOX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-2xl backdrop-blur-xl relative parallax-layer pr-"
           style={{ background: "linear-gradient(145deg, rgba(20, 20, 25, 0.4) 0%, rgba(60, 60, 80, 0.2) 100%)", overflow: 'visible' }}>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 animate-pulse rounded-2xl" 
               style={{ animationDuration: '4s' }} />
        </div>

        {/* LEFT COLUMN: CONTACT LINKS */}
        <div ref={linksRef} className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-10 relative z-10 rounded-l-2xl">
          <p className="text-xl text-gray-400 max-w-sm leading-relaxed opacity-0 contact-link"
             style={{ 
               animation: 'fadeInUp 1s forwards',
               animationDelay: '0.3s' 
             }}>
            From interfaces to intelligence, if you're building something thoughtful, let's talk.
          </p>

          <div className="space-y-6">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link flex items-center gap-5 group relative"
            >
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/30 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Mail size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-all transform group-hover:translate-x-2 duration-300">
                jay05.joshi@gmail.com
              </p>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </a>

            <a 
              href="https://github.com/gaminbhoot" 
              target="_blank" 
              rel="noreferrer" 
              className="contact-link flex items-center gap-5 group relative"
            >
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/30 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Github size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-all transform group-hover:translate-x-2 duration-300">
                @gaminbhoot
              </p>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </a>

            <a 
              href="https://linkedin.com/in/gaminbhoot" 
              target="_blank" 
              rel="noreferrer" 
              className="contact-link flex items-center gap-5 group relative"
            >
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/30 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Linkedin size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-all transform group-hover:translate-x-2 duration-300">
                Jay Joshi
              </p>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div ref={formRef} className="p-8 md:p-10 bg-black/70 relative z-10" 
             style={{ borderTopRightRadius: 19, borderBottomRightRadius: 19 }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="form-field group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-2 block transition-all duration-300 group-focus-within:text-indigo-300">
                Your Name
              </label>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-all duration-500 text-white placeholder:text-gray-400 group-focus-within:border-indigo-400"
                onFocus={(e) => {
                  gsap.to(e.target, { paddingLeft: 8, duration: 0.3 });
                }}
                onBlur={(e) => {
                  gsap.to(e.target, { paddingLeft: 0, duration: 0.3 });
                }}
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 group-focus-within:w-full" />
            </div>

            <div className="form-field group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-2 block transition-all duration-300 group-focus-within:text-indigo-300">
                Email
              </label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-all duration-500 text-white placeholder:text-gray-400"
                onFocus={(e) => {
                  gsap.to(e.target, { paddingLeft: 8, duration: 0.3 });
                }}
                onBlur={(e) => {
                  gsap.to(e.target, { paddingLeft: 0, duration: 0.3 });
                }}
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 group-focus-within:w-full" />
            </div>

            <div className="form-field group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-2 block transition-all duration-300 group-focus-within:text-indigo-300">
                Message
              </label>
              <textarea 
                rows="3"
                required
                placeholder="What project are you working on?"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-all duration-500 text-white placeholder:text-gray-400 resize-none"
                onFocus={(e) => {
                  gsap.to(e.target, { paddingLeft: 8, duration: 0.3 });
                }}
                onBlur={(e) => {
                  gsap.to(e.target, { paddingLeft: 0, duration: 0.3 });
                }}
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 group-focus-within:w-full" />
            </div>

            <div className="-mx-7 md:-mx-8 px-8 md:px-10 py-4 -mb-8 md:-mb-10">
              <button 
                type="submit"
                className="submit-btn relative w-full mt-4 flex items-center justify-center gap-3 
                          bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 
                          text-white font-bold py-4 rounded-xl transition-all duration-500 
                          shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:shadow-xl
                          overflow-hidden group"
                onMouseMove={(e) => handleMagneticEffect(e, e.currentTarget)}
                onMouseLeave={(e) => handleMagneticReset(e.currentTarget)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Send size={18} className="plane-icon relative z-10 transition-transform duration-500" />
                <span className="relative z-10 uppercase tracking-widest text-sm">Send Message</span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        input:autofill,
        input:-webkit-autofill {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}</style>
    </div>
  );
}