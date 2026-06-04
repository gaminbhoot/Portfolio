import React from "react";
import { usePageMeta } from "../lib/usePageMeta";

export default function PackageJson() {
  usePageMeta({
    title: "package.json | Jay Joshi",
    description: "Dependencies and workspace metadata of Jay Joshi's Portfolio.",
    path: "/package",
  });

  const codeString = `{
  "name": "jay-joshi-portfolio",
  "version": "1.0.6",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vercel/speed-insights": "^1.3.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "detect-gpu": "^5.0.70",
    "framer-motion": "^12.29.2",
    "gsap": "^3.14.2",
    "lenis": "^1.3.17",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.13.0",
    "tailwind-merge": "^3.5.0",
    "three": "^0.182.0",
    "vite-plugin-pwa": "^1.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "sharp": "^0.34.5",
    "tailwindcss": "^3.3.0",
    "vite": "^7.3.1"
  }
}`;

  return (
    <div className="p-6 max-w-4xl mx-auto font-mono text-xs md:text-sm leading-relaxed text-accent-hover">
      <div className="border-b border-white/10 pb-3 mb-4 select-none">
        <span className="text-white/40 text-xs">src / package.json</span>
      </div>
      
      <div className="bg-black/35 rounded-lg border border-white/5 p-5 relative overflow-x-auto shadow-2xl">
        <pre className="text-accent-hover">
          <code>
            {codeString.split("\n").map((line, idx) => (
              <div key={idx} className="flex hover:bg-white/5 px-2 rounded">
                <span className="w-8 text-white/20 text-right pr-4 select-none">{idx + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
