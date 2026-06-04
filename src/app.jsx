import React, { lazy, Suspense, useState, useEffect, useMemo, createContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import IdeLayout from "./components/layout/IdeLayout";

// ── Lazy Imports ─────────────────────────────────────────────────────────────
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ProjectSummary = lazy(() => import('./pages/ProjectSummary'));
const Epoxy = lazy(() => import('./pages/Epoxy'));
const Boost = lazy(() => import('./pages/Boost'));
const Readme = lazy(() => import('./pages/Readme'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Prevents Hydration errors by ensuring code only runs after mounting to the DOM.
 */
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}



/**
 * Detects if the screen width is desktop size.
 * Useful for: Layout changes and visibility of large elements.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches); // Set initial state after mount to avoid hydration errors
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}


// ── Specialized Components ───────────────────────────────────────────────────

/**
 * Handles the specific logic for token-based access.
 * Separated from global routing to prevent hijacking valid paths.
 */
function TokenRoute() {
  const params = useParams();
  const token = params.token; 
  const storedToken = sessionStorage.getItem('epoxyAccessToken');
  
  // Logic: If it's a valid-looking token and matches storage, show Epoxy.
  const isValidToken = token && token.length > 20 && token === storedToken;

  if (isValidToken) return <Epoxy adminAccess={true} />;
  return <NotFound />;
}

// ── Theme State Context ──────────────────────────────────────────────────────
export const ThemeContext = createContext({
  theme: "glass",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ide-theme") || "glass";
  });

  useEffect(() => {
    localStorage.setItem("ide-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Main Application ─────────────────────────────────────────────────────────

function AppContent() {
  const isDesktop = useIsDesktop();
  const hasMounted = useHasMounted();

  // Post-mount check to prevent hydration mismatch
  if (!hasMounted) return null;

  return (
    <IdeLayout isDesktop={isDesktop}>
      <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh] text-white/40 font-mono">Loading...</div>}>
        <Routes>
          {/* Standard Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-summary/:id" element={<ProjectSummary />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/epoxy" element={<Epoxy adminAccess={true} />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/readme" element={<Readme />} />

          {/* Specialized Token Route */}
          <Route path="/:token" element={<TokenRoute />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </IdeLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
