import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { posts } from "@/.velite"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { MDXContent } from "@/components/mdx-content"
import { ReadingProgress } from "@/components/reading-progress"
import { formatDate } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug.replace(/^blog\//, ""),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === `blog/${slug}`)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === `blog/${slug}`)

  if (!post) notFound()

  return (
    <div className="px-4 py-12 md:px-6 md:py-24">
      <ReadingProgress />

      <div className="max-w-[700px] mx-auto">
        <Button variant="ghost" asChild className="mb-10 -ml-3 text-gray-400 hover:text-white">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 uppercase tracking-widest font-mono mb-10">
            <span>{formatDate(post.date)}</span>
            <span className="text-indigo-400/60">·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="h-px bg-white/10 mb-10" />

          <MDXContent code={post.body} />
        </article>
      </div>
    </div>
  )
}
