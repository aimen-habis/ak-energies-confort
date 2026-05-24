"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * Domain-warped fbm noise. The horizontal axis (plus the cursor) blends a
 * fire palette into a frost palette — flames melting into ice.
 */
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
    vec2 p = uv * aspect * 2.6;
    float t = uTime * 0.08;

    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    float n = fbm(p + q * 2.0 + t);

    vec3 fire = mix(vec3(0.76, 0.25, 0.05), vec3(1.0, 0.70, 0.28), n);
    fire = mix(vec3(1.0, 0.30, 0.18), fire, 0.6);
    vec3 frost = mix(vec3(0.05, 0.35, 0.55), vec3(0.22, 0.74, 0.97), n);

    float m = smoothstep(0.0, 1.0, uv.x * 0.55 + uMouse.x * 0.55 + (n - 0.5) * 0.4);
    vec3 col = mix(fire, frost, m);

    col *= 0.5 + 0.5 * n;
    col = mix(vec3(0.04, 0.04, 0.06), col, 0.5);

    float vig = smoothstep(1.25, 0.2, length(uv - 0.5));
    col *= vig * 0.6 + 0.45;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Skip WebGL on touch / reduced-motion — the CSS fallback handles it.
    if (isMobile || reduced) return;
    const container = ref.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 1.75),
    });
    const gl = renderer.gl;
    gl.clearColor(0.04, 0.04, 0.06, 1);
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    const mouse = { x: 0.5, target: 0.5 };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uRes: { value: [1, 1] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.target = e.clientX / window.innerWidth;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = (time: number) => {
      mouse.x += (mouse.target - mouse.x) * 0.05;
      program.uniforms.uTime.value = time * 0.001;
      program.uniforms.uMouse.value = [mouse.x, 0.5];
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gl.canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [isMobile, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_30%_30%,#3a1206,transparent_55%),radial-gradient(circle_at_75%_70%,#06304a,transparent_55%)]"
    />
  );
}
