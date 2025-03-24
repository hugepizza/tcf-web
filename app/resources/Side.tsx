import { Button } from "@/components/ui/button";
import { BookOpen, HeadphoneOff, Headphones, Home } from "lucide-react";
import Link from "next/link";
import Announcement from "../components/CTA/Announcement";
import Image from 'next/image'

function Side() {
  return (
    <div className="sm:w-1/6 hidden sm:flex flex-col gap-2 w-0 border-r-[1px] border-[#F2F2F2]">
      <div className="h-[1px] w-full bg-[#F2F2F2]" />
      <div className="flex flex-col h-full gap-3">
        <Link href="/" className="w-full">
          <div className="font-medium text-base w-full px-4 py-2 flex items-center gap-2 text-gray-600 transition-all cursor-pointer  hover:text-gray-800 hover:translate-x-1" style={{ boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)' }}>
            <Image
              src="/side/home.png"
              alt="home"
              width={24}
              height={24}
            />
            首页
          </div>
        </Link>
        <Link
          href="/resources/listening/by-suit"
          className="font-medium text-base w-full px-4 py-2 flex items-center gap-2 text-gray-600 transition-all cursor-pointer  hover:text-gray-800 hover:translate-x-1"
        >
          <Image
            src="/side/CO.png"
            alt="CO"
            width={24}
            height={24}
          />
          听力
        </Link>
        <Link
          href="/resources/reading/by-suit"
          className="font-medium text-base w-full px-4 py-2 flex items-center gap-2 text-gray-600 transition-all cursor-pointer backdrop-blur-[20px] hover:text-gray-800 hover:translate-x-1"
        >
          <Image
            src="/side/E.png"
            alt="reading"
            width={24}
            height={24}
          />
          阅读
        </Link>
      </div>
      <div className="h-[1px] w-full bg-[#F2F2F2]" />
      <Announcement />
      <div className="mt-auto">
        <header
          className="relative flex flex-col items-center px-2 h-32"
          style={{
            background: `
              linear-gradient(to top, #dbf9ff, rgba(219, 249, 255, 0) 60%, rgba(219, 249, 255, 0)),
              url('/side/side-bg.svg')
            `,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            transform: 'scaleY(-1)'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600" style={{ transform: 'scaleY(-1)' }}>
            <div className="font-medium">PRO套餐</div>
            <div className="text-sm">有效期至 2026年3月24日</div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Side;
