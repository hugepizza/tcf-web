"use client";
import { AlignLeft } from "lucide-react";

import headphone from "@/images/headphone.png";
import Image from "next/image";
import { Practice } from "@/shared/schemas/practice";
import { Subject } from "@/shared/enum";

import { AudioPlayerWrapper } from "@/components/audio-player";
import { usePractice } from "./context";
import { notFound } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
    <>
      <div className="text-lg font-semibold flex items-center gap-2 px-3 py-4 bg-white">
        <AlignLeft className="w-4 h-4" />
        Question {currentQuestionIndex + 1} 难度：
        {currentQuestion.difficulty}（{currentQuestion.score}分）
      </div>
      <div className="grow flex flex-col">
        <div className="p-3 flex justify-center grow">
          {currentQuestion.subject === Subject.LISTENING &&
            !currentQuestion.image && (
              <Image
                loading="eager"
                placeholder="blur"
                blurDataURL={headphone.src}
                width={0}
                height={0}
                className="h-full object-fill"
                src={headphone.src}
                alt="listening"
              />
            )}
          {currentQuestion.image && (
            <Image
              loading="eager"
              placeholder="blur"
              blurDataURL={headphone.src}
              width={0}
              height={0}
              className="h-full object-fill"
              src={currentQuestion.image}
              alt="listening"
            />
          )}
        </div>
        <div className="bg-white mx-2 rounded-md p-6 flex flex-col items-center gap-4">
          {/* 题干*/}
          {currentQuestion.stem && (
            <div className="font-semibold text-[#434343] text-lg">
              {currentQuestion.stem}
            </div>
          )}
          {currentQuestion.audio && (
            <div className="w-full flex justify-center">
              <AudioPlayerWrapper audioUrl={currentQuestion.audio} />
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
    </>
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
        {index === 0 ? "A" : index === 2 ? "B" : index === 3 ? "C" : "D"}
      </div>
      <div className="text-sm flex items-center justify-start text-[#595959]">
        {content}
      </div>
    </div>
  );
}

export default Main;
