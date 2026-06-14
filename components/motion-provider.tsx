"use client"

import type React from "react"
import { LazyMotion } from "framer-motion"

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
