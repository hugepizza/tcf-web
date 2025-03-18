"use client";
import { AlignLeft } from "lucide-react";
import { Listening } from "@/components/icons/listening";
import { SparklesSoft } from "@/components/icons/sparkles-soft";

import headphone from "@/images/headphone.png";
import Image from "next/image";
import { Subject } from "@/shared/enum";

import { AudioPlayerWrapper } from "@/components/audio-player";
import { usePractice } from "./context";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { AudioPlayerWithSubtitles } from "@/components/audio-player-with-subtitles";
import { Practice } from "@/shared/schemas/practice";
function Main() {
  const {
    practice,
    clientSideCurrentQuestion,
    clientSideCurrentAnswer,
    setClientSideCurrentAnswer,
    clientSideAnswers,
    isSubmitted,
    isClientSideReadOnly,
  } = usePractice();
  const currentQuestion = practice.questions.find(
    (question) => question.id === clientSideCurrentQuestion
  );
  const currentQuestionIndex = practice.questions.findIndex(
    (question) => question.id === clientSideCurrentQuestion
  );
  if (!currentQuestion) {
    notFound();
  }
  console.log(
    clientSideAnswers.find((answer) => answer.questionId === currentQuestion.id)
  );
  return (
    <div className="flex w-full h-full flex-col lg:flex-row">
      <div className="flex flex-col flex-1">
        <div className="text-lg font-semibold flex items-center gap-2 px-3 py-4 bg-white">
          <AlignLeft className="w-4 h-4" />
          Question {currentQuestionIndex + 1} 难度：
          {currentQuestion.difficulty}（{currentQuestion.score}分）
        </div>
        <div className="grow flex flex-col">
          <div className="p-3 flex justify-center grow">
            <ListeningImageContent question={currentQuestion} />
            <ReadingImageContent question={currentQuestion} />
          </div>
          <div className="bg-white mx-2 rounded-md p-6 flex flex-col items-center gap-4">
            {/* 题干*/}
            {currentQuestion.stem && (
              <div className="font-semibold text-[#434343] text-lg">
                {currentQuestion.stem}
              </div>
            )}
            {/* 选项*/}
            <div className="w-full flex flex-col gap-2">
              {currentQuestion.options.map((option, index) => (
                <Option
                  key={index}
                  index={index}
                  content={option}
                  isSubmitted={isSubmitted}
                  userAnswer={
                    isSubmitted
                      ? clientSideAnswers.find(
                          (answer) => answer.questionId === currentQuestion.id
                        )?.answer ?? ""
                      : clientSideCurrentAnswer
                  }
                  answerKey={
                    clientSideAnswers.find(
                      (answer) => answer.questionId === currentQuestion.id
                    )?.answerKey ?? "x"
                  }
                  readOnly={isClientSideReadOnly}
                  setUserAnswer={setClientSideCurrentAnswer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:max-w-[400px] w-full lg:border-l">
        <div className="text-normal font-medium p-4 h-14 border-b border-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-[#FF2442] to-[#FF6F7F] flex items-center gap-2">
          <SparklesSoft className="w-6 h-6" />
          智能辅助
        </div>
        {currentQuestion.audio ? (
          <div className="bg-gray-50 rounded-lg p-1 m-2">
            <div className="text-sm h-8 font-medium text-gray-500 flex items-center gap-1 px-2">
              <Listening className="w-4 h-4" />
              听力音频
            </div>
            <AudioPlayerWithSubtitles
              audioUrl={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN}/${currentQuestion.audio}`}
              subtitleUrl={
                currentQuestion.caption
                  ? `${process.env.NEXT_PUBLIC_ASSETS_DOMAIN}/${currentQuestion.caption}`
                  : undefined
              }
            />
          </div>
        ) : (
          <div className="text-gray-400 text-sm text-center py-4"></div>
        )}
      </div>
    </div>
  );
}

function Option({
  index,
  isSubmitted,
  content,
  userAnswer,
  answerKey,
  readOnly,
  setUserAnswer,
}: {
  index: number;
  isSubmitted: boolean;
  content: string;
  userAnswer: string;
  answerKey: string;
  readOnly: boolean;
  setUserAnswer: (answer: string) => void;
}) {
  if (isSubmitted) {
    userAnswer = userAnswer ?? "";
  }
  const isClientSideCorrect = isSubmitted && answerKey === index.toString();
  const isClientSideWrong =
    isSubmitted && userAnswer !== answerKey && userAnswer === index.toString();
  console.log(
    index,
    userAnswer,
    answerKey,
    isClientSideCorrect,
    isClientSideWrong
  );

  return (
    <div
      key={index}
      className={cn(
        "w-full bg-[#FAFAFA] rounded-md px-3 py-2 flex gap-2 outline outline-[2px] outline-[#FAFAFA] cursor-pointer duration-150",
        !isSubmitted &&
          (userAnswer === index.toString()
            ? "bg-[#E5F7EA]  outline-[#18A058]"
            : "hover:bg-[#E5F7EA]"),
        isSubmitted && isClientSideCorrect && "bg-[#E5F7EA]  outline-[#18A058]",
        isSubmitted && isClientSideWrong && "bg-[#FFE5E5]  outline-[#FF2442]"
      )}
      onClick={() => {
        if (readOnly) {
          return;
        }
        setUserAnswer(index.toString());
      }}
    >
      <div
        className={cn(
          "font-semibold w-8 h-8 rounded-full flex items-center justify-center text-[#8C8C8C] bg-[#F2F2F2] text-sm"
        )}
      >
        {String.fromCharCode(65 + index)}
      </div>
      <div className="text-sm flex items-center justify-start text-[#595959]">
        {content}
      </div>
    </div>
  );
}

function ListeningImageContent({
  question,
}: {
  question: Practice["questions"][number];
}) {
  if (question.subject !== Subject.LISTENING) {
    return null;
  }
  if (!question.image) {
    return null;
  }
  return (
    <Image
      loading="eager"
      placeholder="blur"
      blurDataURL={headphone.src}
      width={0}
      height={0}
      quality={100}
      className="h-full w-auto"
      src={headphone.src}
      alt="listening"
      sizes="10vh"
    />
  );
}

function ReadingImageContent({
  question,
}: {
  question: Practice["questions"][number];
}) {
  const showText =
    question.imageContent &&
    question.imageContent.original_text &&
    question.imageContent.questions;
  if (question.subject !== Subject.READING) {
    return null;
  }
  if (showText) {
    return (
      <div className="whitespace-pre-line w-full h-full p-12 overflow-auto text-[#595959] text-center flex flex-col items-center">
        <div className="text-xl font-semibold max-w-full break-words">
          {question.imageContent?.original_text}
        </div>
        <div className="text-lg max-w-full break-words">
          {question.imageContent?.questions}
        </div>
      </div>
    );
  }
  return (
    <Image
      loading="eager"
      placeholder="blur"
      blurDataURL={headphone.src}
      width={0}
      height={0}
      quality={100}
      sizes="100vh"
      className="h-full w-auto"
      src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN}/${question.image}`}
      alt="listening"
    />
  );
}
export default Main;
