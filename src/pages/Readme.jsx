import React from "react";
import { usePageMeta } from "../lib/usePageMeta";
import {
  FileText,
  User,
  Terminal,
  Cpu,
  Layout,
  Rocket,
  Settings,
  Eye,
  Shield,
  Award,
  Info,
  Folder
} from "lucide-react";

export default function Readme() {
  usePageMeta({
    title: "README.md | Jay Joshi",
    description: "IDE-themed portfolio workspace README outlining executive summary, terminal commands, skills, and highlights.",
    path: "/readme",
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto leading-relaxed select-text" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Tab Path Bar */}
      <div className="border-b border-white/10 pb-3 mb-6 select-none flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[var(--accent-color)]" />
          <span className="text-white/40 text-xs font-mono">workspace / README.md</span>
        </div>
        <span className="text-white/20 text-[10px] font-mono select-none">Markdown View</span>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col items-center text-center my-8">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/25 flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent-color)]/5">
          <FileText size={32} className="text-[var(--accent-color)]" />
        </div>
        <h1 className="font-bold text-3xl md:text-4xl tracking-wider mb-2 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          JAY JOSHI
        </h1>
        <p className="text-sm md:text-base text-[var(--accent-color)] font-medium tracking-wide uppercase">
          AI/ML Engineer &amp; Frontend Developer
        </p>
      </div>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Executive Summary */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <User size={20} />
          Executive Summary
        </h2>
        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed pl-1">
          Computer Science undergraduate focused on building production-oriented AI systems and polished frontend experiences. Hands-on work spans real-time computer vision, secure systems tooling, LLM product development, and full-stack engineering. Prioritizes practical architecture, measurable performance, and explainable implementation over demo-only prototypes.
        </p>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Integrated Terminal Environment */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <Terminal size={20} />
          Integrated Terminal Environment
        </h2>
        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6 pl-1">
          The portfolio features a fully interactive developer terminal panel styled after modern IDE layouts. You can expand the panel and run a suite of utilities to inspect the workspace.
        </p>

        <h3 className="font-semibold text-sm text-white mb-3 pl-1">Available Shell Commands</h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] bg-black/20 shadow-xl mb-6">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--accent-color)]/[0.03] text-[var(--accent-color)]">
                <th className="p-3 font-semibold">Command</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Usage Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "help", desc: "List all available shell instructions.", ex: "help" },
                { name: "ls / dir", desc: "List files and pages inside the workspace directory.", ex: "ls" },
                { name: "cd <page>", desc: "Navigate dynamically between portfolio sections.", ex: "cd projects" },
                { name: "cat <file>", desc: "Output specific file text into the console viewport.", ex: "cat README.md" },
                { name: "theme <name>", desc: "Swap portfolio themes (glass, dracula, one-dark, nord, synthwave, grass, atomic, light).", ex: "theme synthwave" },
                { name: "neofetch", desc: "Render host stats with custom ASCII graphics corresponding to the active theme.", ex: "neofetch" },
                { name: "whoami", desc: "Query client agent, system details, local time, and authority role.", ex: "whoami" },
                { name: "ping <host>", desc: "Simulate an ICMP network diagnostics roundtrip.", ex: "ping google.com" },
                { name: "git status", desc: "Check current Git repository and HMR branch status.", ex: "git status" },
                { name: "joke", desc: "Fetch a random development/programming joke.", ex: "joke" },
                { name: "skills", desc: "Display core technical competencies inside a structured ASCII box table.", ex: "skills" },
                { name: "weather <city>", desc: "Retrieve a mock meteorology report styled in 16-color ANSI formatting.", ex: "weather Noida" },
                { name: "clear / cls", desc: "Flush output rows and reset shell lines.", ex: "clear" },
              ].map((cmd, idx) => (
                <tr
                  key={cmd.name}
                  className="border-b border-[var(--border-color)]/60 hover:bg-white/[0.02] transition-colors"
                  style={{ backgroundColor: idx % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}
                >
                  <td className="p-3 font-mono text-green-400 font-medium">{cmd.name}</td>
                  <td className="p-3 text-[var(--text-muted)]">{cmd.desc}</td>
                  <td className="p-3 font-mono text-white/50">{cmd.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning Alert Box */}
        <div className="bg-[var(--accent-color)]/[0.04] border-l-4 border-[var(--accent-color)] p-4 rounded-r-lg flex gap-3.5 my-6">
          <Info className="text-[var(--accent-color)] flex-shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="font-bold text-xs text-[var(--accent-color)] uppercase tracking-wider mb-1">
              System Diagnostics Warning
            </h4>
            <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed">
              The terminal environment runs on a custom simulated kernel. Certain unlisted developer diagnostic utilities, retro emulator subsystems, and hardware cheat codes (such as Konami sequences) remain active but hidden. Try exploring shell arguments or inputting standard hardware patterns to trigger debugging modules.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Core Skills */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <Award size={20} />
          Core Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-1">
          {/* AI/ML & Systems */}
          <div className="bg-white/[0.01] border border-[var(--border-color)] rounded-xl p-5 shadow-lg">
            <h3 className="flex items-center gap-2 font-bold text-white mb-4 text-sm md:text-base" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <Cpu size={18} className="text-[var(--accent-color)]" />
              AI/ML &amp; Systems
            </h3>
            <ul className="list-disc pl-5 text-[var(--text-muted)] text-sm space-y-2.5">
              <li>Python (PyTorch, OpenCV)</li>
              <li>Real-time Computer Vision Pipelines (YOLOv8)</li>
              <li>Multi-Object Tracking (Deep SORT, Kalman Filtering)</li>
              <li>NLP and Conversational AI Architecture</li>
              <li>Model Optimization &amp; Quantization (Linear, Conv, RNNs)</li>
            </ul>
          </div>

          {/* Frontend & Engineering */}
          <div className="bg-white/[0.01] border border-[var(--border-color)] rounded-xl p-5 shadow-lg">
            <h3 className="flex items-center gap-2 font-bold text-white mb-4 text-sm md:text-base" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <Layout size={18} className="text-[var(--accent-color)]" />
              Frontend &amp; Engineering
            </h3>
            <ul className="list-disc pl-5 text-[var(--text-muted)] text-sm space-y-2.5">
              <li>React.js, JavaScript, Vite.js</li>
              <li>Tailwind CSS, Vanilla CSS</li>
              <li>High-performance Animations (GSAP, Framer Motion)</li>
              <li>Three.js WebGL Integrations</li>
              <li>Responsive, Accessible, and Semantic UX</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Project Highlights */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <Folder size={20} />
          Project Portfolio Highlights
        </h2>

        <div className="space-y-5 pl-1">
          {[
            {
              title: "Abhisar: Groq-Powered LLM Product",
              icon: <Rocket size={16} className="text-[var(--accent-color)]" />,
              domain: "Conversational AI (Full-Stack)",
              stack: "React, Node.js, Express, Groq Inference Engine",
              achieve: "Streaming chat middleware optimized to deliver sub-100ms time to first token."
            },
            {
              title: "SysAware ML Optimizer",
              icon: <Settings size={16} className="text-[var(--accent-color)]" />,
              domain: "Deep Learning Optimization Tooling",
              stack: "Python, PyTorch, CUDA, MPS Core",
              achieve: "Dynamic profiling wrapper supporting quantization pathways across Linear, Conv, and LSTM blocks."
            },
            {
              title: "Real-Time AI Surveillance & Analytics",
              icon: <Eye size={16} className="text-[var(--accent-color)]" />,
              domain: "Computer Vision",
              stack: "Python, YOLOv8, Deep SORT, Flask, OpenCV",
              achieve: "Integrated detection + tracking pipeline delivering 12-18 FPS on mid-range hardware."
            },
            {
              title: "OctaWipe: Secure Data Sanitization",
              icon: <Shield size={16} className="text-[var(--accent-color)]" />,
              domain: "Storage Security & System Tools",
              stack: "C, Shell Scripting, PXE Boot protocols",
              achieve: "Sanitization tooling compliant with NIST 800-88 and DoD 5220.22-M with hash signing."
            }
          ].map((project) => (
            <div key={project.title} className="bg-white/[0.01] border border-[var(--border-color)]/60 rounded-xl p-5 hover:border-[var(--accent-color)]/40 transition-all duration-300 shadow-md">
              <h3 className="flex items-center gap-2 font-bold text-white text-sm md:text-base mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {project.icon}
                {project.title}
              </h3>
              <div className="text-xs md:text-sm text-[var(--text-muted)] space-y-1.5 ml-6">
                <div><strong>Domain:</strong> {project.domain}</div>
                <div><strong>Stack:</strong> {project.stack}</div>
                <div className="text-white/80 mt-1"><strong>Key Achievement:</strong> {project.achieve}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <Award size={20} />
          Certifications
        </h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] text-sm space-y-2.5 pl-6">
          <li><strong>Python for Data Science</strong> — NPTEL</li>
          <li><strong>CCNA: Introduction to Networks</strong> — Cisco Networking Academy</li>
          <li><strong>Data Science and Machine Learning</strong> — Masai X IIT Guwahati</li>
        </ul>
      </section>
    </div>
  );
}
