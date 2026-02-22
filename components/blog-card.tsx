"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogCardProps {
  title: string
  description: string
  date: string
  readTime: string
  slug: string
  index: number
}

export function BlogCard({ title, description, date, readTime, slug, index }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
          },
        },
      }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          scale: 1.03,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="h-full relative group"
      >
        {/* Glow effect layer - only rendered while hovering */}
        {isHovering && (
          <div
            className="absolute -inset-[1px] rounded-xl transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(99, 102, 241, 0.15), transparent 60%)`,
            }}
          />
        )}
        <Card className="overflow-hidden h-full transition-all duration-300 border-opacity-50 hover:border-primary/50 flex flex-col relative z-10 bg-white dark:bg-gray-900">
          <CardHeader className="flex-none">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </CardContent>
          <CardFooter className="flex-none mt-auto flex-col items-start gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <span>{date}</span>
              <span className="mx-2">•</span>
              <span>{readTime}</span>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
