import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rAFRef = useRef(null);

  useEffect(() => {
    // Only track mouse cursor on devices with a fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    console.log("CustomCursor useEffect: matches (pointer: fine) =", isFinePointer);
    if (!isFinePointer) return;

    console.log("CustomCursor: Starting mouse tracking loop");
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    mouse.current = { x: startX, y: startY };
    pos.current = { x: startX, y: startY };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const follow = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      rAFRef.current = requestAnimationFrame(follow);
    };

    // Start loop
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
        className="custom-cursor-wrapper pointer-events-none fixed z-[9999] top-0 left-0
                   w-6 h-6 rounded-full border border-white/40 hidden lg:block"
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor-wrapper pointer-events-none fixed z-[9999] top-0 left-0
                   w-1 h-1 rounded-full bg-white hidden lg:block"
      />
    </>
  );
};

export default CustomCursor;