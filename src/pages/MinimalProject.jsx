import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { usePageMeta } from "../lib/usePageMeta";
import { ArrowUpRight, X, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function MinimalProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  usePageMeta({
    title: project ? `${project.title} | Jay Joshi` : "Project | Jay Joshi",
    description: project?.summary?.tagline || "Project case study",
    path: `/project/${id}`,
    image: project?.thumbnail || "/jay1.webp",
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="poppins-light text-white/50">Project not found</p>
          <Link to="/" className="mt-4 inline-flex text-sm underline">Back home</Link>
        </div>
      </div>
    );
  }

  // Map to bencodes minimal layout: title, description, technologies, image
  const description = project.summary?.projectMeta?.problem || project.summary?.tagline || "";
  const techs = project.summary?.keyTechnologies?.slice(0, 5) || [];

  const handleClose = (e) => {
    if (e) e.preventDefault();
    setClosing(true);
    setTimeout(() => navigate("/"), 650);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reverse wipe on close — curve stays UPRIGHT while going DOWN */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: closing ? "0%" : "-100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] pointer-events-none bg-black"
        style={{ display: closing ? "block" : "none" }}
      >
        <div className="absolute -bottom-[80px] left-0 w-full h-[80px] overflow-hidden">
          <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" fill="black" />
          </svg>
        </div>
      </motion.div>
      {/* Top-left close — moved from middle to top-left per fix */}
      <button onClick={handleClose} className="fixed top-6 left-6 z-40 h-10 w-10 hidden md:flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur hover:bg-white hover:text-black transition-colors" aria-label="Close">
        <X size={18} />
      </button>
      <button onClick={handleClose} className="fixed top-6 left-6 z-40 h-10 w-10 flex md:hidden items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur" aria-label="Close">
        <X size={18} />
      </button>
      {/* Header like bencodes MeetMate: large title + buttons */}
      <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between gap-6"
        >
          <h1 className="khula-semibold text-5xl md:text-7xl tracking-tight leading-none" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            {project.title.replace("Real-Time AI Motion Detection & Tracking System", "AI Motion Tracker").replace(" - Secure Data Sanitization", "").replace("Abhisar: Groq-Powered LLM Product", "Abhisar")}
          </h1>
          <div className="flex items-center gap-3 shrink-0 mt-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source Code on GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-105"
              >
                <Github size={18} />
              </a>
            )}
            {(project.prototypeLink || project.githubLink) && (
              <a
                href={project.prototypeLink || project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Project"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Description + Technologies like bencodes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-12 grid md:grid-cols-2 gap-12"
        >
          <div>
            <p className="text-xs tracking-widest uppercase poppins-light" style={{ color: "#888" }}>Description</p>
            <hr className="mt-2 border-white/20" />
            <p className="mt-6 text-sm leading-relaxed poppins-light" style={{ color: "rgba(255,255,255,0.85)" }}>
              {project.summary?.technicalHighlights?.[0]?.description || description || "Minimal case study for this project."}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase poppins-light" style={{ color: "#888" }}>Technologies</p>
            <hr className="mt-2 border-white/20" />
            <div className="mt-6 space-y-1 text-sm poppins-light">
              <p style={{ color: "#888" }}>Frontend: <span style={{ color: "white" }}>{techs.slice(0, 3).join(", ") || "React, Tailwind, Framer"}</span></p>
              <p style={{ color: "#888" }}>Backend: <span style={{ color: "white" }}>{techs.slice(3).join(", ") || "Node, Formspree, Vercel"}</span></p>
              {project.category && <p style={{ color: "#888" }}>Category: <span style={{ color: "white" }}>{project.category}</span></p>}
            </div>
          </div>
        </motion.div>

        {/* Hero image like bencodes large preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
        >
          <img src={project.heroImage || project.thumbnail} alt={project.title} className="w-full h-auto object-cover" loading="eager" decoding="async" />
        </motion.div>

        {/* Additional sections if any — minimal */}
        {project.summary?.technicalHighlights?.slice(1).map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <h3 className="khula-semibold text-xl">{h.title}</h3>
            <p className="text-sm leading-relaxed poppins-light" style={{ color: "rgba(255,255,255,0.7)" }}>{h.description}</p>
          </motion.div>
        ))}

        <div className="mt-16 flex justify-between">
          <button onClick={handleClose} className="inline-flex items-center gap-2 text-sm poppins-light hover:underline" style={{ color: "#888" }}>← Back to projects</button>
        </div>
      </div>
    </div>
  );
}
