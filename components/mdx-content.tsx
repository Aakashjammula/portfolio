"use client"

import * as runtime from "react/jsx-runtime"
import Image from "next/image"
import Link from "next/link"

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="article-h2 text-2xl font-bold text-white mt-16 mb-5 flex items-baseline gap-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-indigo-300 mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="article-p text-[#c4cad6] leading-[1.8] mb-6">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-none space-y-3 text-[#c4cad6] mb-6 pl-0">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-outside ml-5 space-y-3 text-[#c4cad6] mb-6">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-[1.8] pl-5 -indent-5 marker:text-indigo-400 before:content-['—'] before:text-indigo-400 before:mr-3 before:inline-block">
      {children}
    </li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href ?? "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/40 hover:decoration-indigo-300 underline-offset-4 transition-colors"
    >
      {children}
    </Link>
  ),
  hr: () => <div className="my-4" aria-hidden />,
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-gray-200 italic">{children}</em>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-2 border-indigo-500/60 pl-6 italic text-[#9aa3b5] my-8">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <span className="block my-8">
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={700}
        height={400}
        className="rounded-lg w-full object-cover"
      />
      {alt && <span className="block text-center text-sm text-gray-500 mt-2">{alt}</span>}
    </span>
  ),
  pre: ({ children, style, ...props }: { children: React.ReactNode; style?: React.CSSProperties; [key: string]: unknown }) => (
    <pre
      {...props}
      style={{ ...style, backgroundColor: "transparent" }}
      className="article-pre bg-[#0d1017] border border-white/10 rounded-xl overflow-x-auto text-sm my-8 [&>code]:p-4 [&>code]:block"
    >
      {children}
    </pre>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-gray-800 text-indigo-300 px-1.5 py-0.5 rounded text-[0.85em] font-mono">
          {children}
        </code>
      )
    }
    return <code className={className}>{children}</code>
  },
}

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return (
    <div className="article-body prose prose-invert max-w-none">
      <Component components={mdxComponents} />
    </div>
  )
}
