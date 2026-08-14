import React, { useState, useEffect, useRef } from "react";
import { projectsData } from "../data/projectsData";
import { usePageMeta } from "../lib/usePageMeta";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function MinimalHome() {
  usePageMeta({
    title: "Jay Joshi | AI/ML Engineer & Frontend Developer",
    description: "Explore my projects, skills, and professional journey. Available for new opportunities and collaborations.",
    path: "/",
    image: "/jay1.webp",
  });

  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success | error
  const [secretClicks, setSecretClicks] = useState([]);
  const secretCode = ["hero", "projects", "skill-0", "skill-2", "skill-1"];

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
      if (res.ok) {
        setFormStatus("success");
        e.target.reset();
      } else setFormStatus("error");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="bg-[#0a0a0f] text-white">
      {/* ——— HERO ——— 92vh, 48/52 grid, exact bencodes */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center min-h-[72vh]">
          {/* Left */}
          <div className="space-y-6" onClick={() => handleSecretClick("hero")}>
            <p className="text-sm tracking-widest text-white/40 uppercase">Available for new opportunities</p>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
              Jay Joshi
              <span className="block text-white/60 font-normal text-[0.68em] mt-2 tracking-normal">AI/ML Engineer & Frontend Developer</span>
            </h1>
            <p className="max-w-xl text-white/60 leading-relaxed">
              20-year-old Computer Science student building AI systems and polished frontend experiences. Shipped a Groq-powered LLM, a model optimizer, and YOLOv8 + DeepSORT pipelines.
            </p>
            <p className="max-w-xl text-sm text-white/40 leading-relaxed">
              Explore my projects, skills, and professional journey. Available for new opportunities and collaborations.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90 transition-colors">
                View Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                Contact me
              </a>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-white/40">
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> Noida, India</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Open to work</span>
            </div>
          </div>

          {/* Right — landing.webp hero, exact bencodes: rounded-2xl, aspect 4/3, border */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] aspect-[4/3]">
              <img
                src="/jay1.webp"
                alt="Jay Joshi"
                width={800}
                height={600}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* subtle grain like bencodes subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            {/* bencodes-like floating accent blur */}
            <div className="pointer-events-none absolute -z-10 -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ——— PROJECTS ——— lg:3 grid, exact bencodes card */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-16 md:py-20 border-t border-white/[0.06]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Selected Works</h2>
            <p className="mt-2 text-sm text-white/50">A few projects I've built — real-time vision, secure tools, LLM product.</p>
          </div>
          <span className="hidden sm:inline text-xs tracking-widest text-white/30 uppercase">{projectsData.length} projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" onClick={() => handleSecretClick("projects")}>
          {projectsData.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 transition-colors flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/15 bg-black/30 backdrop-blur px-2.5 py-1 text-[11px] tracking-wide text-white/70">
                  {p.category}
                </div>
                <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold leading-tight line-clamp-2">{p.title}</h3>
                <p className="mt-2 text-sm text-white/50 line-clamp-2">{p.summary?.tagline || p.category}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
                  <span>{p.year}</span>
                  <span>·</span>
                  <span className="truncate">{p.category.split("/")[0].trim()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— SKILLS ——— pills, flat, exact bencodes */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-20 border-t border-white/[0.06]">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Skills</h2>
        <p className="mt-2 text-sm text-white/50 max-w-2xl">Tools I use to ship — AI/ML, frontend, and systems.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              label: "Primary",
              groups: [
                { title: "AI / ML", items: ["Python", "YOLOv8 & Computer Vision", "Data Science & EDA", "NLP Pipelines"] },
                { title: "Frontend", items: ["React · JavaScript · Vite", "Tailwind CSS"] },
                { title: "Backend", items: ["Flask", "Java", "Git & GitHub"] },
              ],
            },
            {
              label: "Working Knowledge",
              groups: [
                { title: "ML Tools", items: ["OpenCV · Deep SORT", "Ollama · vLLM · llama.cpp", "NumPy · scikit-learn · Pandas"] },
                { title: "Web", items: ["PHP", "Framer Motion · GSAP", "Three.js", "HTML / Advanced CSS"] },
              ],
            },
            {
              label: "Learning",
              groups: [
                { title: "AI / ML", items: ["Hugging Face Transformers", "Reinforcement Learning"] },
                { title: "Dev", items: ["TypeScript", "FastAPI", "Next.js"] },
                { title: "Infrastructure", items: ["Docker", "Kafka", "Kubernetes", "Linux"] },
              ],
            },
          ].map((tier, ti) => (
            <div key={ti} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs tracking-[0.18em] text-white/30 uppercase">{tier.label}</p>
              <div className="mt-6 space-y-6">
                {tier.groups.map((g) => (
                  <div key={g.title}>
                    <p className="text-xs font-medium tracking-wide text-white/50 uppercase">{g.title}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((s, si) => (
                        <span
                          key={si}
                          onClick={() => handleSecretClick(`skill-${ti}-${si}`)}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* hidden skill pills for secret sequence (header→terminal→cert-0→cert-2→cert-1 mapped to hero→projects→skill-0→skill-2→skill-1) */}
        <div className="mt-6 flex gap-2 opacity-0 pointer-events-none select-none h-0 overflow-hidden" aria-hidden>
          <span onClick={() => handleSecretClick("skill-0")}>cert-0</span>
          <span onClick={() => handleSecretClick("skill-1")}>cert-1</span>
          <span onClick={() => handleSecretClick("skill-2")}>cert-2</span>
        </div>
      </section>

      {/* ——— ABOUT ——— compact, from Readme */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20 border-t border-white/[0.06]">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
          <div className="mt-6 space-y-4 text-white/60 leading-relaxed">
            <p>Computer Science undergraduate at 20, building production-oriented AI models and polished web experiences. Prioritizes practical architecture, measurable performance, and explainable design.</p>
            <p>Hands-on: real-time YOLOv8 + DeepSORT tracking, secure sanitization (OctaWipe), Groq LLM product (Abhisar), and a Java compiler pipeline.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>MacBook Pro is daily driver; fluent in Windows + Fedora (Linux, dnf, Bash).</li>
              <li>Terminal: macOS Zsh, PowerShell on Windows, GNOME Terminal on Fedora.</li>
              <li>IDE: VS Code + Antigravity (agent sessions), JetBrains for Python, Neovim in terminal.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ——— CONTACT ——— minimal, Formspree, exact bencodes */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:py-20 border-t border-white/[0.06]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Let&apos;s Work Together</h2>
            <p className="mt-3 text-white/50 leading-relaxed">Open to hybrid roles, internships, and freelance. Reach out — happy to connect.</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jay05.joshi@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><Mail size={14} /></span>
                jay05.joshi@gmail.com
              </a>
              <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><Github size={14} /></span>
                github.com/gaminbhoot
              </a>
              <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><Linkedin size={14} /></span>
                linkedin.com/in/gaminbhoot
              </a>
              <span className="flex items-center gap-3 text-white/40">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><MapPin size={14} /></span>
                Noida, India · IST UTC+5:30
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
            {formStatus === "success" ? (
              <div className="py-10 text-center">
                <p className="font-medium">Message received!</p>
                <p className="mt-2 text-sm text-white/50">Thanks — I&apos;ll get back to you shortly.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-xs tracking-wide uppercase hover:bg-white/5 transition-colors">Send another</button>
              </div>
            ) : formStatus === "error" ? (
              <div className="py-10 text-center">
                <p className="font-medium">Something went wrong.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-xs tracking-wide uppercase hover:bg-white/5 transition-colors">Try again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-xs tracking-wide text-white/50 uppercase">Name</span>
                    <input name="name" required placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06]" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs tracking-wide text-white/50 uppercase">Email</span>
                    <input name="email" type="email" required placeholder="email@example.com" className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06]" />
                  </label>
                </div>
                <label className="space-y-2 block">
                  <span className="text-xs tracking-wide text-white/50 uppercase">Subject</span>
                  <input name="subject" placeholder="Frontend Engineer @ Acme" className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06]" />
                </label>
                <label className="space-y-2 block">
                  <span className="text-xs tracking-wide text-white/50 uppercase">Message</span>
                  <textarea name="message" required rows={4} placeholder="What are you building?" className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] resize-none" />
                </label>
                <button disabled={formStatus === "submitting"} className="inline-flex w-full h-11 items-center justify-center rounded-full bg-white text-sm font-medium text-black hover:bg-white/90 transition-colors disabled:opacity-60">
                  {formStatus === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
