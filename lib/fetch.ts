import { BizError } from "@/shared/errors";
import { apiUrl, forwardCloudflareHeaders } from "./api";
import { Response } from "@/shared/schemas/base";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Session } from "next-auth";

export const mergeHeader = (
  session: Session | null,
  nextHeader: ReadonlyHeaders
) => {
  const resultHeaders = new Headers();
  resultHeaders.append("Content-Type", "application/json");
  if (session?.user.sessionId) {
    resultHeaders.append("Authorization", `Bearer ${session.user.sessionId}`);
  }
  const cfHeaders = forwardCloudflareHeaders(nextHeader);
  cfHeaders.forEach(({ key, value }) => {
    resultHeaders.append(key, value);
  });
  return resultHeaders;
};

export const mutate = async <T = unknown>({
  path,
  body,
  method,
  headers,
}: {
  path: string;
  body: unknown;
  method?: "POST" | "PUT" | "DELETE";
  headers?: Headers;
}) => {
  const reponse = await fetch(apiUrl(path), {
    method: method || "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!reponse.ok) {
    throw new Error("网络错误");
  }
  const jsonDate = await reponse.json();
  const data = jsonDate as Response;
  if (data.code !== 200) {
    return {
      data: null,
      error: new BizError(data.code, data.message || "reqest failed"),
    };
  }

  return {
    data: data.data as T,
    error: null,
  };
};

export const fetchQuery = async <T = unknown>({
  path,
  queryTag,
  headers,
}: {
  path: string;
  queryTag?: string;
  headers?: Headers;
}) => {
  const reponse = await fetch(apiUrl(path), {
    method: "GET",
    headers,
    next: { tags: queryTag ? [queryTag] : undefined },
  });

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
