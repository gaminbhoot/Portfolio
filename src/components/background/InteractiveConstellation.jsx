import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const InteractiveConstellation = () => {
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const accentRgbRef = useRef('75, 54, 200'); // Default Indigo (#4b36c8)

  // Track and update the accent color whenever the theme changes
  useEffect(() => {
    const updateAccentColor = () => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-rgb')
        .trim();
      if (val) {
        accentRgbRef.current = val;
      }
    };

    // Run immediately to capture the initial/new theme styles
    updateAccentColor();

    // A small timeout ensures styles have fully applied to the DOM root
    const timer = setTimeout(updateAccentColor, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Track state configuration
    const settings = {
      particleCount: 100,
      maxDistance: 120, // Max distance between connected particles
      mouseRadius: 160,  // Proximity radius for mouse interaction
      particleSpeed: 0.8,
    };

    const mouse = {
      x: null,
      y: null,
    };

    let particles = [];

    // Particle Object Definition
    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * settings.particleSpeed;
        this.vy = (Math.random() - 0.5) * settings.particleSpeed;
        this.radius = Math.random() * 2.5 + 2; // 2px to 4.5px
      }

      update(w, h) {
        // Move particles
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls safely
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgbRef.current}, 0.6)`; // More opaque particles
        ctx.fill();
      }
    }

    // Initialize particle arrays
    const init = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      particles = [];
      for (let i = 0; i < settings.particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    // Main animation runner loops physics updates and canvas paints
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Update & draw base particles
      particles.forEach((p) => {
        p.update(w, h);
        p.draw();
      });

      // 2. Draw lines between adjacent particles & the mouse context
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = p1.x - mouse.x;
          const dyMouse = p1.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < settings.mouseRadius) {
            ctx.beginPath();
            // Fades out lines as they approach edge of interactive radius
            const opacity = 1 - distMouse / settings.mouseRadius;
            ctx.strokeStyle = `rgba(${accentRgbRef.current}, ${opacity * 0.65})`; // Enhanced line opacity
            ctx.lineWidth = 1.2;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Inter-particle line geometry connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < settings.maxDistance) {
            ctx.beginPath();
            const opacity = 1 - dist / settings.maxDistance;
            ctx.strokeStyle = `rgba(${accentRgbRef.current}, ${opacity * 0.3})`; // Enhanced line opacity
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Interaction Event Handlers
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      init();
    };

    // Attach Context Configurations
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    // Clean context loop cycles up on unmount hook triggers
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full z-0"
    />
  );
};

export default InteractiveConstellation;
