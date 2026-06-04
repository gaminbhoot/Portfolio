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
          <span className="text-indigo-400 font-mono">#</span> JAY_JOSHI_WORKSPACE
        </h1>
        <p className="text-white/40 text-xs mt-2 font-mono">Last modified: June 2026 | Version: 1.0.6</p>
      </div>

      <div className="space-y-6">
        {/* Intro */}
        <div>
          <h2 className="text-xl font-bold text-indigo-300 mt-6 mb-2">👋 Welcome!</h2>
          <p>
            I'm a B.Tech Computer Science student specializing in the intersection of 
            <strong className="text-white font-semibold"> Artificial Intelligence/Machine Learning</strong> and 
            <strong className="text-white font-semibold"> High-Performance Frontend Engineering</strong>. 
            I build low-latency computer vision pipelines, secure developer tooling, and premium interactive web interfaces.
          </p>
        </div>

        {/* Focus Areas */}
        <div>
          <h2 className="text-xl font-bold text-indigo-300 mt-6 mb-2">🎯 Primary Workspaces</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong className="text-indigo-200">AI / Computer Vision:</strong> Real-time object detection and tracking systems (YOLOv8 + DeepSORT), optimized neural network pipelines, and automated intelligence.
            </li>
            <li>
              <strong className="text-indigo-200">Interactive Frontend:</strong> Sleek web applications with advanced GPU accelerations, standard-compliant semantic accessibility, and high-FPS micro-animations using GSAP & Framer Motion.
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-xl font-bold text-indigo-300 mt-6 mb-2">💻 Navigation via Terminal</h2>
          <p className="mb-3">
            Since this portfolio is themed as an IDE workspace, you can navigate using the interactive terminal panel at the bottom of your screen. Click inside the terminal and type:
          </p>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-indigo-300 border border-white/5 space-y-1">
            <p><span className="text-white/40">$</span> ls <span className="text-white/40"># List available workspace files</span></p>
            <p><span className="text-white/40">$</span> cd projects <span className="text-white/40"># View my systems engineering case studies</span></p>
            <p><span className="text-white/40">$</span> cd skills <span className="text-white/40"># View technical certifications & stack</span></p>
            <p><span className="text-white/40">$</span> theme synthwave <span className="text-white/40"># Toggle color palettes (glass, dracula, one-dark, nord, synthwave)</span></p>
          </div>
        </div>

        {/* Easter Eggs */}
        <div>
          <h2 className="text-xl font-bold text-indigo-300 mt-6 mb-2">🕵️ Easter Eggs</h2>
          <p>
            A security token-based admin view (<code className="text-indigo-300 font-mono bg-white/5 px-1 py-0.5 rounded text-xs">Epoxy</code>) is hidden in the workspace. You can bypass the standard sequence by typing <code className="text-indigo-300 font-mono bg-white/5 px-1 py-0.5 rounded text-xs">epoxy</code> in the terminal.
          </p>
        </div>
      </div>
    </div>
  );
}
