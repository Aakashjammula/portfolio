import { defineConfig, defineCollection, s } from "velite"
import rehypePrettyCode from "rehype-pretty-code"

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    date: s.isodate(),
    readTime: s.string(),
    slug: s.path(),
    body: s.mdx(),
  }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8][ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
})
