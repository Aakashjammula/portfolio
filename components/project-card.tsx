"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef, useState } from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  index: number
}

export function ProjectCard({ title, description, tags, link, index }: ProjectCardProps) {
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
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="transition-all hover:bg-primary/20 hover:text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-none mt-auto">
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Visit Project <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
