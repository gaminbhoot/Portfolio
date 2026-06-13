import React from "react";
import { usePageMeta } from "../lib/usePageMeta";
import {
  FileText,
  User,
  Settings,
  Folder,
  Award,
  Terminal,
  Laptop,
  Mail,
  Github,
  Linkedin,
  Info,
  Crown
} from "lucide-react";

export default function Readme() {
  usePageMeta({
    title: "README.md | Jay Joshi",
    description: "A comprehensive professional summary workspace outlining personal setup, skills, projects, and certifications.",
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
        <p className="text-sm md:text-base text-[var(--accent-color)] font-medium tracking-wide uppercase mb-4">
          AI/ML Engineer &amp; Frontend Developer
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
          <a href="mailto:jay05.joshi@gmail.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-white/[0.02] text-white/75 hover:border-[var(--accent-color)]/55 hover:text-white transition-all">
            <Mail size={14} className="text-[var(--accent-color)]" />
            jay05.joshi@gmail.com
          </a>
          <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-white/[0.02] text-white/75 hover:border-[var(--accent-color)]/55 hover:text-white transition-all">
            <Linkedin size={14} className="text-[var(--accent-color)]" />
            LinkedIn ↗
          </a>
          <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-white/[0.02] text-white/75 hover:border-[var(--accent-color)]/55 hover:text-white transition-all">
            <Github size={14} className="text-[var(--accent-color)]" />
            GitHub ↗
          </a>
        </div>
      </div>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Personal Development Stack Section (FIRST SECTION) */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <Laptop size={20} />
          Personal Development Stack
        </h2>
        
        <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-4">
          <li>
            <strong>Platform:</strong> MacBook Pro (M5 Pro) is my primary daily workhorse, handling heavy local compilation, AI/ML model prototyping, and WebGL rendering tasks with absolute ease. I am also highly proficient in Windows development workflows, system administration, and task automation. Additionally, I am currently exploring Fedora Workstation 44 to learn Linux directory structures, system kernels, package managers (dnf), and terminal administration.
          </li>
          <li>
            <strong>Terminal:</strong> On macOS, I stick with the native macOS Terminal running Zsh. In my Windows workflow, I rely on PowerShell for advanced task scripting and server execution. Under Fedora, I explore the CLI using the default GNOME Terminal and Bash.
          </li>
          <li>
            <strong>IDE:</strong> I use VS Code for lightweight frontend scripting and Antigravity for autonomous, agent-based sessions. For larger back-end pipelines or Python projects, I transition to JetBrains IDEs (like PyCharm/WebStorm), and I have also explored using Neovim in the terminal.
          </li>
        </ul>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 font-bold text-lg md:text-xl text-[var(--accent-color)] mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <User size={20} />
          Summary
        </h2>
        
        <div className="space-y-6 pl-1">
          {/* Executive Summary */}
          <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-2">
            <li>
              Computer Science undergraduate building production-oriented AI models and polished creative web interfaces.
            </li>
            <li>
              Hands-on work spanning real-time computer vision tracking, secure system sanitization, LLMs, and compiled languages.
            </li>
            <li>
              Prioritizes practical code architecture, measurable performance, and explainable design patterns.
            </li>
          </ul>

          {/* Technical Skillset Matrix */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-sm md:text-base text-white mb-2">
              <Settings size={16} className="text-[var(--accent-color)]" />
              Technical Skillset
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-4">
              <li>
                <strong>Primary Core:</strong> Python (Data Science, EDA, Computer Vision, NLP), React (JS, Vite, Tailwind CSS), Flask backend setups, Java compiler design, and Git code management.
              </li>
              <li>
                <strong>Working Knowledge:</strong> OpenCV and Deep SORT tracking models, local LLM architectures (Ollama, vLLM, llama.cpp), Pandas/NumPy analytics, PHP, GSAP and Framer Motion layouts, and Three.js WebGL rendering.
              </li>
              <li>
                <strong>Currently Exploring:</strong> Hugging Face Transformers, Reinforcement Learning, TypeScript, FastAPI backend servers, Next.js, Docker containers, Kafka pipelines, and Linux administration.
              </li>
            </ul>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-sm md:text-base text-white mb-2">
              <Folder size={16} className="text-[var(--accent-color)]" />
               Projects
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-2">
              <li><strong>Real-Time AI Motion Tracker</strong> (Computer Vision / Systems Engineering)</li>
              <li><strong>Abhisar LLM Workspace</strong> (Conversational AI / Full-Stack)</li>
              <li><strong>SysAware ML Optimizer</strong> (Deep Learning Optimization Tooling)</li>
              <li><strong>OctaWipe Sanitizer</strong> (Storage Security &amp; System Tools)</li>
              <li><strong>Java Compiler Parser</strong> (Compiler Design)</li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-sm md:text-base text-white mb-2">
              <Award size={16} className="text-[var(--accent-color)]" />
              Certifications
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-2">
              <li><strong>Python for Data Science</strong> - NPTEL</li>
              <li><strong>CCNA: Introduction to Networks</strong> - Cisco</li>
              <li><strong>Data Science and Machine Learning</strong> - Masai X IIT Guwahati</li>
            </ul>
          </div>

          {/* Personal Note */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-sm md:text-base text-white mb-2">
              <Crown size={16} className="text-[var(--accent-color)]" />
              A Personal Note
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[var(--text-muted)] space-y-2">
              <li>
                <strong>A Standard of Excellence:</strong> I operate with a deep commitment to perfection, ensuring every line of code, visual layout, and development environment is built to a top-notch standard.
              </li>
              <li>
                <strong>Creative Iteration:</strong> I find creative inspiration in the work of peers and industry leaders, analyzing what works well to refine, build upon, and integrate those concepts into my own systems.
              </li>
              <li>
                <strong>Leadership &amp; Collaboration:</strong> I naturally transition into ownership roles where I can take charge of features and direction, paired with patience, support, and mentorship for my teammates.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-0 border-t border-[var(--border-color)] my-8" />

      {/* Terminal Command Guide */}
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
              The terminal environment runs on a custom simulated kernel. While the table above outlines the primary navigation utilities, several undocumented commands and retro hardware key sequences remain active. Exploring and testing different terminal prompts will uncover hidden diagnostic readouts, console widgets, and easter eggs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
