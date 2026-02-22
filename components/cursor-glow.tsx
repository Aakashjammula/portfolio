"use client"

import { useEffect, useState } from "react"

export function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only enable on non-touch devices
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
        if (isTouchDevice) return

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        window.addEventListener("mousemove", handleMouseMove)
        document.documentElement.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div
            className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
            style={{
                left: position.x - 200,
                top: position.y - 200,
                width: 400,
                height: 400,
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 70%)",
                borderRadius: "50%",
                opacity: isVisible ? 1 : 0,
            }}
        />
    )
}
