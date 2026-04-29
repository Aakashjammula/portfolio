"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x   + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    val += amp * snoise(p * freq);
    amp  *= 0.5;
    freq *= 2.0;
  }
  return val * 0.5 + 0.5;
}

void main() {
  float n = fbm(vUv * 3.5 + uTime * 0.04);

  float dissolveEdge = 0.06;
  float alpha = 1.0 - smoothstep(uProgress - dissolveEdge, uProgress + dissolveEdge, n);

  float edgeLow  = uProgress - dissolveEdge * 2.5;
  float edgeHigh = uProgress - dissolveEdge * 0.5;
  float glow = smoothstep(edgeLow, edgeHigh, n) * (1.0 - smoothstep(edgeHigh, uProgress, n));

  vec3 bgColor   = vec3(0.067, 0.082, 0.122);
  vec3 glowColor = vec3(0.388, 0.400, 0.945);

  vec3 color = mix(bgColor, glowColor + vec3(0.2, 0.1, 0.3), glow * 4.0);

  gl_FragColor = vec4(color, max(alpha, glow * 0.6));
}
`

export function HeroDissolve({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0.0 },
        uTime:     { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    scene.add(new THREE.Mesh(geometry, material))

    let animId = 0
    let time = 0
    const animate = () => {
      time += 0.008
      material.uniforms.uTime.value = time
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / (height * 0.6)))
      material.uniforms.uProgress.value = progress
    }

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [heroRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
