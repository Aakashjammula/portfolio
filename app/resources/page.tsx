"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { ResourceCard } from "@/components/resource-card"
import { resources } from "@/lib/data/resources"

const categories = ["all", "tool", "article", "course", "video"] as const

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all")

    const filteredResources =
        activeCategory === "all"
            ? resources
            : resources.filter((r) => r.category === activeCategory)

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
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
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
                <SectionHeading
                    title="Resources"
                    description="Curated tools, articles, and learning materials I recommend"
                />
            </motion.div>

            {/* Category filter pills */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-8 mb-10 justify-center"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </motion.div>

            {/* Resources grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                key={activeCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
                {filteredResources.map((resource, index) => (
                    <ResourceCard
                        key={resource.url}
                        title={resource.title}
                        description={resource.description}
                        url={resource.url}
                        category={resource.category}
                        logo={resource.logo}
                        brandColor={resource.brandColor}
                        index={index}
                    />
                ))}
            </motion.div>

            {/* Empty state */}
            {filteredResources.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 dark:text-gray-400 mt-12 text-lg"
                >
                    No resources found in this category.
                </motion.p>
            )}
        </motion.div>
    )
}
