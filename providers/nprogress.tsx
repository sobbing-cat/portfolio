"use client";

import { ProgressProvider } from "@bprogress/next/app";

const NProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="var(--color-foreground)"
      options={{ showSpinner: false }}
      disableSameURL
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default NProgressProvider;
