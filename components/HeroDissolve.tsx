"use client"

import { useEffect, useRef, RefObject } from "react"
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
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpread;
varying vec2 vUv;

float Hash(vec2 p) {
  vec3 p2 = vec3(p.xy, 1.0);
  return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f *= f * (3.0 - 2.0 * f);
  return mix(
    mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
    mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  v += noise(p * 1.0) * 0.5;
  v += noise(p * 2.0) * 0.25;
  v += noise(p * 4.0) * 0.125;
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
  float dissolveEdge = uv.y - uProgress * 1.2;
  float noiseValue = fbm(centeredUv * 15.0);
  float d = dissolveEdge + noiseValue + uSpread;
  float pixelSize = 1.0 / uResolution.y;
  float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
  gl_FragColor = vec4(uColor, alpha);
}
`

export function HeroDissolve({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const heroEl = heroRef.current
    const initW = heroEl?.offsetWidth ?? window.innerWidth
    const initH = heroEl?.offsetHeight ?? window.innerHeight
    renderer.setSize(initW, initH)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // gray-900 = #111827 = rgb(17, 24, 39)
    const uColor = new THREE.Vector3(17 / 255, 24 / 255, 39 / 255)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress:   { value: 0.0 },
        uResolution: { value: new THREE.Vector2(initW, initH) },
        uColor:      { value: uColor },
        uSpread:     { value: 0.45 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    scene.add(new THREE.Mesh(geometry, material))

    let animId: number
    const animate = () => {
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1.1, (-top / height) * 2))
      material.uniforms.uProgress.value = progress
    }

    const onResize = () => {
      const el = heroRef.current
      const w = el?.offsetWidth ?? window.innerWidth
      const h = el?.offsetHeight ?? window.innerHeight
      renderer.setSize(w, h)
      material.uniforms.uResolution.value.set(w, h)
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
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
