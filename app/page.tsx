"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { TechStack } from "@/components/tech-stack"
import { StatCard } from "@/components/stat-card"
import { Typewriter } from "@/components/typewriter"
import Timeline from "@/components/Timeline";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { blogs } from "@/lib/data/blogs";
import { ScrollReveal, ParallaxTitle } from "@/components/scroll-reveal";

export default function Home() {
  const [scrollDirection] = useState("down")
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: scrollYProgressHero } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgressHero, [0, 1], [1, 0.85])
  const heroOpacity = useTransform(scrollYProgressHero, [0, 1], [1, 0.2])
  const heroTextY = useTransform(scrollYProgressHero, [0, 1], ["0%", "-40%"])
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">


      <AnimatePresence mode="wait">
        <motion.main
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <motion.section
            id="home"
            ref={heroRef}
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="sticky top-0 h-screen flex flex-col overflow-hidden z-0"
          >
            {/* Atmospheric gradient background */}
            <div
              className="absolute inset-0 z-0"
              style={{ background: "radial-gradient(ellipse at 40% 30%, #1e1b4b 0%, #0f172a 45%, #030712 100%)" }}
            />
            {/* Dot grid texture */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Ambient glow blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-700/8 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>
            {/* Hero content */}
            <motion.div
              style={{ y: heroTextY }}
              className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="text-center max-w-4xl mx-auto space-y-8"
              >
                <motion.div variants={item}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    GenAI Engineer
                  </span>
                </motion.div>
                <motion.h1
                  variants={item}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
                >
                  <span
                    className="bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
                    style={{ backgroundImage: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)" }}
                  >
                    Aakash Jammula
                  </span>
                </motion.h1>
                <motion.p variants={item} className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                  <Typewriter text="Building innovative GenAI solutions with LLMs" delay={50} />
                </motion.p>
                <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}>
                      View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                    <Link href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}>
                      Contact Me
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={item} className="flex space-x-3 justify-center">
                  {[
                    { href: "https://github.com/Aakashjammula", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/aakashjammula/", icon: Linkedin, label: "LinkedIn" },
                    { href: "https://twitter.com/aakashjammula6", icon: Twitter, label: "Twitter" },
                    { href: "mailto:aakashjammula6@gmail.com", icon: Mail, label: "Email" },
                  ].map(social => (
                    <Link key={social.label} href={social.href} target={social.label !== "Email" ? "_blank" : undefined} rel={social.label !== "Email" ? "noopener noreferrer" : undefined}>
                      <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white hover:bg-white/10">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    </Link>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-gray-500 text-xs tracking-[0.2em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-indigo-400 to-transparent"
              />
            </motion.div>
          </motion.section>

          {/* Wrapper for content sliding over hero */}
          <div className="relative z-10 bg-gray-50 dark:bg-gray-900 pb-10 rounded-b-[2.5rem] shadow-2xl">
            {/* Stats Section */}
            <section className="w-full py-12 md:py-16 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  variants={container}
                  initial="show"
                  animate="show"
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                >
                  <StatCard number="1+" label="Year Experience" iconName="Clock" />
                  <StatCard number="5+" label="Projects Completed" iconName="Folder" />
                  <StatCard number="3+" label="LLM Models Used" iconName="Brain" />
                  <StatCard number="2+" label="GenAI Solutions" iconName="Brain" />
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 md:px-6">
                <ParallaxTitle title="About Me" />

                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                  <ScrollReveal delay={0.2} className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      I'm Aakash Jammula, a GenAI Engineer passionate about leveraging artificial intelligence to solve
                      complex problems. With expertise in large language models, natural language processing, and software
                      development, I create innovative solutions that push the boundaries of what's possible.
                    </p>
                  </ScrollReveal>

                  <div className="w-full mt-12 md:mt-16">
                    <Timeline />
                  </div>

                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 md:mt-16 w-full"
                  >
                    <TechStack />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="w-full py-20 md:py-24 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4 md:px-6">
                <ParallaxTitle 
                  title="My Projects" 
                  subtitle="Explore some of my recent work in GenAI and LLMs" 
                />

                <motion.div
                  variants={container}
                  initial="show"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                  <div className="min-h-[260px] sm:min-h-[280px] flex"> {/* Flex to make card take full height */}
                    <ProjectCard
                      title="Appointment Scheduling Agent"
                      description="An intelligent call agent that automatically handles book, cancel, update, and retrieve appointments through calls."
                      tags={["python", "twilio", "LangChain", "gemini", "llm agents"]}
                      link="https://github.com/aakashjammula6/appointment-agent"
                      index={0}
                    />
                  </div>
                  <div className="min-h-[260px] sm:min-h-[280px] flex">
                    <ProjectCard
                      title="LangChain Deep Researcher"
                      description="An automated research agent that iteratively searches, summarizes, and refines information using LangChain and Gemini."
                      tags={["python", "LangChain", "LangGraph", "gemini", "ollama"]}
                      link="https://github.com/Aakashjammula/langchain-deep-researcher"
                      index={1}
                    />
                  </div>
                </motion.div>

                <div className="flex justify-center mt-10 md:mt-12">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/projects">
                      View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 md:px-6">
                <ParallaxTitle 
                  title="Blog" 
                  subtitle="Thoughts and insights on GenAI and LLMs" 
                />

                <motion.div
                  variants={container}
                  initial="show"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                  {blogs.slice(0, 3).map((post, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="min-h-[260px] sm:min-h-[280px] flex" // Flex to make card take full height
                    >
                      <div className="h-full w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-xl transition-shadow duration-300">
                        <div className="flex-none">
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex-none mt-auto">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary hover:underline inline-flex items-center font-medium text-sm"
                          >
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center mt-10 md:mt-12">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/blog">
                      View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Curtain Reveal for Contact & Footer */}
          <div className="sticky bottom-0 z-0">
            {/* Contact Section */}
            <section id="contact" className="w-full py-20 md:py-24 bg-white dark:bg-gray-800">
              <div className="container mx-auto px-4 md:px-6">
                <ParallaxTitle 
                  title="Get In Touch" 
                  subtitle="Have a project in mind or want to collaborate? Let's talk!" 
                />

                <ScrollReveal delay={0.2} className="max-w-md mx-auto">
                  <div className="space-y-6">
                    {[
                      { icon: Mail, text: "aakashjammula6@gmail.com", href: "mailto:aakashjammula6@gmail.com" },
                      { icon: Linkedin, text: "linkedin.com/in/aakashjammula", href: "https://www.linkedin.com/in/aakashjammula/", target: "_blank" },
                      { icon: Github, text: "github.com/Aakashjammula", href: "https://github.com/Aakashjammula", target: "_blank" },
                      { icon: Twitter, text: "@aakashjammula6", href: "https://twitter.com/aakashjammula6", target: "_blank" },
                    ].map((contactItem, index) => (
                      <motion.a
                        key={index}
                        href={contactItem.href}
                        target={contactItem.target}
                        rel={contactItem.target ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors duration-200 group"
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0 }}
                      >
                        <contactItem.icon className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white break-all">
                          {contactItem.text}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-8 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left"
                  >
                    © {new Date().getFullYear()} Aakash Jammula. All rights reserved.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex gap-4 sm:gap-6"
                  >
                    <Link
                      href="/blog"
                      className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/projects"
                      className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      Projects
                    </Link>
                  </motion.div>
                </div>
              </div>
              <ChatbotWidget />
            </footer>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  )
}