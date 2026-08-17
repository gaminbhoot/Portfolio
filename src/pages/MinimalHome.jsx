import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { projectsData } from "../data/projectsData";
import { usePageMeta } from "../lib/usePageMeta";
import CurveWipe from "../components/CurveWipe";
import Preloader, { hasPlayedIntro } from "../components/Preloader";

// Track if this is the first mount since document load (full page load vs SPA back)
// Module-level → resets only on hard refresh, persists across SPA navigations
let isFirstHomeMount = true;

export default function MinimalHome() {
  const [asciiArt, setAsciiArt] = React.useState("");
  const [isLoading, setIsLoading] = useState(() => !hasPlayedIntro);

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
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.8 });
  const [secretClicks, setSecretClicks] = useState([]);
  const secretCode = ["hero", "projects", "skill-0", "skill-2", "skill-1"];

  const updateCoordinates = (clientX, clientY, immediate = false) => {
    if (typeof clientX !== "number" || typeof clientY !== "number") return;
    mousePosRef.current = { x: clientX, y: clientY };
    setMousePos({ x: clientX, y: clientY });

    const targetX = Math.min(window.innerWidth - 410, Math.max(20, clientX + 24));
    const targetY = Math.min(window.innerHeight - 240, Math.max(20, clientY - 140));

    if (immediate || mouseX.get() < -500 || (mouseX.get() === 0 && mouseY.get() === 0)) {
      mouseX.set(targetX);
      mouseY.set(targetY);
      if (springX.jump) springX.jump(targetX);
      if (springY.jump) springY.jump(targetY);
    } else {
      mouseX.set(targetX);
      mouseY.set(targetY);
    }
  };

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  // Global mousemove tracker so coordinates are always synced before hover
  useEffect(() => {
    const onGlobalMouseMove = (e) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onGlobalMouseMove);
  }, []);

  const handleHover = (idx, e) => {
    if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
      updateCoordinates(e.clientX, e.clientY, mouseX.get() < -500);
    }
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

  // Detect project row when scrolling with stationary cursor
  useEffect(() => {
    const handleScrollHover = () => {
      const { x, y } = mousePosRef.current;
      if (x < 0 || y < 0) return;
      const el = document.elementFromPoint(x, y);
      const row = el?.closest("[data-project-index]");
      if (row) {
        const idx = parseInt(row.getAttribute("data-project-index"), 10);
        if (!isNaN(idx) && idx !== hovered) {
          updateCoordinates(x, y);
          handleHover(idx);
        }
      } else {
        const list = document.getElementById("projects-list");
        if (list && !list.contains(el) && hovered !== null) {
          prevHoveredRef.current = null;
          setHovered(null);
        }
      }
    };

    window.addEventListener("scroll", handleScrollHover, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollHover);
  }, [hovered]);

  const handleProjectClick = (id) => {
    // Save scroll position to restore when coming back from project
    sessionStorage.setItem("projectsScrollY", String(window.scrollY));
    sessionStorage.setItem("shouldRestoreScroll", "true");
    setWipeActive(true);
    setTimeout(() => navigate(`/project/${id}`), 620);
  };

  useEffect(() => {
    // Prevent browser's own scroll restoration from fighting us
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // First mount since document load = hard refresh / direct visit → always top
    // Clears any stale position from a previous tab session
    if (isFirstHomeMount) {
      isFirstHomeMount = false;
      sessionStorage.removeItem("projectsScrollY");
      sessionStorage.removeItem("shouldRestoreScroll");
      window.scrollTo(0, 0);
      return;
    }

    // Subsequent mounts = SPA navigation back from /project/:id → restore
    const shouldRestore = sessionStorage.getItem("shouldRestoreScroll");
    const y = sessionStorage.getItem("projectsScrollY");
    if (shouldRestore && y) {
      setTimeout(() => window.scrollTo(0, parseInt(y, 10)), 40);
      sessionStorage.removeItem("projectsScrollY");
      sessionStorage.removeItem("shouldRestoreScroll");
    } else {
      // Stale value without flag — clean it
      if (y) sessionStorage.removeItem("projectsScrollY");
      if (shouldRestore) sessionStorage.removeItem("shouldRestoreScroll");
      window.scrollTo(0, 0);
    }
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

  // Age from DOB 24-06-2005 — auto-updates (same as intro page)
  const getAge = () => {
    const dob = new Date(2005, 5, 24);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  };
  const AGE = getAge();

  // Close modal on Escape + lock scroll
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setEmailModalOpen(false); };
    if (emailModalOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (modalStatus === "success" || modalStatus === "error") setTimeout(() => setModalStatus("idle"), 300);
    }
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [emailModalOpen, modalStatus]);

  // Clean mapped projects in minimal list style
  const rows = projectsData.map((p, i) => ({
    id: p.id,
    number: String(i + 1).padStart(2, "0"),
    title: p.title.replace(" - Secure Data Sanitization", "").replace(" - ", " ").replace("Real-Time AI Motion Detection & Tracking System", "AI Motion Tracker").replace("Abhisar: Groq-Powered LLM Product", "Abhisar"),
    category: p.id === "sysaware-ml-optimizer" ? "Distributed AI / ML" : p.id === "octawipe" ? "System Security" : p.id === "abhisar-llm" ? "Full-Stack AI Product" : "Computer Vision / Systems",
    image: p.thumbnail,
    full: p.category,
  }));

  // For exact screenshot match, override first 4 titles to match bencodes typography demo if you want 1:1
  // Keep your titles but style exactly like MeetMate/fishtrack/TCG-Home/Portfolio

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Preloader — Jay animated SVG path drawing on initial load */}
      <Preloader onLoadingComplete={() => setIsLoading(false)} />

      {/* ——— HERO ——— clean monotone aesthetic */}
      <section id="hero" className="w-screen min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ background: "var(--landing-bg-image)", backgroundColor: "var(--dark)" }}>
        {asciiArt && (
          <pre className="absolute -inset-[10%] flex items-center justify-center pointer-events-none select-none overflow-hidden p-0 opacity-[0.16] text-[11px] leading-[15px] tracking-[-0.02em] font-mono whitespace-pre z-0" style={{ color: "white", fontFamily: "'Courier New', monospace", transform: "scale(1.24)" }} aria-hidden>{asciiArt}</pre>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none z-[2]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.94 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="relative z-10 max-w-[1000px] px-4 w-full text-center"
        >
          <h1 className="khula-semibold text-6xl max-sm:text-[10vw] leading-[1.1] text-white cursor-pointer" onClick={() => handleSecretClick("hero")}>
            I build and experiment with
            <br />
            <span className="text-[var(--gray-1)]">AI products</span> for real-world use.
          </h1>
          <div className="mt-[10vh] max-w-[500px] mx-auto">
            <p className="text-gray-3 poppins-light-italic mb-1 select-none text-sm">This is me.</p>
            <hr className="bg-[var(--gray-3)] origin-left w-full border-none h-px" />
            <p className="mt-4 text-[var(--gray-1)] poppins-light leading-[123%] text-sm text-center">
              {getAge()}-year-old CS student from Noida specializing in AI/ML.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="text-xs tracking-widest uppercase poppins-light text-white">Scroll</span>
          <div className="w-px h-12 bg-[var(--gray-3)]" />
        </motion.div>
      </section>

      {/* ——— ABOUT ——— whole page design from bencodes: white, large quote + This is me. + 2-col */}
      <section id="about" className="bg-white text-black w-screen min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="khula-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            style={{ color: "black" }}
          >
            I like to understand the problem first, then find a practical and technically sound way to build it, learning along the way.
          </motion.h2>
          <div className="mt-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="poppins-light-italic text-sm"
              style={{ color: "#666" }}
            >
              This is me.
            </motion.p>
            <motion.hr
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-1 border-black/10 origin-left"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-12 grid md:grid-cols-[420px_1fr] gap-12 items-start"
            >
              <div>
                <h3 className="khula-light text-4xl">Hi, I&apos;m Jay.</h3>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full poppins-regular text-sm hover:bg-black/90 transition-all hover:scale-[1.02] group"
                  >
                    <ArrowDownRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    <span>Get in Touch</span>
                  </a>
                  <a
                    href="/jay-joshi-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/15 text-black rounded-full poppins-regular text-sm hover:border-black hover:bg-black/5 transition-all hover:scale-[1.02] group"
                  >
                    <span>Resume</span>
                    <ArrowUpRight size={15} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
              <div className="space-y-6 poppins-light leading-relaxed" style={{ color: "#222" }}>
                <p>I&apos;m a computer science student interested in building software and understanding how things work under the hood. I enjoy working across different areas of technology, from systems and development to AI, with a focus on learning by building and experimenting.</p>
                <p>I enjoy working across the whole process, from figuring out what to build and exploring an approach to writing the code, testing it, and getting it into a usable state. I&apos;m particularly interested in real-time AI, practical LLM applications, and building tools that are simple, reliable, and useful.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— PROJECTS ——— EXACT bencodes: white, Selected Projects, text rows + hover preview */}
      <section id="projects" className="w-screen bg-white text-black py-24 px-4">
        <div className="max-w-[900px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-16"
            style={{ color: "black" }}
          >
            Selected Projects
          </motion.h2>

          <div id="projects-list" className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => { prevHoveredRef.current = null; setHovered(null); }}>
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
                <motion.div
                  key={idx}
                  data-project-index={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                  onMouseEnter={(e) => handleHover(idx, e)}
                  onMouseMove={(e) => updateCoordinates(e.clientX, e.clientY)}
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— SKILLS ——— keep but slim, white bg like projects */}
      <section id="skills" className="w-screen bg-white text-black py-16 px-4 border-t border-black/10">
        <div className="max-w-[1000px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-10"
          >
            Skills
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Primary", items: ["Python", "YOLOv8 & Computer Vision", "React · Vite", "Tailwind CSS", "Flask", "Java"] },
              { label: "Working", items: ["OpenCV · Deep SORT", "Ollama · vLLM", "NumPy · Pandas", "PHP", "GSAP · Framer", "Three.js"] },
              { label: "Learning", items: ["Hugging Face", "Reinforcement Learning", "TypeScript", "FastAPI", "Next.js", "Docker · K8s"] },
            ].map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className="space-y-3"
              >
                <h3 className="khula-light text-sm tracking-widest uppercase" style={{ color: "#666" }}>{tier.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {tier.items.map((s) => (
                    <span key={s} onClick={() => handleSecretClick(`skill-${idx}`)} className="px-3 py-1.5 rounded-full border text-xs poppins-light cursor-pointer hover:border-black transition-colors" style={{ borderColor: "#e5e7eb", color: "#111" }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="opacity-0 h-0 overflow-hidden" aria-hidden>
            <span onClick={() => handleSecretClick("skill-0")}>cert-0</span>
            <span onClick={() => handleSecretClick("skill-1")}>cert-1</span>
            <span onClick={() => handleSecretClick("skill-2")}>cert-2</span>
          </div>
        </div>
      </section>

      {/* ——— CONTACT ——— EXACT bencodes: Want to collaborate? Let's have a chat! + Email/LinkedIn pills + jj */}
      <section id="contact" className="relative w-screen bg-white text-black py-24 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        {/* blurred blobs bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#b1afff]/30 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#bbe9ff]/30 blur-[100px] rounded-full translate-y-1/3 translate-x-1/4" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[800px] mx-auto text-center"
        >
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
            <p className="poppins-light" style={{ color: "black" }}>Jay Joshi</p>
            <p className="text-xs poppins-light mt-1" style={{ color: "#888" }}>Portfolio — AI/ML & Frontend</p>
          </div>
        </motion.div>
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
