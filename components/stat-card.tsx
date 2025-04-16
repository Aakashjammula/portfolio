"use client"

import { motion } from "framer-motion"
import { Clock, Folder, Users, Brain } from "lucide-react"

interface StatCardProps {
  number: string
  label: string
  icon: string
}

export function StatCard({ number, label, icon }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.1,
        }}
        className="text-3xl font-bold"
      >
        {number}
      </motion.div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </motion.div>
  )
}
