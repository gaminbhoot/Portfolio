import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function Boost() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  // Check access on component mount
  useEffect(() => {
    const checkAccess = () => {
      const accessGranted = sessionStorage.getItem('boostAccess');
      const accessTime = sessionStorage.getItem('boostAccessTime');
      
      // Check if access was granted
      if (accessGranted !== 'granted') {
        // No access - redirect to home
        navigate('/');
        return false;
      }
      
      // Optional: Check if access is still valid (e.g., within last 30 minutes)
      if (accessTime) {
        const timeElapsed = Date.now() - parseInt(accessTime);
        const thirtyMinutes = 30 * 60 * 1000;
        
        if (timeElapsed > thirtyMinutes) {
          // Access expired - clear and redirect
          sessionStorage.removeItem('boostAccess');
          sessionStorage.removeItem('boostAccessTime');
          navigate('/');
          return false;
        }
      }
      
      return true;
    };
    
    const hasAccess = checkAccess();
    
    if (!hasAccess) {
      return; // Exit early if no access
    }

    // Set authorized to true
    setIsAuthorized(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Title animation - dramatic entrance
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotateX: -90,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Content fade in
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Floating animation
      gsap.to(containerRef.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [navigate]);

  const handleNavigation = (path) => {
    // Clear access when navigating away
    sessionStorage.removeItem('boostAccess');
    sessionStorage.removeItem('boostAccessTime');
    navigate(path);
  };

  // Don't render content if not authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <div 
      className="relative z-20 min-h-screen flex items-center justify-center px-6 text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.5) 2px, transparent 2px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridSlide 20s linear infinite'
          }}
        />
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative max-w-4xl w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Success Badge */}
        <div className="flex justify-center mb-8">
          <div className="
            relative
            w-24 h-24 
            rounded-full 
            bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600
            flex items-center justify-center
            shadow-2xl shadow-green-500/50
            animate-pulse-slow
          ">
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border-4 border-green-300/20 animate-spin-reverse" />
            
            <svg 
              className="w-12 h-12 text-white relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div 
          ref={titleRef}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Access Granted
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-green-400 to-teal-400 rounded-full" />
        </div>

        {/* Content Card */}
        <div 
          ref={contentRef}
          className="
            relative
            rounded-3xl
            border border-white/10
            bg-black/40 backdrop-blur-2xl
            p-8 md:p-12
            overflow-hidden
          "
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 0 100px rgba(52, 211, 153, 0.3)"
          }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-20 blur-3xl -z-10 rounded-3xl" />

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-green-400/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-green-400/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-green-400/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-green-400/50 rounded-br-lg" />

          {/* Welcome Message */}
          <div className="text-center space-y-6">
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              Welcome to the Boost Zone! 🚀
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              You've successfully unlocked this hidden area. This is your exclusive space where special content, features, or information can be displayed.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="group p-6 rounded-2xl border border-green-400/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-green-400 mb-2">Enhanced Access</h3>
                <p className="text-sm text-gray-400">Premium features unlocked</p>
              </div>

              <div className="group p-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Exclusive Content</h3>
                <p className="text-sm text-gray-400">Special resources available</p>
              </div>

              <div className="group p-6 rounded-2xl border border-teal-400/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">🔐</div>
                <h3 className="text-lg font-bold text-teal-400 mb-2">Private Zone</h3>
                <p className="text-sm text-gray-400">Your secret dashboard</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={() => handleNavigation('/')}
                className="
                  group
                  relative
                  px-8 py-4
                  rounded-xl
                  font-bold
                  text-white
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  overflow-hidden
                  backdrop-blur-xl
                  border border-white/10
                "
                style={{
                  background: 'linear-gradient(145deg, rgba(52, 211, 153, 0.3), rgba(20, 184, 166, 0.3))',
                }}
              >
                <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Return Home
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-gradient-to-r from-green-400/20 to-teal-400/20" />
              </button>

              <button
                onClick={() => handleNavigation('/skills')}
                className="
                  group
                  relative
                  px-8 py-4
                  rounded-xl
                  font-bold
                  text-white
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  overflow-hidden
                  backdrop-blur-xl
                  border border-green-400/30
                "
                style={{
                  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                }}
              >
                <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Skills
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-green-400 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-emerald-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-20 w-2 h-2 rounded-full bg-teal-400 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gridSlide {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
      `}</style>
    </div>
  );
}