import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: mouse.current.x, y: mouse.current.y });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const follow = () => {
      // Smooth lag (lower = more lag)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      const x = pos.current.x;
      const y = pos.current.y;

      // FIX: Added translate(-50%, -50%) to maintain centering 
      // because inline styles overwrite the Tailwind classes
      cursorRef.current.style.transform = 
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      
      dotRef.current.style.transform = 
        `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(follow);
    };

    follow();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] top-0 left-0
                   w-6 h-6 rounded-full border border-white/40"
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] top-0 left-0
                   w-1 h-1 rounded-full bg-white"
      />
    </>
  );
};

export default CustomCursor;