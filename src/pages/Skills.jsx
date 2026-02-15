import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "../components/Terminal";
import ScrollArea from "../components/ScrollArea";
import ScrollList from "../components/ScrollList";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const terminalRef = useRef(null);
  const certificationsRef = useRef(null);
  const resumeButtonRef = useRef(null);

  // Secret combination state
  const [secretSequence, setSecretSequence] = useState([]);
  const secretCode = ['header', 'terminal', 'cert-0', 'cert-2', 'cert-1'];

  const handleSecretClick = (identifier) => {
    setSecretSequence(prev => {
      const newSequence = [...prev, identifier];
      
      // Check if the last N clicks match the secret code
      const recentClicks = newSequence.slice(-secretCode.length);
      
      if (JSON.stringify(recentClicks) === JSON.stringify(secretCode)) {
        // Secret combination completed!
        // Generate a random access token (this will be the URL itself)
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('epoxyAccessToken', token);
        
        setTimeout(() => {
          window.location.href = `/${token}`;
        }, 300);
        return [];
      }
      
      // Keep only the last 10 clicks to prevent memory issues
      return newSequence.slice(-10);
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load sequence
      const tl = gsap.timeline();

      // Header enters with 3D rotation
      tl.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: -50,
          rotateX: -45,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Description slides in from left
      tl.fromTo(
        ".desc-reveal",
        {
          opacity: 0,
          x: -40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Divider expands
      tl.fromTo(
        ".divider-reveal",
        {
          scaleX: 0,
          transformOrigin: "left",
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

      // Terminal reveals with scale and rotation
      tl.fromTo(
        terminalRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotateX: 15,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.3)",
        },
        "-=0.3"
      );

      // Simple, natural fade-in for perspective cards
      gsap.utils.toArray(".perspective-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Certifications section reveal
      if (certificationsRef.current) {
        gsap.fromTo(
          certificationsRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: certificationsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Certification cards reveal
      gsap.utils.toArray(".cert-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Resume button reveal
      if (resumeButtonRef.current) {
        gsap.fromTo(
          resumeButtonRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 0.7,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: resumeButtonRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Terminal floats and tilts on scroll
      gsap.to(terminalRef.current, {
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
        y: -40,
        rotateX: -5,
        scale: 0.98,
        ease: "none",
      });

      // Cards parallax individually
      gsap.utils.toArray(".perspective-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -30 * (i % 2 === 0 ? 1 : 0.7),
          ease: "none",
        });
      });

      // Terminal border glow on scroll
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
            duration: 0.6,
          });
        },
        onLeave: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "none",
            duration: 0.6,
          });
        },
        onEnterBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
            duration: 0.6,
          });
        },
        onLeaveBack: () => {
          gsap.to(terminalRef.current, {
            boxShadow: "none",
            duration: 0.6,
          });
        },
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    "Artificial Intelligence",
    "Python",
    "Data Science",
    "Deep Learning Frameworks",
    "Data Visualization",
    "Motion Tracking",
    "Computer Vision",
    "Neural Networks",
    "Machine Learning",
    "Cisco Networking",
    "Git & GitHub",
    "Project Development",
    "Project Management",
    "Design Lead",
    "Analytical Thinking",
    "Adaptability",
  ];

  const certifications = [
    {
      title: " Python for Data Science",
      issuer: "NPTEL",
      date: "2024",
      color: "indigo"
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2025",
      color: "purple"
    },
    {
      title: "Data Science and Machine Learning",
      issuer: "Masai X IIT Guwahati",
      date: "2025",
      color: "cyan"
    },
  ];

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/JAY JOSHI RESUME.pdf';
    link.download = 'JAY_JOSHI_RESUME.pdf';
    link.click();
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Page Header */}
      <div 
        ref={headerRef}
        className="max-w-5xl mx-auto mb-6 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => handleSecretClick('header')}
      >
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Skills
        </h1>

        <p className="desc-reveal mt-3 text-gray-200 max-w-3xl">
          A list of tools, technologies, and systems that I have personally used 
        </p>

        {/* Thin divider with expand animation */}
        <div className="divider-reveal mt-6 h-px w-full bg-white/10" />
      </div>

      {/* Terminal Section */}
      <div 
        ref={terminalRef}
        className="max-w-4xl mx-auto w-full rounded-3xl overflow-hidden cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => handleSecretClick('terminal')}
      >
        <Terminal title="skills.sh" subtitle=" ">
          <ScrollArea maxHeight={600} theme="none" smooth className="pr-2 py-2">
            <ScrollList
              data={skills}
              itemHeight={88}
              gap={8}
              renderItem={(skill, index) => (
                <div
                  className="
                    skill-item
                    h-full w-full flex items-center
                    border border-white/10
                    bg-white/5 backdrop-blur-md
                    px-6
                    transition-all duration-300
                    hover:bg-white/10
                    hover:border-indigo-400/40
                    hover:scale-105
                    hover:shadow-lg hover:shadow-indigo-500/20
                  "
                  style={{
                    borderRadius: 50,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="text-sm font-mono text-indigo-400 mr-4 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-wide transition-all duration-300">
                    {skill}
                  </span>
                </div>
              )}
            />
          </ScrollArea>
        </Terminal>
      </div>

      {/* Skills Perspective Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ perspective: "1500px" }}
        >

          {/* Card 1 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-indigo-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-indigo-300 transition-colors duration-300">
              Frontend Engineering
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
             My focus is on designing interfaces that have a sense of intentionality, not just in their looks, but also in their structure. I try to ensure that components have clear boundaries, the state changes in a logical fashion, and the motion helps to clarify the experience rather than confusing it.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-700" />
          </div>

          {/* Card 2 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-purple-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-purple-300 transition-colors duration-300">
              Motion & Interaction
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              To me, animation is a communication tool. Transitions, the use of scroll, and timing are useful in guiding the user and making the interface feel more natural and responsive.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700" />
          </div>

          {/* Card 3 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-cyan-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              Applied AI & Logic
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
              My research in the area of artificial intelligence focuses on application, ie. trying to gain an understanding of the model, its failures, and its application to solve problems rather than just its potential.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700" />
          </div>

          {/* Card 4 */}
          <div 
            className="perspective-card group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-black/40 hover:border-green-400/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-3 group-hover:text-green-300 transition-colors duration-300">
              Engineering Mindset
            </h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
             I value clarity over cleverness. In working with frontend code or model logic, I aim to build systems that are clear, easy to maintain, and flexible in the face of change.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-700" />
          </div>

        </div>
      </div>

      {/* Certifications Section */}
      <div 
        ref={certificationsRef}
        className="max-w-5xl mx-auto mt-20"
      >
        {/* Section Header */}
        <div className="mb-10">
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Certifications
          </h2>
          <p className="text-gray-200 max-w-2xl">
            Professional certifications and courses completed to validate and expand my technical expertise.
          </p>
          <div className="mt-6 h-px w-full bg-white/10" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const colorClasses = {
              indigo: {
                border: 'hover:border-indigo-400/50',
                shadow: 'hover:shadow-indigo-500/20',
                gradient: 'from-indigo-400 to-indigo-600',
                text: 'text-indigo-400 group-hover:text-indigo-300'
              },
              purple: {
                border: 'hover:border-purple-400/50',
                shadow: 'hover:shadow-purple-500/20',
                gradient: 'from-purple-400 to-purple-600',
                text: 'text-purple-400 group-hover:text-purple-300'
              },
              cyan: {
                border: 'hover:border-cyan-400/50',
                shadow: 'hover:shadow-cyan-500/20',
                gradient: 'from-cyan-400 to-cyan-600',
                text: 'text-cyan-400 group-hover:text-cyan-300'
              }
            };

            const colors = colorClasses[cert.color];

            return (
              <div
                key={index}
                className={`
                  cert-card
                  group
                  relative
                  rounded-2xl
                  border border-white/10
                  bg-black/30 backdrop-blur-md
                  p-6
                  transition-all duration-500
                  hover:bg-black/40
                  ${colors.border}
                  hover:scale-105
                  hover:-translate-y-2
                  hover:shadow-xl
                  ${colors.shadow}
                  overflow-hidden
                  cursor-pointer
                `}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => handleSecretClick(`cert-${index}`)}
              >
                {/* Certificate Icon */}
                <div className={`
                  mb-4 
                  w-12 h-12 
                  rounded-lg 
                  bg-gradient-to-br ${colors.gradient}
                  flex items-center justify-center
                  transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-6
                `}>
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                    />
                  </svg>
                </div>

                {/* Certificate Details */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className={`text-sm font-mono uppercase tracking-wider mb-1 ${colors.text} transition-colors duration-300`}>
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {cert.date}
                </p>

                {/* Bottom accent line */}
                <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${colors.gradient} transition-all duration-700`} />

                {/* Decorative glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            );
          })}
        </div>

        {/* Note and Resume Button Section */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-gray-400 text-sm text-center">
            More certifications and continuous learning in progress...
          </p>

          {/* Resume Download Button - Centered - Glassmorphic */}
          <div ref={resumeButtonRef}>
            <button
              onClick={(e) => {
                handleResumeDownload();
                handleSecretClick('resume');
              }}
              className="
                group
                relative
                px-8 py-4
                rounded-2xl
                font-bold
                text-white
                text-lg
                transition-all duration-300
                hover:scale-110
                active:scale-95
                overflow-hidden
                backdrop-blur-xl
                border border-white/10
              "
              style={{
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
              }}
            >
              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-2xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 blur-sm" />
              </div>

              <span className="relative z-10 flex items-center gap-3">
                <svg 
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <span className="tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>Download Resume</span>
              </span>
              
              {/* Glassmorphic hover overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(113, 196, 255, 0.15), rgba(96, 73, 110, 0.15))',
                }}
              />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Outer glow with cyan/purple theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              
              {/* Grain texture overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px 200px'
                }}
              />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}