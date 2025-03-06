"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, HeadphoneOff, Headphones, Home } from "lucide-react";
import Link from "next/link";

function Side() {
  return (
    <div className="sm:w-1/6 hidden sm:flex flex-col p-2  gap-2 w-0 border-r-[1px] border-[#F2F2F2]">
      <Link href="/" className="">
        <Button
          variant="outline"
          className="w-full border-[#FF2442] text-[#FF2442] hover:bg-[#FF2442] hover:text-white"
          onClick={() => {}}
        >
          <Home className="w-4 h-4" />
          首页
        </Button>
      </Link>
      <div className="h-[1px] w-full bg-[#F2F2F2]" />
      <Link
        href="/resources/listening/by-suit"
        className="font-semibold text-lg w-full py-2 flex items-center justify-center gap-2"
      >
        <Headphones className="w-4 h-4 stroke-[3px]" />
        听力
      </Link>
      <div className="h-[1px] w-full bg-[#F2F2F2]" />
      <Link
        href="/resources/reading/by-suit"
        className="font-semibold text-lg w-full py-2 flex items-center justify-center gap-2"
      >
        <BookOpen className="w-4 h-4 stroke-[3px]" />
        阅读
      </Link>
      <div className="h-[1px] w-full bg-[#F2F2F2]" />
    </div>
  );
}

export default Side;
