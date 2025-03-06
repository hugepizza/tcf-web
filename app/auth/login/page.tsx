"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { AuthLayout } from "@/components/Layout/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import InputBorderSpotlight from "@/components/Auth/InputBorderSpotlight";
import { Logo } from "@/public/Logo";
import BindEmailWithPasswordModal from "./BindEmailWithPassword";
import ModalMaster from "@/components/modal/modal-hero";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { useSession } from "next-auth/react";
import { signInByPasswordInputSchema } from "@/shared/schemas/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchMutate } from "@/lib/server-fetch";
import { toast } from "@/hooks/use-toast";

const signInWithVerificationCodeInputSchema = z.object({
  account: z.string().min(6).max(100),
  verificationCode: z.string(),
});

export default function Login() {
  const [form, setForm] = useState<z.infer<typeof signInByPasswordInputSchema>>(
    {
      account: "",
      password: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { push } = useRouter();
  const loginWithPassword = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        account: form.account,
        password: form.password,
        verificationCode: "",
        loginType: "password",
      });

      if (res?.error && parseInt(res.error, 10)) {
        const code = parseInt(res.error || "200", 10);
        if (code === 10007) {
          if (document) {
            (
              document.getElementById(
                "verify_bind_email_with_password_modal"
              ) as HTMLDialogElement
            ).showModal();
          }
        } else if (code === 10008) {
          if (document) {
            (
              document.getElementById(
                "verification_code_modal"
              ) as HTMLDialogElement
            ).showModal();
          }
        } else if (code === 10009) {
          console.log("send magic link");
          fetchMutate({
            path: "/auth/user/magic-link",
            method: "POST",
            body: { email: form.account },
          }).then(() => {
            toast({
              title: "登陆链接已发送至邮箱",
            });
          });
        } else if (code === 10004) {
          toast({
            title: "密码错误",
            description: "请检查密码是否正确",
          });
        } else if (code === 10010) {
          toast({
            title: "用户不存在",
            description: "请检查用户名是否正确",
          });
        } else if (code === 10005) {
          toast({
            title: "用户被锁定",
            description: "请联系管理员解锁",
          });
        } else if (code === 10006) {
          toast({
            title: "用户被锁定",
            description: "请先重置密码再登录",
          });
        }
        return;
      }
      push("/");
    } catch (e) {
      console.error("loginWithPassword error", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };
  const { data: session } = useSession();
  return (
    <AuthLayout>
      <div className="flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-8 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-[28px] leading-6 text-gray-900"
                >
                  用户名(卡号)
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
                <p className="mt-1 text-sm text-gray-500">
                  用户名不包含空格，在复制用户名时建议再三确认
                </p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-[28px] leading-6 text-gray-900"
                >
                  密码
                </label>
                <div className="mt-2 relative">
                  <InputBorderSpotlight
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="px-3 block w-full rounded-xl border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showPassword ? "eye-slash" : "eye"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                {/* <div className="text-sm mt-4">
                  忘记密码或无法登录?
                  <Link
                    href="/auth/reset-password"
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    重置密码
                  </Link>
                </div> */}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  记住用户名和密码
                </label>
              </div>
              <div className="flex justify-start flex-col">
                <Link
                  href="/auth/reset-password"
                  className="block text-sm text-gray-900"
                >
                  重置密码
                </Link>
                {session?.user.sessionId ? (
                  <Link href="/" className="text-sm">
                    返回首页
                  </Link>
                ) : (
                  <></>
                )}
              </div>

              {/* {message && (
                  <p className="text-sm text-center text-red-600">{message}</p>
                )} */}

              <div>
                <button
                  onClick={() => {
                    loginWithPassword();
                  }}
                  className={twMerge(
                    "group relative h-12 flex w-full justify-center items-center rounded-xl bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden",
                    (!!signInByPasswordInputSchema.safeParse(form).error ||
                      loading) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  disabled={
                    !!signInByPasswordInputSchema.safeParse(form).error ||
                    loading
                  }
                >
                  <span className="hidden group-hover:block">
                    <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                  </span>
                  <span className="backdrop absolute inset-[1px] rounded-xl bg-primary transition-colors duration-200 group-hover:bg-primary/80" />
                  <span className="z-10">{loading ? "登录中..." : "登录"}</span>
                </button>
              </div>
            </div>

            {/* <p className="mt-6 text-center text-sm text-gray-500">
            没有账号?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold leading-6 text-primary hover:text-primary/80"
            >
              去注册
            </Link>
          </p> */}
          </div>
        </div>
      </div>
      <VerificationCodeModal account={form.account} />
      <BindEmailWithPasswordModal
        account={form.account}
        password={form.password}
      />
    </AuthLayout>
  );
}

function VerificationCodeModal({ account }: { account: string }) {
  const [otpLoginParams, setOtpLoginParams] = useState<
    z.infer<typeof signInWithVerificationCodeInputSchema>
  >({
    account,
    verificationCode: "",
  });
  const { push } = useRouter();

  const loginWithVerificationCode = async () => {
    const v = signInWithVerificationCodeInputSchema.safeParse(otpLoginParams);
    if (v.error) {
      throw v.error;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        account: otpLoginParams.account,
        verificationCode: otpLoginParams.verificationCode,
        loginType: "verification_code",
      });
      if (res?.error && parseInt(res.error, 10)) {
        const code = parseInt(res.error || "200", 10);
        if (code === 10001 || code === 10002) {
          toast({
            title: "验证码错误",
          });
        } else if (code === 10005) {
          toast({
            title: "用户被锁定",
            description: "请联系管理员解锁",
          });
        } else if (code === 10006) {
          toast({
            title: "用户被锁定",
            description: "请先重置密码再登录",
          });
        }
        return;
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    setOtpLoginParams((prev) => ({ ...prev, account }));
  }, [account]);

  return (
    <ModalMaster id="verification_code_modal">
      <div>
        <div className="p-5">
          <h3 className="font-bold text-lg">输入验证码</h3>
          <p className="text-black-400 text-sm mb-4">
            验证码已发送至邮箱，请输入验证码完成登录。
          </p>
          <InputOTP
            maxLength={6}
            value={otpLoginParams.verificationCode}
            onChange={(value: string) =>
              setOtpLoginParams((prev) => ({
                ...prev,
                verificationCode: value,
              }))
            }
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup className="gap-0 w-full">
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={0}
              />
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={1}
              />
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={2}
              />
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={3}
              />
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={4}
              />
              <InputOTPSlot
                className="h-12 w-full rounded-none first:rounded-l-md last:rounded-r-md"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-black-200 bg-black-50 p-5">
          <form method="dialog" className="w-full flex justify-between">
            <Button
              variant="outline"
              className="btn-sm"
              onClick={() => {
                (
                  document.getElementById(
                    "verification_code_modal"
                  ) as HTMLDialogElement
                ).close();
              }}
            >
              取消
            </Button>
            <Button
              className="btn-sm"
              onClick={async (event) => {
                event.preventDefault();
                await loginWithVerificationCode();
              }}
            >
              OK
            </Button>
          </form>
        </div>
      </div>
    </ModalMaster>
  );
}
