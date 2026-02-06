import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = '<Placeholder for avatar URL>',
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const scrollThumbRef = useRef(null);

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);
  
  const [scrollbarVisible, setScrollbarVisible] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = useRef({ y: 0, scrollTop: 0 });

  // Scrollbar handlers
  const updateScrollbar = useCallback(() => {
    const thumb = scrollThumbRef.current;
    if (!thumb) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    
    const scrollable = scrollHeight > clientHeight;
    
    setScrollbarVisible(scrollable);
    
    if (scrollable) {
      const thumbHeight = Math.max((clientHeight / scrollHeight) * 200, 30);
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercent = scrollTop / maxScroll;
      const thumbTop = scrollPercent * (200 - thumbHeight);
      
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    }
  }, []);

  const handleScrollbarMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop
    };
  }, []);

  const handleScrollbarMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - dragStartRef.current.y;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollRatio = scrollHeight / clientHeight;
    
    window.scrollTo(0, dragStartRef.current.scrollTop + (deltaY * scrollRatio));
  }, [isDragging]);

  const handleScrollbarMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleScrollbarMouseMove);
      document.addEventListener('mouseup', handleScrollbarMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleScrollbarMouseMove);
        document.removeEventListener('mouseup', handleScrollbarMouseUp);
      };
    }
  }, [isDragging, handleScrollbarMouseMove, handleScrollbarMouseUp]);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = ts => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    event => {
      // Skip touch events to allow scrolling
      if (event.pointerType === 'touch') {
        event.stopPropagation();
        return;
      }
      
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    event => {
      // Skip touch events to allow scrolling
      if (event.pointerType === 'touch') {
        event.stopPropagation();
        return;
      }
      
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
      '--behind-glow-size': behindGlowSize ?? '50%'
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  useEffect(() => {
    const handleScroll = () => updateScrollbar();
    const handleResize = () => updateScrollbar();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial update
    updateScrollbar();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollbar]);

  return (
    <>
      <style>{`
        body::-webkit-scrollbar {
          display: none;
        }
        
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .pc-custom-scrollbar {
          position: fixed;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 200px;
          background: linear-gradient(145deg, rgba(96, 73, 110, 0.15), rgba(113, 196, 255, 0.15));
          border-radius: 10px;
          backdrop-filter: blur(10px);
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease, width 0.2s ease;
          pointer-events: none;
          box-shadow: 0 0 20px rgba(125, 190, 255, 0.2);
        }
        
        .pc-custom-scrollbar.visible {
          opacity: 1;
          pointer-events: auto;
        }
        
        .pc-custom-scrollbar:hover {
          width: 8px;
          box-shadow: 0 0 30px rgba(125, 190, 255, 0.4);
        }
        
        .pc-scrollbar-thumb {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(145deg, #60496e, #71C4FF);
          border-radius: 10px;
          cursor: grab;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(113, 196, 255, 0.3);
        }
        
        .pc-scrollbar-thumb:hover {
          background: linear-gradient(145deg, #71C4FF, #60496e);
          box-shadow: 0 4px 16px rgba(113, 196, 255, 0.5);
        }
        
        .pc-scrollbar-thumb:active {
          cursor: grabbing;
          background: linear-gradient(145deg, #71C4FF, #71C4FF);
          box-shadow: 0 6px 20px rgba(113, 196, 255, 0.7);
        }
      `}</style>
      
      <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
        {behindGlowEnabled && <div className="pc-behind" />}
        <div ref={shellRef} className="pc-card-shell">
          <section className="pc-card">
            <div className="pc-inside">
              <div className="pc-shine" />
              <div className="pc-glare" />
              <div className="pc-content pc-avatar-content">
                <img
                  className="absolute left-1/2 bottom-[27px] w-[95%] h-[80%] object-cover object-top -translate-x-[43%] backface-hidden will-change-transform transition-transform duration-[120ms] ease-out"
                  src={avatarUrl}
                  alt={`${name || 'User'} avatar`}
                  loading="lazy"
                  onError={e => {
                    const t = e.target;
                    t.style.display = 'none';
                  }}
                />
                {showUserInfo && (
                  <div className="pc-user-info">
                    <div className="pc-user-details">
                      <div className="pc-mini-avatar">
                        <img
                          src={miniAvatarUrl || avatarUrl}
                          alt={`${name || 'User'} mini avatar`}
                          loading="lazy"
                          onError={e => {
                            const t = e.target;
                            t.style.opacity = '0.5';
                            t.src = avatarUrl;
                          }}
                        />
                      </div>
                      <div className="pc-user-text">
                        <div className="pc-handle">@{handle}</div>
                        <div className="pc-status">{status}</div>
                      </div>
                    </div>
                    <button
                      className="pc-contact-btn"
                      onClick={handleContactClick}
                      style={{ pointerEvents: 'auto' }}
                      type="button"
                      aria-label={`Contact ${name || 'user'}`}
                    >
                      {contactText}
                    </button>
                  </div>
                )}
              </div>
              <div className="pc-content">
                <div className="pc-details">
                  <h3>{name}</h3>
                  <p>{title}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Custom Scrollbar */}
      <div className={`pc-custom-scrollbar ${scrollbarVisible ? 'visible' : ''}`}>
        <div 
          ref={scrollThumbRef}
          className="pc-scrollbar-thumb"
          onMouseDown={handleScrollbarMouseDown}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            setIsDragging(true);
            dragStartRef.current = {
              y: touch.clientY,
              scrollTop: document.documentElement.scrollTop || document.body.scrollTop
            };
          }}
          onTouchMove={(e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            
            const deltaY = touch.clientY - dragStartRef.current.y;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const scrollRatio = scrollHeight / clientHeight;
            
            window.scrollTo(0, dragStartRef.current.scrollTop + (deltaY * scrollRatio));
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>
    </>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;