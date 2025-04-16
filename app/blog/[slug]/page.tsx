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
    date: "May 15, 2024",
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
    title: "Understanding MCP (Model Control Protocol) and Using LangChain MCP SDK",
    date: "June 1, 2024",
    content: [
      {
        type: "heading",
        level: 1,
        content: "Understanding MCP (Model Control Protocol) and Using LangChain MCP SDK",
        id: "understanding-mcp",
      },
      {
        type: "heading",
        level: 2,
        content: "What is MCP?",
        id: "what-is-mcp",
      },
      {
        type: "paragraph",
        content:
          "Model Control Protocol (MCP) is a standardized protocol for interacting with and controlling AI models. It provides a unified interface to manage different AI models regardless of their underlying architecture or framework.",
      },
      {
        type: "heading",
        level: 3,
        content: "Key Features of MCP:",
        id: "key-features-of-mcp",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Standardized model interaction",
          "Model lifecycle management",
          "Performance monitoring",
          "Unified API across different model types",
          "Scalable deployment options",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Why Use MCP with LangChain?",
        id: "why-use-mcp-with-langchain",
      },
      {
        type: "paragraph",
        content: "LangChain's MCP SDK provides several benefits:",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Simplified integration with various AI models",
          "Consistent interface across different providers",
          "Built-in support for common AI workflows",
          "Easy switching between models",
          "Enhanced monitoring and control capabilities",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Getting Started with LangChain MCP SDK",
        id: "getting-started-with-langchain-mcp-sdk",
      },
      {
        type: "heading",
        level: 3,
        content: "Installation",
        id: "installation",
      },
      {
        type: "paragraph",
        content: "First, install the required packages:",
      },
      {
        type: "code",
        language: "bash",
        content: "pip install langchain-mcp",
      },
      {
        type: "heading",
        level: 3,
        content: "Basic Usage",
        id: "basic-usage",
      },
      {
        type: "paragraph",
        content: "Here's how to initialize and use the MCP client:",
      },
      {
        type: "code",
        language: "python",
        content:
          'from langchain_mcp import MCPClient\n\n# Initialize the client\nmcp = MCPClient(\n    api_key="your_api_key",\n    endpoint="https://api.mcp.example.com"\n)\n\n# List available models\nmodels = mcp.list_models()\nprint("Available models:", models)\n\n# Load a model\nmodel = mcp.load_model(\n    model_id="gpt-4",\n    config={"temperature": 0.7, "max_tokens": 1000}\n)\n\n# Make a prediction\nresponse = model.predict(\n    input_text="Explain MCP protocol in simple terms"\n)\nprint(response)',
      },
      {
        type: "heading",
        level: 2,
        content: "Advanced Features",
        id: "advanced-features",
      },
      {
        type: "heading",
        level: 3,
        content: "Model Monitoring",
        id: "model-monitoring",
      },
      {
        type: "code",
        language: "python",
        content:
          '# Get model metrics\nmetrics = mcp.get_metrics(model_id="gpt-4")\nprint("Model metrics:", metrics)\n\n# Get usage statistics\nusage = mcp.get_usage()\nprint("Usage stats:", usage)',
      },
      {
        type: "heading",
        level: 3,
        content: "Model Configuration",
        id: "model-configuration",
      },
      {
        type: "code",
        language: "python",
        content:
          '# Update model configuration\nupdated_config = mcp.update_config(\n    model_id="gpt-4",\n    config={"temperature": 0.5}\n)\n\n# Get current configuration\ncurrent_config = mcp.get_config(model_id="gpt-4")',
      },
      {
        type: "heading",
        level: 2,
        content: "Practical Example: Building a Chat Application",
        id: "practical-example-building-a-chat-application",
      },
      {
        type: "paragraph",
        content: "Let's build a simple chat application using MCP:",
      },
      {
        type: "code",
        language: "python",
        content:
          'from langchain_mcp import MCPClient\nfrom typing import List, Dict\n\nclass ChatApp:\n    def __init__(self, api_key: str):\n        self.mcp = MCPClient(api_key=api_key)\n        self.model = None\n        self.chat_history: List[Dict] = []\n    \n    def start_chat(self, model_id: str = "gpt-4"):\n        self.model = self.mcp.load_model(\n            model_id=model_id,\n            config={"temperature": 0.7}\n        )\n        print(f"Chat with {model_id} started!")\n    \n    def send_message(self, message: str):\n        if not self.model:\n            raise ValueError("Model not loaded. Call start_chat() first.")\n        \n        # Add user message to history\n        self.chat_history.append({"role": "user", "content": message})\n        \n        # Generate response\n        response = self.model.predict(\n            input_text=message,\n            context=self.chat_history\n        )\n        \n        # Add AI response to history\n        self.chat_history.append({"role": "assistant", "content": response})\n        \n        return response\n\n# Usage\nchat = ChatApp(api_key="your_api_key")\nchat.start_chat()\nprint(chat.send_message("Hello! How are you?"))\nprint(chat.send_message("Can you explain MCP to me?"))',
      },
      {
        type: "heading",
        level: 2,
        content: "Best Practices",
        id: "best-practices",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Error Handling: Always implement proper error handling for API calls",
          "Rate Limiting: Respect rate limits and implement retry logic",
          "Context Management: Maintain appropriate context for conversations",
          "Configuration: Experiment with different model configurations",
          "Monitoring: Regularly check model metrics and usage",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Resources",
        id: "resources",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "MCP LangChain Examples GitHub: https://github.com/Aakashjammula/mcp_langchain_examples",
          "Official MCP Documentation",
          "LangChain MCP SDK Documentation",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusion",
        id: "conclusion-mcp",
      },
      {
        type: "paragraph",
        content:
          "MCP provides a powerful way to standardize interactions with AI models, and the LangChain MCP SDK makes it even easier to integrate into your applications. With its consistent interface and advanced features, you can build robust AI applications while maintaining control over your models.",
      },
      {
        type: "paragraph",
        content: "For more examples and detailed implementations, check out the GitHub repository linked above.",
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
