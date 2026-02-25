"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useRef, useState } from "react"

interface ResourceCardProps {
    title: string
    description: string
    url: string
    category: string
    logo: string
    brandColor: string
    index: number
}

const categoryColors: Record<string, string> = {
    tool: "bg-purple-500/20 text-purple-400",
    article: "bg-blue-500/20 text-blue-400",
    course: "bg-emerald-500/20 text-emerald-400",
    video: "bg-red-500/20 text-red-400",
    other: "bg-gray-500/20 text-gray-400",
}

export function ResourceCard({
    title,
    description,
    url,
    category,
    logo,
    brandColor,
    index,
}: ResourceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const domain = (() => {
        try {
            return new URL(url).hostname.replace("www.", "")
        } catch {
            return url
        }
    })()

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
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{
                    scale: 1.03,
                    y: -5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
            >
                {/* Glow effect layer */}
                {isHovering && (
                    <div
                        className="absolute -inset-[1px] rounded-xl transition-opacity duration-300 pointer-events-none z-20"
                        style={{
                            background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(99, 102, 241, 0.15), transparent 60%)`,
                        }}
                    />
                )}

                {/* Banner with brand color and logo */}
                <div
                    className="flex items-center justify-center h-40 relative overflow-hidden"
                    style={{ backgroundColor: brandColor }}
                >
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                    <img
                        src={logo}
                        alt={`${title} logo`}
                        className={`relative z-10 drop-shadow-lg ${logo.endsWith(".svg")
                                ? "h-20 w-auto max-w-[85%] object-contain"
                                : "w-full h-full object-cover"
                            }`}
                    />
                </div>

                {/* Content area */}
                <div className="p-5 bg-white/5 dark:bg-gray-900/60 backdrop-blur-sm">
                    {/* Category pill */}
                    <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[category] || categoryColors.other}`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {description}
                    </p>

                    {/* Footer: domain + visit link */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            {domain}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                            Visit <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
