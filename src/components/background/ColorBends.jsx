import React from 'react'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getGPUTier } from 'detect-gpu';
import './ColorBends.css';

// ---------------------------------------------------------------------------
// GPU TIER CONFIGURATION
// Each tier defines the rendering budget for that class of hardware.
// Tier is passed in as a prop (gpuTier) so the parent can call getGPUTier()
// once and share the result across multiple instances / other components.
//
// Usage in parent:
//   import { getGPUTier } from 'detect-gpu';
//   const [gpuTier, setGpuTier] = useState(4); // default to ultra until known
//   useEffect(() => { getGPUTier().then(r => setGpuTier(r.tier)); }, []);
//   <ColorBends gpuTier={gpuTier} ... />
// ---------------------------------------------------------------------------

const GPU_TIERS = {
  0: { label: 'Toaster', maxColors: 2, resolutionScale: 0.35, dprCap: 1,   throttle: 3 },
  1: { label: 'Low',     maxColors: 3, resolutionScale: 0.50, dprCap: 1,   throttle: 2 },
  2: { label: 'Mid',     maxColors: 5, resolutionScale: 0.75, dprCap: 1.5, throttle: 1 },
  3: { label: 'High',    maxColors: 7, resolutionScale: 0.90, dprCap: 2,   throttle: 1 },
  4: { label: 'Ultra',   maxColors: 8, resolutionScale: 1.00, dprCap: 2,   throttle: 1 },
};

// Clamp an incoming gpuTier prop to a valid key (0–4), defaulting to 4.
const resolveTier = raw => {
  const n = parseInt(raw, 10);
  if (Number.isFinite(n) && n >= 0 && n <= 4) return n;
  return 4;
};

// ---------------------------------------------------------------------------
// SHADER BUILDER
// MAX_COLORS is baked into the #define so the GPU compiles a loop of exactly
// that length — no wasted iterations or dynamic-branch penalties on old GPUs.
// ---------------------------------------------------------------------------

