// layout.tsx (服务端组件)
import type { Metadata } from "next";

import { SettingsNav } from "./profile/SettingsNav";
import UniversalHeader from "@/components/Header/Universal";

export const metadata: Metadata = {
  title: "Settings | CELPIP Master",
  description: "思培移民类(听说读写)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <UniversalHeader />
      <div className="flex flex-row w-full">
        <SettingsNav>{children}</SettingsNav>
      </div>
    </div>
  );
}
