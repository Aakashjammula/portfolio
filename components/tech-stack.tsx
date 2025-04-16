"use client"

import { motion } from "framer-motion"
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
    { name: "TensorFlow", icon: Brain, category: "AI/ML" },
    { name: "PyTorch", icon: Cpu, category: "AI/ML" },
    { name: "Langchain", icon: Bot, category: "AI/ML" },
    { name: "AWS", icon: Cloud, category: "Cloud" },
    { name: "Google Cloud", icon: CloudCog, category: "Cloud" },
    { name: "Docker", icon: Container, category: "DevOps" },
    { name: "Kubernetes", icon: Boxes, category: "DevOps" },
    { name: "MongoDB", icon: Database, category: "Databases" },
    { name: "PostgreSQL", icon: Table2, category: "Databases" },
    { name: "Redis", icon: Layers, category: "Databases" },
    { name: "Git", icon: GitBranch, category: "Tools" },
    { name: "GitHub", icon: Github, category: "Tools" },
  ]

  const categories = Array.from(new Set(technologies.map((tech) => tech.category)))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold mb-4"
          >
            {category}
          </motion.h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {technologies
              .filter((tech) => tech.category === category)
              .map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={item}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border bg-background hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <tech.icon className="w-10 h-10 mb-2 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
