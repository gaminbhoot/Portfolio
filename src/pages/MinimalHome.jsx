import React, { useState } from "react";
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
      if (res.ok) { setFormStatus("success"); e.target.reset(); } else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  // Map projectsData to bencodes shape
  const bencodesProjects = projectsData.map((p, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: p.title,
    category: p.category.split("/")[0].trim(),
    image: p.thumbnail,
    id: p.id,
  }));

  return (
    <div className="bg-[var(--dark)] text-white overflow-x-hidden">
      {/* ——— LANDING HERO ——— exact bencodes: w-screen min-h-screen, radial bg, centered quote */}
      <section className="w-screen min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ background: "var(--landing-bg-image)", backgroundColor: "var(--dark)" }}>
        {/* landing.webp as subtle background image like bencodes */}
        <img src="/landing.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none" />
        <div className="relative z-10 max-w-[1000px] px-4 w-full">
          <h1 className="khula-semibold text-6xl max-sm:text-[10vw] leading-[1.1] text-center md:text-left" onClick={() => handleSecretClick("hero")}>
            I believe in building
            <br />
            <span className="text-[var(--gray-1)]">AI systems & frontend</span> experiences that solve real problems.
          </h1>
          <div className="mt-[10vh] max-sm:mt-10">
            <p className="text-gray-3 poppins-light-italic ml-2 mb-1 select-none text-sm">This is me.</p>
            <hr className="bg-[var(--gray-3)] origin-left w-full border-none h-px" />
            <p className="mt-4 max-w-[500px] text-[var(--gray-1)] poppins-light leading-[123%]">
              20-year-old Computer Science student from Noida, building in AI/ML and frontend engineering. Shipped a Groq-powered LLM, a model optimizer, and YOLOv8 + DeepSORT pipelines.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex px-6 py-3 bg-white text-black rounded-full poppins-regular hover:bg-[var(--light)] transition-colors text-sm">
                View Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex px-6 py-3 border border-white/20 rounded-full poppins-regular hover:bg-white hover:text-black transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
        {/* scroll indicator like bencodes subtle */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase poppins-light">Scroll</span>
          <div className="w-px h-12 bg-[var(--gray-3)]" />
        </div>
      </section>

      {/* ——— ABOUT ME ——— bencodes About section */}
      <section id="about" className="w-screen min-h-screen flex justify-center items-center px-4 py-24 border-t border-[var(--gray-4)]">
        <div className="max-w-[1000px] w-full">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-10">About Me</h2>
          <div className="max-w-[500px] mx-auto space-y-4 text-[var(--gray-1)] poppins-light leading-[123%] text-center">
            <p>Computer Science undergraduate building production-oriented AI models and polished web experiences. Prioritizes practical architecture, measurable performance, and explainable design.</p>
            <p>Hands-on: real-time YOLOv8 + DeepSORT tracking, secure sanitization (OctaWipe), Groq LLM product (Abhisar), and a Java compiler pipeline.</p>
            <div className="pt-8 flex flex-wrap justify-center gap-2">
              {["Python", "React", "YOLOv8", "Tailwind", "Flask", "Java"].map((s) => (
                <span key={s} onClick={() => handleSecretClick(`skill-${s}`)} className="px-3 py-1.5 rounded-full border border-[var(--gray-4)] text-sm poppins-light hover:border-[var(--gray-1)] hover:text-white transition-colors cursor-pointer" style={{ color: "var(--gray-1)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— PROJECTS ——— exact bencodes: Selected Projects, grid-cols-2 gap-y-32 */}
      <section id="projects" className="w-screen min-h-screen py-24 px-4" style={{ backgroundColor: "var(--dark)" }}>
        <div className="max-w-screen-md mx-auto">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-10">Selected Projects</h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 gap-y-32 justify-items-center" onClick={() => handleSecretClick("projects")}>
            {bencodesProjects.map((Q) => (
              <div key={Q.id} className="w-80 max-sm:w-[80vw] flex flex-col gap-y-4 items-center group cursor-pointer">
                <div className="w-80 max-sm:w-[80vw] aspect-[77/44] overflow-hidden rounded-xl bg-[var(--gray-4)]">
                  <img
                    src={Q.image}
                    alt={Q.title}
                    width={320}
                    height={180}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="khula-semibold text-lg leading-tight pr-2">{Q.title}</h3>
                    <span className="text-sm poppins-light" style={{ color: "var(--gray-2)" }}>{Q.number}</span>
                  </div>
                  <p className="poppins-extralight text-base pr-2 group-hover:text-[var(--gray-2)] group-hover:pr-4 transition-all" style={{ color: "var(--gray-1)" }}>{Q.category}</p>
                  <hr className="w-full border-[var(--gray-1)] group-hover:border-[var(--gray-4)] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— SKILLS ——— bencodes-like, but using pills with gray palette */}
      <section id="skills" className="w-screen py-24 px-4 border-t border-[var(--gray-4)]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="poppins-light text-3xl tracking-[calc(3rem*0.02)] text-center mb-10">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            {[
              { label: "Primary", items: ["Python", "YOLOv8 & Computer Vision", "React · Vite", "Tailwind CSS", "Flask", "Java"] },
              { label: "Working Knowledge", items: ["OpenCV · Deep SORT", "Ollama · vLLM", "NumPy · Pandas", "PHP", "GSAP · Framer", "Three.js"] },
              { label: "Learning", items: ["Hugging Face", "Reinforcement Learning", "TypeScript", "FastAPI", "Next.js", "Docker · K8s"] },
            ].map((tier, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="khula-light text-lg" style={{ color: "var(--gray-1)" }}>{tier.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {tier.items.map((s) => (
                    <span key={s} onClick={() => handleSecretClick(`skill-${idx}`)} className="px-3 py-1.5 rounded-full border text-sm poppins-light" style={{ borderColor: "var(--gray-4)", color: "var(--gray-1)" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* hidden cert clicks for Easter egg */}
          <div className="opacity-0 h-0 overflow-hidden">
            <span onClick={() => handleSecretClick("skill-0")}>cert-0</span>
            <span onClick={() => handleSecretClick("skill-1")}>cert-1</span>
            <span onClick={() => handleSecretClick("skill-2")}>cert-2</span>
          </div>
        </div>
      </section>

      {/* ——— CONTACT ——— exact bencodes contact-bg with blurred blobs */}
      <section id="contact" className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden py-24 px-4 contact-bg">
        <div className="max-w-[1000px] w-full grid md:grid-cols-2 gap-12 items-start relative z-10">
          <div>
            <h2 className="khula-semibold text-5xl md:text-[80px] leading-none tracking-[calc(-1rem*0.03)]" style={{ color: "var(--dark)" }}>Let&apos;s talk.</h2>
            <p className="mt-8 text-gray-600 poppins-light max-w-[390px]">Open to hybrid roles, internships, and freelance. Based in Noida, India.</p>
            <div className="mt-12 space-y-4 poppins-light">
              <a href="mailto:jay05.joshi@gmail.com" className="flex gap-2 text-sm hover:underline" style={{ color: "var(--dark)" }}>jay05.joshi@gmail.com</a>
              <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex gap-2 text-sm hover:underline">github.com/gaminbhoot</a>
              <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="flex gap-2 text-sm hover:underline">linkedin.com/in/gaminbhoot</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[var(--gray-1)]">
            {formStatus === "success" ? (
              <div className="py-12 text-center">
                <p className="khula-semibold text-lg">Message received!</p>
                <p className="poppins-light text-sm mt-2" style={{ color: "var(--gray-2)" }}>I&apos;ll get back to you shortly.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 px-6 py-2 rounded-full border poppins-regular text-sm">Send another</button>
              </div>
            ) : formStatus === "error" ? (
              <div className="py-12 text-center">
                <p className="khula-semibold">Something went wrong.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 px-6 py-2 rounded-full border poppins-regular text-sm">Try again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="space-y-1">
                    <span className="text-xs poppins-light" style={{ color: "var(--gray-2)" }}>Name</span>
                    <input name="name" required placeholder="Full Name" className="w-full rounded-xl border border-[var(--gray-1)] px-3 py-3 text-sm poppins-light focus:outline-none focus:border-black" />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs poppins-light" style={{ color: "var(--gray-2)" }}>Email</span>
                    <input name="email" type="email" required placeholder="email@example.com" className="w-full rounded-xl border border-[var(--gray-1)] px-3 py-3 text-sm poppins-light focus:outline-none focus:border-black" />
                  </label>
                </div>
                <label className="space-y-1 block">
                  <span className="text-xs poppins-light" style={{ color: "var(--gray-2)" }}>Message</span>
                  <textarea name="message" required rows={4} placeholder="What are you building?" className="w-full rounded-xl border border-[var(--gray-1)] px-3 py-3 text-sm poppins-light focus:outline-none focus:border-black resize-none" />
                </label>
                <button disabled={formStatus === "submitting"} className="w-full h-11 rounded-full bg-black text-white poppins-regular hover:bg-[var(--gray-4)] transition-colors text-sm">
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
