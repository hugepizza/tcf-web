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
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white border border-gray-100">
      <div className="p-4">
        <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">
          {`Q${String(index + 1).padStart(2, '0')}`}
        </span>
        <div className="text-md mb-3 font-semibold">
          {isAudio(question) ? (
            <audio  
              src={assetUrl(question)}
              controls
              controlsList="nodownload"
              preload="none"
              className="w-full mt-2"
            />
          ) : (
            question
          )}
        </div>
        <div className="mt-4 text-sm text-gray-800">
          答案: 
          <span className="font-medium text-black-900">{answerKeyLetter}</span>
          {answer && <span className="ml-2">{answer}</span>}
        </div>
      </div>
    </div>
  );
}

export default Line;
