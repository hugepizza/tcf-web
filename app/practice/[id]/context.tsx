"use client";
import { Practice } from "@/shared/schemas/practice";
import { createContext, useCallback, useContext, useState } from "react";
import { submitAnswer } from "./actions";
import { useRouter } from "next/navigation";

interface PracticeContextType {
  practice: Practice;
  clientSideCurrentQuestion: string;
  clientSideCurrentAnswer: string;
  clientSideAnswers: Practice["answers"];
  setClientSideCurrentAnswer: (answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  jumpToQuestion: (questionId: string) => void;
  isSubmitted: boolean;
  isClientSideReadOnly: boolean;
  isClientSideTimeOut: boolean;
  setClientSideTimeOut: (timeOut: boolean) => void;
  setClientSideReadOnly: (readOnly: boolean) => void;
  submitPractice: () => Promise<void>;
}
const PracticeContext = createContext<PracticeContextType>({
  practice: {} as Practice,
  clientSideCurrentQuestion: "",
  clientSideCurrentAnswer: "",
  setClientSideCurrentAnswer: (answer: string) => {},
  nextQuestion: () => {},
  previousQuestion: () => {},
  jumpToQuestion: (questionId: string) => {},
  clientSideAnswers: [],
  isSubmitted: false,
  isClientSideReadOnly: false,
  isClientSideTimeOut: false,
  setClientSideTimeOut: (timeOut: boolean) => {},
  setClientSideReadOnly: (readOnly: boolean) => {},
  submitPractice: async () => {},
});

export default function PracticeProvider({
  children,
  practice,
}: {
  children: React.ReactNode;
  practice: Practice;
}) {
  const router = useRouter();
  const isSubmitted = practice.submittedAt !== null;

  console.log("isSubmitted", isSubmitted);
  const [isClientSideTimeOut, setClientSideTimeOut] = useState(false);
  const [isClientSideReadOnly, setClientSideReadOnly] = useState(isSubmitted);

  const [clientSideCurrentQuestion, setClientSideCurrentQuestion] = useState(
    practice.currentQuestion
  );
  const [clientSideCurrentAnswer, setClientSideCurrentAnswer] = useState("");

  const [clientSideAnswers, setClientSideAnswers] = useState<
    Practice["answers"]
  >(practice.answers);

  const submitPractice = useCallback(async () => {
    if (isClientSideReadOnly) {
      return;
    }
    await submitAnswer({
      practiceId: practice.id,
      answer: clientSideCurrentAnswer,
      questionId: clientSideCurrentQuestion,
      submitPractice: true,
    });
    // 提交后跳转
    console.log("提交后跳转");
    router.push(`/practice/${practice.id}`);
  }, [
    clientSideCurrentAnswer,
    clientSideCurrentQuestion,
    isClientSideReadOnly,
  ]);

  const nextQuestion = useCallback(async () => {
    console.log("nextQuestion isClientSideReadOnly:", isClientSideReadOnly);
    const nextQuestionIndex =
      practice.questions.findIndex(
        (question) => question.id === clientSideCurrentQuestion
      ) + 1;
    const hasNextQuestion = nextQuestionIndex < practice.questions.length;

    if (!isClientSideReadOnly) {
      if (!hasNextQuestion) {
        await submitPractice();
        return;
      }
      await submitAnswer({
        practiceId: practice.id,
        answer: clientSideCurrentAnswer,
        questionId: clientSideCurrentQuestion,
        submitPractice: false,
      });
      setClientSideAnswers((prev) => {
        const next = prev.map((answer) => {
          if (answer.questionId === clientSideCurrentQuestion) {
            return {
              ...answer,
              answer: clientSideCurrentAnswer,
            };
          }
          return answer;
        });
        setClientSideCurrentAnswer("");
        return next;
      });
    }
    setClientSideCurrentQuestion(practice.questions[nextQuestionIndex].id);
  }, [
    clientSideCurrentAnswer,
    clientSideCurrentQuestion,
    isClientSideReadOnly,
    submitPractice,
  ]);
  const jumpToQuestion = (questionId: string) => {
    setClientSideCurrentQuestion(questionId);
  };
  const previousQuestion = useCallback(async () => {
    const previousQuestionIndex =
      practice.questions.findIndex(
        (question) => question.id === clientSideCurrentQuestion
      ) - 1;
    if (previousQuestionIndex < 0) {
      console.log("已经是第一题了");
      return;
    } else {
      setClientSideCurrentQuestion(
        practice.questions[previousQuestionIndex].id
      );
      setClientSideCurrentAnswer("");
    }
  }, [clientSideCurrentQuestion]);
  return (
    <PracticeContext.Provider
      value={{
        practice,
        clientSideCurrentQuestion,
        clientSideCurrentAnswer,
        clientSideAnswers,
        isSubmitted,
        isClientSideReadOnly,
        isClientSideTimeOut,
        setClientSideCurrentAnswer,
        nextQuestion,
        previousQuestion,
        jumpToQuestion,
        setClientSideTimeOut,
        setClientSideReadOnly,
        submitPractice,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice() {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePractice must be used within a PracticeProvider");
  }
  return context;
}
