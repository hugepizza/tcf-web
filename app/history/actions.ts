"use server";
import { fetchMutate } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export const deletePractice = async (id: string) => {
  await fetchMutate({
    path: `/practices/${id}`,
    method: "DELETE",
    body: {},
  });
  revalidatePath("/history");
};
