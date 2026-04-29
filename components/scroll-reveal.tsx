"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

// A component that reveals its children with a mask (sliding up from hidden overflow)
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }} // Custom spring-like easing
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxTitleProps {
  title: string
  subtitle?: string
}

// A component for section headers that introduces Y-axis parallax on scroll
export function ParallaxTitle({ title, subtitle }: ParallaxTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Apply parallax to the whole container, not inside the mask
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <motion.div ref={ref} style={{ y }} className="max-w-3xl mx-auto text-center mb-12 md:mb-16 relative">
      <ScrollReveal className="py-2 -my-2">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white pb-2">
          {title}
        </h2>
      </ScrollReveal>
      
      {subtitle && (
        <ScrollReveal delay={0.1} className="py-2 -my-2">
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </motion.div>
  )
}
