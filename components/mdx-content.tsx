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
    <h2 className="text-2xl font-semibold text-white mt-8 mb-3 border-b border-white/10 pb-2">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-indigo-300 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-300 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-outside ml-5 space-y-1.5 text-gray-300 mb-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href ?? "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
    >
      {children}
    </Link>
  ),
  hr: () => <hr className="border-white/10 my-8" />,
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-gray-200 italic">{children}</em>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-4">{children}</blockquote>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <span className="block my-6">
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
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm my-4 [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-gray-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">
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
    <div className="prose prose-invert max-w-none">
      <Component components={mdxComponents} />
    </div>
  )
}
