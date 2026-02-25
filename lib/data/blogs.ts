/**
 * lib/data/blogs.ts
 * Centralized data store for all blog posts.
 */

// Define TypeScript interfaces for strict typing
export interface BlogLink {
    text: string;
    url: string;
}

export interface BlogContentItem {
    type: "heading" | "paragraph" | "list" | "code" | "divider" | "image" | "links";
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For headings
    content?: string;             // For headings, paragraphs, code
    id?: string;                  // For headings (table of contents anchor)
    style?: "unordered" | "ordered"; // For lists
    items?: string[] | BlogLink[];   // For lists or links
    language?: string;            // For code blocks
    src?: string;                 // For images
    alt?: string;                 // For images
    width?: number;               // For images
    height?: number;              // For images
    caption?: string;             // For images
}

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    readTime: string;
    slug: string;
    content: BlogContentItem[];
}

export const blogs: BlogPost[] = [
    // ===== BLOG: Day 2 — 30 Days of Free Resources =====
    {
        title: "Day 2: 30 Days of Free Learning Resources 📚",
        description: "Day 2 of sharing 5 free learning resources — today featuring Grow with Google, NVIDIA Academy, LangChain Academy, Oracle Academy, and Infosys Springboard.",
        date: "February 26, 2026",
        readTime: "3 min read",
        slug: "day-2-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "Welcome to Day 2 of my 30-day challenge! Today I'm sharing 5 more incredible free learning platforms. These cover AI agents, GPU computing, cloud, Java, and career growth tools.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🟢 Grow with Google",
                id: "grow-with-google",
            },
            {
                type: "paragraph",
                content: "Google's career growth platform offers free training and Google Career Certificates. You can learn data analytics, UX design, project management, and IT support — all designed to get you job-ready.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Google Career Certificates in Data Analytics, UX Design, Project Management, IT Support",
                    "Free tools and resources to grow your skills and business",
                    "Designed for career changers — no degree required",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🟢 NVIDIA Academy",
                id: "nvidia-academy",
            },
            {
                type: "paragraph",
                content: "NVIDIA Academy covers everything from AI & Data Science to networking and DGX Systems. They offer self-paced courses, public remote training, private customized training, and certifications.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Topics: AI & Data Science, DGX Systems, Networking, RDMA, Software & Tools",
                    "Formats: Self-paced, public remote, private customized training",
                    "Certifications available to validate your skills",
                    "From beginner to advanced — including partner technical training",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🦜 LangChain Academy",
                id: "langchain-academy",
            },
            {
                type: "paragraph",
                content: "Want to build AI agents? LangChain Academy offers free courses that take you from zero to deploying production-ready agents.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Intro to Building Agents — Python",
                    "LangGraph Essentials — Python & TypeScript (State, Nodes, Edges, Memory)",
                    "LangSmith Agent Builder — build no-code agents using everyday language",
                    "LangSmith Essentials — the platform for agent engineering with live production data",
                    "Foundation: Introduction to LangChain — pre-built architectures and model integrations",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔴 Oracle Academy",
                id: "oracle-academy",
            },
            {
                type: "paragraph",
                content: "Oracle Academy provides free courses for educational institutions covering the fundamentals of programming, databases, and cloud computing.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Java: Fundamentals → Foundations → Programming → AP Computer Science A",
                    "SQL, PL/SQL, and database design with hands-on Oracle APEX labs",
                    "Python and Node.js programming",
                    "Oracle Cloud Infrastructure (OCI) and cloud concepts",
                    "AI with Machine Learning in Java",
                    "Career Center with pathways to Oracle professional certifications",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔵 Infosys Springboard",
                id: "infosys-springboard",
            },
            {
                type: "paragraph",
                content: "Infosys Springboard is a massive free learning platform with over 20,000 courses. Content comes from partnerships with Coursera and Harvard Business Publishing.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Programming: Java, Python, C#, JavaScript, Flutter (mobile app dev)",
                    "Emerging tech: Big Data, Robotics, ML, IoT, LLMs, Prompt Engineering, Deep Learning",
                    "Microsoft certifications prep (MS-900 and more)",
                    "Certifications via virtual proctored examinations",
                    "AI-powered immersive labs and secure assessments",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 All Resources Curated",
                id: "resources-page-day2",
            },
            {
                type: "paragraph",
                content: "Every resource I share is added to my Resources page. Head over there to browse all the resources in one place!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG: Day 1 — 30 Days of Free Resources =====
    {
        title: "Day 1: 30 Days of Free Learning Resources 🚀",
        description: "I'm starting a 30-day challenge — sharing 5 free learning resources every day. Day 1 features Hugging Face, MDN, Microsoft Learn, and Google.",
        date: "February 25, 2026",
        readTime: "3 min read",
        slug: "day-1-30-days-free-learning-resources",
        content: [
            {
                type: "paragraph",
                content: "I'm starting a 30-day challenge: sharing 5 free learning resources every day for the next 30 days.",
            },
            {
                type: "paragraph",
                content: "Why? Because big tech companies offer incredible, abundant resources — from networking to AI agents, full stack to cloud, backend to DevOps — and most people don't even know they exist. Every resource will range across all companies where you can learn full stack, cloud, backend, AI agents, and more — all completely free.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "💡 Why Free Company Resources Matter",
                id: "why-resources-matter",
            },
            {
                type: "paragraph",
                content: "Companies like Microsoft, Google, NVIDIA, and Hugging Face have built massive learning platforms. These aren't basic tutorials — they're structured courses, career paths, and hands-on labs built by the people who make the tools you use every day.",
            },
            {
                type: "paragraph",
                content: "You can go from knowing nothing about a topic to building production-ready apps — and it won't cost you a single rupee. The only investment is your time.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🤗 Hugging Face Learn",
                id: "hugging-face-learn",
            },
            {
                type: "paragraph",
                content: "Hugging Face's learning hub features 12 completely free courses built by the Hugging Face team using their open-source ecosystem.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "LLM Course — everything about Large Language Models",
                    "AI Agents Course — build and deploy your own AI agents",
                    "MCP Course — learn the Model Context Protocol",
                    "Robotics Course — build robots with LeRobot",
                    "Deep RL Course — deep reinforcement learning",
                    "Computer Vision, Audio, Diffusion Models, ML for Games, ML for 3D",
                    "Open-Source AI Cookbook — practical notebooks by AI builders",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📜 JavaScript — MDN Web Docs",
                id: "javascript-mdn",
            },
            {
                type: "paragraph",
                content: "The gold standard for learning JavaScript. Mozilla's MDN Web Docs is the definitive reference used by developers worldwide.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Beginner tutorials to get you started from scratch",
                    "Intermediate guides: client-side frameworks, server-side programming",
                    "Advanced topics: closures, prototypes, iterators, meta-programming",
                    "Complete reference for every built-in object, expression, and API",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔵 Microsoft Learn — Training Catalog",
                id: "microsoft-learn-training",
            },
            {
                type: "paragraph",
                content: "Microsoft Learn offers thousands of free, step-by-step training modules and learning paths with built-in sandbox environments to practice.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Azure, AI, Power Platform, Microsoft 365, Dynamics 365",
                    "Hands-on sandbox environments — no setup needed",
                    "Progress tracking and badges",
                    "New modules added regularly to cover the latest technologies",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🎯 Microsoft Learn — Career Paths",
                id: "microsoft-career-paths",
            },
            {
                type: "paragraph",
                content: "Microsoft maps their training to 15 real-world career roles. Pick your dream job role and follow a structured path to get there.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "AI Engineer — define and implement cutting-edge AI solutions",
                    "Data Scientist — find trends and develop data-driven solutions",
                    "Data Engineer — make complex data available and accessible",
                    "Developer — make technology work for everyone",
                    "DevOps Engineer — blend technical expertise with business savvy",
                    "Solutions Architect — define vision and implementation of tech solutions",
                    "Security Engineer, Data Analyst, Administrator, and more",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🌐 Google Learning",
                id: "google-learning",
            },
            {
                type: "paragraph",
                content: "Google's learning hub covers school, work, and life — with a strong focus on AI and the future of learning. Over 1 billion people discover something new through Google's tools every day.",
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "AI experiments and tools for educators, skill-seekers, and the curious",
                    "Google Workspace tools for working smarter",
                    "$263M committed to closing computing education equity gaps",
                    "70 million people gaining digital skills globally",
                ],
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔮 What's Coming Next",
                id: "whats-coming-next",
            },
            {
                type: "paragraph",
                content: "Over the next 30 days, I'll share resources from every major company — covering full stack, cloud, backend, AI agents, networking, databases, DevOps, and more. Stay tuned!",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "📌 Check My Resources Page",
                id: "resources-page-day1",
            },
            {
                type: "paragraph",
                content: "I'm curating every resource I share on my dedicated Resources page. Bookmark it and check back daily!",
            },
            {
                type: "links",
                items: [
                    { text: "My Resources Page", url: "/resources" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 1: Google Gemini CLI =====
    {
        title: "Supercharge Your Workflow with Google Gemini CLI",
        description: "Unlock AI-powered command-line capabilities. Learn how the new Google Gemini CLI lets you bootstrap projects and generate code directly from your terminal.",
        date: "May 10, 2025",
        readTime: "5 min read",
        slug: "supercharge-workflow-google-gemini-cli",
        content: [

            {
                type: "paragraph",
                content: "Unlock AI-powered CLI in seconds with the new Google Gemini CLI.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🚀 Introduction",
                id: "introduction",
            },
            {
                type: "paragraph",
                content: "Gemini CLI lets you bootstrap projects, generate code, and integrate AI assistants directly from your terminal.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "💻 Installation",
                id: "installation",
            },
            {
                type: "paragraph",
                content: "Ensure you have Node.js ≥ 18 installed, then:",
            },
            {
                type: "code",
                language: "bash",
                content: '# Run without installing\nnpx https://github.com/google-gemini/gemini-cli\n\n# Or install globally\nnpm install -g @google/gemini-cli',
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🔐 Authentication",
                id: "authentication",
            },
            {
                type: "paragraph",
                content: "Choose one of three methods:",
            },
            {
                type: "code",
                language: "text",
                content: '❍ Login with Google\n● Gemini API Key (AI Studio)\n❍ Vertex AI',
            },
            {
                type: "image",
                src: "/images/blog/installing.png",
                alt: "Authentication prompt for Gemini CLI",
                caption: "Choose your authentication method.",
                width: 700,
                height: 200,
            },
            {
                type: "paragraph",
                content: "Add your GEMINI_API_KEY to your .env (no reload needed), or follow the on-screen guide to log in.",
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "✨ Quick Example",
                id: "quick-example",
            },
            {
                type: "paragraph",
                content: "Create a Python FastAPI calculator project:",
            },
            {
                type: "image",
                src: "/images/blog/example.png",
                alt: "CLI prompt asking for a project description",
                caption: "Prompting Gemini CLI to create a FastAPI calculator.",
                width: 700,
                height: 150,
            },
            {
                type: "paragraph",
                content: "After confirming, Gemini CLI creates your files:",
            },
            {
                type: "image",
                src: "/images/blog/files_created.png",
                alt: "A tree view of the files created by the CLI",
                caption: "File structure generated by the CLI.",
                width: 700,
                height: 250,
            },
            {
                type: "paragraph",
                content: "It then starts the server at http://localhost:8000/:",
            },
            {
                type: "image",
                src: "/images/blog/code_output.png",
                alt: "Browser output from the generated FastAPI application",
                caption: "The running FastAPI application in the browser.",
                width: 700,
                height: 150,
            },
            { type: "divider" },
            {
                type: "heading",
                level: 2,
                content: "🎯 Conclusion",
                id: "conclusion",
            },
            {
                type: "paragraph",
                content: "Scaffold full-stack apps with a single command. Try Gemini CLI today and accelerate your development!",
            },
            { type: "divider" },
            {
                type: "paragraph",
                content: "Learn more & contribute:",
            },
            {
                type: "links",
                items: [
                    { text: "Google Gemini CLI GitHub Repo", url: "https://github.com/google-gemini/gemini-cli" } as BlogLink,
                    { text: "Google Gemini tutorial codes", url: "https://github.com/Aakashjammula/gemini_cli_turorial" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 2: UV Python Package Manager =====
    {
        title: "uv: The Fastest Python Package Manager",
        description: "Discover the blazing fast Python package manager written in Rust that's revolutionizing Python workflows.",
        date: "April 16, 2025",
        readTime: "10 min read",
        slug: "uv-fastest-python-package-manager",
        content: [

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
                id: "conclusion-uv",
            },
            {
                type: "paragraph",
                content:
                    "uv is not just fast—it's a serious contender to unify the Python tooling ecosystem. Whether you're a beginner or managing large workspaces, it's worth trying today.",
            },
            {
                type: "links",
                items: [
                    { text: "Official Docs", url: "https://docs.astral.sh/uv" } as BlogLink,
                    { text: "GitHub Repo", url: "https://github.com/astral-sh/uv" } as BlogLink,
                    { text: "Benchmarks & Deep Dive", url: "https://www.saaspegasus.com/guides/uv-deep-dive/" } as BlogLink,
                ],
            },
        ],
    },
    // ===== BLOG 3: Model Control Protocol =====
    {
        title: "Beginner's Guide to MCP with LangChain and Gemini",
        description: "A beginner's guide to the Model Control Protocol in AI agents with LangChain, Gemini and Python-MCP SDK.",
        date: "April 16, 2025",
        readTime: "10 min read",
        slug: "mcp-model-control-protocol",
        content: [

            {
                type: "heading",
                level: 2,
                content: "What is MCP?",
                id: "what-is-mcp"
            },
            {
                type: "paragraph",
                content: "MCP (Model Control Protocol) is a standard way for language models to interact with external tools like web search, calculators, or databases in a structured and clean manner."
            },
            {
                type: "paragraph",
                content: "It acts like a bridge between the model and the tools, making communication modular and manageable."
            },
            {
                type: "heading",
                level: 2,
                content: "Why Use MCP in Agents?",
                id: "why-use-mcp-in-agents"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Separates model logic from tool logic",
                    "Allows AI agents to decide when and how to use tools",
                    "Keeps the system modular, scalable, and easier to maintain",
                    "Works great with agent frameworks like LangChain"
                ]
            },
            {
                type: "paragraph",
                content: "In short, MCP makes your AI agent smarter and more capable by letting it access external knowledge or functionalities as needed."
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Let's Understand This by a Simple Project",
                id: "lets-understand-this-by-a-simple-project"
            },
            {
                type: "paragraph",
                content: "To see MCP in action, let's look at a practical example: the GitHub project mcp_langchain_examples."
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Uses LangChain to create and manage the agent",
                    "Uses Gemini 2.0 Flash as the base AI model",
                    "Adds DuckDuckGo as an external web search tool",
                    "Uses MCP to connect the model and tools cleanly"
                ]
            },
            {
                type: "paragraph",
                content: "Here's how the project is structured:"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "server.py - Implements the MCP server and tool (DuckDuckGo)",
                    "prompt.py - Contains system prompts to guide the AI",
                    "main.py - Runs the agent logic with Gemini and MCP tools",
                    "requirements.txt - Lists Python dependencies"
                ]
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Installation & Setup",
                id: "installation-and-setup-mcp"
            },
            {
                type: "heading",
                level: 3,
                content: "Prerequisites",
                id: "prerequisites"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "Python 3.8+",
                    "Google API key for Gemini model"
                ]
            },
            {
                type: "heading",
                level: 3,
                content: "Method 1: Using uv (recommended)",
                id: "using-uv"
            },
            {
                type: "code",
                language: "bash",
                content: "# Install uv\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# Create env & install\nuv venv\nuv sync"
            },
            {
                type: "heading",
                level: 3,
                content: "Method 2: Using pip",
                id: "using-pip"
            },
            {
                type: "code",
                language: "bash",
                content: "# Create and activate virtual environment\npython -m venv .venv\nsource .venv/bin/activate\n\n# Install requirements\npip install -r requirements.txt"
            },
            {
                type: "paragraph",
                content: "Then, create a `.env` file in the root and add your Gemini API key:"
            },
            {
                type: "code",
                language: "bash",
                content: "GOOGLE_API_KEY=your_api_key_here"
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Running the Project",
                id: "running-the-project"
            },
            {
                type: "code",
                language: "bash",
                content: "# Start the MCP Server\nuv run ./src/server.py\n\n# In another terminal, run the main app\nuv run ./src/main.py"
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "How It Works",
                id: "how-it-works"
            },
            {
                type: "list",
                style: "unordered",
                items: [
                    "User inputs a question",
                    "The agent checks the prompt and decides to use the search tool",
                    "The MCP server handles the DuckDuckGo search",
                    "Results are returned and formatted as a response"
                ]
            },
            {
                type: "heading",
                level: 2,
                content: "Example Interaction",
                id: "example-interaction"
            },
            {
                type: "code",
                language: "bash",
                content: "Question: Who is the current CEO of OpenAI?\nAnswer: As of the latest search, the CEO of OpenAI is Sam Altman."
            },
            {
                type: "divider"
            },
            {
                type: "heading",
                level: 2,
                content: "Conclusion",
                id: "conclusion-mcp"
            },
            {
                type: "paragraph",
                content: "MCP brings a structured and scalable way to empower your AI agents. By combining it with LangChain and a capable model like Gemini, you can build smart, flexible, tool-using agents easily. Try out this project and start building your own powerful AI workflows!"
            },
            {
                type: "links",
                items: [
                    {
                        text: "Project GitHub Repo",
                        url: "https://github.com/Aakashjammula/mcp_langchain_examples"
                    } as BlogLink,
                    {
                        text: "Learn about LangChain",
                        url: "https://docs.langchain.com"
                    } as BlogLink,
                    {
                        text: "Explore Gemini API",
                        url: "https://ai.google.dev/"
                    } as BlogLink
                ],
            },
        ],
    },
];
