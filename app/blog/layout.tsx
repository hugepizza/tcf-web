import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import HeaderServer from "@/components/Header/Universal";

export const metadata: Metadata = {
  title: "TCF备考攻略",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderServer />
      <main className="flex min-h-screen flex-row">
        <div className="grow flex flex-col pb-16 md:pb-0">{children}</div>
      </main>
    </>
  );
}
