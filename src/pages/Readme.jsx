import React from "react";
import { usePageMeta } from "../lib/usePageMeta";

export default function Readme() {
  usePageMeta({
    title: "README.md | Jay Joshi",
    description: "README details of Jay Joshi's Developer Portfolio Workspace.",
    path: "/readme",
  });

  return (
    <div className="p-8 max-w-3xl mx-auto font-sans leading-relaxed text-white/90">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          <span className="text-accent font-mono">#</span> JAY_JOSHI_WORKSPACE
        </h1>
        <p className="text-white/40 text-xs mt-2 font-mono">Last modified: June 2026 | Version: 1.0.6</p>
      </div>

      <div className="space-y-6">
        {/* Intro */}
        <div>
          <h2 className="text-xl font-bold text-accent-hover mt-6 mb-2">👋 Welcome!</h2>
          <p>
            I'm a B.Tech Computer Science student specializing in the intersection of 
            <strong className="text-white font-semibold"> Artificial Intelligence/Machine Learning</strong> and 
            <strong className="text-white font-semibold"> High-Performance Frontend Engineering</strong>. 
            I build low-latency computer vision pipelines, secure developer tooling, and premium interactive web interfaces.
          </p>
        </div>

        {/* Focus Areas */}
        <div>
          <h2 className="text-xl font-bold text-accent-hover mt-6 mb-2">🎯 Primary Workspaces</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong className="text-accent-hover">AI / Computer Vision:</strong> Real-time object detection and tracking systems (YOLOv8 + DeepSORT), optimized neural network pipelines, and automated intelligence.
            </li>
            <li>
              <strong className="text-accent-hover">Interactive Frontend:</strong> Sleek web applications with advanced GPU accelerations, standard-compliant semantic accessibility, and high-FPS micro-animations using GSAP & Framer Motion.
            </li>
          </ul>
        </div>

        {/* Navigation & Terminal Tips */}
        <div>
          <h2 className="text-xl font-bold text-accent-hover mt-6 mb-2">💻 Interactive Terminal & Navigation Tips</h2>
          <p className="mb-3">
            Since this portfolio is themed as an IDE workspace, you can navigate and query metadata using the interactive terminal panel at the bottom of your screen.
          </p>
          
          <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-accent-hover border border-white/5 space-y-1 mb-4">
            <p><span className="text-white/40">$</span> ls <span className="text-white/40"># List all available files and pages</span></p>
            <p><span className="text-white/40">$</span> cd projects <span className="text-white/40"># Navigate to Projects page</span></p>
            <p><span className="text-white/40">$</span> cat README.md <span className="text-white/40"># Print this readme file in terminal history</span></p>
            <p><span className="text-white/40">$</span> theme dracula <span className="text-white/40"># Instantly switch themes (glass, dracula, one-dark, nord, synthwave)</span></p>
            <p><span className="text-white/40">$</span> neofetch <span className="text-white/40"># Display developer specifications and bio info</span></p>
          </div>

          <div className="space-y-2 text-sm border-l-2 border-accent/30 pl-4 py-1">
            <p>
              💡 <strong className="text-accent-hover">History:</strong> Use the <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">ArrowUp</span> and <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">ArrowDown</span> keys to cycle through previously typed commands.
            </p>
            <p>
              💡 <strong className="text-accent-hover">Terminal Toggle:</strong> Use the <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">Ctrl + `</span> shortcut or click the status bar terminal icon to collapse/restore the console panel.
            </p>
            <p>
              💡 <strong className="text-accent-hover">Fast Shortcuts:</strong> Skip typing <span className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded text-accent-hover">cd</span>! Simply type the file name directly (e.g. <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">skills</span> or <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">contact</span>) to navigate.
            </p>
            <p>
              💡 <strong className="text-accent-hover">Clear Screen:</strong> Clean up your console stack at any time by typing <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">clear</span> or <span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded text-accent-hover">cls</span>.
            </p>
          </div>
        </div>

        {/* Easter Eggs */}
        <div>
          <h2 className="text-xl font-bold text-accent-hover mt-6 mb-2">🕵️ Easter Eggs</h2>
          <p>
            A security token-based admin view (<code className="text-accent-hover font-mono bg-white/5 px-1 py-0.5 rounded text-xs">Epoxy</code>) is hidden in the workspace. You can bypass the standard sequence by typing <code className="text-accent-hover font-mono bg-white/5 px-1 py-0.5 rounded text-xs">epoxy</code> in the terminal.
          </p>
        </div>
      </div>
    </div>
  );
}
