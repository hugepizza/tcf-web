"use server";

import { fetchMutate } from "@/lib/server-fetch";

export async function signup(
  email: string,
  password: string,
  verificationCode: string
) {
  await fetchMutate({
    path: "/auth/user/sign-up",
    body: {
      email,
      password,
      verificationCode,
    },
  });
}

export async function sendVerificationCode(email: string) {
  await fetchMutate({
    path: "/auth/verification-code",
    body: {
      email,
    },
  });
}

export async function resetPassword(
  account: string,
  password: string,
  verificationCode: string
) {
  const res = await fetchMutate({
    path: "/auth/user/reset-password",
    body: {
      account,
      password,
      verificationCode,
    },
  });
  if (res.error) {
    throw res.error;
  }
}

export const bindEmailWithPassword = async (
  email: string,
  account: string,
  password: string,
  verificationCode: string
) => {
  await fetchMutate({
    path: "/auth/user/first-time-bind-email-by-password",
    body: { email, account, password, verificationCode },
  });
};
