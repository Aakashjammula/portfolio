"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef, useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  index: number
}

export function ProjectCard({ title, description, tags, link, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // cinematic ease out
            delay: index * 0.1,
          },
        },
      }}
      className="h-full w-full perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full relative group cursor-pointer"
      >
        <div 
          className="overflow-hidden h-full rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col relative z-10 shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Deep Parallax Background */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 ease-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 80% 0%, rgba(99,102,241,0.25) 0%, transparent 60%)`,
              translateZ: -50,
            }}
          />
          
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />

          {/* Cinematic Content Layer */}
          <div 
            className="relative z-10 flex flex-col h-full p-8 sm:p-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex-grow">
              <motion.h3 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight"
                style={{ translateZ: 50 }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm"
                style={{ translateZ: 30 }}
              >
                {description}
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-12 gap-6" style={{ transformStyle: "preserve-3d" }}>
              <motion.div 
                className="flex flex-wrap gap-2"
                style={{ translateZ: 40 }}
              >
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div style={{ translateZ: 60 }}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black hover:scale-110 hover:bg-indigo-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
