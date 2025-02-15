"use client";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
// Initialize Amplify once during app startup
Amplify.configure(config, { ssr: true });

// Generate API client
export const client = generateClient<Schema>();

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Authenticator>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Authenticator>
  );
}
