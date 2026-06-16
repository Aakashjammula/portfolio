import type React from "react"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NavBar } from "@/components/nav-bar"
import { SmoothScrollProvider } from "@/components/smooth-scroll"
import { InteractiveBackground } from "@/components/interactive-background"
import { MotionProvider } from "@/components/motion-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
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
              <ScrollToTop />
              <InteractiveBackground />
              <NavBar />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </MotionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}