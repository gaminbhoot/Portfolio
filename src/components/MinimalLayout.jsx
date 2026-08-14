import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Lenis from "lenis";

export default function MinimalLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [konami, setKonami] = useState([]);
  const lenisRef = useRef(null);

  // Lenis smooth scroll — exact bencodes oomph
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

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

  const handleNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -20 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  // Lock scroll when menu open like bencodes — also stop Lenis
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[var(--dark)] text-white selection:bg-white selection:text-black flex flex-col" style={{ backgroundColor: "var(--dark)" }}>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Fixed menu button — exact bencodes: top-6 right-6 / right-16 */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-40 px-4 py-2 text-xl poppins-regular flex items-center gap-2"
        style={{ color: menuOpen ? "var(--dark)" : "var(--light)" }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {!menuOpen && <span className="hidden md:inline">menu</span>}
        <span className="inline-flex h-8 w-8 items-center justify-center">
          {menuOpen ? <X size={28} strokeWidth={1.5} /> : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          )}
        </span>
      </button>

      {/* Menu overlay — exact bencodes drawer */}
      <div className={`fixed inset-0 z-50 bg-white text-black transition-all duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!menuOpen}>
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setMenuOpen(false)} className="p-2" aria-label="Close">
              <X size={32} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-grow flex-row max-sm:flex-col-reverse items-start justify-between w-full px-[15%] max-sm:mx-[5%] gap-12">
            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-lg khula-light">Social</h3>
              <ul className="space-y-2">
                {[
                  { name: "LinkedIn", link: "https://linkedin.com/in/gaminbhoot" },
                  { name: "Github", link: "https://github.com/gaminbhoot" },
                  { name: "Email", link: "mailto:jay05.joshi@gmail.com" },
                ].map((o) => (
                  <li key={o.name}>
                    <a href={o.link} target={o.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline text-xl poppins-light">
                      {o.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Menu */}
            <div className="space-y-4">
              <h3 className="text-lg khula-light">Menu</h3>
              <ul className="space-y-2">
                {[
                  { name: "About Me", id: "about" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "contact" },
                ].map((o) => (
                  <li key={o.id}>
                    <a href={`#${o.id}`} onClick={(e) => { e.preventDefault(); handleNav(o.id); }} className="hover:underline text-xl poppins-light">
                      {o.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-[15%] max-sm:mx-[5%] pb-12">
            <p className="text-sm text-gray-600 poppins-light">© {new Date().getFullYear()} Jay Joshi</p>
          </div>
        </div>
      </div>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[var(--gray-4)] py-8 bg-[var(--dark)]">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--gray-1)" }}>
          <span className="poppins-light">© {new Date().getFullYear()} Jay Joshi. Built with care.</span>
          <div className="flex items-center gap-6 poppins-light">
            <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="mailto:jay05.joshi@gmail.com" className="hover:underline">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
