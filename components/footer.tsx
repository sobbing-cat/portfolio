import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import { SocialLinkIcon } from "./social-link-icon";

export default function Footer() {
  return (
    <footer className="mb-8">
      <div className="relative bg-muted dark:bg-secondary rounded-[8px] border border-border h-60 mb-4 p-2 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-muted-foreground/5 dark:from-muted-foreground/15 to-transparent" />
        <div className="absolute bottom-0 right-0 max-w-xs max-h-16 overflow-hidden transition-all duration-400 ease-in-out hover:max-h-48 z-20 p-2 group">
          <div className="flex flex-wrap gap-2 p-2 justify-end transition-all ease-in-out group-hover:bg-secondary rounded-lg group-hover:border dark:group-hover:bg-muted border-border group-hover:shadow-lg">
            <SocialLinkIcon link={"https://www.sobbingcat.com/"} />
            <SocialLinkIcon link={"https://www.github.com/sobbing-cat"} />
            <SocialLinkIcon link={"https://www.twitch.tv/notsobbingcat"} />
            <SocialLinkIcon link={"https://www.youtube.com/@sobbing-cat"} />
          </div>
        </div>
        {/* Footer content goes here */}
      </div>
      <div className="text-center text-sm text-muted-foreground">
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
