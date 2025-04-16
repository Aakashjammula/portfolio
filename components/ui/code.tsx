"use client"

import { type HTMLAttributes, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface CodeProps extends HTMLAttributes<HTMLPreElement> {
  language?: string
}

export function Code({ language, className, children, ...props }: CodeProps) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    // This is where you would add syntax highlighting if needed
    // For example, using Prism.js or highlight.js
  }, [language])

  return (
    <pre
      ref={preRef}
      className={cn(
        "rounded-md bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto my-4",
        language && `language-${language}`,
        className,
      )}
      {...props}
    >
      <code className={language ? `language-${language}` : undefined}>{children}</code>
    </pre>
  )
}
