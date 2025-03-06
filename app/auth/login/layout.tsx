import type { Metadata } from "next";

import authConfig from "@/auth.config";
import { getServerSession } from "next-auth";
import { ClientSessionProvider } from "@/app/context/Session";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <div>
      <ClientSessionProvider session={session}>
        {children}
      </ClientSessionProvider>
      <Toaster />
    </div>
  );
}
