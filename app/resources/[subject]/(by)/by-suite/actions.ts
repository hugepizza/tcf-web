"use server";

import { fetchMutate } from "@/lib/server-fetch";
import { redirect } from "next/navigation";

export const startPracticeBySuit = async (suitId: string) => {
  const practice = await fetchMutate<{
    practice: {
      id: string;
    };
  }>({
    path: "/practices/by-suite",
    method: "POST",
    body: { suitId },
  });
  redirect(`/practice/${practice.data?.practice.id}`);
};
