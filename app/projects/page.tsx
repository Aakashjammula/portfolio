"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import * as m from "framer-motion/m"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Claude Skills",
      description:
        "My collection of Claude Code skills — built to work across Claude Code, OpenCode, Codex CLI, and Copilot CLI. Currently includes webagent for browser automation with built-in token tracking; more skills are being added over time.",
      tags: ["claude code", "ai agents", "browser automation"],
      link: "https://github.com/Aakashjammula/skills",
    },
    {
      title: "LangChain Deep Researcher",
      description:
        "An automated research agent that iteratively searches, summarizes, and refines information using LangChain and Gemini.",
      tags: ["python", "LangChain", "LangGraph", "gemini", "ollama"],
      link: "https://github.com/Aakashjammula/langchain-deep-researcher",
    },
    {
      title: "Appointment Scheduling Agent",
      description: "An intelligent call agent that automatically handles book, cancel, update, and retrieve appointments.",
      tags: ["python", "twilio", "LangChain", "gemini", "llm agents"],
      link: "https://github.com/aakashjammula6/appointment-agent",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:px-6 md:py-24"
    >
      <m.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </m.div>

      <m.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionHeading title="My Projects" description="A collection of my work in GenAI and LLM development" />
      </m.div>

      <m.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 max-w-4xl mx-auto"
      >
        {projects.map((project, index) => (
          <div key={index} className="min-h-[300px] flex">
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              index={index}
            />
          </div>
        ))}
      </m.div>
    </m.div>
  )
}
