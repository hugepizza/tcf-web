"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ModalMasterProps {
  id: string;
  children: React.ReactNode;
}

function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 w-full h-full overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            #4C7BFD,    /* 较亮的蓝色 */
            #3861FB     /* 主色调蓝色 */
          )`,
        }}
      />
    </div>
  );
}

export function ModalMaster({ id, children }: ModalMasterProps) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box p-0 overflow-hidden">
        {/* 添加内层容器来处理圆角 */}
        <div>
          {/* 头部区域 */}
          <div className="relative h-48 w-full overflow-hidden bg-transparent">
            <BackgroundGradient className="opacity-100" />
            <Image
              src="/modal-bg.webp"
              alt="CELPIPMaster"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover object-top opacity-30"
            />
            <BackgroundGradient className="opacity-100 mix-blend-soft-light" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative h-16 w-48 bg-white rounded-lg">
                <Image
                  src="/celpip-master-text.png"
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
          
          {/* 内容区域 */}
          <div className="bg-white relative z-10 -mt-8 rounded-t-xl">
            {children}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ModalMaster;