"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Folder, Users, Brain } from "lucide-react"

interface StatCardProps {
  number: string
  label: string
  icon?: string
  iconName?: string
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * value)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export function StatCard({ number, label, icon, iconName }: StatCardProps) {
  const iconKey = icon || iconName || "Clock"

  // Parse number: "5+" → value=5, suffix="+"
  const numericMatch = number.match(/^(\d+)(.*)$/)
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0
  const suffix = numericMatch ? numericMatch[2] : ""

  const getIcon = () => {
    switch (iconKey) {
      case "Clock":
        return <Clock className="w-6 h-6 text-primary" />
      case "Folder":
        return <Folder className="w-6 h-6 text-primary" />
      case "Users":
        return <Users className="w-6 h-6 text-primary" />
      case "Brain":
        return <Brain className="w-6 h-6 text-primary" />
      default:
        return <Clock className="w-6 h-6 text-primary" />
    }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border flex flex-col items-center text-center"
    >
      <div className="mb-3">{getIcon()}</div>
      <div className="text-3xl font-bold">
        <AnimatedCounter value={numericValue} suffix={suffix} />
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </motion.div>
  )
}
