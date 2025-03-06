import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const apiUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;

export const forwardCloudflareHeaders = (headers: ReadonlyHeaders) => {
  const ip = headers.get("cf-connecting-ip") || "unknow";
  const ua = headers.get("User-Agent") || "unknow";
  const country = headers.get("cf-ipcountry") || "unknow";
  const city = headers.get("cf-ipcity") || "unknow";

  return [
    { key: "client-cf-connecting-ip", value: ip },
    { key: "client-user-agent", value: ua },
    { key: "client-cf-ipcountry", value: country },
    { key: "client-cf-ipcity", value: city },
  ];
};
