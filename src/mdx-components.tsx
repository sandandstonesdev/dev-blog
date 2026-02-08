import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

const components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold my-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold my-5">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold my-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-base my-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="my-2">{children}</li>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-800 text-white px-2 py-1 rounded font-mono text-sm" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto font-mono text-sm my-4" {...props}>
      {children}
    </pre>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      className="w-full h-auto my-4"
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents;
 
export function useMDXComponents(): MDXComponents {
  return components
}
