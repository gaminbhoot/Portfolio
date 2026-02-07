// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [activeSection, setActiveSection] = useState("");

  // Handle Scroll Spy (Active Link Highlight)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (!project) return <div className="text-white pt-32 text-center">Project not found</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      
      {/* Top Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50" />

      {/* Hero Section (Expands from Previous Page) */}
      <motion.div 
        layoutId={`hero-image-${id}`} 
        className="w-full h-[60vh] md:h-[80vh] relative z-0"
      >
        <img 
          src={project.heroImage || project.thumbnail} 
          className="w-full h-full object-cover opacity-80" 
          alt={project.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-10 left-6 md:left-12 max-w-4xl">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-5xl md:text-8xl font-black uppercase tracking-tighter"
             style={{ fontFamily: "'Orbitron', sans-serif" }}
           >
             {project.title}
           </motion.h1>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: Sticky Sidebar (The Perry Wang Feature) */}
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-24">
            <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Projects
            </Link>

            <div className="border-l border-white/10 pl-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-6">Contents</h4>
              {project.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block text-sm transition-all duration-300 ${
                    activeSection === section.id 
                      ? "text-white font-bold translate-x-2" 
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          {/* RIGHT: Scrollable Content */}
          <main className="lg:col-span-9 space-y-32">
            
            {/* Mobile Back Button */}
            <Link to="/projects" className="lg:hidden inline-flex items-center text-gray-400 mb-8">
              <ArrowLeft size={20} className="mr-2" /> Back
            </Link>

            {project.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 text-indigo-400">{section.title}</h2>
                <div className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                  {section.content}
                </div>
                
                {/* Example of adding an image inside a section if needed */}
                <div className="mt-8 rounded-xl bg-white/5 border border-white/10 h-64 md:h-96 w-full flex items-center justify-center text-gray-600">
                  [ Project Image Placeholder for {section.title} ]
                </div>
              </section>
            ))}

            {/* Next Project Teaser (Optional) */}
            <div className="pt-20 border-t border-white/10">
               <h3 className="text-gray-500 mb-4">Next Project</h3>
               <div className="text-4xl font-bold cursor-pointer hover:text-indigo-400 transition-colors">
                  Next Project Name →
               </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}