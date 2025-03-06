import Sessions from "./Sessions";
import { fetchQuery } from "@/lib/server-fetch";
import { z } from "zod";
import { getSessionsOutputSchema } from "@/shared/schemas/auth";
async function Page() {
  const { data: sessions } = await fetchQuery<
    z.infer<typeof getSessionsOutputSchema>
  >({
    path: "/users/sessions",
  });
  return <Sessions sessions={sessions ?? { items: [] }} />;
}
export default Page;
