"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

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
