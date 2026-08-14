import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function MinimalLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [konami, setKonami] = useState([]);

  // Hidden Konami: ↑↑↓↓←→←→ba still works on minimal branch
  useEffect(() => {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const handler = (e) => {
      setKonami((prev) => {
        const next = [...prev, e.key].slice(-10);
        if (JSON.stringify(next.slice(-10)) === JSON.stringify(code)) {
          const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          sessionStorage.setItem("epoxyAccessToken", token);
          window.location.href = `/${token}`;
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-white selection:text-black flex flex-col">
      {/* Skip link */}
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Header — exact bencodes: sticky, border, backdrop-blur */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-bold tracking-tight text-white hover:opacity-80 transition-opacity" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="text-lg">JJ</span>
            <span className="ml-2 text-sm font-medium text-white/60 hidden sm:inline">Jay Joshi</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="ml-2 inline-flex h-9 items-center rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#0a0a0f]">
            <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-white text-sm font-medium text-black"
              >
                Contact me
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      {/* Footer — minimal, exact bencodes */}
      <footer className="border-t border-white/[0.08] py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© {new Date().getFullYear()} Jay Joshi. Built with care.</span>
          <div className="flex items-center gap-6">
            <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:jay05.joshi@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
