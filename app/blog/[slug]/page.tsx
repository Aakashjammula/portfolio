import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { posts } from "@/.velite"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MDXContent } from "@/components/mdx-content"

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
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          {post.title}
        </h1>
        <div className="text-gray-500 dark:text-gray-400 mb-8 flex items-center gap-2">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <Separator className="my-8" />

        <MDXContent code={post.body} />
      </article>
    </div>
  )
}
