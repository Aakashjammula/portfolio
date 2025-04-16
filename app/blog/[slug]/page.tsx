"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { JSX } from "react"

// Import components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// This would typically come from a database or CMS
const blogPosts = {
  "uv-fastest-python-package-manager": {
    title: "uv: The Fastest Python Package Manager for Python",
    date: "April 16, 2025",
    content: [
      {
        type: "heading",
        level: 1,
        content: "uv: The Fastest Python Package Manager for Python",
        id: "uv-the-fastest-python-package-manager-for-python",
      },
      {
        type: "heading",
        level: 2,
        content: "What is uv?",
        id: "what-is-uv",
      },
      {
        type: "paragraph",
        content:
          "uv is a blazing fast, all-in-one Python package and project manager built in Rust by the creators of Ruff.",
      },
      {
        type: "paragraph",
        content: "It aims to replace tools like:",
      },
      {
        type: "list",
        style: "unordered",
        items: ["pip, pip-tools, pipx, virtualenv", "poetry, pyenv, and twine"],
      },
      {
        type: "heading",
        level: 3,
        content: "Highlights",
        id: "highlights",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "10–100x faster than pip",
          "One tool for everything: deps, envs, Python versions, tools",
          "Manages Python versions",
          "Uses global cache for space-efficient installs",
          "Compatible with pip CLI",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        content: "How to Install uv",
        id: "how-to-install-uv",
      },
      {
        type: "heading",
        level: 3,
        content: "With curl (recommended)",
        id: "with-curl-recommended",
      },
      {
        type: "code",
        language: "bash",
        content:
          '# macOS/Linux\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Windows (PowerShell)\npowershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"',
      },
      {
        type: "heading",
        level: 3,
        content: "With pip or pipx",
        id: "with-pip-or-pipx",
      },
      {
        type: "code",
        language: "bash",
        content: "pip install uv\n# or\npipx install uv",
      },
      {
        type: "paragraph",
        content: "To update:",
      },
      {
        type: "code",
        language: "bash",
        content: "uv self update",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        content: "How to Use uv",
        id: "how-to-use-uv",
      },
      {
        type: "heading",
        level: 3,
        content: "1. Creating a new project",
        id: "creating-a-new-project",
      },
      {
        type: "code",
        language: "bash",
        content: "uv init myproject\ncd myproject\nuv add requests\nuv run script.py",
      },
      {
        type: "list",
        style: "unordered",
        items: ["Initializes a pyproject.toml", "Creates .venv", "Adds dependencies and runs your code"],
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 3,
        content: "2. Using uv in an existing project",
        id: "using-uv-in-an-existing-project",
      },
      {
        type: "code",
        language: "bash",
        content:
          "cd existing-project\nuv venv                    # create/manage virtualenv\nuv sync                    # install from lockfile\nuv run app.py              # run code inside env\n# Optional: uv compile     # compile deps into lockfile",
      },
      {
        type: "list",
        style: "unordered",
        items: ["Works even if you're not using uv for setup", "Compatible with requirements.txt and pyproject.toml"],
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        content: "uv Cheat Sheet",
        id: "uv-cheat-sheet",
      },
      {
        type: "paragraph",
        content: "Based on SaaS Pegasus Deep Dive",
      },
      {
        type: "code",
        language: "bash",
        content:
          '# Project setup\nuv init myproject            # Init new project\nuv venv                      # Create/manage virtualenv\nuv python install 3.11       # Install specific Python version\nuv python pin 3.11           # Use specific Python version\n\n# Dependency management\nuv add requests              # Add dependency\nuv remove requests           # Remove dependency\nuv compile                   # Create uv.lock\nuv sync                      # Install from lockfile\nuv pip install -r req.txt    # Use pip commands\nuv pip sync file.txt         # Install from requirements.txt\n\n# Run scripts\nuv run script.py             # Run Python file\nuv run "command"             # Run shell command in venv\n\n# Tools\nuv tool install ruff         # Install CLI tool like pipx\nuvx pycowsay "hello world"   # Run tool temporarily\n\n# Scripts with inline metadata\nuv add --script script.py requests  # Inject deps into script\nuv run script.py                    # Run it in isolated env\n\n# Cache and maintenance\nuv cache clean               # Clear cache\nuv self update               # Update uv itself',
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        content: "Pros and Cons",
        id: "pros-and-cons",
      },
      {
        type: "heading",
        level: 3,
        content: "Pros",
        id: "pros",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Extremely fast (Rust-powered)",
          "Drop-in pip & pipx replacement",
          "All-in-one (env, deps, tools, Python)",
          "Global cache saves space",
          "Universal lockfile",
          "Great for mono-repos (Cargo-style workspaces)",
        ],
      },
      {
        type: "heading",
        level: 3,
        content: "Cons",
        id: "cons",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Still new—less mature than pip/poetry",
          "Not all advanced features from poetry yet",
          "Smaller ecosystem",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusion",
        id: "conclusion",
      },
      {
        type: "paragraph",
        content:
          "uv is not just fast—it's a serious contender to unify the Python tooling ecosystem. Whether you're a beginner or managing large workspaces, it's worth trying today.",
      },
      {
        type: "links",
        items: [
          { text: "Official Docs", url: "https://docs.astral.sh/uv" },
          { text: "GitHub Repo", url: "https://github.com/astral-sh/uv" },
          { text: "Benchmarks & Deep Dive", url: "https://www.saaspegasus.com/guides/uv-deep-dive/" },
        ],
      },
    ],
  },
  "mcp-model-control-protocol": {
    title: "Beginner's Guide to MCP with LangChain and Gemini",
    date: "April 16, 2025",
    content: [
      {
        "type": "heading",
        "level": 1,
        "content": "Beginner's Guide to MCP with LangChain and Gemini",
        "id": "beginners-guide-to-mcp"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "What is MCP?",
        "id": "what-is-mcp"
      },
      {
        "type": "paragraph",
        "content": "MCP (Model Control Protocol) is a standard way for language models to interact with external tools like web search, calculators, or databases in a structured and clean manner."
      },
      {
        "type": "paragraph",
        "content": "It acts like a bridge between the model and the tools, making communication modular and manageable."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Why Use MCP in Agents?",
        "id": "why-use-mcp-in-agents"
      },
      {
        "type": "list",
        "style": "unordered",
        "items": [
          "Separates model logic from tool logic",
          "Allows AI agents to decide when and how to use tools",
          "Keeps the system modular, scalable, and easier to maintain",
          "Works great with agent frameworks like LangChain"
        ]
      },
      {
        "type": "paragraph",
        "content": "In short, MCP makes your AI agent smarter and more capable by letting it access external knowledge or functionalities as needed."
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Let's Understand This by a Simple Project",
        "id": "lets-understand-this-by-a-simple-project"
      },
      {
        "type": "paragraph",
        "content": "To see MCP in action, let's look at a practical example: the GitHub project mcp_langchain_examples."
      },
      {
        "type": "list",
        "style": "unordered",
        "items": [
          "Uses LangChain to create and manage the agent",
          "Uses Gemini 2.0 Flash as the base AI model",
          "Adds DuckDuckGo as an external web search tool",
          "Uses MCP to connect the model and tools cleanly"
        ]
      },
      {
        "type": "paragraph",
        "content": "Here's how the project is structured:"
      },
      {
        "type": "list",
        "style": "unordered",
        "items": [
          "server.py - Implements the MCP server and tool (DuckDuckGo)",
          "prompt.py - Contains system prompts to guide the AI",
          "main.py - Runs the agent logic with Gemini and MCP tools",
          "requirements.txt - Lists Python dependencies"
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Installation & Setup",
        "id": "installation-and-setup"
      },
      {
        "type": "heading",
        "level": 3,
        "content": "Prerequisites",
        "id": "prerequisites"
      },
      {
        "type": "list",
        "style": "unordered",
        "items": [
          "Python 3.8+",
          "Google API key for Gemini model"
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "content": "Method 1: Using uv (recommended)",
        "id": "using-uv"
      },
      {
        "type": "code",
        "language": "bash",
        "content": "# Install uv\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Create env & install\nuv venv\nuv sync"
      },
      {
        "type": "heading",
        "level": 3,
        "content": "Method 2: Using pip",
        "id": "using-pip"
      },
      {
        "type": "code",
        "language": "bash",
        "content": "# Create and activate virtual environment\npython -m venv .venv\nsource .venv/bin/activate\n\n# Install requirements\npip install -r requirements.txt"
      },
      {
        "type": "paragraph",
        "content": "Then, create a `.env` file in the root and add your Gemini API key:"
      },
      {
        "type": "code",
        "language": "bash",
        "content": "GOOGLE_API_KEY=your_api_key_here"
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Running the Project",
        "id": "running-the-project"
      },
      {
        "type": "code",
        "language": "bash",
        "content": "# Start the MCP Server\nuv run ./src/server.py\n\n# In another terminal, run the main app\nuv run ./src/main.py"
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "How It Works",
        "id": "how-it-works"
      },
      {
        "type": "list",
        "style": "unordered",
        "items": [
          "User inputs a question",
          "The agent checks the prompt and decides to use the search tool",
          "The MCP server handles the DuckDuckGo search",
          "Results are returned and formatted as a response"
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Example Interaction",
        "id": "example-interaction"
      },
      {
        "type": "code",
        "language": "bash",
        "content": "Question: Who is the current CEO of OpenAI?\nAnswer: As of the latest search, the CEO of OpenAI is Sam Altman."
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Conclusion",
        "id": "conclusion"
      },
      {
        "type": "paragraph",
        "content": "MCP brings a structured and scalable way to empower your AI agents. By combining it with LangChain and a capable model like Gemini, you can build smart, flexible, tool-using agents easily. Try out this project and start building your own powerful AI workflows!"
      },
      {
        "type": "links",
        "items": [
          {
            "text": "Project GitHub Repo",
            "url": "https://github.com/Aakashjammula/mcp_langchain_examples"
          },
          {
            "text": "Learn about LangChain",
            "url": "https://docs.langchain.com"
          },
          {
            "text": "Explore Gemini API",
            "url": "https://ai.google.dev/"
          }
    ],
  },
    ],
  },
}

// Function to extract headings for table of contents
function extractHeadings(content: any[]) {
  return content
    .filter((item) => item.type === "heading" && (item.level === 1 || item.level === 2))
    .map((heading) => ({
      id: heading.id,
      title: heading.content,
      level: heading.level,
    }))
}

// Component to render different content types
const ContentRenderer = ({ item }: { item: any }) => {
  switch (item.type) {
    case "heading":
      const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements
      return (
        <div id={item.id}>
          <HeadingTag
            className={`
            ${item.level === 1 ? "text-3xl font-bold mt-8 mb-4" : ""}
            ${item.level === 2 ? "text-2xl font-bold mt-6 mb-3" : ""}
            ${item.level === 3 ? "text-xl font-bold mt-5 mb-2" : ""}
          `}
          >
            {item.content}
          </HeadingTag>
        </div>
      )

    case "paragraph":
      return <p className="my-4 text-gray-700 dark:text-gray-300">{item.content}</p>

    case "list":
      if (item.style === "unordered") {
        return (
          <ul className="my-4 ml-6 list-disc space-y-1">
            {item.items.map((listItem: string, index: number) => (
              <li key={index} className="ml-6 mb-2">
                {listItem}
              </li>
            ))}
          </ul>
        )
      } else {
        return (
          <ol className="my-4 ml-6 list-decimal space-y-1">
            {item.items.map((listItem: string, index: number) => (
              <li key={index} className="ml-6 mb-2">
                {listItem}
              </li>
            ))}
          </ol>
        )
      }

    case "code":
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4">
          <code className={`language-${item.language}`}>{item.content}</code>
        </pre>
      )

    case "divider":
      return <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />

    case "links":
      return (
        <div className="my-6 space-y-2">
          {item.items.map((link: { text: string; url: string }, index: number) => (
            <div key={index}>
              <a
                href={link.url}
                className="text-primary hover:underline flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeHeading, setActiveHeading] = useState("")
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id),
        }))
        .filter((item) => item.element !== null)

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i]
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveHeading(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-12 md:px-6 md:py-24"
    >
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Sidebar with Table of Contents */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:block md:col-span-1 space-y-2"
        >
          <div className="sticky top-24 space-y-4">
            <div className="font-medium text-lg mb-4">Table of Contents</div>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block py-1 text-sm transition-colors ${
                    activeHeading === heading.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  } ${heading.level === 2 ? "pl-4" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                    setActiveHeading(heading.id)
                  }}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:col-span-3"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-500 dark:text-gray-400 mb-8"
          >
            {post.date}
          </motion.div>

          {/* Mobile Table of Contents */}
          <div className="md:hidden mb-8">
            <details className="border rounded-lg p-3">
              <summary className="font-medium cursor-pointer">Table of Contents</summary>
              <nav className="mt-3 space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block py-1 text-sm transition-colors ${
                      activeHeading === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    } ${heading.level === 2 ? "pl-4" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                      setActiveHeading(heading.id)
                    }}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </details>
          </div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            {post.content.map((item, index) => (
              <ContentRenderer key={index} item={item} />
            ))}
          </motion.div>
        </motion.article>
      </div>
    </motion.div>
  )
}
