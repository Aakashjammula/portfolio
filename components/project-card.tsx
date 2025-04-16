"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

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
        whileHover={{
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full transition-all duration-300 border-opacity-50 hover:border-primary/50 flex flex-col">
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
