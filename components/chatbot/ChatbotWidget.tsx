"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// simple unique-ID generator
const getId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: getId(),
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // smooth scroll on new message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])
  useEffect(scrollToBottom, [messages, scrollToBottom])

  const toggleOpen = () => setIsOpen(o => !o)

  const handleSendMessage = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      const text = inputValue.trim()
      if (!text || loading) return

      // add user msg
      setMessages(m => [
        ...m,
        { id: getId(), text, sender: "user", timestamp: new Date() },
      ])
      setInputValue("")
      setError(null)
      setLoading(true)

      try {
        const res = await fetch(
          "https://d951-111-93-231-202.ngrok-free.app/ask", // Replace with your actual API endpoint
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text, k: 5 }),
          }
        )
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const { answer } = await res.json()

        setMessages(m => [
          ...m,
          { id: getId(), text: answer, sender: "bot", timestamp: new Date() },
        ])
      } catch {
        setError("Oops! Something went wrong.")
      } finally {
        setLoading(false)
      }
    },
    [inputValue, loading],
  )

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[999]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={toggleOpen}
          aria-label="Toggle chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              fixed z-[998] flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-xl
              bottom-0 left-0 right-0 w-full rounded-t-lg border-t dark:border-gray-700 h-[90vh]
              md:bottom-24 md:right-6 md:left-auto md:max-w-sm md:rounded-lg md:border md:h-[500px] md:max-h-[70vh]
            `}
            // The style attribute for height (style={{ height: "min(70vh, 500px)" }})
            // is removed as Tailwind classes now handle responsive height.
            // - Mobile (default): h-[90vh] (90% of viewport height).
            //   Consider h-[90dvh] for better handling of mobile browser dynamic toolbars if your Tailwind setup supports it.
            // - Desktop (md and up): md:h-[500px] md:max-h-[70vh] effectively achieves min(500px, 70vh).
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700 flex-shrink-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Chat with Aakash's Assistant
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Typically replies in a moment
              </p>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 space-y-3 overflow-y-auto">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        msg.sender === "user"
                          ? "text-primary-foreground/70 text-right"
                          : "text-gray-400 dark:text-gray-500 text-left"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {loading && (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  …typing
                </p>
              )}
              {error && (
                <p className="text-center text-xs text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t dark:border-gray-700 flex items-center gap-2 flex-shrink-0"
            >
              <input
                type="text"
                placeholder="Type your message…"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={loading}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}