"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TransitionPanel } from "@/components/core/transition-panel";
import { MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";

export function TabsTransitionPanel() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ITEMS = [
    {
      title: "小红书",
      qrCode: "/xiaohongshu.png",
      hint: "428333469",
    },
  ];

  const DefaultContent = () => (
    <div
      className="w-full flex justify-start items-start py-4"
      style={{ height: "272px" }}
    >
      {" "}
      {/* 匹配二维码模块高度 */}
      <div className="max-w-lg px-4 space-y-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                清晰描述您的问题
              </p>
              <p className="text-xs text-gray-600">建议提问时使用详细的描述</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">提供必要信息</p>
              <p className="text-xs text-gray-600">
                建议提供出现问题的截图以及账号，以便我们更好地理解您的问题
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TabContent = ({ item }: { item: (typeof ITEMS)[number] }) => {
    const bgColor = item.title === "微信" ? "bg-green-500" : "bg-red-500";
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "272px" }}
      >
        {" "}
        {/* 显式设置高度 */}
        <div className="p-2 text-center">
          <div>
            <p
              className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-md ${bgColor} mb-1`}
            >
              {item.title}
            </p>
            <p className="text-sm text-gray-600">{item.hint}</p>
          </div>

          <div className="relative w-48 h-48 mx-auto">
            <Image
              src={item.qrCode}
              alt={`${item.title}二维码`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-[calc(100%-1rem)] mx-auto mt-2 text-sm bg-[#FCFCFC] border border-[#E0E0E085] rounded-lg filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {/* 标题栏 */}
      <div className="p-2 flex items-center">
        <MessageCircle className="w-4 h-4 mr-1 text-[#8c8c8c85]" />
        <h2 className="font-normal text-sm text-[#8c8c8c]">联系我们</h2>
      </div>

      <div className="bg-white rounded-b-lg rounded-t-lg border-y border-[#E0E0E085]">
        {/* 标签页按钮 */}
        <div className="px-2 pt-2 flex space-x-2">
          {ITEMS.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                activeIndex === index
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-150 dark:bg-zinc-700 dark:text-zinc-400"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="overflow-hidden">
          {activeIndex === null ? (
            <DefaultContent />
          ) : (
            <TransitionPanel
              activeIndex={activeIndex}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              variants={{
                enter: { opacity: 0, x: 20, filter: "blur(2px)" },
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: { opacity: 0, x: -20, filter: "blur(2px)" },
              }}
            >
              {ITEMS.map((item, index) => (
                <TabContent key={index} item={item} />
              ))}
            </TransitionPanel>
          )}
        </div>
      </div>
      <div className="p-2 flex items-center border-b border-[#E0E0E085]">
        <h2 className="font-normal text-xs text-[#8c8c8c]">
          建议联系小红书客服
        </h2>
      </div>
    </div>
  );
}

export default TabsTransitionPanel;
