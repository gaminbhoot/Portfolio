import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Lenis from "lenis";

export default function MinimalLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const [konami, setKonami] = useState([]);
  const lenisRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect when scroll passes the dark hero section onto the light sections
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsOverLightSection(false);
      return;
    }

    const checkScrollPosition = () => {
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // Transition when top of light section reaches near top navigation area (~60px)
        setIsOverLightSection(rect.top <= 60);
      } else {
        setIsOverLightSection(window.scrollY > window.innerHeight * 0.7);
      }
    };

    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    window.addEventListener("resize", checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [location.pathname]);

  // Always reset scroll to the top when navigating to a project detail page
  useEffect(() => {
    if (location.pathname.startsWith("/project/")) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Lenis smooth scroll — desktop only (allows native momentum touch scroll on mobile)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || ("ontouchstart" in window);
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let reqId;
    function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(reqId);
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

    const scrollToTarget = () => {
      if (id === "hero") {
        if (lenisRef.current) lenisRef.current.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -20 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToTarget, 400);
    } else {
      setTimeout(scrollToTarget, 300);
    }
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

      {/* Fixed menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 px-4 py-2 text-xl poppins-regular flex items-center gap-2"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {/* Text 'menu' stays white on hero as requested ("do not do this for the text 'menu' only the menu icon") */}
        {!menuOpen && (
          <span
            className="hidden md:inline transition-opacity duration-300 pointer-events-none"
            style={{
              color: "var(--light)",
              opacity: isOverLightSection ? 0 : 1,
            }}
          >
            menu
          </span>
        )}
        <span
          className="inline-flex h-8 w-8 items-center justify-center transition-colors duration-500 ease-in-out"
          style={{
            color: menuOpen
              ? "var(--dark)"
              : isOverLightSection
              ? "#000000"
              : "#ffffff",
          }}
        >
          {menuOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-colors duration-500 ease-in-out"
            >
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          )}
        </span>
      </button>

      {/* Backdrop overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* 1/3-width Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 max-w-lg z-50 bg-white text-black shadow-2xl flex flex-col justify-between transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.79, 0.35, 0.26, 1)" }}
        aria-hidden={!menuOpen}
      >
        {/* Drawer Header */}
        <div className="flex justify-end p-6 sm:p-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-black hover:opacity-70 transition-opacity rounded-full"
            aria-label="Close menu"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 my-auto space-y-10 overflow-y-auto">
          {/* Menu */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold khula-light">Menu</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", id: "hero" },
                { name: "About Me", id: "about" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((o) => (
                <li key={o.id}>
                  <a
                    href={`#${o.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(o.id);
                    }}
                    className="text-3xl sm:text-4xl khula-regular text-black hover:translate-x-2 inline-block transition-transform duration-200"
                  >
                    {o.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold khula-light">Social</h3>
            <ul className="space-y-2">
              {[
                { name: "LinkedIn", link: "https://linkedin.com/in/gaminbhoot" },
                { name: "GitHub", link: "https://github.com/gaminbhoot" },
                { name: "Email", link: "mailto:jay05.joshi@gmail.com" },
                { name: "Resume (PDF)", link: "/jay-joshi-resume.pdf" },
              ].map((o) => (
                <li key={o.name}>
                  <a
                    href={o.link}
                    target={o.link.startsWith("http") || o.link.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-lg poppins-light text-gray-700 hover:text-black hover:underline transition-colors"
                  >
                    {o.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-8 sm:px-12 pb-8 pt-4 border-t border-gray-100">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Get in touch</p>
          <a
            href="mailto:jay05.joshi@gmail.com"
            className="text-base poppins-regular text-black hover:underline mt-1 block"
          >
            jay05.joshi@gmail.com
          </a>
          <p className="text-xs text-gray-400 mt-4 poppins-light">© Jay Joshi</p>
        </div>
      </div>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[var(--gray-4)] py-8 bg-[var(--dark)]">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--gray-1)" }}>
          <span className="poppins-light">© Jay Joshi</span>
          <div className="flex items-center gap-6 poppins-light">
            <a href="https://github.com/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/gaminbhoot" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="mailto:jay05.joshi@gmail.com" className="hover:underline">Email</a>
            <a href="/jay-joshi-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
