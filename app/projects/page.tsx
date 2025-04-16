"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Appointment Scheduling Agent",
      description: "An intelligent call agent that automatically handles book, cancel, update, and retrieve appointments.",
      tags: ["python", "twilio", "LangChain", "gemini", "llm agents"],
      link: "https://github.com/aakashjammula6/appointment-agent",
    },
    {
      title: "LangChain Deep Researcher",
      description:
        "An automated research agent that iteratively searches, summarizes, and refines information using LangChain and Gemini.",
      tags: ["python", "LangChain", "LangGraph", "gemini", "ollama"],
      link: "https://github.com/Aakashjammula/langchain-deep-researcher",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-12 md:px-6 md:py-24"
    >
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionHeading title="My Projects" description="A collection of my work in GenAI and LLM development" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 max-w-4xl mx-auto"
      >
        {projects.map((project, index) => (
          <div key={index} className="h-[260px]">
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
      </motion.div>
    </motion.div>
  )
}
