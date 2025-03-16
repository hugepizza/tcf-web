"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}

export default QueryClientProvider;
