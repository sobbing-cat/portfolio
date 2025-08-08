import Image from "next/image";
import Link from "next/link";
import type React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import type { BlogPostMetadata } from "@/lib/types";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import SiteData from "@/content/information.json";
import { promises } from "node:dns";

// Define the expected structure of the MDX module
interface MDXModule {
  default: React.ComponentType;
  metadata: BlogPostMetadata;
}

// generateMetadata function to dynamically set page metadata
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  let postMetadata: BlogPostMetadata;
  try {
    const mdxModule = (await import(`@/content/blog/${slug}.mdx`)) as MDXModule;
    postMetadata = mdxModule.metadata;
  } catch (error) {
    console.error(`Failed to load metadata for slug: ${slug}`, error);
    // If metadata cannot be loaded, return a default or indicate not found
    return {
      title: "Page Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: postMetadata.title,
    description: postMetadata.excerpt,
    keywords: postMetadata.keywords,
    authors: [{ name: SiteData.author.name, url: SiteData.site.baseUrl }],

    openGraph: {
      title: postMetadata.title,
      description: postMetadata.excerpt,
      url: SiteData.site.baseUrl,
      siteName: SiteData.site.title,
      images: [
        {
          url: `${SiteData.site.baseUrl}${SiteData.metadata.openGraph.image}/blog?title=${postMetadata.title}&imageUrl=${postMetadata.mainImage}`,
          alt: SiteData.metadata.openGraph.imageAlt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  let PostContent: React.ComponentType;
  let postMetadata: BlogPostMetadata;

  try {
    // Dynamically import the MDX file from the 'content/blog' directory
    const mdxModule = (await import(`@/content/blog/${slug}.mdx`)) as MDXModule;
    console.log(mdxModule);
    PostContent = mdxModule.default;
    postMetadata = mdxModule.metadata;
  } catch (error) {
    console.error(`Failed to load blog post for slug: ${slug}`, error);
    notFound(); // If the file doesn't exist or there's an import error
  }

  const dateToShow = postMetadata.lastUpdated || postMetadata.publishedDate;

  return (
    <div className="flex flex-col gap-8">
      <section className="w-full bg-muted border-b border-border pt-22 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {postMetadata.mainImage && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg mb-8">
              <Image
                src={postMetadata.mainImage}
                fill
                priority
                alt="Blog post hero image"
                className="object-cover object-center"
              />
            </div>
          )}

          <div className="space-y-6 text-center">
            <h1 className="text-6xl font-extrabold leading-tight">
              {postMetadata.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground">
              {postMetadata.category && (
                <>
                  <Link
                    href="#"
                    className="inline-flex items-center rounded-full border px-3 py-1 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {postMetadata.category}
                  </Link>
                  <span className="mx-2">•</span>
                </>
              )}

              {dateToShow && (
                <>
                  <span>{dateToShow}</span>
                  <span className="mx-2">•</span>
                </>
              )}

              {postMetadata.readingTime && (
                <>
                  <span>{postMetadata.readingTime}</span>
                  <span className="mx-2">•</span>
                </>
              )}

              {postMetadata.tags &&
                postMetadata.tags.map((tag) => (
                  <Link
                    key={tag}
                    href="#"
                    className="text-foreground hover:underline before:content-['#'] font-semibold"
                  >
                    {tag}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <article className="w-full max-w-6xl mx-auto px8 sm:px-12 lg:px-16 pb-8">
        <PostContent />
      </article>
    </div>
    // <div className="max-w-6xl mx-auto pt-22 flex justify-center">
    //   <h1>This is gonna be the page where we actually display the blog post itself</h1>
    // </div>
  );
}

// generateStaticParams will now read from the 'content/blog' directory
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "blog");
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.(mdx|md)$/, ""),
    }));
}

export const dynamicParams = false;
