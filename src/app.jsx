import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Home as HomeIcon, Folder, Mail, Settings } from 'lucide-react';
import GlassOverlay from "./components/background/GlassOverlay";
import CustomCursor from "./components/cursor/CustomCursor";

// ── Lazy Imports ─────────────────────────────────────────────────────────────
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
const Dock = lazy(() => import("./components/dock/Dock"));
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ProjectSummary = lazy(() => import('./pages/ProjectSummary'));
const Epoxy = lazy(() => import('./pages/Epoxy'));
const Boost = lazy(() => import('./pages/Boost'));
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

/**
 * Layout Wrapper to manage Background, Overlays, and Navigation structure.
 */
function Layout({ children, isDesktop }) {
  const navigate = useNavigate();
  const dockItems = useMemo(() => [
    { label: "Home", icon: <HomeIcon size={16} color="#ffffff" />, onClick: () => navigate("/") },
    { label: "Projects", icon: <Folder size={16} color="#ffffff" />, onClick: () => navigate("/projects") },
    { label: "Skills", icon: <Settings size={16} color="#ffffff" />, onClick: () => navigate("/skills") },
    { label: "Contact", icon: <Mail size={16} color="#ffffff" />, onClick: () => navigate("/contact") },
  ], [navigate]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* 1. Cursor: Desktop/Mouse custom cursor */}
      <CustomCursor />

      {/* 2. Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="mobile-creative-bg">
          <div className="wireframe-shape shape-1" />
          <div className="wireframe-shape shape-2" />
          <div className="wireframe-shape shape-3" />
        </div>
      </div>

      {/* 3. Overlay Layer */}
      {isDesktop && (
        <GlassOverlay tint="rgba(15, 15, 20, 0.45)" blur={12} opacity={0.55} />
      )}

      {/* 4. Content Layer */}
      <main id="main-content" tabIndex={-1} className="relative z-20 min-h-screen pt-20 pb-48" role="main">
        {children}
      </main>

      {/* 5. Navigation Layer */}
      <footer
        className="fixed bottom-0 left-0 w-full h-36 z-50 pointer-events-none flex items-end justify-center pb-4"
        style={{
          backdropFilter: 'blur(17px)',
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
        }}
      >
        <div className="pointer-events-auto">
          <Suspense fallback={null}>
            <Dock items={dockItems} />
          </Suspense>
        </div>
      </footer>
    </>
  );
}

// ── Main Application ─────────────────────────────────────────────────────────

function AppContent() {
  const isDesktop = useIsDesktop();
  const hasMounted = useHasMounted();

  // Post-mount check to prevent hydration mismatch
  if (!hasMounted) return null;

  return (
    <Layout isDesktop={isDesktop}>
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

          {/* Specialized Token Route */}
          <Route path="/:token" element={<TokenRoute />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* ScrollToTop logic is best handled inside the App component or a dedicated wrapper */}
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
