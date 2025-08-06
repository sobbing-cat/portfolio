import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="mb-8">
      <div className="relative bg-muted rounded-[8px] border border-border h-60 mb-4 p-2 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-muted-foreground/5 to-transparent" />
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <span>
          Made with <IconHeartFilled className="h-4 w-4 inline text-red-400" /> by{" "}
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

