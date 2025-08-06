"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ExternalLinkIcon } from 'lucide-react' // Import the icon

export function ExternalLinkInterceptor() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [targetHref, setTargetHref] = useState("")
  const [portalMounted, setPortalMounted] = useState(false)

  useEffect(() => {
    setPortalMounted(true); // Indicate that the component is mounted on the client

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          try {
            const targetUrl = new URL(href, window.location.origin);

            if (targetUrl.hostname !== window.location.hostname) {
              event.preventDefault();
              setTargetHref(href);
              setShowConfirm(true);
            }
          } catch (error) {
            console.error("Invalid URL detected:", href, error);
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleConfirm = () => {
    if (targetHref) {
      window.open(targetHref, '_blank');
    }
  };

  if (!portalMounted) {
    return null;
  }

  return createPortal(
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
      <AlertDialogContent className="bg-card text-card-foreground border-border shadow-lg rounded-lg p-6 max-w-md w-full">
        <AlertDialogHeader className="flex flex-row items-center gap-3 mb-4">
          <ExternalLinkIcon className="h-6 w-6 text-muted-foreground" />
          <AlertDialogTitle className="text-xl font-semibold">Confirm External Navigation</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-muted-foreground text-base mb-6">
          You are about to navigate to an external page.
          <span className="bg-muted block p-3 rounded-md border border-border mt-4 break-all text-sm font-mono text-foreground">
            {targetHref}
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
          <AlertDialogCancel className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="w-full sm:w-auto bg-primary dark:bg-foreground text-primary-foreground dark:text-primary hover:bg-primary/90">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
    document.body
  );
}
