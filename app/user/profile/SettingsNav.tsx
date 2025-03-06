'use client';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User, Monitor } from "lucide-react";
import { TransitionPanel } from '@/components/core/transition-panel';
import { TextMorph } from '@/components/core/text-morph';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/core/LoadingSpinner';

const MENU_ITEMS = [
  {
    icon: User,
    title: "用户信息",
    href: "/user/profile",
    pageTitle: "用户信息"
  },
  {
    icon: Monitor,
    title: "会话记录",
    href: "/user/sessions",
    pageTitle: "会话记录"
  }
];

export function SettingsNav({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(() => {
    return MENU_ITEMS.findIndex(item => item.href === pathname) || 0;
  });
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (index: number) => {
    startTransition(() => {
      setActiveIndex(index);
      router.push(MENU_ITEMS[index].href);
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto gap-6 lg:gap-8 px-4 sm:px-6 md:px-8">
      <div className="w-full md:w-56 flex-shrink-0">
        <nav className="space-y-1 py-6 md:sticky md:top-6">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeIndex === index
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.title}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 min-w-0">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.15, ease: 'linear' }}
          variants={{
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 }
          }}
        >
          {MENU_ITEMS.map((item, index) => (
            <div key={index} className="py-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                <TextMorph>{item.pageTitle}</TextMorph>
              </h2>
              <div className="relative">
                <div className={`transition-all duration-200 ${
                  isPending ? 'opacity-50 blur-sm' : 'opacity-100 blur-none'
                }`}>
                  <Suspense 
                    fallback={
                      <div className="flex items-center justify-center min-h-[300px]">
                        <LoadingSpinner />
                      </div>
                    }
                  >
                    {children}
                  </Suspense>
                </div>
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}