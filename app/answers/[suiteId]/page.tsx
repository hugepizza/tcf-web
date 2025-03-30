import HeaderServer from "@/components/Header/Universal";
import { assetUrl } from "@/lib/api";
import { fetchQuery } from "@/lib/server-fetch";
import { notFound } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import Line from "../Line";

async function AnswerPage({
  params,
}: {
  params: Promise<{ suiteId: string }>;
}) {
  const { suiteId } = await params;

  const { data: answers } = await fetchQuery<{
    name: string;
    answers: {
      name: string;
      subject: string;
      question: string;
      answer: string;
      answerKey: string;
    }[];
  }>({
    path: `/resources/by-suite/${suiteId}/answers`,
  });
  if (!answers) {
    notFound();
  }

  return (
    <>
      <HeaderServer />
      <div className="MainTitle isolate pt-0 pb-4 lg:pt-12 lg:pb-12 xl:pt-16 xl:pb-16 mx-auto w-full px-2 md:px-4 xl:px-0 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] overflow-hidden lg:min-h-0">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 items-center">
          {/* 左侧内容 - 60% */}
          <div className="flex flex-col items-center lg:items-start lg:col-span-3 relative z-10 mt-32 lg:mt-0">
            <div>
              <span className="my-3 inline-flex mb-4">
                <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
                  <p className="text-xs text-[#242424]">答案列表</p>
                </span>
              </span>
            </div>
            <h1 className="text-balance text-center lg:text-left text-4.5xl text-gray-950 sm:text-5.5xl md:text-6xl">
              {answers.name}
            </h1>
            <p className="mt-4 text-lg text-gray-600 text-center lg:text-left">
              查看所有题目和答案
            </p>

            <div className="mt-8 flex gap-x-4">
              {/* 添加按钮组件 */}
            </div>
          </div>

          {/* 右侧图片 - 40% */}
          <div className="lg:col-span-3 absolute lg:right-0 lg:w-[45%] mt-12 lg:mt-8 lg:-mt-12">
            <div className="-mt-40 flex justify-center lg:mt-0">
              <img
                alt=""
                width="1266"
                height="1020"
                decoding="async"
                className="pointer-events-none w-full max-w-none select-none"
                src="/tcfgo.webp"
                style={{ color: 'transparent' }}
              />
              <div className="absolute -bottom-12 sm:bottom-8 xl:bottom-20 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-[#f3f5f9]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 auto-rows-fr relative isolate pt-2 lg:pt-4 xl:pt-16 mx-auto w-full px-2 md:px-0 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] overflow-hidden min-h-[360px] lg:min-h-0 md:px-4 xl:px-0">
          {answers.answers.map((answer, index) => (
            <Line key={index} {...answer} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AnswerPage;
