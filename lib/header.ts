"use server";
import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";
import { headers } from "next/headers";
import { mergeHeader } from "./fetch";

export const createHeaders = async () => {
  const session = await getServerSession(authConfig);
  return mergeHeader(session, await headers());
};
