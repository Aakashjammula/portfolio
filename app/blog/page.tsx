import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { posts } from "@/.velite"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { BlogCard } from "@/components/blog-card"

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <SectionHeading title="Blog" description="Thoughts, insights, and tutorials on AI and technology" />

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 max-w-4xl mx-auto">
        {sorted.map((post, index) => (
          <div key={post.slug} className="min-h-[260px]">
            <BlogCard
              title={post.title}
              description={post.description}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug.replace(/^blog\//, "")}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
