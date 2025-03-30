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
      <div className="relative isolate lg:pt-16 mx-auto w-full px-2 md:px-0 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] overflow-hidden min-h-[360px] lg:min-h-0">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 items-center">
          {/* 左侧内容 - 60% */}
          <div className="flex flex-col lg:col-span-3 relative z-10">
            <div>
              <span className="my-3 inline-flex mb-4">
                <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
                  <p className="text-xs text-[#242424]">答案列表</p>
                </span>
              </span>
            </div>
            <h1 className="text-balance text-4.5xl text-gray-950 sm:text-5.5xl md:text-6xl">
              {answers.name}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              查看所有题目和答案
            </p>

            <div className="mt-8 flex gap-x-4">
              {/* 添加按钮组件 */}
            </div>
          </div>

          {/* 右侧图片 - 40% */}
          <div className="relative lg:col-span-3 lg:absolute lg:right-0 lg:w-[45%] mt-4 lg:mt-8 lg:-mt-12">
            <img
              alt=""
              width="1266"
              height="1020"
              decoding="async"
              className="pointer-events-none w-full max-w-none select-none"
              src="/tcfgo.webp"
              style={{ color: 'transparent' }}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#f3f5f9]"></div>
      </div>
      <div className="mt-16 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-4 auto-rows-fr relative isolate lg:pt-16 mx-auto w-full px-2 md:px-0 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] overflow-hidden min-h-[360px] lg:min-h-0">
        {answers.answers.map((answer, index) => (
          <Line key={index} {...answer} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AnswerPage;
