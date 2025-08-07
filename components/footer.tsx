"use client";

import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import { SocialLinkIcon } from "./social-link-icon";
import { useState, useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ info }: { info: any }) {
  const [isWrapped, setIsWrapped] = useState(false);
  const socialsContainerRef = useRef<HTMLDivElement>(null);

  console.log(info);

  useEffect(() => {
    const checkWrap = () => {
      const container = socialsContainerRef.current;
      if (container && container.children.length > 0) {
        const containerHeight = container.offsetHeight;
        const firstChildHeight = (container.children[0] as HTMLElement)
          .offsetHeight;
        const hasWrap = containerHeight > firstChildHeight * 1.5;
        if (hasWrap !== isWrapped) {
          setIsWrapped(hasWrap);
        }
      }
    };

    checkWrap();
    window.addEventListener("resize", checkWrap);

    return () => {
      window.removeEventListener("resize", checkWrap);
    };
  }, [isWrapped]);

  return (
    <footer className="mb-8">
      <div className="relative bg-muted dark:bg-secondary rounded-[8px] border border-border h-60 mb-8 p-2 max-w-6xl mx-auto overflow-hidden z-20">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-muted-foreground/5 dark:from-muted-foreground/15 to-transparent" />
        <div
          className={`absolute bottom-6 right-6 max-w-xs max-h-16 overflow-hidden transition-all duration-400 ease-in-out z-20 p-2 ${
            isWrapped ? "group hover:max-h-48" : ""
          }`}
        >
          <div
            ref={socialsContainerRef}
            className="flex flex-wrap h-full content-end gap-2 p-2 justify-end transition-all ease-in-out group-hover:bg-secondary rounded-lg group-hover:border dark:group-hover:bg-muted border-border group-hover:shadow-lg"
          >
            {info.links.map((link: string, index: number) => (
              <SocialLinkIcon key={index} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start p-8 text-secondary-foreground h-full">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold mb-2">{info.name}</h3>
              <p className="text-muted-foreground max-w-xs">
                {info.description}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} {info.name}. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-8 text-center text-sm text-muted-foreground">
        <span>
          Made with <IconHeartFilled className="h-4 w-4 inline text-red-400" />{" "}
          by{" "}
          <Link
            className="text-muted-foreground underline"
            target="_blank"
            href={"https://github.com/sobbing-cat"}
          >
            Sobbing_Cat
          </Link>
        </span>
      </div>
    </footer>
  );
}
