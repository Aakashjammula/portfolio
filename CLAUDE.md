# Portfolio — Claude Code Guide

## Project overview

Personal portfolio for Aakash Jammula (GenAI Engineer). Built with Next.js 15 App Router, TypeScript, Tailwind CSS, and shadcn/ui. Features a blog, projects page, resources page, and an AI chatbot widget.

## Tech stack

- **Framework**: Next.js 15 (App Router, `app/` directory)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3 + shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion, Lottie (`@lottiefiles/dotlottie-react`)
- **AI**: LangChain + `@langchain/google-genai` (Gemini) + Pinecone for the chatbot
- **Rate limiting**: Upstash Redis + Ratelimit
- **Package manager**: npm (use `npm run dev`, not yarn/pnpm/bun)

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

## Project structure

```
app/
  page.tsx              # Home — hero, stats, about, projects preview, blog preview, contact
  blog/page.tsx         # Blog listing
  blog/[slug]/page.tsx  # Individual blog post (rendered from blogs data)
  projects/page.tsx     # Full projects listing
  resources/page.tsx    # Curated learning resources listing
  contact/page.tsx      # Contact page
  api/chat/route.ts     # AI chatbot API endpoint (Gemini + Pinecone RAG)
  globals.css           # Global styles + Tailwind directives
  layout.tsx            # Root layout with ThemeProvider, NavBar

components/
  chatbot/ChatbotWidget.tsx   # Floating chatbot UI (rendered in footer)
  Timeline.tsx                # Career timeline for About section
  TechStack.tsx               # Tech icons grid
  blog-card.tsx, project-card.tsx, resource-card.tsx, stat-card.tsx
  nav-bar.tsx, section-heading.tsx, typewriter.tsx, cursor-glow.tsx
  ui/                         # shadcn/ui components (do not modify manually)

lib/
  data/blogs.ts       # All blog post data (BlogPost[] — the source of truth for blog content)
  data/resources.ts   # All resource data
  utils.ts            # cn() utility (clsx + tailwind-merge)
```

## Adding content

### New blog post
Add an entry to `lib/data/blogs.ts` following the `BlogPost` interface. The `slug` is used as the URL path (`/blog/<slug>`). Content is an array of `BlogContentItem` objects with types: `heading`, `paragraph`, `list`, `code`, `divider`, `image`, `links`.

### New resource
Add to `lib/data/resources.ts`.

### New project
Add a `<ProjectCard>` in `app/projects/page.tsx` and optionally feature it in the homepage projects section in `app/page.tsx`.

## Styling conventions

- Dark mode is supported via `next-themes`; use `dark:` variants for dark mode styles
- Colors: primary is indigo/purple (`primary` Tailwind token); backgrounds alternate between `gray-50`/`gray-900` and `white`/`gray-800` across sections
- Animations: use Framer Motion `motion` components with `whileInView` + `viewport={{ once: true }}` for scroll animations

## Environment variables

Required in `.env.local`:
```
GOOGLE_API_KEY=        # Gemini API key for chatbot
PINECONE_API_KEY=      # Pinecone vector DB for chatbot RAG
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Playwright / UI inspection

- Use the `mcp__plugin_playwright_playwright__*` MCP tools to inspect the live site before planning UI changes
- Dev server runs at `http://localhost:3000` — navigate there first
- **Always save screenshots to `.playwright-mcp/`** (e.g. `filename: ".playwright-mcp/hero.png"`), never to the project root
- Present a written plan and wait for approval before making any code changes

## Important notes

- `components/ui/` contains auto-generated shadcn/ui components — prefer not editing them directly; add new shadcn components via the CLI if needed
- The chatbot widget is rendered inside the `<footer>` in `app/page.tsx`
- Blog posts are statically defined in TypeScript (no CMS); add/edit them directly in `lib/data/blogs.ts`
- The `package-lock.json` is untracked (listed in git status as untracked); it is present locally
