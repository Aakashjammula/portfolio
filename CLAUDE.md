# Portfolio — Claude Code Guide

## Project Overview

Personal portfolio for Aakash Jammula (GenAI Engineer). Built with Next.js 15 App Router, TypeScript, Tailwind CSS, and shadcn/ui. Features a blog, projects page, resources page, and a RAG-powered AI chatbot widget backed by Gemini 2.5-flash and Pinecone.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix UI) |
| Animations | Framer Motion 12, Lottie (`@lottiefiles/dotlottie-react`), Lenis smooth scroll |
| AI / RAG | LangChain + `@langchain/google-genai` (Gemini 2.5-flash) + Pinecone 7 |
| Rate limiting | Upstash Redis + `@upstash/ratelimit` (20 req / 10 hrs) |
| Forms | react-hook-form + zod |
| Icons | Lucide React |
| Package manager | **npm** — never use yarn/pnpm/bun |

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:3000
npm run build        # production build (TypeScript errors are enforced)
npm run lint         # ESLint check
npm start            # start production server after build
```

## Environment Variables

Required in `.env.local`:

```
GOOGLE_API_KEY=              # Gemini API key (chatbot)
PINECONE_API_KEY=            # Pinecone vector DB (chatbot RAG)
UPSTASH_REDIS_REST_URL=      # Rate limiting
UPSTASH_REDIS_REST_TOKEN=    # Rate limiting
```

## Project Structure

```
app/
  layout.tsx               # Root layout — ThemeProvider, NavBar, ChatbotWidget, SmoothScroll
  page.tsx                 # Home — hero, stats, about, projects preview, blog preview, contact
  globals.css              # Global styles, Tailwind directives, CSS variable theme
  blog/
    page.tsx               # Blog listing (reads from lib/data/blogs.ts)
    [slug]/page.tsx        # Dynamic blog post rendered from BlogPost data
  projects/page.tsx        # Full projects listing
  resources/page.tsx       # Curated learning resources
  contact/page.tsx         # Contact page
  api/
    chat/route.ts          # POST /api/chat — Gemini + Pinecone RAG, streaming, rate-limited

components/
  chatbot/ChatbotWidget.tsx     # Floating chat UI (streaming, rate limit display)
  agent-canvas.tsx              # 3D interactive animated agent background
  Timeline.tsx                  # Career timeline with scroll parallax
  TechStack.tsx                 # Tech icons grid
  nav-bar.tsx                   # Responsive navbar with mobile menu
  project-card.tsx              # 3D hover project card (mouse rotateX/Y)
  blog-card.tsx, blog-row.tsx   # Blog listing components
  resource-card.tsx             # Resource card
  stat-card.tsx                 # Stat display cards
  scroll-reveal.tsx             # ScrollReveal, ParallaxTitle wrappers
  smooth-scroll.tsx             # Lenis smooth scroll provider
  interactive-background.tsx    # Animated blob background
  typewriter.tsx                # Typewriter text effect
  section-heading.tsx           # Reusable section title
  contact-form.tsx              # Contact form (react-hook-form + zod)
  theme-provider.tsx            # next-themes wrapper (dark mode forced)
  ui/                           # shadcn/ui auto-generated — do not edit manually

lib/
  data/blogs.ts            # BlogPost[] — source of truth for all blog content
  data/resources.ts        # Resource[] — source of truth for resources
  utils.ts                 # cn() utility (clsx + tailwind-merge)

hooks/
  use-mobile.tsx           # Mobile breakpoint hook
  use-toast.ts             # Toast notification hook

public/
  images/blog/             # Blog post images
  images/resources/        # Resource images
```

## Adding Content

### New blog post
Add an entry to `lib/data/blogs.ts` following the `BlogPost` interface. The `slug` becomes the URL (`/blog/<slug>`). Content is a `BlogContentItem[]` array with types: `heading`, `paragraph`, `list`, `code`, `divider`, `image`, `links`.

### New resource
Add to `lib/data/resources.ts`.

### New project
Add a `<ProjectCard>` in `app/projects/page.tsx` and optionally feature it in the homepage projects section in `app/page.tsx`.

### New shadcn/ui component
Use the shadcn CLI — do not manually edit files in `components/ui/`.

## Styling Conventions

- **Dark mode forced**: `ThemeProvider` uses `forcedTheme="dark"` — dark mode is always active.
- **Color system**: CSS variables (`--background`, `--foreground`, etc.) defined in `globals.css`; primary accent is indigo/purple.
- **Section backgrounds**: alternate between `gray-50`/`gray-900` and `white`/`gray-800`.
- **Scroll animations**: use Framer Motion `whileInView` with `viewport={{ once: true }}`.
- **3D effects**: project cards use `rotateX`/`rotateY` transforms driven by mouse position.
- **Tailwind 4**: uses `@tailwindcss/postcss` — no `tailwind.config.js`; config is in CSS.

## Chatbot Architecture (`app/api/chat/route.ts`)

- Accepts `POST { messages, userIp }` — 1000-char message limit enforced server-side.
- Queries Pinecone for relevant resume/project context, then calls Gemini 2.5-flash with retrieved context.
- Returns a `ReadableStream` for real-time token streaming.
- Rate-limited via Upstash Redis: 20 requests per 10 hours per IP; returns `X-RateLimit-*` headers.
- Chatbot is scoped: only answers questions about Aakash's background, skills, and projects.

## Key Architectural Notes

- Nearly all components are `"use client"` — the portfolio is highly interactive.
- All blog/project/resource content is hardcoded TypeScript — no CMS or database.
- `pnpm-lock.yaml` is present but ignored; project uses npm (`package-lock.json` is untracked).
- Deployed to Vercel; `next.config.mjs` has ESLint ignored at build time but TypeScript errors enforced.
- Path alias `@/*` maps to the project root (configured in `tsconfig.json`).

## Playwright / UI Inspection

- Use Playwright MCP tools to inspect the live site before planning UI changes.
- Dev server runs at `http://localhost:3000`.
- Save all screenshots to `.playwright-mcp/` (e.g. `filename: ".playwright-mcp/hero.png"`).
- Present a written plan and wait for approval before making code changes.
