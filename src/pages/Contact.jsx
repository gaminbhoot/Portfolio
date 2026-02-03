import React from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message feature integration coming soon!");
  };

  return (
    <div className="container mx-auto px-10 py-0  text-white">
      <div className="flex flex-col lg:flex-row items-start gap-16 w-full">
        
        {/* LEFT SIDE: Heading & Direct Links */}
        <div className="flex-1 max-w-xl">
          <h1 
            className="text-6xl font-bold mb-2 uppercase text-white tracking-tight" 
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            GET IN TOUCH
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            I'm always open to discussing web development projects, networking architecture, or potential collaborations.
          </p>

          <div className="space-y-6">
            <a href="mailto:jay05.joshi@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest">Email</p>
                <p className="text-lg font-medium">jay05.joshi@gmail.com</p>
              </div>
            </a>

            <a href="https://github.com/gaminbhoot" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10">
                <Github size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest">GitHub</p>
                <p className="text-lg font-medium">@gaminbhoot</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 border border-white/10">
                <Linkedin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest">LinkedIn</p>
                <p className="text-lg font-medium">Jay Joshi</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Contact Form (Glassmorphism Style) */}
        <div className="flex-1 w-full max-w-lg">
          <form 
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-white/10 backdrop-blur-md"
            style={{ background: "linear-gradient(145deg, rgba(96, 73, 110, 0.15) 0%, rgba(113, 196, 255, 0.05) 100%)" }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                placeholder="What's on your mind?"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Send size={18} />
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}