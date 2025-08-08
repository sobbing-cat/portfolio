import CornerFrame from "@/components/corner-frame";
import { Button } from "@/components/ui/button";
import SiteData from "@/content/site-data.json";
import {
  IconMapPin,
  IconBrandGmail,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-50 bg-gradient-to-b from-foreground/10 to-transparent absolute -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-22 pt-30 pb-20">
        <CornerFrame>
          <div className="flex flex-col gap-20">
            <div className="w-full h-8 section-stripes" />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-4xl font-bold text-center text-foreground mb-4">
                Heads up! This site is still a work in progress.
              </h2>
              <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
                I&apos;m building out a new and improved version of my portfolio
                right now. Feel free to poke around and see what&apos;s here,
                but expect some changes and new stuff coming soon!
              </p>
            </div>
            <div className="w-full h-8 section-stripes" />
          </div>
        </CornerFrame>
        <CornerFrame>
          <div className="flex flex-col gap-20">
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
            <div className="grid items-center gap-8 md:grid-cols-5">
              <div className="md:col-span-2 flex justify-center">
                <Image
                  src={SiteData.author.image.url}
                  alt={SiteData.author.image.alt}
                  width={260}
                  height={260}
                  className="rounded-lg border-4 border-foreground shadow-sm object-cover"
                  priority
                />
              </div>
              <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                <h1 className="text-4xl font-bold tracking-tight">
                  {SiteData.author.name}
                </h1>
                <p className="text-foreground/90 font-semibold">
                  {SiteData.author.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <IconMapPin className="size-4" aria-hidden="true" />
                    {SiteData.author.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
          </div>
        </CornerFrame>
        <CornerFrame>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                About me
              </h2>
              {SiteData.about.description.map((paragraph, index) => (
                <p key={index} className="text-foreground/90 font-semibold">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border">
              <Image
                src="https://placehold.co/600x600/EEE/31343C"
                alt="Working at a desk"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </CornerFrame>
        <CornerFrame className="min-h-100">
          <div className="flex flex-col gap-20">
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Let&apos;s build something great
                </h2>
                <p className="text-foreground/90 font-semibold">
                  I&lsquo;m open to full-time roles and select freelance
                  projects.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href={`mailto:${SiteData.author.contactInfo.mail}`} aria-label="Email">
                  <Button className="gap-2 dark:text-primary dark:bg-foreground">
                    <IconBrandGmail className="size-4" aria-hidden="true" />
                    Email me
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
          </div>
        </CornerFrame>
      </div>
    </>
  );
}
