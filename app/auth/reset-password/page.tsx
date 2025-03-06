"use client";
import InputBorderSpotlight from "@/components/Auth/InputBorderSpotlight";
import { safeEmailSchema } from "@/shared/schemas/base-schema";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { resetPassword, sendVerificationCode } from "../login/actions";
import { useRouter } from "next/navigation";

const resetPasswordInputSchema = z.object({
  account: z.string(),
  verificationCode: z.string(),
  password: z.string().min(6).max(24),
});

export default function ResetPassword() {
  const [form, setForm] = useState<z.infer<typeof resetPasswordInputSchema>>({
    account: "",
    verificationCode: "",
    password: "",
  });
  const [optTimer, setOptTimer] = useState(0);
  const { push } = useRouter();

  const request = async () => {
    const v = resetPasswordInputSchema.safeParse(form);
    if (v.error) {
      throw v.error;
    }
    try {
      await resetPassword(form.account, form.password, form.verificationCode);
      push("/auth/login");
    } catch (e) {
      throw e;
    }
  };

  const requestOTP = async () => {
    try {
      setOptTimer(60);
      const intervalId = setInterval(() => {
        setOptTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          clearInterval(intervalId);
          return 0;
        });
      }, 1000);
      await sendVerificationCode(form.account);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            CELPIP Master
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-[28px] leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <InputBorderSpotlight
                    value={form.account}
                    onChange={(e) =>
                      setForm({ ...form, account: e.target.value })
                    }
                    id="email"
                    type="text"
                    required
                    className="px-3 block w-full rounded-xl border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="absolute sm:bottom-0 sm:left-[105%] h-12 w-32 inline-flex items-center">
                <button
                  className={twMerge(
                    "group relative h-11 flex w-full justify-center items-center rounded-xl bg-primary px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden",
                    `${
                      !safeEmailSchema.safeParse(form.account).success &&
                      "hidden"
                    }`,
                    `${
                      optTimer > 0 &&
                      "cursor-not-allowed bg-primary/80 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-primary"
                    }`
                  )}
                  onClick={() => {
                    if (optTimer > 0) {
                      return;
                    }
                    toast.promise(requestOTP(), {
                      loading: "发送中...",
                      success: "发送成功",
                      error: (e) => {
                        return `${e}`;
                      },
                    });
                  }}
                >
                  {optTimer > 0 ? `${optTimer}s后重新发送` : "发送验证码"}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-[28px] leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <InputBorderSpotlight
                  value={form.password}
                  placeholder="6-24 characters"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  id="password"
                  type="text"
                  required
                  className="px-3 block w-full rounded-xl border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-[28px] leading-6 text-gray-900"
                  >
                    邮箱验证码
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <InputBorderSpotlight
                  placeholder="6-digit code"
                  value={form.verificationCode}
                  onChange={(e) =>
                    setForm({ ...form, verificationCode: e.target.value })
                  }
                  id="otp"
                  type="text"
                  required
                  className="px-3 block w-full rounded-xl border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className={twMerge(
                  "group relative h-12 flex w-full justify-center items-center rounded-xl bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden",
                  !resetPasswordInputSchema.safeParse(form).success &&
                    "opacity-50 cursor-not-allowed"
                )}
                disabled={!resetPasswordInputSchema.safeParse(form).success}
                onClick={() => {
                  toast.promise(request(), {
                    loading: "验证中...",
                    success: "重置成功",
                    error: (e) => {
                      return `${e}`;
                    },
                  });
                }}
              >
                重置密码
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-primary hover:text-primary"
            >
              返回登陆
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
