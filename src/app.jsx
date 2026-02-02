import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
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

function AppContent() {
  // This hook now works because AppContent is rendered inside BrowserRouter
  const navigate = useNavigate();

  const dockItems = [
    {
      label: "Home",
      icon: <HomeIcon size={20} color="#ffffff" />,
      onClick: () => navigate("/")
    },
    {
      label: "About",
      icon: <User size={20} color="#ffffff" />,
      onClick: () => navigate("/about")
    },
    {
      label: "Projects",
      icon: <Folder size={20} color="#ffffff" />,
      onClick: () => navigate("/projects")
    },
    {
      label: "Skills",
      icon: <Settings size={20} color="#ffffff" />,
      onClick: () => navigate("/skills")
    },
    {
      label: "Contact",
      icon: <Mail size={20} color="#ffffff" />,
      onClick: () => navigate("/contact")
    }
  ];

  return (
    <>
      {/* 1. GLOBAL ELEMENTS (Cursor, Background) */}
      <CustomCursor />
      
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

      {/* 3. PAGE CONTENT (Switches based on URL) */}
      <div className="relative z-20 min-h-screen pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          {/* fallback – prevents white screen */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* 4. UNIVERSAL DOCK */}
      {/* Positioned at bottom center */}
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
        <Dock items={dockItems} />
      </div>
    </>
  );
}

function App() {
  console.log("App mounted");

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;