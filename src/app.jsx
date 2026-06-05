import React, { lazy, Suspense, useState, useEffect, useMemo, createContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import IdeLayout from "./components/layout/IdeLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { useIsDesktop } from "./lib/useIsDesktop";

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
// Moved to src/context/ThemeContext.jsx to break circular dependency cycles.

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
          <Route path="/readme" element={<Readme />} />
          <Route path="/README.md" element={<Readme />} />
          <Route path="/epoxy" element={<Epoxy adminAccess={true} />} />
          <Route path="/boost" element={<Boost />} />


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
