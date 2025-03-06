"use client";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
function Profile() {
  return (
    <DropdownMenuItem
      asChild
      className="flex items-center gap-2 cursor-pointer"
    >
      <Link href="/user/profile" className="flex items-center gap-2">
        <User className="w-4 h-4" />
        Profile
      </Link>
    </DropdownMenuItem>
  );
}

function Logout() {
  const { push } = useRouter();
  return (
    <DropdownMenuItem
      className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
      onClick={() => {
        signOut();
        push("/auth/login");
      }}
    >
      <LogOut className="w-4 h-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}

export { Profile, Logout };
