"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Menu, X } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { TechStack } from "@/components/tech-stack"
import { StatCard } from "@/components/stat-card"
import { Typewriter } from "@/components/typewriter"
import Timeline from "@/components/Timeline"; // Import the Timeline component
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("none")
  const [lastScrollY, setLastScrollY] = useState(0)

  const sections = ["home", "about", "projects", "blog", "contact"]

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      const direction = element.getBoundingClientRect().top > 0 ? "down" : "up"
      setScrollDirection(direction)
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            Aakash Jammula
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium capitalize transition-colors ${
                  activeSection === section
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {section}
              </button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium capitalize transition-colors ${
                    activeSection === section
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          className="flex-1 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section id="home" className="w-full py-20 md:py-32 lg:py-40">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ opacity }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      GenAI Engineer
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                    >
                      <Typewriter text="Aakash Jammula" delay={100} />
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-500 dark:text-gray-400 text-lg md:text-xl h-8" // Added fixed height to prevent layout shift
                    >
                      <Typewriter text="Building innovative GenAI solutions with LLMs" delay={50} />
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button asChild size="lg">
                      <Link href="#projects" onClick={() => scrollToSection("projects")}>
                        View Projects <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="#contact" onClick={() => scrollToSection("contact")}>
                        Contact Me
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex space-x-4"
                  >
                    <Link href="https://github.com/Aakashjammula" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/aakashjammula/" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </Link>
                    <Link href="https://twitter.com/aakashjammula6" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </Link>
                    <Link href="mailto:aakashjammula6@gmail.com">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex items-center justify-center -ml-80" 
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="w-full"
                  >
                    <DotLottieReact
                      src="https://lottie.host/f1150457-df05-47b9-b381-fdad41f69e95/9dsj2iV81T.lottie"
                      background="transparent"
                      speed={1}
                      loop
                      autoplay
                      renderer="svg"
                      style={{ width: "500%", height: "auto", minHeight: "500px", maxWidth: "1200px" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="w-full py-12 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
              >
                <StatCard number="1+" label="Year Experience" icon="Clock" />
                <StatCard number="5+" label="Projects Completed" icon="Folder" />
                <StatCard number="3+" label="LLM Models Used" icon="Brain" />
                <StatCard number="2+" label="GenAI Solutions" icon="Brain" />
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="w-full py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  About Me
                </motion.h2>

              </motion.div>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 max-w-2xl"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    I'm Aakash Jammula, a GenAI Engineer passionate about leveraging artificial intelligence to solve
                    complex problems. With expertise in large language models, natural language processing, and software
                    development, I create innovative solutions that push the boundaries of what's possible.
                  </motion.p>

                </motion.div>

                {/* Timeline Component */}
                <Timeline />

                {/* Tech Stack Component */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-12" // Add some margin top
                >
                  <TechStack />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="w-full py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  My Projects
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-500 dark:text-gray-400 text-lg"
                >
                  Explore some of my recent work in GenAI and LLMs
                </motion.p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                <div className="h-[260px]">
                  <ProjectCard
                    title="Appointment Scheduling Agent"
                    description="An intelligent call agent that automatically handles book, cancel, update, and retrieve appointments through calls."
                    tags={["python", "twilio", "LangChain", "gemini", "llm agents"]}
                    link="https://github.com/aakashjammula6/appointment-agent"
                    index={0}
                  />
                </div>
                <div className="h-[260px]">
                  <ProjectCard
                    title="LangChain Deep Researcher"
                    description="An automated research agent that iteratively searches, summarizes, and refines information using LangChain and Gemini."
                    tags={["python", "LangChain", "LangGraph", "gemini","ollama"]}
                    link="https://github.com/Aakashjammula/langchain-deep-researcher"
                    index={1}
                  />
                </div>
              </motion.div>

              <div className="flex justify-center mt-10">
                <Button asChild variant="outline">
                  <Link href="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section id="blog" className="w-full py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Blog
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-500 dark:text-gray-400 text-lg"
                >
                  Thoughts and insights on GenAI and LLMs
                </motion.p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                <div className="h-[260px]">
                  <motion.div
                    variants={item}
                    className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border flex flex-col"
                  >
                    <div className="flex-none">
                      <h3 className="text-xl font-bold mb-2">uv: The Fastest Python Package Manager</h3>
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Discover the blazing fast Python package manager written in Rust that's revolutionizing Python
                        workflows.
                      </p>
                    </div>
                    <div className="flex-none mt-auto">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>April 16, 2025</span>
                        <span className="mx-2">•</span>
                        <span>10 min read</span>
                      </div>
                      <Link
                        href="/blog/uv-fastest-python-package-manager"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                <div className="h-[260px]">
                  <motion.div
                    variants={item}
                    className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border flex flex-col"
                  >
                    <div className="flex-none">
                      <h3 className="text-xl font-bold mb-2">Understanding Model Control Protocol</h3>
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                      A beginner's guide to the Model Control Protocol in AI agents with LangChain, Gemini and Python-MCP SDK.
                      </p>
                    </div>
                    <div className="flex-none mt-auto">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>April 16, 2025</span>
                        <span className="mx-2">•</span>
                        <span>10 min read</span>
                      </div>
                      <Link
                        href="/blog/mcp-model-control-protocol"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="flex justify-center mt-10">
                <Button asChild variant="outline">
                  <Link href="/blog">
                    View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-500 dark:text-gray-400 text-lg"
                >
                  Have a project in mind or want to collaborate? Let's talk!
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: scrollDirection === "up" ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-md mx-auto text-center"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <a href="mailto:aakashjammula6@gmail.com" className="text-lg hover:underline">
                      aakashjammula6@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Linkedin className="h-6 w-6 text-primary" />
                    <a
                      href="https://www.linkedin.com/in/aakashjammula/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:underline"
                    >
                      linkedin.com/in/aakashjammula
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Github className="h-6 w-6 text-primary" />
                    <a
                      href="https://github.com/Aakashjammula"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:underline"
                    >
                      github.com/Aakashjammula
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Twitter className="h-6 w-6 text-primary" />
                    <a
                      href="https://twitter.com/aakashjammula6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:underline"
                    >
                      @aakashjammula6
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full py-8 bg-white dark:bg-gray-800 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              © {new Date().getFullYear()} Aakash Jammula. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link
                href="/blog"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/projects"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Projects
              </Link>
            </motion.div>
          </div>
        </div>
        <ChatbotWidget />
      </footer>
    </div>
  )
}
