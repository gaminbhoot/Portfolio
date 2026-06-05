import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rAFRef = useRef(null);

  useEffect(() => {
    console.log("CustomCursor: Starting mouse tracking loop");
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    mouse.current = { x: startX, y: startY };
    pos.current = { x: startX, y: startY };

    let isAnimating = false;

    const follow = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        pos.current.x = mouse.current.x;
        pos.current.y = mouse.current.y;
        isAnimating = false;
      } else {
        pos.current.x += dx * 0.12;
        pos.current.y += dy * 0.12;
        rAFRef.current = requestAnimationFrame(follow);
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseMove = (e) => {
      if (e.clientX === mouse.current.x && e.clientY === mouse.current.y) {
        return;
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isAnimating) {
        isAnimating = true;
        follow();
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Start loop
    isAnimating = true;
    follow();

    return () => {
      console.log("CustomCursor: Cleaning up event listener and loop");
      window.removeEventListener("mousemove", onMouseMove);
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="custom-cursor-wrapper custom-cursor-ring pointer-events-none fixed z-[9999] top-0 left-0
                   w-6 h-6 rounded-full"
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor-wrapper custom-cursor-dot pointer-events-none fixed z-[9999] top-0 left-0
                   w-1 h-1 rounded-full"
      />
    </>
  );
};

export default CustomCursor;