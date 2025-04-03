"use server";
import { fetchMutate, fetchQuery } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export const deletePractice = async (id: string) => {
  await fetchMutate({
    path: `/practices/${id}`,
    method: "DELETE",
    body: {},
  });
  revalidatePath("/history");
};

export const getSuiteHistory = async ({
  currentPage,
  itemsPerPage,
  suiteId,
}: {
  currentPage: number;
  itemsPerPage: number;
  suiteId: string;
}) => {
  const data = await fetchQuery<{
    items: {
      practiceId: string;
      suiteName: string;
      practiceMode: string;
      createdAt: string;
      score: number | null;
      submittedAt: Date | null;
    }[];
    total: number;
  }>({
    path: `/practices/history?page=${currentPage}&pageSize=${itemsPerPage}&suiteId=${suiteId}`,
  });
  return data;
};
