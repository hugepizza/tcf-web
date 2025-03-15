import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

function Unauthorized() {
  // 创建交替的红灰加号图案，使用更柔和的粉红色
  const crossPattern = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-opacity='0.4'%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23ffd5d5' transform='translate(0,0)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23f0f0f0' transform='translate(60,60)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23ffd5d5' transform='translate(120,0)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23f0f0f0' transform='translate(0,60)'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center">
      {/* 背景图案 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: crossPattern,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center relative">
          {/* 返回首页链接 - 调整为左对齐 */}
          <div className="absolute left-8 top-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回首页
            </Link>
          </div>

          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-8">
            <img
              src="/ai-logo.png"
              alt="TCF Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Lock icon */}
          <div className="flex justify-center">
            <Lock className="w-40 h-40 text-gray-300 stroke-[1.5]" />
          </div>

          {/* Unauthorized message */}
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            没有权限
          </h1>
          <p className="mt-2 text-gray-600">需要激活套餐才能使用此功能</p>

          {/* Action button and text */}
          <div className="mt-10 flex flex-col items-center space-y-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/auth/login">登录</Link>
            </Button>
            {/* <div className="flex gap-4 w-full">
              <Button
                asChild
                className="flex-1 bg-[#FF4400] hover:bg-[#FF4400]/90"
              >
                <Link
                  href="https://item.taobao.com/item.htm?id=863668119491"
                  target="_blank"
                >
                  购买套餐
                </Link>
              </Button>
              <Button
                asChild
                className="flex-1 bg-[#FF4400] hover:bg-[#FF4400]/90"
              >
                <Link href="https://shop250899241.taobao.com/" target="_blank">
                  进入店铺
                </Link>
              </Button>
            </div> */}
            {/* <p className="text-sm text-gray-400">
              如果没有账号，请点击&ldquo;购买套餐&rdquo;前往淘宝商店
            </p> */}
          </div>

          {/* Footer */}
          <div className="mt-12 text-sm text-gray-500">
            © {new Date().getFullYear()} TCF699
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
