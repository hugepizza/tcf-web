/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Logout from "./Logout";
import NavItem from "./NavItem";
import { Gift, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";

async function HeaderServer() {
  const session = await getServerSession(authConfig);
  const authed = session ? true : false;
  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto border-b bg-gray-100 py-2 pl-2 pr-4 md:pl-3.5 md:pr-5">
      <div className="w-[15%] flex items-center justify-start">
        <Link className="" href={"/"}>
          <img
            src="/ai-logo.png"
            alt="TCF"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-row space-x-[10px] h-full items-center justify-start flex-grow">
        <NavItem
          text="练习题"
          path="/resources/listening/by-suit"
          active={true}
        />
        <NavItem text="备考攻略" path="/blog" active={true} />
      </div>
      <div className="hidden sm:flex flex-row space-x-2 h-8 items-center  sm:px-2">
        {authed ? (
          <>
            <NavItem text="做题记录" path="/history" active={false} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-center w-9 h-9 rounded-full text-sm bg-[#F9FAFB] border-2 border-[#FFFFFF] ring-4 ring-primary p-0 overflow-hidden"
                >
                  <Image
                    src="/Avatar.webp"
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[220px] origin-top-right rounded-lg bg-white p-1.5 shadow-sm mr-2 mt-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="/user/profile"
                    className="flex h-9 w-full items-center justify-between rounded-md px-2 text-sm font-normal text-gray-900 hover:bg-gray-300"
                  >
                    账号详情
                    <User className="w-4 h-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/redeem"
                    className="flex h-9 w-full items-center justify-between rounded-md px-2 text-sm font-normal text-gray-900 hover:bg-gray-300"
                  >
                    激活套餐
                    <Gift className="w-4 h-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link href={"/auth/login"}>
            <Button variant="outline" className="rounded-lg">
              登录
            </Button>
          </Link>
        )}
      </div>
      <Mobile />
    </div>
  );
}

async function Mobile() {
  const session = await getServerSession(authConfig);
  const authed = session ? true : false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {authed ? (
          <>
            {" "}
            <DropdownMenuItem>
              <Link
                href={"/user/profile"}
                className="w-full flex h-9 cursor-pointer items-center justify-between rounded-md px-2 text-sm text-gray-900 outline-none hover:bg-gray-300"
              >
                <span>账号详情</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.4472 12.7764L12.8944 13.6708L12.4472 12.7764ZM11.5528 12.7764L11.1056 13.6708L11.5528 12.7764ZM20 6V18H22V6H20ZM20 18H4.00002V20H20V18ZM4.00002 18V6H2.00002V18H4.00002ZM4.00002 6H20V4H4.00002V6Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link
              href={"/auth/login"}
              className="flex h-9 cursor-pointer items-center justify-between rounded-md px-2 text-sm font-normal text-gray-900 outline-none hover:bg-gray-300"
            >
              Log in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderServer;
