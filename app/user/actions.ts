"use server";
import { fetchMutate } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const verifyCurrentEmail = async (otp: string) => {
  await fetchMutate({
    path: "/auth/protect/change-email-verify",
    body: { otp },
  });
  revalidatePath("/user/profile");
};

export const changeEmail = async (email: string, otp: string) => {
  try {
    await fetchMutate({
      path: "/auth/protect/change-email-process",
      body: { email, otp },
    });
    redirect("/user/profile");
  } catch (e) {
    throw e;
  }
};
export const bindEmail = async (email: string, otp: string) => {
  try {
    await fetchMutate({
      path: "/auth/protect/bind-email-verify",
      body: { email, otp },
    });
    revalidatePath("/user/profile");
  } catch (e) {
    throw e;
  }
};
export const changePassword = async (password: string, otp: string) => {
  try {
    await fetchMutate({
      path: "/auth/protect/change-password",
      body: { password, otp },
    });
    revalidatePath("/user/profile");
  } catch (e) {
    throw e;
  }
};

export const disableSessions = async (ids: string[]) => {
  await fetchMutate({
    path: "/users/disable-sessions",
    body: { ids },
  });
  revalidatePath("/user/sessions");
};

export const disableAllSessions = async () => {
  await fetchMutate({
    path: "/users/disable-sessions-all",
    body: {},
  });
  redirect("/auth/login");
};
