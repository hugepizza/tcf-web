"use client";

import { assetUrl } from "@/lib/api";

function Line({
  question,
  answerKey,
  answer,
  index,
}: {
  index: number;
  question: string;
  answerKey: string;
  answer: string;
}) {
  const isAudio = (str: string) => {
    const audioExtensions = [".mp3", ".wav", ".m4a", "ogg"];
    return audioExtensions.some((ext) => str.endsWith(ext));
  };

  const convertAnswerKeyToLetter = (answerKey: string) => {
    return String.fromCharCode(65 + parseInt(answerKey, 10));
  };

  const answerKeyLetter = convertAnswerKeyToLetter(answerKey);
  return (
    <div className="grid grid-cols-2 border-t-[1px] border-black-300 min-h-12 items-center text-black-900">
      {" "}
      {/* 默认边框 + 主要文本 */}
      <div className="px-6 py-3 flex flex-row items-center">
        <span className="text-black-900 font-medium">{`Q${index + 1}`}</span>{" "}
        {/* 主要文本 */}
        <span className="text-black-600 text-sm ml-2">
          {" "}
          {/* 高对比背景色用于次要文本 */}
          {isAudio(question) ? (
            <audio
              src={assetUrl(question)}
              controls
              controlsList="nodownload"
              preload="none"
            />
          ) : (
            question
          )}
        </span>
      </div>
      <div className="px-6 py-3">{`${answerKeyLetter} ${
        answer ? `: ${answer}` : ""
      }`}</div>
    </div>
  );
}

export default Line;
