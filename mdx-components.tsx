import type { MDXComponents } from "mdx/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CopyButton } from "./components/mdx/client-components";

// --- MDX Component Mapping ---
const components: MDXComponents = {
  // --- HEADING ELEMENTS ---
  h1: ({ children }) => (
    <h1 className="mt-8 mb-6 scroll-m-20 text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-6 scroll-m-20 border-b pb-3 text-4xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-5 scroll-m-20 text-3xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h4>
  ),
  // --- INLINE TEXT ELEMENTS ---
  p: ({ children }) => (
    <p className="my-6 text-lg leading-relaxed text-foreground">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href}
      target="_blank"
      className="font-medium text-foreground underline-offset-4 transition-colors hover:text-foreground/80 underline"
    >
      {children}
    </Link>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  // --- LISTS ---
  ul: ({ children }) => (
    <ul className="my-6 ml-6 list-disc space-y-3 text-lg text-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal space-y-3 text-lg text-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="marker:text-foreground">{children}</li>,
  // --- BLOCK ELEMENTS ---
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-foreground bg-muted p-4 pl-6 text-lg italic text-muted-foreground rounded-r-lg">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border" />,
  // --- CODE ---
  code: ({ children }) => (
    <code className="relative rounded-md px-[0.4rem] py-[0.2rem] font-mono text-base font-semibold text-foreground">
      {children}
    </code>
  ),
  // Use our custom Pre component
  pre: ({ children }: { children?: React.ReactNode }) => {
    if (
      !React.isValidElement(children) ||
      typeof (children as React.ReactElement<{ children: unknown }>).props
        .children !== "string"
    ) {
      return null;
    }
    const codeString = (
      children as React.ReactElement<{ children: string }>
    ).props.children.trim();
    const language =
      (
        children as React.ReactElement<{ className?: string }>
      ).props.className?.replace(/language-/, "") || "text";
    const lines = codeString.split("\n");
    return (
      <div className="relative my-6 rounded-lg border bg-muted font-mono text-sm">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-xs font-semibold uppercase text-muted-foreground">
            {language}
          </span>
          <CopyButton text={codeString} />
        </div>
        <pre className="overflow-x-auto py-3">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex w-full">
                <span
                  aria-hidden="true"
                  className="w-12 shrink-0 select-none px-4 py-1 text-right text-muted-foreground"
                >
                  {index + 1}
                </span>
                <span className="flex-1 py-1 pr-4 text-foreground">
                  {/* Render a non-breaking space for empty lines to maintain height */}
                  {line || "\u00A0"}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  },
  // --- MEDIA ---
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-8">
      <Image
        src={src || "https://placehold.co/1200x675/31343C/EEE?text=Image+Placeholder"}
        alt={alt || "Placeholder image"}
        width={1200}
        height={675}
        className="h-auto w-full rounded-lg border shadow-md"
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export function useMDXComponents(
  componentsOverrides: MDXComponents
): MDXComponents {
  return {
    ...components,
    ...componentsOverrides,
  };
}
