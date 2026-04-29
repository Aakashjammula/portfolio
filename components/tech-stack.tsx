"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

  const categories = Array.from(new Set(technologies.map((tech) => tech.category)))

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Staggered parallax for floating effect
  const yOffsets = [
    useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
    useTransform(scrollYProgress, [0, 1], ["15%", "-5%"]),
    useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]),
    useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "5%"]),
  ]

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  }

  const categoryBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const categoryTitleVariants = {
    hidden: { opacity: 0, x: -15 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, delay: 0.15, ease: "circOut" },
    },
  }

  const techItemsGridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.07,
      },
    },
  }

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 12,
      },
    },
  }

  return (
    <div className="py-12 md:py-16">
      <ParallaxTitle title="My Tech Stack" />

      <motion.div
        ref={containerRef}
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-wrap gap-6 sm:gap-8 justify-center items-start mt-8"
      >
        {categories.map((category, idx) => {
          const categoryTechs = technologies.filter(
            (tech) => tech.category === category
          )
          
          const y = yOffsets[idx % yOffsets.length]

          return (
            <motion.div
              key={category}
              variants={categoryBlockVariants}
              style={{ y }}
              className="flex flex-col p-5 sm:p-6 rounded-xl border bg-white dark:bg-slate-800 shadow-xl 
                         w-full min-w-[280px] 
                         sm:w-auto sm:min-w-[300px] sm:max-w-xs 
                         md:min-w-[320px] md:max-w-sm"
            >
              <motion.h3
                variants={categoryTitleVariants}
                className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5 text-center text-primary"
              >
                {category}
              </motion.h3>

              <motion.div
                variants={techItemsGridVariants}
                className="grid grid-cols-2 auto-rows-fr gap-3 sm:gap-4"
              >
                {categoryTechs.map((tech, index) => {
                  const isLastItemInOddCategory =
                    categoryTechs.length % 2 === 1 &&
                    index === categoryTechs.length - 1
                  
                  return (
                    <motion.div
                      key={tech.name}
                      variants={techItemVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 7px 20px -5px rgba(0, 0, 0, 0.15)",
                      }}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-200 h-full ${
                        isLastItemInOddCategory ? "col-span-2" : ""
                      }`}
                    >
                      <tech.icon className="w-8 h-8 sm:w-9 sm:h-9 mb-2 text-indigo-500 dark:text-sky-400" />
                      <span className="text-xs sm:text-sm font-medium text-center text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}