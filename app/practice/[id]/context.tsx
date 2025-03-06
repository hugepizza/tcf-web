"use client";
import { Practice } from "@/shared/schemas/practice";
import { createContext, useCallback, useContext, useState } from "react";
import { submitAnswer } from "./actions";

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
  submitPractice: () => void;
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
  submitPractice: () => {},
});

export default function PracticeProvider({
  children,
  practice,
}: {
  children: React.ReactNode;
  practice: Practice;
}) {
  const isSubmitted = practice.submittedAt !== null;

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
  }, [
    clientSideCurrentAnswer,
    clientSideCurrentQuestion,
    isClientSideReadOnly,
  ]);

  const nextQuestion = useCallback(async () => {
    const nextQuestionIndex =
      practice.questions.findIndex(
        (question) => question.id === clientSideCurrentQuestion
      ) + 1;
    const hasNextQuestion = nextQuestionIndex < practice.questions.length;

    if (!hasNextQuestion) {
      await submitPractice();
      return;
    }

    if (!isClientSideReadOnly) {
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
  }, [clientSideCurrentAnswer, clientSideCurrentQuestion]);
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
        setClientSideCurrentAnswer,
        nextQuestion,
        previousQuestion,
        jumpToQuestion,
        clientSideAnswers,
        isSubmitted,
        isClientSideReadOnly,
        isClientSideTimeOut,
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
