"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Search, X } from "lucide-react"
import * as m from "framer-motion/m"
import { useState, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { resources, type Resource } from "@/lib/data/resources"

const categoryOrder = ["course", "article", "other"] as const

const categoryLabels: Record<string, string> = {
  course: "Learning Platforms",
  article: "References & Docs",
  other: "Tools & Lists",
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

function ResourceRow({ resource, index }: { resource: Resource; index: number }) {
  return (
    <m.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative flex items-start gap-5 py-5 border-b border-border/40 hover:border-border transition-colors duration-150"
    >
      {/* Left accent on hover */}
      <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />

      {/* Index */}
      <span className="font-mono text-[11px] text-muted-foreground/40 w-6 pt-1 shrink-0 select-none tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-[15px] text-foreground group-hover:text-primary transition-colors duration-150 leading-snug">
            {resource.title}
          </span>
          <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {resource.description}
        </p>
      </div>

      {/* Domain */}
      <span className="font-mono text-[11px] text-muted-foreground/35 shrink-0 pt-1 hidden sm:block">
        {getDomain(resource.url)}
      </span>
    </m.a>
  )
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return resources
    const q = query.toLowerCase()
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    )
  }, [query])

  const grouped = useMemo(() => {
    const result: Record<string, Resource[]> = {}
    for (const cat of categoryOrder) {
      const items = filtered.filter((r) => r.category === cat)
      if (items.length) result[cat] = items
    }
    // catch anything not in categoryOrder
    const rest = filtered.filter((r) => !categoryOrder.includes(r.category as any))
    if (rest.length) result["other"] = [...(result["other"] ?? []), ...rest]
    return result
  }, [filtered])

  return (
    <div className="min-h-screen">
      <div className="container max-w-3xl px-4 py-12 md:px-6 md:py-20">

        <Button variant="ghost" asChild className="mb-10 -ml-3">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Resources</h1>
            <span className="font-mono text-sm text-muted-foreground">{resources.length}</span>
          </div>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            Free learning platforms I&apos;d actually recommend — each one worth your time.
          </p>
        </m.div>

        {/* Search */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative mb-14"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-transparent border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </m.div>

        {/* Grouped resource list */}
        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([cat, items], gi) => (
            <m.section
              key={cat}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="mb-14"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-1">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 shrink-0">
                  {categoryLabels[cat] ?? cat}
                </h2>
                <div className="flex-1 h-px bg-border/50" />
                <span className="font-mono text-[11px] text-muted-foreground/40">{items.length}</span>
              </div>

              <div>
                {items.map((resource, i) => (
                  <ResourceRow key={resource.url} resource={resource} index={i} />
                ))}
              </div>
            </m.section>
          ))
        ) : (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-24 text-sm"
          >
            No resources match &ldquo;{query}&rdquo;
          </m.p>
        )}
      </div>
    </div>
  )
}
