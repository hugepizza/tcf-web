"use client";
import { ArrowLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePractice } from "./context";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { checkPoint } from "./actions";
import { useRouter } from "next/navigation";

const buttonBaseClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm px-3 py-[0.1875rem] ring-1 bg-[#1782FF] text-white ring-[#1782FF] hover:bg-[#1782FF] hover:text-white hover:ring-[#1782FF]";

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
    const initRemainingSeconds = practice.duration - practice.durationConsumed;
    return Math.max(initRemainingSeconds, 0);
  });
  useEffect(() => {
    if (!isSubmitted) {
      setClientSideTimeOut(remainingSeconds <= 0);
      setClientSideReadOnly(remainingSeconds <= 0);
    }
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
      checkPoint({
        practiceId: practice.id,
        duration: 1,
      }).catch(() => {});
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
    <div className="border-t-[1px] border-[#F2F2F2] flex gap-2 px-3 py-4 h-[64px] items-center justify-between bg-white w-full">
      <div className="flex text-sm text-[#595959] items-center gap-2">
        {isSubmitted && (
          <div>
            已交卷 用时
            {Math.floor(practice.durationConsumed / 60)}
            分钟
            {Math.floor(practice.durationConsumed % 60)}秒{" 总时长"}
            {Math.floor(practice.duration / 60)}
            分钟
          </div>
        )}
        <Timer
          isSubmitted={isSubmitted}
          remainingSeconds={remainingSeconds}
          isClientSideTimeOut={isClientSideTimeOut}
        />
      </div>

      <div className="flex items-center gap-2">
        <LastQuestionButton
          isClientSideTimeOut={isClientSideTimeOut}
          isFirstQuestion={isFirstQuestion}
          previousQuestion={previousQuestion}
        />
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isSubmitted) return null;
  if (isClientSideTimeOut) return null;

  if (!mounted) {
    return (
      <div className="w-auto flex items-center gap-2 font-semibold text-[#434343] left-1/2 right-1/2">
        <Clock className="w-4 h-4" />
        剩余时间
        <span className="w-[4.5rem] font-mono text-center">--:--</span>
      </div>
    );
  }

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
      className={buttonBaseClass}
      onClick={() => previousQuestion()}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden md:inline">上一题</span>
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
  submitPractice: () => Promise<void>;
}) {
  const { toast } = useToast();
  const router = useRouter();
  if (isSubmitted) return null;
  if (!isClientSideTimeOut && !isLastQuestion) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonBaseClass}>
          {isClientSideTimeOut ? "时间结束 请交卷" : "交卷"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>交卷</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          交卷后无法继续答题，可查看评级和答案。确定交卷吗？
        </DialogDescription>
        <DialogFooter>
          <Button
            variant={"default"}
            onClick={async () => {
              await submitPractice();
              toast({
                title: "交卷成功",
              });
            }}
          >
            确定交卷
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"}>取消</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
      className={buttonBaseClass}
      onClick={() => nextQuestion()}
    >
      <span className="hidden md:inline">下一题</span>
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}

export default Action;
