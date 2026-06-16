"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLenis } from "lenis/react"

export function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}
