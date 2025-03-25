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
      <div className="grow overflow-y-scroll px-4 sm:px-16 py-2 gap-4">
        <div className="h-8" />
        <div className="text-[24px] font-medium text-black-800">
          {/* 次要文本 */}
          {answers.name}{" "}
        </div>
        <div className="h-4" />
        <div className="bg-black-100 rounded-lg border border-black-300 overflow-hidden">
          <div className="bg-[#f5f7fa] items-center grid grid-cols-2 font-normal text-black-600 py-1">
            {" "}
            {/* 高对比背景色用于文本 */}
            <div className="px-6 py-2 ">题目</div>
            <div className="px-6 py-2">答案</div>
          </div>
          <div className="bg-white rounded-lg">
            {answers.answers.map((answer, index) => (
              <Line key={index} {...answer} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnswerPage;
