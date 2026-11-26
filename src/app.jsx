import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import MinimalLayout from "./components/MinimalLayout";
import SiteSkeleton from "./components/SiteSkeleton";
import { hasPlayedIntro } from "./components/preloaderState";
import { ThemeProvider } from "./context/ThemeContext";

const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
const Preloader = lazy(() => import("./components/Preloader"));
const MinimalHome = lazy(() => import("./pages/MinimalHome"));
const MinimalProject = lazy(() => import("./pages/MinimalProject"));
const Epoxy = lazy(() => import('./pages/Epoxy'));
const Boost = lazy(() => import('./pages/Boost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

function TokenRoute() {
  const params = useParams();
  const token = params.token;
  const storedToken = sessionStorage.getItem('epoxyAccessToken');
  const isValidToken = token && token.length > 20 && token === storedToken;
  if (isValidToken) return <Epoxy adminAccess={true} />;
  return <NotFound />;
}

function AppContent() {
  const hasMounted = useHasMounted();
  const location = useLocation();
  const [introFinished, setIntroFinished] = useState(hasPlayedIntro);
  const handleIntroComplete = useCallback(() => setIntroFinished(true), []);

  if (!hasMounted) return null;

  return (
    <MinimalLayout>
      {location.pathname === "/" && (
        <Suspense fallback={null}>
          <Preloader onLoadingComplete={handleIntroComplete} />
        </Suspense>
      )}
      <Suspense fallback={introFinished ? <SiteSkeleton /> : null}>
        <Routes>
          <Route path="/" element={<MinimalHome />} />
          <Route path="/project/:id" element={<MinimalProject />} />
          {/* Hidden Easter eggs — no nav, not in sitemap */}
          <Route path="/epoxy" element={<Epoxy adminAccess={true} />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/:token" element={<TokenRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MinimalLayout>
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
