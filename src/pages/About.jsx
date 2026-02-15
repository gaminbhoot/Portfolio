import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../components/profile/ProfileCard";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "../lib/utils";
import { Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   SCROLL TIMELINE COMPONENT - COMMENTED OUT
   ============================================ */
/*
const ScrollTimeline = ({
  events,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-white/10",
  activeColor = "bg-primary",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = false,
  smoothScroll = true,
}) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index) => {
    // Simple slide in based on card position
    const slideDirection = index % 2 === 0 ? -50 : 50;

    return {
      initial: { 
        opacity: 0, 
        x: slideDirection 
      },
      whileInView: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
      viewport: { once: true, margin: "-50px" },
    };
  };

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const getCardClasses = (index) => {
    const baseClasses = "relative z-30 rounded-2xl transition-all duration-300 overflow-hidden";
    
    // Glassmorphic Style to match site theme - darkened
    const glassClasses = "bg-black/25 backdrop-blur-md border border-black/10 shadow-2xl";
    
    const effectClasses = {
      none: "",
      glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-white/20",
      shadow: "hover:shadow-lg hover:-translate-y-1",
      bounce: "hover:scale-[1.02] active:scale-[0.98]",
    };

    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+10px)]"
          : "lg:ml-[calc(50%+10px)]"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";

    return cn(
      baseClasses,
      glassClasses,
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      "w-full lg:w-[calc(46%-10px)]" // Increased width, reduced gap
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden",
        darkMode ? "bg-background text-foreground" : "",
        className
      )}
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <span className="text-indigo-400">MY </span>
          <span className="text-white">JOURNEY</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-4">
        <div className="relative mx-auto pb-4">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          ></div>

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius:
                    progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)`,
                  boxShadow: `
                    0 0 15px rgba(99,102,241,0.5),
                    0 0 25px rgba(168,85,247,0.3)
                  `,
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                    boxShadow: `
                      0 0 15px 4px rgba(168, 85, 247, 0.6),
                      0 0 25px 8px rgba(99, 102, 241, 0.4),
                      0 0 40px 15px rgba(34, 211, 238, 0.2)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100]
              );
              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-4 py-4",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1/2 transform -translate-y-1/2 z-30",
                      "left-1/2 -translate-x-1/2"
                    )}
                  >
                    <motion.div
                      className={cn(
                        "w-6 h-6 rounded-full border-4 bg-background flex items-center justify-center",
                        index <= activeIndex
                          ? "border-primary"
                          : "border bg-card"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                "0 0 0px rgba(99,102,241,0)",
                                "0 0 12px rgba(99,102,241,0.6)",
                                "0 0 0px rgba(99,102,241,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <motion.div
                    className={cn(
                      getCardClasses(index),
                      "mt-12 lg:mt-0"
                    )}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    <div className="p-6">
                      {dateFormat === "badge" ? (
                        <div className="flex items-center mb-3">
                          {event.icon || (
                            <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                          )}
                          <span className="text-xs font-bold font-mono tracking-widest text-indigo-400 uppercase">
                            Phase {event.year}
                          </span>
                        </div>
                      ) : (
                        <p className="text-lg font-bold text-indigo-400 mb-2 font-mono">
                          {event.year}
                        </p>
                      )}
                      <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {event.title}
                      </h3>
                      {event.subtitle && (
                        <p className="text-indigo-300/80 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
                          {event.subtitle}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};
*/

const About = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const dividerRef = useRef(null);
  const mainContainerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { 
          opacity: 0, 
          y: -80,
          rotateX: -30,
          scale: 0.9,
          filter: "blur(15px)" 
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)", 
          duration: 1.4, 
          ease: "power4.out" 
        }
      );

      // Divider expand
      gsap.fromTo(
        dividerRef.current,
        {
          scaleX: 0,
          transformOrigin: "left",
        },
        {
          scaleX: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.inOut",
        }
      );

      // Content text
      gsap.fromTo(
        contentRef.current.querySelectorAll("p"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1, 
          delay: 0.5, 
          stagger: 0.15,
          ease: "power3.out" 
        }
      );

      // Profile card
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: 100, 
          rotateY: -45,
          scale: 0.9 
        },
        { 
          opacity: 1, 
          x: 0, 
          rotateY: 0,
          scale: 1, 
          duration: 1.4, 
          delay: 0.7, 
          ease: "back.out(1.4)" 
        }
      );

      // Removed parallax scroll effects - keeping content static and visible

    }, mainContainerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  /* ============================================
     TIMELINE DATA - COMMENTED OUT
     ============================================ */
  /*
  const timelineData = [
    
    {
      id: "1",
      year: "2021",
      title: "Introduction to Computer Science",
      subtitle: "Learning the Basics",
      description: "Started pursuing computer science. Focused on understanding programming logic, control flow, and basic data structures. This phase was all about learning the core concepts & how programs execute."
    },
    {
      id: "2",
      year: "2022",
      title: "Conceptual Strengthening",
      subtitle: "From Syntax to Reasoning",
      description: "Moved beyond writing code that merely runs to understanding why it works. Emphasized problem decomposition, debugging, and writing clearer, more structured programs."
    },
    {
      id: "3",
      year: "2023",
      title: "Undergraduate Computer Science",
      subtitle: "Formal Engineering Education",
      description: "Began B.Tech in Computer Science. Gained exposure to core theoretical subjects and structured coursework. Learned to balance conceptual understanding with practical implementation under defined constraints."
    },
    {
      id: "4",
      year: "2024",
      title: "Software Engineering Perspective",
      subtitle: "Systems and Interfaces",
      description: "Shifted focus from isolated programs to complete systems. Went through basic but important concepts of OOP, OS, DBMS, DSA, and software design principles. Started projects that integrated these concepts into functional applications."
    },
    {
      id: "5",
      year: "2025",
      title: "Data Science Focus",
      subtitle: "Machine Learning Foundations",
      description: "Started the IITG X Masai data science program. Focused on machine learning, data behavior, and modeling assumptions. Emphasis was placed on interpretation and real-world constraints rather than purely optimizing metrics."
    }


  ];
  */

  return (
    <div 
      ref={mainContainerRef} 
      className="h-screen overflow-hidden text-white"
      style={{ perspective: "1500px" }}
    >
      {/* Top Section */}
      <section className="relative z-10 container mx-auto px-6 md:px-10 pt-20 pb-4">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 w-full">
          
          <div ref={contentRef} className="flex-1 max-w-2xl">
            <h1 
              ref={headerRef}
              className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-tight" 
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                transformStyle: "preserve-3d"
              }}
            >
              <span className="text-white">ABOUT </span>
              <span className="text-indigo-400">ME</span>
            </h1>

            <div 
              ref={dividerRef}
              className="mb-8 h-px w-full bg-white/10" 
            />

            <p className="text-base md:text-m text-gray-300 leading-relaxed mb-6">
              I am a computer science student with a focus on the design and development of useful and efficient software solutions. My academic and research focus is on the practical applications of problem-solving, where theoretical concepts are turned into useful and user-centric applications. I have been part of several software development projects that require the design and implementation of user interfaces and efficient workflow systems.
            </p>

            <p className="text-base md:text-m text-gray-300 leading-relaxed">
             My approach to development is from an engineering perspective, with an emphasis on simplicity over cleverness and principles over shortcuts. At the moment, I am improving my technical expertise and planning the transition from academically-focused projects to real-world systems and development environments.
            </p>
          </div>
          
          <div 
            ref={cardRef} 
            className="flex-1 flex items-center justify-center lg:justify-end w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <ProfileCard
              name="Jay Joshi"
              title="B.Tech CSE Student"
              handle="gaminbhoot"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/jay1.png"
              grainUrl="/grain.webp"
              iconUrl="/iconpattern.png"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => navigate("/contact")}
              showBehindGlow
              behindGlowColor="rgba(125, 190, 255, 0.4)"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          JOURNEY TIMELINE SECTION - COMMENTED OUT
          ============================================ */}
      {/*
      <section className="relative w-full pt-12">
        <ScrollTimeline
          events={timelineData}
          title="MY JOURNEY"
          subtitle="Scroll to explore the key milestones that shaped my path."
          cardAlignment="alternating"
          progressIndicator={true}
          cardVariant="outlined"
          cardEffect="glow"
          revealAnimation="slide"
          parallaxIntensity={0.15}
          progressLineWidth={3}
          progressLineCap="round"
          dateFormat="badge"
          connectorStyle="line"
          className="pb-8"
        />

        <motion.div 
          className="relative flex flex-col items-center justify-center pt-8 pb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl md:text-3xl font-bold mb-3 uppercase tracking-tight text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              The Journey <span className="text-indigo-400">Continues</span>
            </h3>
            <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto italic">
              "You never stop learning"
            </p>
          </motion.div>

          <div className="relative mt-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-indigo-400/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>
      */}
    </div>
  );
};

export default About; 