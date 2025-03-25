"use client";
import { AlignLeft, Languages } from "lucide-react";
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
import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "@/components/core/disclosure";
import React from "react";

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
  console.log("currentQuestion.imageContent", currentQuestion.imageContent);
  return (
    <div className="flex w-full h-full flex-col lg:flex-row">
      <div className="flex flex-col flex-1 bg-gray-50">
        <PracticeHeader
          questionIndex={currentQuestionIndex}
          difficulty={currentQuestion.difficulty}
          score={currentQuestion.score}
        />
        <div className="grow flex flex-col">
          <div className="px-3 pt-3 flex flex-col items-center grow overflow-auto">
            <ListeningImageContent question={currentQuestion} />
            <div className="flex flex-col w-full">
              <div className="grow overflow-auto flex justify-center">
                <ReadingImageContent question={currentQuestion} />
              </div>
            </div>
          </div>
          <AnswerCard>
            {currentQuestion.subject === Subject.READING &&
              currentQuestion.imageContent?.questions && (
                <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">问题：</div>
                  <div className="text-lg text-gray-900">
                    {currentQuestion.imageContent.questions}
                  </div>
                </div>
              )}
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
                    )?.answerKey ?? ""
                  }
                  readOnly={isClientSideReadOnly}
                  setUserAnswer={setClientSideCurrentAnswer}
                />
              ))}
            </div>
          </AnswerCard>
        </div>
      </div>
      <PracticeSidebar>
        {currentQuestion.audio && (
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
        )}

        {currentQuestion.imageContent?.original_text_translation &&
          currentQuestion.imageContent?.questions_translation && (
            <ReadingTranslation
              originalText={
                currentQuestion.imageContent.original_text_translation
              }
              questionText={currentQuestion.imageContent.questions_translation}
            />
          )}
        {currentQuestion.optionsTranslation.map((option, index) => (
          <div key={index}>
            <div>{option.english}</div>
            <div>{option.chinese}</div>
          </div>
        ))}
      </PracticeSidebar>
    </div>
  );
}

function PracticeSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:max-w-[400px] w-full lg:border-l lg:border-gray-100">
      <div className="text-normal font-medium p-4 h-14 border-b border-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-[#FF2442] to-[#FF6F7F] flex items-center gap-2">
        <SparklesSoft className="w-6 h-6" />
        智能辅助
      </div>
      {children}
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
    return (
      <Image
        blurDataURL={headphone.src}
        width={0}
        height={0}
        quality={100}
        className="h-full w-auto"
        src={headphone.src}
        alt="listening"
        sizes="50vh"
      />
    );
  }
  return (
    <Image
      loading="eager"
      placeholder="blur"
      blurDataURL={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN}/${question.image}`}
      width={0}
      height={0}
      quality={100}
      className="h-full w-auto"
      src={`${process.env.NEXT_PUBLIC_ASSETS_DOMAIN}/${question.image}`}
      alt="listening"
      sizes="100vh"
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
      <div className="w-full h-full p-0 lg:p-12">
        <div className="bg-white relative rounded-lg p-6 shadow-[0_1px_5px_-4px_rgba(19,19,22,0.7),0_4px_8px_rgba(32,42,54,0.05)] ring-1 ring-gray-900/7.5 transition-shadow hover:shadow-[0_1px_7px_-4px_rgba(19,19,22,0.8),0_4px_11px_rgba(32,42,54,0.05)] hover:ring-gray-900/12.5 dark:bg-gray-900 dark:shadow-[0_-1px_rgba(255,255,255,0.06),0_4px_8px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.1),0_1px_6px_-4px_#000] max-h-[320px] overflow-y-auto">
          <div className="whitespace-pre-line text-xl font-semibold text-[#595959] max-w-full break-words">
            {question.imageContent?.original_text}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
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
    </div>
  );
}

function ReadingTranslation({
  originalText,
  questionText,
}: {
  originalText: string;
  questionText: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-1 m-2">
      <Disclosure open={isOpen} onOpenChange={setIsOpen}>
        <DisclosureTrigger>
          <div className="text-sm h-8 font-medium text-gray-500 flex items-center justify-between px-2 cursor-pointer">
            <div className="flex items-center gap-1">
              <Languages className="w-4 h-4" />
              阅读翻译
            </div>
            <span className="text-xs text-gray-400">
              {isOpen ? "收起" : "展开"}
            </span>
          </div>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="bg-white rounded-md p-2 border-gray-200 border">
            <div className="text-sm font-medium text-gray-500 mb-1">原文：</div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {originalText}
            </div>
          </div>
          <div className="bg-white rounded-md p-2 mt-1 border-gray-200 border">
            <div className="text-sm font-medium text-gray-500 mb-1">问题：</div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {questionText}
            </div>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}

function AnswerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 bg-white mx-2 mb-2 rounded-md p-6 flex flex-col items-center gap-4">
      {children}
    </div>
  );
}

function PracticeHeader({
  questionIndex,
  difficulty,
  score,
}: {
  questionIndex: number;
  difficulty: string;
  score: number;
}) {
  return (
    <div className="text-lg flex items-center gap-6 px-3 py-4 h-14 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <AlignLeft className="w-4 h-4" />
        <span className="font-medium">Question {questionIndex + 1}</span>
      </div>
      <div className="flex items-center gap-4 text-gray-500 text-base">
        <div>
          难度：<span className="text-gray-700">{difficulty}</span>
        </div>
        <div>
          分值：<span className="text-gray-700">{score}分</span>
        </div>
      </div>
    </div>
  );
}

export default Main;
