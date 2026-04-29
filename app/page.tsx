"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { TechStack } from "@/components/tech-stack"
import { StatCard } from "@/components/stat-card"
import { Typewriter } from "@/components/typewriter"
import Timeline from "@/components/Timeline";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { blogs } from "@/lib/data/blogs";

export default function Home() {
  const [scrollDirection] = useState("down")

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
          className="flex-1 pt-20" // Adjusted padding-top for header height (py-4 is 16px, border 1px, total roughly 50-60px. pt-16 (64px) or pt-20 (80px) is safer)
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section id="home" className="w-full py-16 md:py-24 lg:py-32 xl:py-36">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6 text-center md:text-left" // Centered text on mobile
                >
                  <div className="space-y-3">
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
                      className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                    >
                      <span
                        className="bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
                        style={{
                          backgroundImage: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)",
                        }}
                      >
                        <Typewriter text="Aakash Jammula" delay={100} />
                      </span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-600 dark:text-gray-400 text-lg md:text-xl min-h-[2.5rem] sm:min-h-[3rem]" // Adjusted min-height
                    >
                      <Typewriter text="Building innovative GenAI solutions with LLMs" delay={50} />
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start" // Responsive button layout
                  >
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}>
                        View Projects <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                      <Link href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}>
                        Contact Me
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex space-x-4 justify-center md:justify-start"
                  >
                    {[
                      { href: "https://github.com/Aakashjammula", icon: Github, label: "GitHub" },
                      { href: "https://www.linkedin.com/in/aakashjammula/", icon: Linkedin, label: "LinkedIn" },
                      { href: "https://twitter.com/aakashjammula6", icon: Twitter, label: "Twitter" },
                      { href: "mailto:aakashjammula6@gmail.com", icon: Mail, label: "Email" },
                    ].map(social => (
                      <Link key={social.label} href={social.href} target={social.label !== "Email" ? "_blank" : undefined} rel={social.label !== "Email" ? "noopener noreferrer" : undefined}>
                        <Button variant="ghost" size="icon" className="rounded-full text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                          <social.icon className="h-5 w-5" />
                          <span className="sr-only">{social.label}</span>
                        </Button>
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden md:flex items-center justify-center" // Hidden on mobile, shown on md+
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                    className="w-full flex justify-start items-center -ml-28"
                  >
                    <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]">
                      <DotLottieReact
                        src="https://lottie.host/f1150457-df05-47b9-b381-fdad41f69e95/9dsj2iV81T.lottie"
                        speed={1}
                        loop
                        autoplay
                        style={{
                          width: "280%",
                          height: "auto",
                          paddingBottom: "10%",
                          transform: "translateX(-200px) translateY(-80px)"   // ← add this
                        }}
                      />
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="w-full py-12 md:py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white"
                >
                  About Me
                </motion.h2>
              </motion.div>

              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
                  >
                    I'm Aakash Jammula, a GenAI Engineer passionate about leveraging artificial intelligence to solve
                    complex problems. With expertise in large language models, natural language processing, and software
                    development, I create innovative solutions that push the boundaries of what's possible.
                  </motion.p>
                </motion.div>

                <div className="w-full mt-12 md:mt-16">
                  <Timeline />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white"
                >
                  My Projects
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-600 dark:text-gray-400 text-lg"
                >
                  Explore some of my recent work in GenAI and LLMs
                </motion.p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }} // Lower amount for grid
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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white"
                >
                  Blog
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-600 dark:text-gray-400 text-lg"
                >
                  Thoughts and insights on GenAI and LLMs
                </motion.p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
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

          {/* Contact Section */}
          <section id="contact" className="w-full py-20 md:py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white"
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: scrollDirection === "up" ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-gray-600 dark:text-gray-400 text-lg"
                >
                  Have a project in mind or want to collaborate? Let's talk!
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: scrollDirection === "up" ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="max-w-md mx-auto"
              >
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
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                    >
                      <contactItem.icon className="h-6 w-6 text-primary flex-shrink-0" />
                      <span className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white break-all">
                        {contactItem.text}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </motion.main>
      </AnimatePresence>

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
  )
}