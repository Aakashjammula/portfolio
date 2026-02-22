"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { BlogCard } from "@/components/blog-card"
import { blogs } from "@/lib/data/blogs"

export default function BlogPage() {
  const blogPosts = blogs;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-12 md:px-6 md:py-24"
    >
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionHeading title="Blog" description="Thoughts, insights, and tutorials on AI and technology" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 max-w-4xl mx-auto"
      >
        {blogPosts.map((post, index) => (
          <div key={index} className="min-h-[260px]">
            <BlogCard
              title={post.title}
              description={post.description}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
              index={index}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}