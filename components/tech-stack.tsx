"use client"

import { useRef } from "react"
import * as m from "framer-motion/m"
import { useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion"
import { ParallaxTitle } from "@/components/scroll-reveal"
import {
  Code,
  FileCode,
  Braces,
  Terminal,
  Brain,
  Cpu,
  Bot,
  Cloud,
  CloudCog,
  Container,
  Boxes,
  Database,
  Table2,
  Layers,
  GitBranch,
  Github,
} from "lucide-react"

// Bento Card Component with Spotlight
function BentoCard({ children, className, style }: any) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  return (
    <m.div
      style={style}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
      className={`group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-900/40 border border-gray-200/50 dark:border-white/10 backdrop-blur-xl shadow-xl ${className}`}
    >
      <m.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative p-6 sm:p-8 h-full flex flex-col z-20">
        {children}
      </div>
    </m.div>
  )
}

export function TechStack() {
  const technologies = [
    { name: "React", icon: Code, category: "Frontend" },
    { name: "Next.js", icon: FileCode, category: "Frontend" },
    { name: "TypeScript", icon: Braces, category: "Languages" },
    { name: "Python", icon: Terminal, category: "Languages" },
    { name: "PyTorch", icon: Cpu, category: "AI/ML" },
    { name: "Langchain", icon: Bot, category: "AI/ML" },
    { name: "AWS", icon: Cloud, category: "Cloud" },
    { name: "Azure", icon: CloudCog, category: "Cloud" },
    { name: "Docker", icon: Container, category: "DevOps" },
    { name: "Kubernetes", icon: Boxes, category: "DevOps" },
    { name: "Git", icon: GitBranch, category: "Tools" },
    { name: "GitHub", icon: Github, category: "Tools" },
    { name: "MongoDB", icon: Database, category: "Databases" },
    { name: "PostgreSQL", icon: Table2, category: "Databases" },
    { name: "Redis", icon: Layers, category: "Databases" },
  ]

  const bentoSpans: Record<string, string> = {
    "Frontend": "md:col-span-1 lg:col-span-1",
    "Languages": "md:col-span-1 lg:col-span-1",
    "AI/ML": "md:col-span-2 lg:col-span-1",
    "Cloud": "md:col-span-1 lg:col-span-1",
    "DevOps": "md:col-span-1 lg:col-span-1",
    "Tools": "md:col-span-2 lg:col-span-1",
    "Databases": "md:col-span-2 lg:col-span-3",
  }

  const categories = Array.from(new Set(technologies.map((tech) => tech.category)))

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Staggered parallax for floating effect
  const yOffsets = [
    useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "8%"]),
    useTransform(scrollYProgress, [0, 1], ["8%", "-2%"]),
    useTransform(scrollYProgress, [0, 1], ["-2%", "5%"]),
    useTransform(scrollYProgress, [0, 1], ["5%", "-8%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "3%"]),
    useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]),
  ]

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const categoryBlockVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <div className="py-12 md:py-16">
      <ParallaxTitle title="My Tech Stack" subtitle="The tools and technologies I use to build scalable GenAI solutions" />

      <m.div
        ref={containerRef}
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 max-w-6xl mx-auto"
      >
        {categories.map((category, idx) => {
          const categoryTechs = technologies.filter(
            (tech) => tech.category === category
          )
          
          const y = yOffsets[idx % yOffsets.length]
          const spanClass = bentoSpans[category] || "col-span-1"

          return (
            <BentoCard
              key={category}
              style={{ y }}
              className={`${spanClass}`}
            >
              <m.div variants={categoryBlockVariants} className="h-full flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                  {category}
                </h3>

                <div className={`grid gap-4 ${categoryTechs.length >= 3 ? "grid-cols-3" : "grid-cols-2"} mt-auto`}>
                  {categoryTechs.map((tech) => (
                    <div
                      key={tech.name}
                      className="group/item flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
                    >
                      <tech.icon className="w-8 h-8 mb-3 text-gray-600 dark:text-gray-400 group-hover/item:text-indigo-500 dark:group-hover/item:text-indigo-400 transition-colors duration-300" />
                      <span className="text-xs font-semibold text-center text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </m.div>
            </BentoCard>
          )
        })}
      </m.div>
    </div>
  )
}