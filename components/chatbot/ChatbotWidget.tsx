"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react" // Removed CornerDownLeft if not used
import { Button } from "@/components/ui/button" // Keep using your existing Button

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);


  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }

  useEffect(scrollToBottom, [messages])

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    if (inputValue.trim() === "") return

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = "Thanks for your message! I'm a simple bot. Aakash will get back to you if needed."
      if (inputValue.toLowerCase().includes("hello") || inputValue.toLowerCase().includes("hi")) {
        botResponseText = "Hi there! How can I assist you further?"
      } else if (inputValue.toLowerCase().includes("project")) {
        botResponseText = "You can find Aakash's projects in the 'Projects' section or on GitHub!"
      } else if (inputValue.toLowerCase().includes("contact")) {
        botResponseText = "You can contact Aakash via the 'Contact' section or email him directly."
      }

      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newBotMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
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
            className="fixed bottom-24 right-6 z-[998] w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 flex flex-col overflow-hidden"
            style={{ height: "min(70vh, 500px)"}} // Responsive height, ensure overflow-hidden on parent
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700 flex-shrink-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Chat with Aakash's Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Typically replies in a moment</p>
            </div>

            {/* Messages Area - Basic Scrollable Div */}
            <div ref={messagesContainerRef} className="flex-grow p-4 space-y-3 overflow-y-auto">
              {messages.map((msg) => (
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
                    <p className="break-words">{msg.text}</p> {/* break-words for long text */}
                     <div className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70 text-right" : "text-gray-400 dark:text-gray-500 text-left"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* For scrolling to bottom if needed, though direct scroll on container is used */}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-gray-700 flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
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