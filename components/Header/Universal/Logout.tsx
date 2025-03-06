"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function Logout() {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signOut();
      }}
      className="flex h-9 w-full items-center justify-between rounded-md px-2 text-sm font-normal text-gray-900 hover:bg-gray-300"
    >
      <span>退出登录</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M11.25 20H5C4.44772 20 4 19.5523 4 19L4 5C4 4.44772 4.44772 4 5 4L11.25 4M20 12L8.75 12M20 12L15.5 16.5M20 12L15.5 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}

export default Logout;
