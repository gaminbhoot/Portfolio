import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Terminal from "../components/Terminal";
import ScrollArea from "../components/ScrollArea";
import ScrollList from "../components/ScrollList";

export default function Skills() {
  const containerRef = useRef(null);

  // Match Contact page reveal behavior (slightly refined)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Node.js",
    "Python",
    "Computer Vision",
    "YOLOv8",
    "Neural Networks",
    "Machine Learning",
    "Git & GitHub",
  ];

  return (
    <div
      ref={containerRef}
      className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white"
    >
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1
          className="reveal text-4xl md:text-6xl font-black tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Skills
        </h1>

        <p className="reveal mt-3 text-gray-200 max-w-3xl">
          A curated stack of tools, technologies, and systems I’ve actually built
          with — not just listed
        </p>

        {/* Thin divider (intentional separation, like Contact) */}
        <div className="reveal mt-6 h-px w-full bg-white/10" />
      </div>

      {/* Terminal Section */}
      <div className="reveal">
        <Terminal title="skills.sh" subtitle="scrollable skill index">
          <ScrollArea maxHeight={600} theme="none" smooth className="pr-2">
            <ScrollList
              data={skills}
              itemHeight={88}
              renderItem={(skill, index) => (
                <div
                  className="
                    h-full w-full flex items-center
                    border border-white/10
                    bg-white/5 backdrop-blur-md
                    px-6
                    transition-colors duration-300
                  "
                  style={{borderRadius:50}}
                >
                  <span className="text-sm font-mono text-indigo-400 mr-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-wide">
                    {skill}
                  </span>
                </div>
              )}
            />
          </ScrollArea>
        </Terminal>
      </div>
    </div>
  );
}
