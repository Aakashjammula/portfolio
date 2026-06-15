import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NavBar } from "@/components/nav-bar"
import { SmoothScrollProvider } from "@/components/smooth-scroll"
import { InteractiveBackground } from "@/components/interactive-background"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Aakash Jammula | GenAI Engineer",
  description:
    "Portfolio of Aakash Jammula — GenAI Engineer specializing in LLMs, RAG pipelines, and AI agents.",
  metadataBase: new URL("https://aakashjammula.dev"),
  openGraph: {
    title: "Aakash Jammula | GenAI Engineer",
    description: "Portfolio of Aakash Jammula — GenAI Engineer specializing in LLMs, RAG pipelines, and AI agents.",
    url: "https://aakashjammula.dev",
    siteName: "Aakash Jammula",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Jammula | GenAI Engineer",
    description: "Portfolio of Aakash Jammula — GenAI Engineer specializing in LLMs, RAG pipelines, and AI agents.",
    creator: "@aakashjammula",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* No script needed for dotlottie-react */}</head>
      <body className={inter.className}>
        <MotionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <SmoothScrollProvider>
              <InteractiveBackground />
              <NavBar />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  )
}