import { fetchMutate } from "@/lib/server-fetch";

export const deletePractice = async (id: string) => {
  await fetchMutate({
    path: `/practices/${id}`,
    method: "DELETE",
    body: {},
  });
};
