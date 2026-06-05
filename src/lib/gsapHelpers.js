export function animateCardReveal(gsap, className, rotateX = 15, delayMultiplier = 0.1) {
  gsap.utils.toArray(className).forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, rotateX: rotateX },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * delayMultiplier,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

export function setupGlowOnScroll(ScrollTrigger, gsap, elementRef, shadowSpec = "0 0 40px rgba(var(--accent-rgb), 0.3)", duration = 0.6) {
  const el = elementRef.current;
  if (!el) return;

  ScrollTrigger.create({
    trigger: el,
    start: "top center",
    end: "bottom center",
    onEnter: () => gsap.to(el, { boxShadow: shadowSpec, duration }),
    onLeave: () => gsap.to(el, { boxShadow: "none", duration }),
    onEnterBack: () => gsap.to(el, { boxShadow: shadowSpec, duration }),
    onLeaveBack: () => gsap.to(el, { boxShadow: "none", duration }),
  });
}
