import NavItem from "@/components/Header/Universal/NavItem";
import { Subject } from "@/shared/enum";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft, BookOpen, Headphones } from "lucide-react";
import Link from "next/link";

async function ResourcesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subject: string; by: string }>;
}) {
  const { subject, by } = await params;

  return (
    <div className="gap-0 sm:gap-3 h-full flex flex-col">
      <div className="border-b-[1px] border-[#F2F2F2] px-3 py-4 flex flex-row items-center justify-start bg-white">
        <div className="h-12 flex flex-row items-center justify-start">
          <div className="flex flex-row items-center justify-center gap-2 text-lg font-semibold">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignLeft className="w-6 h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="sm:hidden">
                <DropdownMenuItem asChild>
                  <Link
                    className="text-base font-medium"
                    href={`/resources/listening/${by}`}
                  >
                    <Headphones />
                    听力
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className="text-base font-medium"
                    href={`/resources/reading/${by}`}
                  >
                    <BookOpen />
                    阅读
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {subject === Subject.READING.toLocaleLowerCase() ? "阅读" : "听力"}
          </div>
          <div className="w-8" />
          <NavItem text="按套题分组" path="/resources/by-suit" active={true} />
        </div>
      </div>
      {children}
    </div>
  );
}

export default ResourcesLayout;
