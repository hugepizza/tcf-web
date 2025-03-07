import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://utoronto.ai"),
  title: "TSF",
  description: "TSF",
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head></head>
      <body className="antialiased">
        <Toaster position="top-center" />

        {children}
        <ShadcnToaster />
      </body>
    </html>
  );
}
