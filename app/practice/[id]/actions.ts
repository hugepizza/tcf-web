"use server";
import { fetchMutate } from "@/lib/server-fetch";

const submitAnswer = async ({
  practiceId,
  answer,
  questionId,
  submitPractice,
  moveToNextQuestion,
}: {
  practiceId: string;
  answer: string;
  questionId: string;
  submitPractice: boolean;
  moveToNextQuestion: boolean;
}) => {
  await fetchMutate<{ questionId: string }>({
    path: `/practices/${practiceId}`,
    method: "PUT",
    body: {
      answer,
      questionId,
      submitPractice,
      moveToNextQuestion,
    },
  });
};

const checkPoint = async ({
  practiceId,
  duration,
}: {
  practiceId: string;
  duration: number;
}) => {
  await fetchMutate<{ duration: number }>({
    path: `/practices/${practiceId}/check-point`,
    method: "PATCH",
    body: {
      duration,
    },
  });
};

export { submitAnswer, checkPoint };
