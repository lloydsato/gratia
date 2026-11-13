import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * Editorial atmosphere: a fixed, full-screen three.js shader behind the content.
 * A slow domain-warped noise field is printed as a 45-degree halftone (a press nod),
 * with RGB-split fringes that widen with scroll velocity and a ripple that follows the pointer.
 * It is atmosphere only: pointer-events none, low contrast, never the only carrier of meaning.
 */
const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uVel;
uniform float uScroll;
uniform float uDpr;
uniform float uRipple;
varying vec2 vUv;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
float field(vec2 p) {
  vec2 q = vec2(fbm(p + vec2(0.0, uTime * 0.02)), fbm(p + vec2(5.2, 1.3) - uTime * 0.015));
  return fbm(p + 1.6 * q + vec2(uTime * 0.01, uScroll * 0.08));
}
float dotMask(vec2 frag, float v, float cell) {
  const float c = 0.70710678;
  mat2 R = mat2(c, -c, c, c);
  vec2 f = fract(R * frag / cell) - 0.5;
  float r = sqrt(clamp(v, 0.0, 1.0)) * 0.62;
  return smoothstep(r, r - 0.14, length(f));
}
void main() {
  float asp = uRes.x / uRes.y;
  vec2 uv = vUv;
  vec2 p = uv * vec2(asp, 1.0) * 1.5;

  // ripple pushed outward from the pointer
  vec2 d = (uv - uMouse) * vec2(asp, 1.0);
  float rip = exp(-dot(d, d) * 14.0) * uRipple;
  p += normalize(d + 1e-4) * rip * 0.35;

  float split = 0.004 + uVel * 0.03 + rip * 0.05; // RGB split grows with scroll velocity
  vec3 v = smoothstep(vec3(0.46), vec3(0.78), vec3(field(p + vec2(split, 0.0)), field(p), field(p - vec2(split, 0.0))));

  float cell = 10.0 * uDpr;
  vec2 fr = gl_FragCoord.xy;
  vec3 ht = vec3(
    dotMask(fr + vec2(split * 700.0, 0.0), v.r, cell),
    dotMask(fr, v.g, cell),
    dotMask(fr - vec2(split * 700.0, 0.0), v.b, cell)
  );

  vec3 base = vec3(0.0824, 0.0863, 0.1059); // #15161b, the page ground
  vec3 ink = vec3(0.843, 0.835, 0.776);      // warm bone
  vec3 col = base + ink * ht * 0.16;
  // keep the edges calm
  col = mix(base, col, smoothstep(1.2, 0.25, length((uv - 0.5) * vec2(1.0, 1.15)) * 1.25));
  gl_FragColor = vec4(col, 1.0);
}`;

export function mountGL(canvas: HTMLCanvasElement, reduced: boolean) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
  } catch {
    return null; // no WebGL: the flat ground colour is the fallback
  }
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uRes: { value: new THREE.Vector2(1, 1) },
    uTime: { value: reduced ? 24 : 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uVel: { value: 0 },
    uScroll: { value: 0 },
    uDpr: { value: dpr },
    uRipple: { value: 0 },
  };
  const geo = new THREE.PlaneGeometry(2, 2);
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, depthTest: false, depthWrite: false });
  scene.add(new THREE.Mesh(geo, mat));

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    const b = renderer.getDrawingBufferSize(new THREE.Vector2());
    uniforms.uRes.value.copy(b);
    if (reduced) renderer.render(scene, camera);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const target = new THREE.Vector2(0.5, 0.5);
  let lastY = window.scrollY, vel = 0, ripple = 0, lastMove = 0;
  const t0 = performance.now();

  const onMove = (e: PointerEvent) => {
    target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    lastMove = performance.now();
  };
  const frame = () => {
    const now = performance.now();
    uniforms.uTime.value = (now - t0) / 1000;
    uniforms.uMouse.value.lerp(target, 0.08);
    const y = window.scrollY;
    vel += (Math.min(Math.abs(y - lastY) / 70, 1) - vel) * 0.12;
    lastY = y;
    uniforms.uVel.value = vel;
    uniforms.uScroll.value = y / 1000;
    ripple += ((now - lastMove < 700 ? 1 : 0) - ripple) * 0.08;
    uniforms.uRipple.value = ripple;
    renderer.render(scene, camera);
  };

  if (reduced) {
    renderer.render(scene, camera);
  } else {
    gsap.ticker.add(frame);
    window.addEventListener('pointermove', onMove, { passive: true });
  }
  document.documentElement.classList.add('has-gl');

  const dispose = () => {
    gsap.ticker.remove(frame);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', resize);
    geo.dispose();
    mat.dispose();
    renderer.dispose();
  };
  window.addEventListener('pagehide', dispose, { once: true });
  return dispose;
}
