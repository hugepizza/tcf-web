import Link from "next/link";
import Image from "next/image";

function Unauthorized() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary mb-4">
            此页面需要登录后访问
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            如果你没有账号，可以联系微信客服 <span className="font-bold text-[#07C160]">CELPIPMaster</span> 购买
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/login"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go Login
            </Link>
            
          </div>
          <div className="mt-8">
              <p className="text-sm text-gray-500 mb-2">扫描下方二维码添加微信客服</p>
              <Image
                src="/wechat.jpg"
                alt="微信客服二维码"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>

        </div>
      </main>
    </>
  );
}

export default Unauthorized;
