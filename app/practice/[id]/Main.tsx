"use client";
import { AlignLeft, Languages } from "lucide-react";
import { Listening } from "@/components/icons/listening";
import { SparklesSoft } from "@/components/icons/sparkles-soft";

import headphone from "@/images/headphone.png";
import Image from "next/image";
import { Subject } from "@/shared/enum";

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
import WritingInput from "./WritingInput";

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

  return (
    <div className="flex w-full h-full flex-col lg:flex-row ">
      <div className="flex flex-col flex-1 bg-gray-50">
        <PracticeHeader
          questionIndex={currentQuestionIndex}
          difficulty={currentQuestion.difficulty}
          score={currentQuestion.score}
          subject={currentQuestion.subject}
          writingTache={currentQuestion.writingContent?.tache || ""}
        />
        <div className="grow flex flex-col min-h-0">
          <div className="grow flex flex-col min-h-0">
            {[Subject.LISTENING, Subject.READING].includes(
              currentQuestion.subject
            ) && (
              <div className="grow overflow-auto">
                <div className="h-full flex flex-col items-center py-2">
                  <ListeningImageContent question={currentQuestion} />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-center">
                      <ReadingImageContent question={currentQuestion} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-none grow">
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
                {[Subject.LISTENING, Subject.READING].includes(
                  currentQuestion.subject
                ) && (
                  <div className="w-full flex flex-col gap-2">
                    {currentQuestion.options.map((option, index) => (
                      <Option
                        key={index}
                        index={index}
                        content={option}
                        isSubmitted={isSubmitted}
                        userAnswer={
                          clientSideCurrentAnswer ||
                          clientSideAnswers.find(
                            (answer) => answer.questionId === currentQuestion.id
                          )?.answer ||
                          ""
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
                )}
                {currentQuestion.subject === Subject.WRITING && (
                  <div className="w-full h-full flex flex-col">
                    <div className="gap-4 flex flex-col">
                      <div className="w-full flex flex-col gap-2 text-[#434343] font-semibold">
                        {currentQuestion.writingContent?.background}
                      </div>
                      <div className="w-full flex flex-col gap-2 font-semibold text-[#1F7FFF]">
                        {currentQuestion.writingContent?.requirements}
                      </div>
                      <div className="w-full flex flex-col gap-2 text-[#434343]">
                        {currentQuestion.writingContent?.tache === "1"
                          ? "(60 mots minimum/120 mots maximum) "
                          : currentQuestion.writingContent?.tache === "2"
                          ? "(120 mots minimum/150 mots maximum) "
                          : "(Nombre de mots attendu : minimum 120 mots/maximum 180 mots. Soit entre 40 et 60 mots pour la 1e partie de la tâche et entre 80 et 120 mots pour la 2e partie de la tâche. )"}
                      </div>
                    </div>
                    <div className="w-full mt-4 grow">
                      {/* clientSideCurrentAnswer：{clientSideCurrentAnswer}
                      <br />
                      clientSideAnswers.find
                      {clientSideAnswers.find(
                        (answer) => answer.questionId === currentQuestion.id
                      )?.answer || ""}
                      <br />
                      clientSideAnswers
                      {JSON.stringify(clientSideAnswers)} */}
                      <WritingInput
                        text={
                          clientSideCurrentAnswer ||
                          clientSideAnswers.find(
                            (answer) => answer.questionId === currentQuestion.id
                          )?.answer ||
                          ""
                        }
                        setText={setClientSideCurrentAnswer}
                        disabled={isSubmitted || isClientSideReadOnly}
                        practiceId={practice.id}
                        questionIndex={currentQuestionIndex}
                      />
                    </div>
                  </div>
                )}
              </AnswerCard>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:max-w-[400px] w-full lg:border-l lg:border-gray-100 lg:h-full overflow-auto">
        <div className="sticky top-0 bg-white text-normal font-medium p-4 h-14 border-b border-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-[#FF2442] to-[#FF6F7F] flex items-center gap-2 z-10">
          <SparklesSoft className="w-6 h-6" />
          智能辅助
        </div>
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
              optionsTranslation={currentQuestion.optionsTranslation}
            />
          )}
        {currentQuestion.subject === Subject.WRITING &&
          currentQuestion.writingContent && (
            <WritingTranslation
              background={currentQuestion.writingContent.backgroundTranslation}
              requirements={
                currentQuestion.writingContent.requirementsTranslation
              }
              docoments={currentQuestion.writingContent.documentTranslation}
            />
          )}
      </div>
    </div>
  );
}

function PracticeHeader({
  questionIndex,
  difficulty,
  score,
  subject,
  writingTache,
}: {
  questionIndex: number;
  difficulty: string;
  score: number;
  subject: Subject;
  writingTache: string;
}) {
  return (
    <div className="text-lg flex flex-wrap items-center gap-3 sm:gap-6 px-3 py-4 h-auto sm:h-14 bg-white border-b border-gray-100">
      {[Subject.LISTENING, Subject.READING].includes(subject) && (
        <>
          <div className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4" />
            <span className="font-medium">Question {questionIndex + 1}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500 text-sm sm:text-base">
            <div>
              难度：<span className="text-gray-700">{difficulty}</span>
            </div>
            <div>
              分值：<span className="text-gray-700">{score}分</span>
            </div>
          </div>
        </>
      )}
      {subject === Subject.WRITING && (
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4" />
          <span className="font-medium">Tâche {writingTache}</span>
        </div>
      )}
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
        if (isSubmitted) {
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
      sizes="50vh"
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
      <div className="w-full h-full p-2 sm:p-4 lg:p-8 overflow-hidden">
        <div className="bg-white relative rounded-lg p-4 sm:p-6 shadow-[0_1px_5px_-4px_rgba(19,19,22,0.7),0_4px_8px_rgba(32,42,54,0.05)] ring-1 ring-gray-900/7.5 transition-shadow hover:shadow-[0_1px_7px_-4px_rgba(19,19,22,0.8),0_4px_11px_rgba(32,42,54,0.05)] hover:ring-gray-900/12.5 dark:bg-gray-900 dark:shadow-[0_-1px_rgba(255,255,255,0.06),0_4px_8px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.1),0_1px_6px_-4px_#000] max-h-[30vh] sm:h-full overflow-y-auto">
          <div className="whitespace-pre-line text-base sm:text-xl font-semibold text-[#595959] max-w-full break-words">
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
  optionsTranslation,
}: {
  originalText: string;
  questionText: string;
  optionsTranslation?: { english: string; chinese: string }[];
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
          {optionsTranslation && optionsTranslation.length > 0 && (
            <div className="bg-white rounded-md p-2 mt-1 border-gray-200 border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                选项：
              </div>
              <div className="space-y-2">
                {optionsTranslation.map((option, index) => (
                  <div key={index} className="text-sm text-gray-800">
                    <div className="font-medium">
                      {String.fromCharCode(65 + index)}. {option.english}
                    </div>
                    <div className="text-gray-500 ml-4">{option.chinese}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
function WritingTranslation({
  background,
  requirements,
  docoments,
}: {
  background: string;
  requirements: string;
  docoments: string[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-1 m-2">
      <Disclosure open={isOpen} onOpenChange={setIsOpen}>
        <DisclosureTrigger>
          <div className="text-sm h-8 font-medium text-gray-500 flex items-center justify-between px-2 cursor-pointer">
            <div className="flex items-center gap-1">
              <Languages className="w-4 h-4" />
              写作翻译
            </div>
            <span className="text-xs text-gray-400">
              {isOpen ? "收起" : "展开"}
            </span>
          </div>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="bg-white rounded-md p-2 border-gray-200 border">
            <div className="text-sm font-medium text-gray-500 mb-1">背景：</div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {background}
            </div>
          </div>
          <div className="bg-white rounded-md p-2 mt-1 border-gray-200 border">
            <div className="text-sm font-medium text-gray-500 mb-1">要求：</div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {requirements}
            </div>
          </div>
          {docoments
            .filter((docoment) => docoment.length > 0)
            .map((docoment, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-2 mt-1 border-gray-200 border"
              >
                <div className="text-sm font-medium text-gray-500 mb-1">
                  文档{index + 1}：
                </div>
                <div className="text-sm text-gray-800 leading-relaxed">
                  {docoment}
                </div>
              </div>
            ))}
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}

function AnswerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full border-t border-gray-100 bg-white mx-2 mb-2 rounded-md p-3 sm:p-6 flex flex-col items-center gap-3 sm:gap-4">
      {children}
    </div>
  );
}

export default Main;
