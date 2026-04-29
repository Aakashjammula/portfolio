"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

interface BlogRowProps {
  post: {
    title: string
    description: string
    date: string
    readTime: string
    slug: string
    image?: string
  }
  index: number
}

export function BlogRow({ post, index }: BlogRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Placeholder abstract gradients for the floating preview
  const gradients = [
    "linear-gradient(135deg, #6366f1, #a855f7)",
    "linear-gradient(135deg, #ec4899, #f43f5e)",
    "linear-gradient(135deg, #10b981, #3b82f6)",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div 
        ref={rowRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative"
      >
        <Link 
          href={`/blog/${post.slug}`}
          className="relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-gray-200 dark:border-gray-800 hover:border-transparent transition-colors duration-300 z-10"
        >
          {/* Hover Background */}
          <div className="absolute inset-0 z-0 bg-white dark:bg-gray-800/80 shadow-xl opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 -mx-6 md:-mx-8 px-6 md:px-8" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full px-2">
            <div className="text-gray-500 dark:text-gray-400 font-medium text-sm md:w-32 flex-shrink-0">
              {post.date}
            </div>
            
            <div className="flex-grow group-hover:translate-x-6 transition-transform duration-500 ease-out">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl line-clamp-2">
                {post.description}
              </p>
            </div>

            <div className="flex items-center text-indigo-500 dark:text-indigo-400 font-medium group-hover:-translate-x-2 transition-transform duration-500 ease-out mt-4 md:mt-0">
              Read Article
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </div>
          </div>
        </Link>

        {/* Floating Image Preview - rendered outside the link so it can float over the boundaries */}
        {isHovering && (
          <motion.div
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-50 pointer-events-none w-72 h-48 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hidden md:block"
            // Combine x/y translation with -50% to center the image on the cursor
            transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
          >
            {post.image ? (
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full opacity-90" style={{ background: gradients[index % gradients.length] }} />
            )}
            {/* Optional overlay text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">View</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
