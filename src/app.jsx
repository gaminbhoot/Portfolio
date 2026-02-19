import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, User, Folder, Mail, Settings } from 'lucide-react';

// Import components
import ColorBends from "./components/background/ColorBends";
import GlassOverlay from "./components/background/GlassOverlay";
import CustomCursor from "./components/cursor/CustomCursor";
import Dock from "./components/dock/Dock";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About"; 
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import ProjectDetail from './pages/ProjectDetail';
import ProjectSummary from './pages/ProjectSummary'; // 👈 ADD THIS LINE
import Epoxy from './pages/Epoxy';
import Boost from './pages/Boost';

function AppContent() {
  const navigate = useNavigate();

  const dockItems = [
    { label: "Home", icon: <HomeIcon size={16} color="#ffffff" />, onClick: () => navigate("/") },
    { label: "Projects", icon: <Folder size={16} color="#ffffff" />, onClick: () => navigate("/projects") },
    { label: "Skills", icon: <Settings size={16} color="#ffffff" />, onClick: () => navigate("/skills") },
    { label: "Contact", icon: <Mail size={16} color="#ffffff" />, onClick: () => navigate("/contact") }
  ];

  return (
    <>
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      
      <div className="fixed inset-0 z-0">
        <ColorBends
          colors={["#FF3131", "#FF5F1F", "#00FFFF", "#0000FF", "#000000", "#000000"]}
          rotation={0}
          speed={0.2}
          scale={1.14}
          frequency={1}
          warpStrength={1.044}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
        />
      </div>

      <GlassOverlay
        tint="rgba(15, 15, 20, 0.6)"
        blur={17}
        opacity={0.75}
      />

      <div className="relative z-20 min-h-screen pt-20 pb-48">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-summary/:id" element={<ProjectSummary />} /> {/* 👈 ADD THIS LINE */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/epoxy" element={<Epoxy adminAccess={true} />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/:token" element={<Epoxy />} />
        </Routes>
      </div>

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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;