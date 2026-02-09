import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Epoxy({ adminAccess = false }) {
  const navigate = useNavigate();
  const { token } = useParams();
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Verify token or admin access on mount
  useEffect(() => {
    // If admin access (direct /epoxy route), allow access
    if (adminAccess) {
      setIsAuthorized(true);
      return;
    }

    // If no token in URL params, redirect to home
    if (!token) {
      navigate('/');
      return;
    }

    // Verify token matches the one stored in sessionStorage
    const storedToken = sessionStorage.getItem('epoxyAccessToken');
    
    if (token !== storedToken) {
      // Invalid token - redirect to home
      navigate('/');
      return;
    }

    // Valid token - mark as authorized
    // Keep the token in sessionStorage so page refreshes work
    setIsAuthorized(true);
  }, [token, adminAccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both answers are correct
    if (answer1.toLowerCase().trim() === "gaminbhoot" && answer2.trim() === "37425744") {
      // Success - set access flag and redirect to boost page
      setError("");
      // Clear the epoxy token since they've successfully authenticated
      sessionStorage.removeItem('epoxyAccessToken');
      sessionStorage.setItem('boostAccess', 'granted');
      sessionStorage.setItem('boostAccessTime', Date.now().toString());
      window.location.href = '/boost';
    } else {
      // Wrong answer - show error and shake animation
      setError("Incorrect answers. Try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      // Clear inputs after wrong attempt
      setTimeout(() => {
        setAnswer1("");
        setAnswer2("");
        setError("");
      }, 2000);
    }
  };

  // Don't render if not authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <div 
      className="relative z-20 min-h-screen flex items-center justify-center px-6 text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Login Container */}
      <div 
        className={`
          relative max-w-md w-full
          rounded-3xl
          border border-white/10
          bg-black/40 backdrop-blur-2xl
          p-8
          transition-all duration-300
          ${isShaking ? 'animate-shake' : ''}
        `}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 0 80px rgba(99, 102, 241, 0.3)"
        }}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-20 blur-2xl -z-10 rounded-3xl" />

        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="
            w-20 h-20 
            rounded-2xl 
            bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center
            shadow-lg shadow-indigo-500/50
            animate-pulse-slow
          ">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Access Required
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Answer the questions to proceed
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <div className="space-y-2">
            <label 
              htmlFor="answer1" 
              className="block text-sm font-mono uppercase tracking-widest text-indigo-400"
            >
              Who am I?
            </label>
            <input
              type="text"
              id="answer1"
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-white/10
                bg-white/5 backdrop-blur-md
                text-white
                placeholder-gray-500
                transition-all duration-300
                focus:outline-none
                focus:border-indigo-400/50
                focus:bg-white/10
                focus:shadow-lg focus:shadow-indigo-500/20
              "
              placeholder="Enter your answer..."
              required
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <label 
              htmlFor="answer2" 
              className="block text-sm font-mono uppercase tracking-widest text-purple-400"
            >
              Who has the memory of a Goldfish?
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="answer2"
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="
                  w-full
                  px-4 py-3 pr-12
                  rounded-xl
                  border border-white/10
                  bg-white/5 backdrop-blur-md
                  text-white
                  placeholder-gray-500
                  transition-all duration-300
                  focus:outline-none
                  focus:border-purple-400/50
                  focus:bg-white/10
                  focus:shadow-lg focus:shadow-purple-500/20
                "
                placeholder="Enter your answer..."
                required
              />
            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  p-2 rounded-lg
                  text-gray-400 hover:text-purple-400
                  transition-colors duration-200
                  focus:outline-none
                "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye slash icon (hide)
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                    />
                  </svg>
                ) : (
                  // Eye icon (show)
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="
              px-4 py-3
              rounded-xl
              border border-red-500/30
              bg-red-500/10
              text-red-400
              text-sm text-center
              animate-fade-in
            ">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="
              group
              relative
              w-full
              px-6 py-4
              rounded-xl
              font-bold
              text-white
              text-lg
              transition-all duration-300
              hover:scale-105
              active:scale-95
              overflow-hidden
              backdrop-blur-xl
              border border-white/10
            "
            style={{
              background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))',
            }}
          >
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 blur-sm" />
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span>Verify Access</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </span>
            
            {/* Glassmorphic hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
              style={{
                background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))',
              }}
            />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="
              text-sm text-gray-400 
              hover:text-indigo-400 
              transition-colors duration-300
              font-mono
            "
          >
            ← Go back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}