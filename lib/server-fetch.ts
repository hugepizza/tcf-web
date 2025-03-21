import { redirect } from "next/navigation";
import { Response } from "@/shared/schemas/base";
import { apiUrl } from "./api";
import { BizError } from "@/shared/errors";
import { createHeaders } from "./header";
import { ClientError } from "@/shared/client-error";

export const fetchMutate = async <T = unknown>({
  path,
  body,
  method,
}: {
  path: string;
  body: unknown;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
}) => {
  const headers = await createHeaders();
  const reponse = await fetch(apiUrl(path), {
    method: method || "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (reponse.status === 401) {
    redirect("/unauthorized");
  } else if (!reponse.ok) {
    console.log(JSON.stringify(await reponse.json(), null, 2));
    throw new Error("网络错误");
  }
  const jsonDate = await reponse.json();
  const data = jsonDate as Response;
  if (data.code !== 200) {
    return {
      data: null,
      error: {
        name: data.code,
        message: data.message || "reqest failed",
        code: data.code,
      } as ClientError,
    };
  }

  return {
    data: data.data as T,
    error: null,
  };
};

export const fetchQuery = async <T = unknown>({
  path,
  queryTags,
}: {
  path: string;
  queryTags?: string[];
}) => {
  const reponse = await fetch(apiUrl(path), {
    method: "GET",
    headers: await createHeaders(),
    next: { tags: queryTags },
  });

  if (reponse.status === 401) {
    redirect("/unauthorized");
  } else if (!reponse.ok) {
    redirect("/error?code=" + reponse.status);
  }
  const jsonDate = await reponse.json();

  const data = jsonDate as Response;
  if (data.code !== 200) {
    return {
      data: null,
      error: new BizError(data.code, data.message || "reqest failed"),
    };
  }
  return { data: data.data as T, error: null };
};
