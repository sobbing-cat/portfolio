"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandShortcut,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  IconMenuDeep as Menu,
  IconSunFilled as Sun,
  IconMoonFilled as Moon,
  IconSearch as Search,
  IconHomeFilled as Home,
  IconArrowUp as ArrowUp,
} from "@tabler/icons-react";

const projects = [
  { id: "1", name: "E-commerce Platform", url: "/projects/ecommerce" },
  { id: "2", name: "Portfolio Website", url: "/projects/portfolio" },
  { id: "3", name: "Task Management App", url: "/projects/task-app" },
  { id: "4", name: "AI Chatbot Integration", url: "/projects/ai-chatbot" },
];

const blogPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    url: "/blog/nextjs-getting-started",
  },
  { id: "2", title: "Understanding Tailwind CSS", url: "/blog/tailwind-css" },
  {
    id: "3",
    title: "State Management in React",
    url: "/blog/react-state-management",
  },
  { id: "4", title: "Deploying to Vercel", url: "/blog/deploying-vercel" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [openCommandPalette, setOpenCommandPalette] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else if (window.scrollY < lastScrollY) {
        setIsVisible(true);
      }
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else if (window.scrollY <= 200) {
        setShowScrollToTop(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandPalette((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const router = useRouter();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <header
      className={`
      bg-background h-18 fixed left-0 right-0 z-50 mx-auto max-w-6xl rounded-b-[8px] top-0
      transition-transform duration-300 ease-in-out
      ${isVisible ? "translate-y-0" : "-translate-y-full"}
    `}
    >
      <div
        className={`bg-muted rounded-[8px] border border-border h-14 mt-4 p-2 flex justify-between items-center gap-4 transition-all duration-300 ease-in-out ${
          menuOpen ? "rounded-br-[0px]" : ""
        } ${showScrollToTop ? "rounded-bl-[0px]" : ""}`}
      >
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Button variant="outline" size="icon">
              <Home className="h-[1.4rem] w-[1.4rem]" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <Button
            onClick={() => setOpenCommandPalette(true)}
            variant="outline"
            className="w-full max-w-md justify-start text-muted-foreground bg-transparent"
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search projects, blog posts...</span>
            <CommandShortcut>Ctrl+K</CommandShortcut>
            <span className="sr-only">Open command palette</span>
          </Button>
          <CommandDialog
            open={openCommandPalette}
            onOpenChange={setOpenCommandPalette}
          >
            <CommandInput placeholder="Search projects, blog posts, or commands..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {/* Projects Group */}
              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => {
                      console.log(`Navigating to project: ${project.name}`);
                      setOpenCommandPalette(false);
                      router.push(project.url);
                    }}
                  >
                    <span>{project.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              {/* Blog Posts Group */}
              <CommandGroup heading="Blog Posts">
                {blogPosts.map((post) => (
                  <CommandItem
                    key={post.id}
                    onSelect={() => {
                      console.log(`Navigating to blog post: ${post.title}`);
                      setOpenCommandPalette(false);
                      router.push(post.url);
                    }}
                  >
                    <span>{post.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="General Commands">
                <CommandItem
                  onSelect={() => {
                    console.log("Opening Settings");
                    setOpenCommandPalette(false);
                    router.push("/settings");
                  }}
                >
                  <span>Open Settings</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    toggleTheme();
                    setOpenCommandPalette(false);
                  }}
                >
                  <span>Toggle Theme</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Sun className="h-[1.4rem] w-[1.4rem]" />
            ) : (
              <Moon className="h-[1.4rem] w-[1.4rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-[1.4rem] w-[1.4rem]" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
      <div className="flex justify-between h-10 relative -z-50">
        <div
          className={`absolute left-0 h-full w-fit bg-muted rounded-[8px] transition-all duration-300 ease-in-out border-b border-x border-border flex items-center justify-center ${
            showScrollToTop
              ? "rounded-t-[0px] top-0"
              : "rounded-tr-[0px] -top-10"
          }`}
        >
          <Button variant="ghost" className="gap-1 p-2 text-foreground" onClick={scrollToTop}>
            <ArrowUp className="h-5 w-5 mr-2" />
            Scroll to Top
          </Button>
        </div>
        <nav
          className={`absolute right-0 h-full transition-all duration-300 ease-in-out w-fit bg-muted rounded-[8px] border-b border-x border-border flex items-center justify-center gap-1 p-2 ${
            menuOpen ? "rounded-t-[0px] top-0" : "rounded-tl-[0px] -top-10"
          }`}
        >
          <Link href={"/"}>
            <Button variant="link" size="sm" className="text-foreground">
              Home
            </Button>
          </Link>
          <Link href={"/blog"}>
            <Button variant="link" size="sm" className="text-foreground">
              Blog
            </Button>
          </Link>
          <Link href={"/projects"}>
            <Button variant="link" size="sm" className="text-foreground">
              Projects
            </Button>
          </Link>
          <Link href={"/about-me"}>
            <Button variant="link" size="sm" className="text-foreground">
              About Me
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
