interface SectionHeadingProps {
  title: string
  description: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">{description}</p>
    </div>
  )
}
