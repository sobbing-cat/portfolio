import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-muted rounded-[8px] border border-border p-8 text-center shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          {
            "Sorry, the page you're looking for doesn't exist or has been moved."
          }
        </p>
        <Link href="/" passHref>
          <Button variant="default">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
