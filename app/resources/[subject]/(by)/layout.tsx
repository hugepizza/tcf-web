import NavItem from "@/components/Header/Universal/NavItem";
import { Subject } from "@/shared/enum";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft, BookOpen, Headphones, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Selector } from "@/app/resources/[subject]/(by)/by-suit/Selector";

async function ResourcesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subject: string; by: string }>;
}) {
  const { subject, by } = await params;

  return (
    <div className="gap-0 h-full flex flex-col">
      {by !== 'history' && (
        <div className="border-b-[1px] border-[#F2F2F2] px-3 h-16 sm:pr-10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Selector />
          </div>
          <NavItem
            text="按套题分组"
            path="/resources/listening/by-suit"
            active={true}
          />
        </div>
      )}
      {children}
    </div>
  );
}

export default ResourcesLayout;
