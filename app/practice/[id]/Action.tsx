"use client";
import { ArrowLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePractice } from "./context";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

function Action() {
  const {
    clientSideCurrentQuestion,
    practice,
    isClientSideTimeOut,
    isSubmitted,
    nextQuestion,
    previousQuestion,
    setClientSideTimeOut,
    setClientSideReadOnly,
    submitPractice,
  } = usePractice();

  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const initRemainingSeconds = dayjs(practice.createdAt)
      .add(practice.duration, "seconds")
      .diff(dayjs(), "seconds");
    return Math.max(initRemainingSeconds, 0);
  });
  useEffect(() => {
    setClientSideTimeOut(remainingSeconds <= 0);
    setClientSideReadOnly(remainingSeconds <= 0);
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      setClientSideTimeOut(true);
      setClientSideReadOnly(true);
    }
  }, [remainingSeconds]);

  useEffect(() => {
    if (isClientSideTimeOut) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isClientSideTimeOut]);

  const isFirstQuestion =
    clientSideCurrentQuestion === practice.questions[0].id;
  const isLastQuestion =
    clientSideCurrentQuestion ===
    practice.questions[practice.questions.length - 1].id;

  return (
    <div className="border-t-[1px] border-[#F2F2F2] inline-flex gap-2 px-3 py-4 h-[64px] items-center justify-between bg-white">
      <LastQuestionButton
        isClientSideTimeOut={isClientSideTimeOut}
        isFirstQuestion={isFirstQuestion}
        previousQuestion={previousQuestion}
      />
      <div className="flex text-sm text-[#595959] grow justify-center items-center">
        {isSubmitted && (
          <div>
            已交卷 用时
            {Math.floor(
              dayjs(practice.submittedAt).diff(
                dayjs(practice.createdAt),
                "seconds"
              ) / 60
            )}
            分钟
            {Math.floor(
              dayjs(practice.submittedAt).diff(
                dayjs(practice.createdAt),
                "seconds"
              ) % 60
            )}
            秒
          </div>
        )}
        <Timer
          isSubmitted={isSubmitted}
          remainingSeconds={remainingSeconds}
          isClientSideTimeOut={isClientSideTimeOut}
        />
      </div>
      <SubmitButton
        isLastQuestion={isLastQuestion}
        isClientSideTimeOut={isClientSideTimeOut}
        isSubmitted={isSubmitted}
        submitPractice={submitPractice}
      />
      <NextButton
        isClientSideTimeOut={isClientSideTimeOut}
        isLastQuestion={isLastQuestion}
        nextQuestion={nextQuestion}
      />
    </div>
  );
}

function Timer({
  isSubmitted,
  remainingSeconds,
  isClientSideTimeOut,
}: {
  isSubmitted: boolean;
  remainingSeconds: number;
  isClientSideTimeOut: boolean;
}) {
  if (isSubmitted) return null;
  if (isClientSideTimeOut) return null;
  return (
    <div className="w-auto flex items-center gap-2 font-semibold text-[#434343] left-1/2 right-1/2">
      <Clock className="w-4 h-4" />
      剩余时间
      <span
        className={`w-[4.5rem] font-mono text-center ${
          remainingSeconds < 600 ? "text-[#FF2442]" : ""
        }`}
      >
        {Math.floor(remainingSeconds / 60)
          .toString()
          .padStart(2, "0")}
        :{(remainingSeconds % 60).toString().padStart(2, "0")}
      </span>
    </div>
  );
}

function LastQuestionButton({
  isClientSideTimeOut,
  isFirstQuestion,
  previousQuestion,
}: {
  isClientSideTimeOut: boolean;
  isFirstQuestion: boolean;
  previousQuestion: () => void;
}) {
  if (isClientSideTimeOut) return null;
  if (isFirstQuestion) return null;
  return (
    <Button
      disabled={isFirstQuestion}
      className="border-[#FF2442] text-[#FF2442] hover:bg-[#FF2442] hover:text-white rounded-xl"
      variant={"outline"}
      size={"sm"}
      onClick={() => previousQuestion()}
    >
      <ArrowLeft className="w-4 h-4" />
      上一题
    </Button>
  );
}

function SubmitButton({
  isLastQuestion,
  isClientSideTimeOut,
  isSubmitted,
  submitPractice,
}: {
  isLastQuestion: boolean;
  isClientSideTimeOut: boolean;
  isSubmitted: boolean;
  submitPractice: () => void;
}) {
  if (isSubmitted) return null;
  if (!isClientSideTimeOut && !isLastQuestion) return null;
  return (
    <Button
      className="bg-[#1782FF] text-white hover:bg-[#1782FF]/80 rounded-xl"
      size={"sm"}
      onClick={() => submitPractice()}
    >
      {isClientSideTimeOut ? "时间结束 请交卷" : "交卷"}
    </Button>
  );
}
function NextButton({
  isClientSideTimeOut,
  isLastQuestion,
  nextQuestion,
}: {
  isClientSideTimeOut: boolean;
  isLastQuestion: boolean;
  nextQuestion: () => void;
}) {
  if (isClientSideTimeOut) return null;
  if (isLastQuestion) return null;
  return (
    <Button
      hidden={isClientSideTimeOut}
      disabled={isLastQuestion}
      className="bg-[#1782FF] text-white hover:bg-[#1782FF]/80 rounded-xl"
      onClick={() => nextQuestion()}
    >
      下一题
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}

export default Action;
