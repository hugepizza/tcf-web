"use server";
import { fetchMutate } from "@/lib/server-fetch";

const submitAnswer = async ({
  practiceId,
  answer,
  questionId,
  submitPractice,
}: {
  practiceId: string;
  answer: string;
  questionId: string;
  submitPractice: boolean;
}) => {
  await fetchMutate<{ questionId: string }>({
    path: `/practices/${practiceId}`,
    method: "PUT",
    body: {
      answer,
      questionId,
      submitPractice,
    },
  });
};

export { submitAnswer };
