"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SubMenuItem = {
  sort: number;
  link: string;
  title: string;
};

type NavItemProps = {
  text: string;
  active: boolean;
  path?: string;
  subMenu?: SubMenuItem[];
};

function NavItem({ text, path, active, subMenu }: NavItemProps) {
  const pathname = usePathname();
  const isActive = active || (path ? pathname === path : false);
  const [showDropdown, setShowDropdown] = useState(false);

  const sortedSubMenu = subMenu?.sort((a, b) => a.sort - b.sort);

  return (
    <div
      className="px-4 h-full items-center sm:flex hidden py-2 box-border group relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {path ? (
        <Link
          href={path}
          className={twMerge(
            "h-full flex items-center relative justify-center",
            isActive
              ? "font-semibold"
              : "hover:font-semibold transition-all duration-200"
          )}
        >
          {text}
          <div
            className={twMerge(
              "absolute bottom-0 w-0 h-[4px] rounded-full bg-primary justify-center transition-all duration-200",
              isActive ? "w-1/2" : "group-hover:w-1/2"
            )}
          />
        </Link>
      ) : (
        <div className="h-full flex items-center relative justify-center hover:font-semibold transition-all duration-200">
          {text}
          <div
            className={twMerge(
              "absolute bottom-0 w-0 h-[4px] rounded-full bg-primary justify-center transition-all duration-200",
              "group-hover:w-1/2"
            )}
          />
        </div>
      )}

      {/* Dropdown Menu */}
      {subMenu && (
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-800 z-50"
            >
              <div className="py-1">
                {sortedSubMenu?.map((item) => (
                  <Link
                    key={item.sort}
                    href={item.link}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default NavItem;
