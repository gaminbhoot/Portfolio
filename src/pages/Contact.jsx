import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { gsap } from 'gsap';

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
      ".reveal",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
    );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your requested placeholder functionality
    alert("Message feature integration coming soon! Feel free to use the direct email link for now.");
  };

  return (
    <div ref={containerRef} className="container mx-auto px-6 pt-2 pb-12 text-white">
      
      {/* HEADER: Reduced top margin and padding for a tighter look */}
      <div className="border-b border-white/10 pb-6 mb-8 mt-0">
        <h1 
          className="reveal text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none" 
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Get In <span className="text-indigo-400">Touch</span>
        </h1>
      </div>

      {/* MAIN BOX: Glassmorphism + 1820 structural grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-visible backdrop-blur-xl"
           style={{ background: "linear-gradient(145deg, rgba(20, 20, 25, 0.4) 0%, rgba(60, 60, 80, 0.2) 100%)" }}>
        
        {/* LEFT COLUMN: CONTACT LINKS */}
        <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-10">
          <p className="reveal text-xl text-gray-400 max-w-sm">
           From interfaces to intelligence, if you’re building something thoughtful, let’s talk.
          </p>

          <div className="space-y-6">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com" 
              target="_blank" rel="noopener noreferrer"
              className="reveal flex items-center gap-5 group"
            >
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10 transition-all">
                <Mail size={22} className="text-indigo-400" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-colors">jay05.joshi@gmail.com</p>
            </a>

            <a href="https://github.com/gaminbhoot" target="_blank" rel="noreferrer" className="reveal flex items-center gap-5 group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10 transition-all">
                <Github size={22} className="text-indigo-400" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-colors">@gaminbhoot</p>
            </a>

            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noreferrer" className="reveal flex items-center gap-5 group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10 transition-all">
                <Linkedin size={22} className="text-indigo-400" />
              </div>
              <p className="text-md font-medium group-hover:text-white transition-colors">Jay Joshi</p>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="p-8 md:p-10 bg-black/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="reveal group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-1 block">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-colors text-white placeholder:text-gray-400"
              />
            </div>

            <div className="reveal group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-1 block">Email</label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-colors text-white placeholder:text-gray-400"
              />
            </div>

            <div className="reveal group relative">
              <label className="text-[10px] uppercase text-indigo-400 tracking-[0.2em] mb-1 block">Message</label>
              <textarea 
                rows="3"
                required
                placeholder="What project are you working on?"
                className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-400 transition-colors text-white placeholder:text-gray-400 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="reveal relative z-10 w-full mt-4 flex items-center justify-center gap-3 
                        bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-4 
                        rounded-xl transition-all duration-400 active:scale-95 
                        shadow-lg shadow-indigo-500/20"
            >
              <Send size={18} />
              <span className="uppercase tracking-widest text-sm">Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}