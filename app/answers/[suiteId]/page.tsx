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
      <div className="mx-auto w-full relative max-w-[1200px] gap-8 overflow-clip rounded-xl py-6 md:py-20 px-2 md:px-0">
        <div className="flex flex-col pb-3.5 items-center text-center">
          <div>
            <span className="my-3 flex items-center justify-center mb-4">
              <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
                <p className="text-xs text-[#242424]">答案列表</p>
              </span>
            </span>
          </div>
          <div className="text-[32px] lg:text-5xl font-medium pb-3">
            {answers.name}
          </div>
          <p className="max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
            查看所有题目和答案
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-4 auto-rows-fr">
          {answers.answers.map((answer, index) => (
            <Line key={index} {...answer} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AnswerPage;
