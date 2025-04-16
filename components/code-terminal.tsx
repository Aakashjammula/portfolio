"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const codeSnippets = [
  `function generateEmbeddings(text) {
  return model.embed(text);
}`,
  `async function queryLLM(prompt, context) {
  const response = await llm.complete({
    prompt: prompt,
    context: context,
    temperature: 0.7
  });
  return response.text;
}`,
  `const chatHistory = [];

function addMessage(role, content) {
  chatHistory.push({ role, content });
  return [...chatHistory];
}`,
]

export function CodeTerminal() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)

  const currentSnippet = codeSnippets[currentSnippetIndex]

  useEffect(() => {
    if (cursorPosition < currentSnippet.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedCode(currentSnippet.substring(0, cursorPosition + 1))
          setCursorPosition(cursorPosition + 1)
        },
        50 + Math.random() * 50,
      ) // Random typing speed for realism

      return () => clearTimeout(timeout)
    } else {
      // When finished typing current snippet, wait and move to next
      const timeout = setTimeout(() => {
        setCursorPosition(0)
        setDisplayedCode("")
        setCurrentSnippetIndex((prevIndex) => (prevIndex + 1) % codeSnippets.length)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [cursorPosition, currentSnippet, currentSnippetIndex])

  return (
    <motion.div
      className="w-full h-full rounded-xl overflow-hidden bg-gray-900 text-gray-100 font-mono text-sm p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-xs">~/ai-projects/genai-app</div>
      </div>

      <div className="flex">
        <span className="text-green-400 mr-2">$</span>
        <div className="relative">
          <pre className="whitespace-pre-wrap">
            <code>
              <span className="text-blue-400">{"const "}</span>
              <span className="text-yellow-300">{"ai "}</span>
              <span className="text-white">{"= "}</span>
              <span className="text-green-300">{"{"}</span>
              {"\n"}
              {displayedCode.split("\n").map((line, i) => (
                <div key={i} className="ml-4">
                  {line}
                </div>
              ))}
              <span className="text-green-300">{"}"}</span>
            </code>
          </pre>
          {cursorPosition < currentSnippet.length && (
            <motion.div
              className="absolute inline-block w-2 h-4 bg-white"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              style={{
                top: `${1.5 + Math.floor(cursorPosition / 40) * 1.5}rem`,
                left: `${(cursorPosition % 40) * 0.6}rem`,
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}
