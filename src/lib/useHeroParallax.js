import { useEffect } from "react";

export function useHeroParallax(heroRef, heroImageRef) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      if (heroImageRef.current) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        heroImageRef.current.style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0) scale(1.1)`;
      }
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, [heroRef, heroImageRef]);
}
