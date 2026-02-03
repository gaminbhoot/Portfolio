import React from "react";
import Terminal from "../components/Terminal";
import ScrollArea from "../components/ScrollArea";
import ScrollList from "../components/ScrollList";

export default function Skills() {
  // Inline data for now (simple, honest, extensible later)
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
     <div className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Skills
        </h1>
        <p className="mt-3 text-gray-200 max-w-xl">
          A curated stack of tools, technologies, and systems I’ve actually built with — not just listed.
        </p>
      </div>

      {/* Terminal Section */}
      <Terminal title="skills.sh" subtitle="scrollable skill index">
        <ScrollArea
          maxHeight={600}
          theme="none"
          smooth
          className="pr-2"
        >
          <ScrollList
            data={skills}
            itemHeight={120}
            renderItem={(skill, index) => (
              <div
                className="
                  h-full w-full flex items-center
                  rounded-xl border border-white/10
                  bg-white/5 backdrop-blur-md
                  px-6
                "
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
  );
}
