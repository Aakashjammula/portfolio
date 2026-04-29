"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface BlogRowProps {
  post: {
    title: string
    description: string
    date: string
    readTime: string
    slug: string
  }
  index: number
}

export function BlogRow({ post, index }: BlogRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group relative">
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
      </div>
    </motion.div>
  )
}
