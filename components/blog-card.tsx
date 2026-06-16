"use client"

import Link from "next/link"
import * as m from "framer-motion/m"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

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
    <m.div
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
      <m.div
        whileHover={{
          scale: 1.03,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="h-full relative group"
      >
        <Card className="overflow-hidden h-full transition-all duration-300 border-opacity-50 hover:border-primary/50 flex flex-col relative z-10">
          <CardHeader className="flex-none">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </CardContent>
          <CardFooter className="flex-none mt-auto flex-col items-start gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <span>{formatDate(date)}</span>
              <span className="mx-2">•</span>
              <span>{readTime}</span>
            </div>
            <m.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </m.div>
          </CardFooter>
        </Card>
      </m.div>
    </m.div>
  )
}
