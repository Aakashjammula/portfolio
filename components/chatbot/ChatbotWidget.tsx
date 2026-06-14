"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import * as m from "framer-motion/m"
import { AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColorOrb } from "@/components/ui/ai-input"

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
  const [rateLimitInfo, setRateLimitInfo] = useState<{ limit: string | null, remaining: string | null, reset: string | null } | null>(null)
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
        const history = messages.map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: msg.text,
        }))

        const res = await fetch(
          "/api/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text, history }),
          }
        )

        // Update rate limit info from headers
        const limit = res.headers.get("X-RateLimit-Limit")
        const remaining = res.headers.get("X-RateLimit-Remaining")
        const reset = res.headers.get("X-RateLimit-Reset")

        if (remaining) {
          setRateLimitInfo({ limit, remaining, reset })
        }

        if (!res.ok) {
          if (res.status === 429) {
            setError("Rate limit exceeded. Please try again later.")
          } else {
            throw new Error(`Status ${res.status}`)
          }
          return
        }

        if (!res.body) throw new Error("No response body")

        // Create a placeholder bot message
        const botMsgId = getId()
        setMessages(m => [
          ...m,
          { id: botMsgId, text: "", sender: "bot", timestamp: new Date() },
        ])

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let botText = ""

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          const chunkValue = decoder.decode(value, { stream: !done })
          botText += chunkValue

          setMessages(m =>
            m.map(msg =>
              msg.id === botMsgId ? { ...msg, text: botText } : msg
            )
          )
        }
      } catch {
        setError("Oops! Something went wrong.")
      } finally {
        setLoading(false)
      }
    },
    [inputValue, loading, messages],
  )

  return (
    <m.div
      layout
      className={`fixed z-[999] flex flex-col overflow-hidden ${
        isOpen
          ? "bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 bottom-0 left-0 right-0 w-full h-[90vh] rounded-t-xl md:bottom-6 md:right-6 md:left-auto md:w-[384px] md:h-[500px] md:rounded-2xl"
          : "bg-white/5 border border-white/10 backdrop-blur-md shadow-lg bottom-6 right-6 w-[115px] h-[44px] rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
      }`}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      onClick={!isOpen ? toggleOpen : undefined}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <m.div
            key="button"
            className="flex h-full w-full items-center justify-center gap-1.5 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="pointer-events-none -ml-1">
              <ColorOrb dimension="20px" />
            </div>
            <span className="text-sm font-medium">Ask AI</span>
          </m.div>
        ) : (
          <m.div
            key="chat"
            className="flex flex-col h-full w-full cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700 flex-shrink-0 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80">
              <div>
                <h3 className="font-semibold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="pointer-events-none scale-75 origin-left">
                    <ColorOrb dimension="20px" tones={{ base: "oklch(22.64% 0 0)" }} />
                  </div>
                  Ask Aakash's AI
                </h3>
                {rateLimitInfo && (
                  <span className="block text-[10px] mt-1 text-gray-500 dark:text-gray-400">
                    {rateLimitInfo.remaining} / {rateLimitInfo.limit} requests remaining
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={toggleOpen}
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                      }`}
                  >
                    <p className="break-words leading-relaxed">
                      {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                        part.match(/https?:\/\/[^\s]+/) ? (
                          <a
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-500 transition-colors font-medium"
                          >
                            {part}
                          </a>
                        ) : (
                          part
                        )
                      )}
                    </p>
                    <div
                      className={`text-[10px] mt-1.5 ${msg.sender === "user"
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
                <p className="text-left text-xs text-gray-500 dark:text-gray-400 pl-2 animate-pulse">
                  AI is thinking...
                </p>
              )}
              {error && (
                <p className="text-center text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                  {error}
                </p>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t dark:border-gray-700 flex items-center gap-2 flex-shrink-0 bg-white dark:bg-gray-800"
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={loading}
                className="flex-grow p-3 px-4 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 text-sm outline-none transition-all"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 rounded-full w-10 h-10 flex-shrink-0"
                disabled={loading}
              >
                <Send className="h-4 w-4 ml-1" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}