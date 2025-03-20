"use server";

import { z } from "zod";
import { signUpInputSchema } from "@/shared/schemas/auth";
import { fetchMutate } from "@/lib/server-fetch";

export const signup = async (form: z.infer<typeof signUpInputSchema>) => {
  return await fetchMutate({
    path: "/auth/user/sign-up",
    body: {
      email: form.email,
      password: form.password,
      verificationCode: form.verificationCode,
      registerCode: form.registerCode,
    },
  });
};
