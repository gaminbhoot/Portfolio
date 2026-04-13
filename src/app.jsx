import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Folder, Mail, Settings } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import GlassOverlay from "./components/background/GlassOverlay";
import Dock from "./components/dock/Dock";

const CustomCursor = lazy(() => import("./components/cursor/CustomCursor"));
// const ColorBends = lazy(() => import("./components/background/ColorBends"));

const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ProjectSummary = lazy(() => import('./pages/ProjectSummary'));
const Epoxy = lazy(() => import('./pages/Epoxy'));
const Boost = lazy(() => import('./pages/Boost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

function TokenOrNotFound() {
  const { "*": splat } = useParams();
  const storedToken = sessionStorage.getItem('epoxyAccessToken');
  
  // Only try to validate if they hit something that looks like an access token 
  // (the math.random substrings are ~20-25 chars alphanumeric)
  const isPossibleToken = splat && splat.length > 20 && /^[a-z0-9]+$/i.test(splat);
  const isValidToken = isPossibleToken && splat === storedToken;

  if (isValidToken) {
    return <Epoxy />;
  }

  // Any other URL just explicitly shows NotFound. No blank/broken pages.
  return <NotFound />;
}

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    if (!isDesktop) return;
    const id = setTimeout(() => setShowBg(true), 0);
    return () => clearTimeout(id);
  }, [isDesktop]);

  const dockItems = useMemo(() => [
    { label: "Home", icon: <HomeIcon size={16} color="#ffffff" />, onClick: () => navigate("/") },
    { label: "Projects", icon: <Folder size={16} color="#ffffff" />, onClick: () => navigate("/projects") },
    { label: "Skills", icon: <Settings size={16} color="#ffffff" />, onClick: () => navigate("/skills") },
    { label: "Contact", icon: <Mail size={16} color="#ffffff" />, onClick: () => navigate("/contact") },
  ], [navigate]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {isDesktop && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="mobile-creative-bg">
          <div className="wireframe-shape shape-1" />
          <div className="wireframe-shape shape-2" />
          <div className="wireframe-shape shape-3" />
        </div>
      </div>

      {isDesktop && (
        <GlassOverlay
          tint="rgba(15, 15, 20, 0.45)"
          blur={12}
          opacity={0.55}
        />
      )}

      <main id="main-content" tabIndex={-1} className="relative z-20 min-h-screen pt-20 pb-48" role="main">
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            opacity: 0.4,
            color: '#fff',
            fontSize: 14,
          }}>
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/project-summary/:id" element={<ProjectSummary />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/epoxy" element={<Epoxy adminAccess={true} />} />
            <Route path="/boost" element={<Boost />} />
            <Route path="*" element={<TokenOrNotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer
        className="fixed bottom-0 left-0 w-full h-36 z-50 pointer-events-none flex items-end justify-center pb-4"
        style={{
          backdropFilter: 'blur(17px)',
          WebkitBackdropFilter: 'blur(16px)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
        }}
      >
        <div className="pointer-events-auto">
          <Dock items={dockItems} />
        </div>
      </footer>
      <SpeedInsights />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;