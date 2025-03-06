"use client";

import { ArrowLeft, ArrowLeftCircleIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SimpleBack({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="flex items-center p-4 border-b w-full relative">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {icon}
        <h1 className="text-center">{title}</h1>
      </div>
    </header>
  );
}