const buildShaders = maxColors => {
  const frag = `
#define MAX_COLORS ${maxColors}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

  const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

  return { frag, vert };
};

// ---------------------------------------------------------------------------

const isMobile = () => window.innerWidth <= 768;

export default function ColorBends({
  className,
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
  // gpuTier: 0–4. Detect once in the parent via getGPUTier() and pass down.
  // Defaults to 4 (Ultra) so behaviour is unchanged if prop is omitted.
  gpuTier = 4,
}) {
  const containerRef        = useRef(null);
  const rendererRef         = useRef(null);
  const rafRef              = useRef(null);
  const materialRef         = useRef(null);
  const resizeObserverRef   = useRef(null);
  const rotationRef         = useRef(rotation);
  const autoRotateRef       = useRef(autoRotate);
  const pointerTargetRef    = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef   = useRef(new THREE.Vector2(0, 0));
  const pointerSmoothRef    = useRef(8);
  const idleCallbackRef     = useRef(null);
  const frameCountRef       = useRef(0);
  const mobile              = isMobile();

  // Resolve tier config once — if gpuTier prop changes we re-run the main
  // effect anyway (it's in the dep array), so a plain resolve is fine here.
  const tier = GPU_TIERS[resolveTier(gpuTier)];

  // -------------------------------------------------------------------------
  // MAIN EFFECT — re-runs when tier changes (gpuTier in deps) or any param
  // that requires a new renderer / recompiled shader.
  // -------------------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    const scene     = new THREE.Scene();
    const camera    = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry  = new THREE.PlaneGeometry(2, 2);

    const { maxColors, resolutionScale, dprCap, throttle } = tier;
    const { frag, vert } = buildShaders(maxColors);

    const uColorsArray = Array.from({ length: maxColors }, () => new THREE.Vector3(0, 0, 0));

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas:        { value: new THREE.Vector2(1, 1) },
        uTime:          { value: 0 },
        uSpeed:         { value: speed },
        uRot:           { value: new THREE.Vector2(1, 0) },
        uColorCount:    { value: 0 },
        uColors:        { value: uColorsArray },
        uTransparent:   { value: transparent ? 1 : 0 },
        uScale:         { value: scale },
        uFrequency:     { value: frequency },
        uWarpStrength:  { value: warpStrength },
        uPointer:       { value: new THREE.Vector2(0, 0) },
        uMouseInfluence:{ value: mobile ? 0 : mouseInfluence },
        uParallax:      { value: mobile ? 0 : parallax },
        uNoise:         { value: noise },
      },
      premultipliedAlpha: true,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const effectiveDPR = Math.min(window.devicePixelRatio || 1, dprCap);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: (gpuTier <= 1) ? 'low-power' : 'high-performance',
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(effectiveDPR);
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.width  = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth  || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(
        Math.floor(w * resolutionScale),
        Math.floor(h * resolutionScale),
        false
      );
      renderer.domElement.style.width  = '100%';
      renderer.domElement.style.height = '100%';
      material.uniforms.uCanvas.value.set(w, h);
    };

    handleResize();

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Pause / resume on tab visibility
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);

      // Frame throttling for low-tier hardware
      frameCountRef.current += 1;
      if (frameCountRef.current % throttle !== 0) return;

      const dt      = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));

      if (!mobile) {
        const cur = pointerCurrentRef.current;
        const tgt = pointerTargetRef.current;
        cur.lerp(tgt, Math.min(1, dt * pointerSmoothRef.current));
        material.uniforms.uPointer.value.copy(cur);
      }

      renderer.render(scene, camera);
    };

    // On low-tier mobile: wait for idle before starting
    if (mobile && gpuTier <= 1) {
      if ('requestIdleCallback' in window) {
        idleCallbackRef.current = requestIdleCallback(
          () => { rafRef.current = requestAnimationFrame(loop); },
          { timeout: 5000 }
        );
      } else {
        idleCallbackRef.current = setTimeout(
          () => { rafRef.current = requestAnimationFrame(loop); },
          3000
        );
      }
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (idleCallbackRef.current !== null) {
        if ('requestIdleCallback' in window) cancelIdleCallback(idleCallbackRef.current);
        else clearTimeout(idleCallbackRef.current);
        idleCallbackRef.current = null;
      }
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement?.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  // Recompile whenever gpuTier changes or any param that wires into the
  // material at construction time changes.
  }, [gpuTier, frequency, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);

  // -------------------------------------------------------------------------
  // UNIFORM UPDATE EFFECT — cheap, no recompile
  // -------------------------------------------------------------------------
  useEffect(() => {
    const material  = materialRef.current;
    const renderer  = rendererRef.current;
    if (!material) return;

    rotationRef.current    = rotation;
    autoRotateRef.current  = autoRotate;

    material.uniforms.uSpeed.value          = speed;
    material.uniforms.uScale.value          = scale;
    material.uniforms.uFrequency.value      = frequency;
    material.uniforms.uWarpStrength.value   = warpStrength;
    material.uniforms.uMouseInfluence.value = mobile ? 0 : mouseInfluence;
    material.uniforms.uParallax.value       = mobile ? 0 : parallax;
    material.uniforms.uNoise.value          = noise;

    const toVec3 = hex => {
      const h = hex.replace('#', '').trim();
      const v =
        h.length === 3
          ? [parseInt(h[0]+h[0], 16), parseInt(h[1]+h[1], 16), parseInt(h[2]+h[2], 16)]
          : [parseInt(h.slice(0,2), 16), parseInt(h.slice(2,4), 16), parseInt(h.slice(4,6), 16)];
      return new THREE.Vector3(v[0]/255, v[1]/255, v[2]/255);
    };

    const { maxColors } = tier;
    const arr = (colors || []).filter(Boolean).slice(0, maxColors).map(toVec3);
    for (let i = 0; i < maxColors; i++) {
      const vec = material.uniforms.uColors.value[i];
      if (vec) {
        if (i < arr.length) vec.copy(arr[i]);
        else vec.set(0, 0, 0);
      }
    }
    material.uniforms.uColorCount.value = arr.length;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
  }, [
    rotation, autoRotate, speed, scale, frequency, warpStrength,
    mouseInfluence, parallax, noise, colors, transparent,
  ]);

  // -------------------------------------------------------------------------
  // POINTER TRACKING
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (mobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = e => {
      const rect = container.getBoundingClientRect();
      const x =  ((e.clientX - rect.left)  / (rect.width  || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top)   / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => container.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className ?? ''}`}
      style={style}
    />
  );
}