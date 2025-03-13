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
      className="px-1 h-full items-center sm:flex hidden relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {path ? (
        <button
          onClick={() => window.location.href = path}
          className={twMerge(
            "px-4 py-2 text-sm transition-colors duration-300 rounded-lg",
            isActive
              ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
          )}
        >
          {text}
        </button>
      ) : (
        <button
          className={twMerge(
            "px-4 py-2 text-sm transition-colors duration-300 rounded-lg",
            isActive
              ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
          )}
        >
          {text}
        </button>
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
                    className={twMerge(
                      "block px-4 py-2 text-sm transition-colors duration-200",
                      pathname === item.link
                        ? "text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-700/50"
                    )}
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