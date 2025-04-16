"use client"

import { motion } from "framer-motion"

export function DeveloperAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-64 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Laptop */}
        <motion.div
          className="absolute w-48 h-32 bg-gray-800 rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ y: 20 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
        >
          {/* Screen */}
          <motion.div className="absolute w-40 h-24 bg-blue-400 rounded-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            {/* Code lines */}
            <motion.div
              className="absolute top-2 left-2 w-36 h-1 bg-white opacity-70 rounded-full"
              animate={{ width: [20, 36, 15, 30] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute top-6 left-2 w-24 h-1 bg-white opacity-70 rounded-full"
              animate={{ width: [15, 24, 10, 20] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, repeatType: "reverse", delay: 0.3 }}
            />
            <motion.div
              className="absolute top-10 left-2 w-32 h-1 bg-white opacity-70 rounded-full"
              animate={{ width: [25, 32, 20, 28] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse", delay: 0.6 }}
            />
            <motion.div
              className="absolute top-14 left-2 w-20 h-1 bg-white opacity-70 rounded-full"
              animate={{ width: [10, 20, 15, 25] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2, repeatType: "reverse", delay: 0.9 }}
            />
            <motion.div
              className="absolute top-18 left-2 w-28 h-1 bg-white opacity-70 rounded-full"
              animate={{ width: [20, 28, 12, 22] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.7, repeatType: "reverse", delay: 1.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Person */}
        <motion.div
          className="absolute w-16 h-16 bg-gray-700 rounded-full left-1/2 top-1/4 -translate-x-1/2"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Eyes */}
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full left-1/3 top-1/3"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatDelay: 2 }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full right-1/3 top-1/3"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatDelay: 2 }}
          />

          {/* Hands typing */}
          <motion.div
            className="absolute w-12 h-1.5 bg-gray-700 rounded-full -bottom-10 -left-8 origin-right"
            animate={{ rotate: [0, -10, 0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-12 h-1.5 bg-gray-700 rounded-full -bottom-10 -right-8 origin-left"
            animate={{ rotate: [0, 10, 0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
