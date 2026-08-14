import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { usePageMeta } from "../lib/usePageMeta";
import CurveWipe from "../components/CurveWipe";

export default function MinimalHome() {
  const [asciiArt, setAsciiArt] = React.useState("");
  React.useEffect(() => {
    fetch("/jay-ascii.txt").then(r => r.text()).then(t => setAsciiArt(t)).catch(()=>{});
  }, []);
  usePageMeta({
    title: "Portfolio | Jay Joshi",
    description: "Explore my projects, skills, and professional journey. Available for new opportunities and collaborations.",
    path: "/",
    image: "https://www.bencodes.de/img/portfolio/landing.webp",
  });

  const [formStatus, setFormStatus] = useState("idle");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("idle");
  const [hovered, setHovered] = useState(null);
  const [wipeActive, setWipeActive] = useState(false);
  const navigate = useNavigate();
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

  const handleProjectClick = (id) => {
    // Save scroll position to restore on close (not top)
    sessionStorage.setItem("projectsScrollY", String(window.scrollY));
    setWipeActive(true);
    setTimeout(() => navigate(`/project/${id}`), 620);
  };

  useEffect(() => {
    const y = sessionStorage.getItem("projectsScrollY");
    if (y) setTimeout(() => window.scrollTo(0, parseInt(y, 10)), 30);
  }, []);

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

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (modalStatus === "submitting") return;
    setModalStatus("submitting");
    const formData = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/mnjgywzg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setModalStatus("success"); e.target.reset(); } else setModalStatus("error");
    } catch { setModalStatus("error"); }
  };

  // Close modal on Escape + lock scroll
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setEmailModalOpen(false); };
    if (emailModalOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // reset modal status when closed
      if (modalStatus === "success" || modalStatus === "error") setTimeout(() => setModalStatus("idle"), 300);
    }
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [emailModalOpen, modalStatus]);

  // Bencodes projects mapped to your data — keep 5 but in bencodes list style
  const rows = projectsData.map((p, i) => ({
    id: p.id,
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
        {asciiArt && (
          <pre className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden p-8 opacity-[0.035] text-[4px] leading-[4px] tracking-[-0.02em] font-mono whitespace-pre blur-[0.2px]" style={{ color: "white", fontFamily: "'Courier New', monospace" }} aria-hidden>{asciiArt}</pre>
        )}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 700px 450px at center, transparent 25%, black 75%)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />
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
            {/* Hover preview — window fixed, content pages inside like bencodes */}
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key="preview-window"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.85 }}
                  className="pointer-events-none hidden md:block fixed z-10 w-[385px] aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-black/5 bg-black"
                  style={{ left: springX, top: springY }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                      <motion.img
                        key={hovered}
                        custom={direction}
                        variants={{
                          enter: (dir) => ({ y: dir > 0 ? -40 : dir < 0 ? 40 : 0, opacity: 0 }),
                          center: { y: 0, opacity: 1 },
                          exit: (dir) => ({ y: dir > 0 ? 40 : dir < 0 ? -40 : 0, opacity: 0 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.9 }}
                        src={rows[hovered].image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-0">
              {rows.map((r, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => handleHover(idx)}
                  onClick={() => handleProjectClick(r.id)}
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
            <button onClick={() => setEmailModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black poppins-regular text-sm hover:bg-black hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7L22 6"/></svg>
              Email
            </button>
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

      <CurveWipe isVisible={wipeActive} />

      {/* ——— EMAIL MODAL ——— same Formspree fields, smooth pop like bencodes preview */}
      <AnimatePresence>
        {emailModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setEmailModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setEmailModalOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                  <h3 className="khula-semibold text-lg">Send a message</h3>
                  <button onClick={() => setEmailModalOpen(false)} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-black/5 transition-colors" aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="p-6">
                  {modalStatus === "success" ? (
                    <div className="py-8 text-center">
                      <p className="khula-semibold text-lg">Message sent!</p>
                      <p className="poppins-light text-sm mt-2" style={{ color: "#666" }}>Thanks — I&apos;ll get back to you shortly.</p>
                      <button onClick={() => { setEmailModalOpen(false); setTimeout(() => setModalStatus("idle"), 300); }} className="mt-6 px-6 py-2.5 rounded-full bg-black text-white poppins-regular text-sm hover:bg-black/90 transition-colors">Close</button>
                    </div>
                  ) : modalStatus === "error" ? (
                    <div className="py-8 text-center">
                      <p className="khula-semibold">Something went wrong.</p>
                      <p className="poppins-light text-sm mt-2" style={{ color: "#666" }}>Please try again or email directly.</p>
                      <button onClick={() => setModalStatus("idle")} className="mt-6 px-6 py-2.5 rounded-full border border-black poppins-regular text-sm">Try again</button>
                    </div>
                  ) : (
                    <form onSubmit={handleModalSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="space-y-1.5">
                          <span className="text-xs poppins-light" style={{ color: "#666" }}>Name</span>
                          <input name="name" required placeholder="Full Name" className="w-full rounded-xl border border-black/10 bg-[#f8f9fb] px-3.5 py-3 text-sm poppins-light placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black" />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-xs poppins-light" style={{ color: "#666" }}>Email</span>
                          <input name="email" type="email" required placeholder="email@example.com" className="w-full rounded-xl border border-black/10 bg-[#f8f9fb] px-3.5 py-3 text-sm poppins-light placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black" />
                        </label>
                      </div>
                      <label className="space-y-1.5 block">
                        <span className="text-xs poppins-light" style={{ color: "#666" }}>Subject</span>
                        <input name="subject" placeholder="Frontend Engineer @ Acme" className="w-full rounded-xl border border-black/10 bg-[#f8f9fb] px-3.5 py-3 text-sm poppins-light placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black" />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs poppins-light" style={{ color: "#666" }}>Message</span>
                        <textarea name="message" required rows={4} placeholder="What are you building?" className="w-full rounded-xl border border-black/10 bg-[#f8f9fb] px-3.5 py-3 text-sm poppins-light placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black resize-none" />
                      </label>
                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setEmailModalOpen(false)} className="flex-1 h-11 rounded-full border border-black/15 poppins-regular text-sm hover:bg-black/5 transition-colors">Cancel</button>
                        <button disabled={modalStatus === "submitting"} className="flex-1 h-11 rounded-full bg-black text-white poppins-regular text-sm hover:bg-black/90 transition-colors disabled:opacity-60">
                          {modalStatus === "submitting" ? "Sending…" : "Send Message"}
                        </button>
                      </div>
                      <p className="text-xs poppins-light text-center" style={{ color: "#888" }}>Powered by Formspree — same as the contact form</p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
