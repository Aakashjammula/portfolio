"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as m from "framer-motion/m"
import { AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Only track active section on the home page
    const [activeSection, setActiveSection] = useState("home")
    const [navBackground, setNavBackground] = useState(false)

    const sections = ["home", "about", "projects", "blog", "resources", "contact"]

    useEffect(() => {
        let rafId: number | null = null

        const handleScroll = () => {
            if (rafId) return // Skip if a frame is already queued
            rafId = requestAnimationFrame(() => {
                setNavBackground(window.scrollY > 50)

                if (pathname === "/") {
                    let current = sections[0];
                    for (const sectionId of sections) {
                        const element = document.getElementById(sectionId);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top < window.innerHeight / 2) {
                                current = sectionId;
                            } else {
                                break;
                            }
                        }
                    }
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                        current = "contact";
                    }
                    setActiveSection(current);
                } else {
                    const activePath = pathname.split('/')[1] || "home"
                    setActiveSection(sections.includes(activePath) ? activePath : "home")
                }
                rafId = null
            })
        }

        handleScroll()

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [pathname])

    const handleNavClick = (sectionId: string) => {
        setMobileMenuOpen(false)

        // For direct pages like /blog or /projects, navigate directly
        if (sectionId === "blog" || sectionId === "projects" || sectionId === "resources") {
            router.push(`/${sectionId}`)
            return
        }

        // For sections on the homepage (home, about, contact)
        if (pathname === "/") {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            } else if (sectionId === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        } else {
            // If we are on another page, navigate back to home with the hash anchor
            router.push(`/#${sectionId}`)
        }
    }

    return (
        <>
            <m.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground
                    ? "bg-white/80 dark:bg-[#0f172a]/40 backdrop-blur-xl shadow-sm border-b dark:border-white/10"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4 py-4 md:px-6 flex justify-between items-center transition-all duration-300">
                    <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white transition-opacity hover:opacity-80 whitespace-nowrap">
                        Aakash Jammula
                    </Link>

                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {sections.filter(s => s !== "contact").map((section) => (
                                <button
                                    key={section}
                                    onClick={() => handleNavClick(section)}
                                    className={`text-sm font-medium capitalize transition-colors duration-200 ${activeSection === section
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        }`}
                                >
                                    {section}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleNavClick("contact")}
                                className="hidden md:flex bg-gray-900 text-white dark:bg-white dark:text-gray-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                Contact Me
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-gray-700 dark:text-gray-300 transition-transform active:scale-95 -mr-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden shadow-lg"
                        >
                            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => handleNavClick(section)}
                                        className={`block w-full text-left py-3 px-4 rounded-md text-base font-medium capitalize transition-all duration-200 ${activeSection === section
                                            ? "text-primary bg-primary/10"
                                            : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.header>
        </>
    )
}
