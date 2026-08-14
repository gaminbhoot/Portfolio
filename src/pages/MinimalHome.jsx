import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { usePageMeta } from "../lib/usePageMeta";

export default function MinimalHome() {
  usePageMeta({
    title: "Portfolio | Jay Joshi",
    description: "Explore my projects, skills, and professional journey. Available for new opportunities and collaborations.",
    path: "/",
    image: "https://www.bencodes.de/img/portfolio/landing.webp",
  });

  const [formStatus, setFormStatus] = useState("idle");
  const [hovered, setHovered] = useState(null);
  const [direction, setDirection] = useState(0);
  const prevHoveredRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.8 });
  const [secretClicks, setSecretClicks] = useState([]);
  const secretCode = ["hero", "projects", "skill-0", "skill-2", "skill-1"];

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 140);
  };

  const handleHover = (idx) => {
    if (idx !== hovered) {
      const prev = prevHoveredRef.current;
      if (prev !== null && idx !== null) {
        setDirection(idx > prev ? 1 : -1);
      } else {
        setDirection(0);
      }
      prevHoveredRef.current = idx;
      setHovered(idx);
    }
  };

  const handleSecretClick = (id) => {
    setSecretClicks((prev) => {
      const next = [...prev, id].slice(-10);
      const recent = next.slice(-secretCode.length);
      if (JSON.stringify(recent) === JSON.stringify(secretCode)) {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem("epoxyAccessToken", token);
        setTimeout(() => (window.location.href = `/${token}`), 300);
        return [];
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === "submitting") return;
    setFormStatus("submitting");
    const formData = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/mnjgywzg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setFormStatus("success"); e.target.reset(); } else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  // Bencodes projects mapped to your data — keep 5 but in bencodes list style
  const rows = projectsData.map((p, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: p.title.replace(" - Secure Data Sanitization", "").replace(" - ", " ").replace("Real-Time AI Motion Detection & Tracking System", "AI Motion Tracker").replace("Abhisar: Groq-Powered LLM Product", "Abhisar"),
    category: i === 0 ? "Computer Vision / Systems" : i === 1 ? "System Security" : i === 2 ? "Full-Stack AI Product" : i === 3 ? "Systems & Tooling" : "Machine Learning",
    image: p.thumbnail,
    full: p.category,
  }));

  // For exact screenshot match, override first 4 titles to match bencodes typography demo if you want 1:1
  // Keep your titles but style exactly like MeetMate/fishtrack/TCG-Home/Portfolio

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* ——— HERO ——— keep your black hero but Polish per bencodes: centered, Khula */}
      <section className="w-screen min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ background: "var(--landing-bg-image)", backgroundColor: "var(--dark)" }}>
        <img src="/landing.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none" />
        <div className="relative z-10 max-w-[1000px] px-4 w-full text-center">
          <h1 className="khula-semibold text-6xl max-sm:text-[10vw] leading-[1.1] text-white" onClick={() => handleSecretClick("hero")}>
            I believe in building
            <br />
            <span className="text-[var(--gray-1)]">AI systems & frontend</span> experiences that solve real problems.
          </h1>
          <div className="mt-[10vh] max-w-[500px] mx-auto">
            <p className="text-gray-3 poppins-light-italic mb-1 select-none text-sm">This is me.</p>
            <hr className="bg-[var(--gray-3)] origin-left w-full border-none h-px" />
            <p className="mt-4 text-[var(--gray-1)] poppins-light leading-[123%] text-sm text-center">
              20-year-old CS student from Noida. Groq LLM, YOLOv8 + DeepSORT, OctaWipe.
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase poppins-light text-white">Scroll</span>
          <div className="w-px h-12 bg-[var(--gray-3)]" />
        </div>
      </section>

      {/* ——— ABOUT ——— keep minimal but not in screenshots, so slim */}
      <section id="about" className="bg-[var(--dark)] text-white w-screen flex justify-center items-center px-4 py-20 border-t border-[var(--gray-4)]">
        <div className="max-w-[1000px] w-full text-center">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] mb-8">About Me</h2>
          <p className="max-w-[600px] mx-auto text-[var(--gray-1)] poppins-light leading-relaxed">
            CS undergraduate building production AI and polished frontends. Practical architecture, measurable perf, explainable design.
          </p>
        </div>
      </section>

      {/* ——— PROJECTS ——— EXACT bencodes: white, Selected Projects, text rows + hover preview */}
      <section id="projects" className="w-screen bg-white text-black py-24 px-4">
        <div className="max-w-[900px] mx-auto">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-16" style={{ color: "black" }}>Selected Projects</h2>

          <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => { prevHoveredRef.current = null; setHovered(null); }}>
            {/* Hover preview — follows cursor with spring + directional page turn like bencodes (01→02 page up, 02→01 page down) */}
            <AnimatePresence mode="popLayout" custom={direction}>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({ opacity: 0, y: dir > 0 ? -28 : dir < 0 ? 28 : 12, scale: 0.96 }),
                    center: { opacity: 1, y: 0, scale: 1 },
                    exit: (dir) => ({ opacity: 0, y: dir > 0 ? 28 : dir < 0 ? -28 : 12, scale: 0.96 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.85 }}
                  className="pointer-events-none hidden md:block fixed z-10 w-[385px] aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-black/5 bg-black"
                  style={{ left: springX, top: springY }}
                >
                  <motion.img
                    key={hovered}
                    src={rows[hovered].image}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-0">
              {rows.map((r, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => handleHover(idx)}
                  onClick={() => handleSecretClick("projects")}
                  className="group relative flex items-center justify-between py-12 border-t border-black/20 last:border-b cursor-pointer"
                  style={{ borderColor: hovered === idx ? "black" : "rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm poppins-light" style={{ color: hovered === idx ? "black" : "#888" }}>{r.number}</span>
                    <h3 className={`text-5xl max-sm:text-[8vw] tracking-tight transition-all ${hovered !== null && hovered !== idx ? "opacity-30" : "opacity-100"}`} style={{ fontFamily: hovered === idx ? "Poppins, sans-serif" : "Khula, sans-serif", fontWeight: hovered === idx ? 500 : 400, color: hovered === idx ? "black" : hovered !== null ? "#888" : "black" }}>
                      {r.title}
                    </h3>
                  </div>
                  <span className={`hidden md:block text-sm poppins-light whitespace-nowrap ml-8 transition-colors ${hovered !== null && hovered !== idx ? "opacity-30" : "opacity-100"}`} style={{ color: hovered === idx ? "black" : "#666" }}>
                    {r.category}
                  </span>
                  {/* Mobile category below */}
                  <span className="md:hidden absolute bottom-3 right-0 text-xs poppins-light" style={{ color: "#888" }}>{r.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— SKILLS ——— keep but slim, white bg like projects */}
      <section id="skills" className="w-screen bg-white text-black py-16 px-4 border-t border-black/10">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-10">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Primary", items: ["Python", "YOLOv8 & Computer Vision", "React · Vite", "Tailwind CSS", "Flask", "Java"] },
              { label: "Working", items: ["OpenCV · Deep SORT", "Ollama · vLLM", "NumPy · Pandas", "PHP", "GSAP · Framer", "Three.js"] },
              { label: "Learning", items: ["Hugging Face", "Reinforcement Learning", "TypeScript", "FastAPI", "Next.js", "Docker · K8s"] },
            ].map((tier, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="khula-light text-sm tracking-widest uppercase" style={{ color: "#666" }}>{tier.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {tier.items.map((s) => (
                    <span key={s} onClick={() => handleSecretClick(`skill-${idx}`)} className="px-3 py-1.5 rounded-full border text-xs poppins-light cursor-pointer" style={{ borderColor: "#e5e7eb", color: "#111" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="opacity-0 h-0 overflow-hidden" aria-hidden>
            <span onClick={() => handleSecretClick("skill-0")}>cert-0</span>
            <span onClick={() => handleSecretClick("skill-1")}>cert-1</span>
            <span onClick={() => handleSecretClick("skill-2")}>cert-2</span>
          </div>
        </div>
      </section>

      {/* ——— CONTACT ——— EXACT bencodes: Want to collaborate? Let's have a chat! + Email/LinkedIn pills + bb */}
      <section id="contact" className="relative w-screen bg-white text-black py-24 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        {/* blurred blobs bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#b1afff]/30 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#bbe9ff]/30 blur-[100px] rounded-full translate-y-1/3 translate-x-1/4" />
        <div className="relative z-10 w-full max-w-[800px] mx-auto text-center">
          <p className="poppins-semibold text-lg" style={{ color: "#666" }}>Want to collaborate?</p>
          <h2 className="khula-bold text-6xl md:text-7xl tracking-tight mt-2" style={{ color: "black" }}>Let&apos;s have a chat!</h2>
          <div className="mt-10 flex justify-center gap-4">
            <a href="mailto:jay05.joshi@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black poppins-regular text-sm hover:bg-black hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7L22 6"/></svg>
              Email
            </a>
            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black poppins-regular text-sm hover:bg-black hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
          <div className="mt-16">
            <p className="khula-bold text-xl">bb</p>
            <p className="poppins-light" style={{ color: "black" }}>Jay Joshi</p>
            <p className="text-xs poppins-light mt-1" style={{ color: "#888" }}>Portfolio — AI/ML & Frontend</p>
          </div>
          <p className="mt-12 text-xs poppins-light max-w-[500px] mx-auto leading-relaxed" style={{ color: "#888" }}>
            © {new Date().getFullYear()} Jay Joshi. All rights reserved. Location: Noida, India.<br />
            This site showcases my personal projects and professional work. Content may not be used without permission.
          </p>
        </div>
      </section>
    </div>
  );
}
