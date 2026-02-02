import React from 'react';
import { ArrowRight, Zap, LayoutTemplate } from 'lucide-react'; 

const Home = () => {
  return (
    <div className="container mx-auto px-6 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-start max-w-4xl">
    
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight">
          Design Without <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Boundaries
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          This content is living inside your new Home.jsx file. The background 
          effects remain in App.jsx so they don't reload when you switch pages.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
            Get Started 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          
        </div>
      </div>
    </div>
  );
};

export default Home;