"use client"

import Link from "next/link"
import Image from "next/image" // Make sure Image is imported
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { JSX } from "react"

// Import components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// This would typically come from a database or CMS
import { blogs } from "@/lib/data/blogs"

// Function to extract headings for table of contents
function extractHeadings(content: any[]) {
  return content
    .filter((item) => item.type === "heading" && (item.level === 1 || item.level === 2))
    .map((heading) => ({
      id: heading.id,
      title: heading.content,
      level: heading.level,
    }))
}

// Component to render different content types
const ContentRenderer = ({ item }: { item: any }) => {
  switch (item.type) {
    case "heading":
      const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements
      return (
        <div id={item.id}>
          <HeadingTag
            className={`
            ${item.level === 1 ? "text-3xl font-bold mt-8 mb-4" : ""}
            ${item.level === 2 ? "text-2xl font-bold mt-6 mb-3" : ""}
            ${item.level === 3 ? "text-xl font-bold mt-5 mb-2" : ""}
          `}
          >
            {item.content}
          </HeadingTag>
        </div>
      )

    case "paragraph":
      return <p className="my-4 text-gray-700 dark:text-gray-300">{item.content}</p>

    case "list":
      if (item.style === "unordered") {
        return (
          <ul className="my-4 ml-6 list-disc space-y-1">
            {item.items.map((listItem: string, index: number) => (
              <li key={index} className="ml-6 mb-2">
                {listItem}
              </li>
            ))}
          </ul>
        )
      } else {
        return (
          <ol className="my-4 ml-6 list-decimal space-y-1">
            {item.items.map((listItem: string, index: number) => (
              <li key={index} className="ml-6 mb-2">
                {listItem}
              </li>
            ))}
          </ol>
        )
      }

    case "code":
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4">
          <code className={`language-${item.language}`}>{item.content}</code>
        </pre>
      )

    case "divider":
      return <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />

    // ===== RENDER LOGIC FOR IMAGES (FIXED) =====
    case "image":
      return (
        <figure className="my-6">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width || 700}
            height={item.height || 400}
            className="rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
          />
          {item.caption && (
            <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              {item.caption}
            </figcaption>
          )}
        </figure>
      )

    case "links":
      return (
        <div className="my-6 space-y-2">
          {item.items.map((link: { text: string; url: string }, index: number) => (
            <div key={index}>
              <a
                href={link.url}
                className="text-primary hover:underline flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeHeading, setActiveHeading] = useState("")
  // Find the post by slug
  const post = blogs.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id),
        }))
        .filter((item) => item.element !== null)

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i]
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveHeading(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-12 md:px-6 md:py-24"
    >
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Sidebar with Table of Contents */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:block md:col-span-1 space-y-2"
        >
          <div className="sticky top-24 space-y-4">
            <div className="font-medium text-lg mb-4">Table of Contents</div>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block py-1 text-sm transition-colors ${activeHeading === heading.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    } ${heading.level === 2 ? "pl-4" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                    setActiveHeading(heading.id)
                  }}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:col-span-3"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-500 dark:text-gray-400 mb-8"
          >
            {post.date}
          </motion.div>

          {/* Mobile Table of Contents */}
          <div className="md:hidden mb-8">
            <details className="border rounded-lg p-3">
              <summary className="font-medium cursor-pointer">Table of Contents</summary>
              <nav className="mt-3 space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block py-1 text-sm transition-colors ${activeHeading === heading.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                      } ${heading.level === 2 ? "pl-4" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                      setActiveHeading(heading.id)
                    }}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </details>
          </div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            {post.content.map((item, index) => (
              <ContentRenderer key={index} item={item} />
            ))}
          </motion.div>
        </motion.article>
      </div>
    </motion.div>
  )
}