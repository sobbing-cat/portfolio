import Image from "next/image";
import Link from "next/link";

export default function BlogPost() {
  return (
    <div className="flex flex-col gap-8">
      <section className="w-full bg-muted border-b border-border pt-22 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg mb-8">
            <Image
              src="https://placehold.co/1200x500/31343C/EEE?text=React+%2B+Stripe"
              fill
              alt="Blog post hero image"
              className="object-cover object-center"
            />
          </div>
          <div className="space-y-6 text-center">
            <h1 className="text-6xl font-extrabold leading-tight">
              Integrating Stripe Checkout in a React App
            </h1>
            {/* Category, date, and read time */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground">
              <Link
                href="#" // Placeholder link
                className="inline-flex items-center rounded-full border px-3 py-1 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Tutorial
              </Link>
              <span className="mx-2">•</span>
              <span>July 25, 2024</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
              <span className="mx-2">•</span>
              <Link
                href="#"
                className="text-foreground hover:underline before:content-['#'] font-semibold"
              >
                Next
              </Link>
              <Link
                href="#"
                className="text-foreground hover:underline before:content-['#'] font-semibold"
              >
                WebDev
              </Link>
            </div>
          </div>
        </div>
      </section>
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"></article>
    </div>
    // <div className="max-w-6xl mx-auto pt-22 flex justify-center">
    //   <h1>This is gonna be the page where we actually display the blog post itself</h1>
    // </div>
  );
}
