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
import { Input } from "@/components/ui/input";

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
        <div className="relative flex w-full max-w-[25rem] flex-1 flex-col justify-center gap-y-6">
          <main className="relative grid flex-1 border-0 bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5">
            <div className="relative min-h-[calc(545/16*1rem)] flex flex-col items-stretch gap-8 transition-all duration-200 text-center px-10 py-8 justify-center content-center">
              <div className="relative z-20">
                <h2 className="mt-8 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
                  登录
                  <div className="text-sm text-gray-500 mt-1 font-normal">
                  Se connecter
                  </div>
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6 text-left">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-[28px] leading-6 text-gray-900"
                    >
                      用户名(卡号)
                    </label>
                    <div className="mt-2">
                      <Input
                        value={form.account}
                        onChange={(e) => setForm({ ...form, account: e.target.value })}
                        id="email"
                        type="text"
                        required
                        className="px-3 py-1.5 bg-white text-[rgb(19,19,22)] outline-2 outline-transparent outline-offset-2 max-h-9 w-full accent-[rgb(104,66,255)] font-normal text-[0.8125rem] leading-[1.38462] rounded-[0.375rem] border border-[rgba(0,0,0,0.11)] shadow-[0_0_1px_0_rgba(0,0,0,0.07)] transition-all duration-200 ease-in-out"
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
                      <Input
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="
                          px-3 
                          py-1.5 
                          bg-white 
                          text-[rgb(19,19,22)]
                          outline-2 
                          outline-transparent 
                          outline-offset-2
                          max-h-9 
                          w-full 
                          accent-[rgb(104,66,255)]
                          font-normal 
                          text-[0.8125rem] 
                          leading-[1.38462]
                          rounded-[0.375rem]
                          border 
                          border-[rgba(0,0,0,0.11)]
                          shadow-[0_0_1px_0_rgba(0,0,0,0.07)]
                          transition-all 
                          duration-200 
                          ease-in-out
                        "
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

                  {/* {message && (
                  <p className="text-sm text-center text-red-600">{message}</p>
                )} */}

                  <div>
                    <button
                      onClick={() => {
                        loginWithPassword();
                      }}
                      className={twMerge(
                        "group inline-block rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center cursor-pointer bg-gradient-to-b from-[#5081FF] to-[#2D68FF] text-white h-10 w-full",
                        (!!signInByPasswordInputSchema.safeParse(form).error ||
                          loading) &&
                        "opacity-50 cursor-not-allowed"
                      )}
                      style={{boxShadow: "rgba(13, 34, 71, 0.17) 0px 1px 4px, rgb(45, 104, 255) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 2px inset"}}
                      disabled={
                        !!signInByPasswordInputSchema.safeParse(form).error ||
                        loading
                      }
                    >
                      <span className="z-10">{loading ? "登录中..." : "登录"}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div className="flex box-border flex-col items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),linear-gradient(rgb(255,255,255),rgb(255,255,255))] rounded-b-xl h-12">
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/reset-password"
                  className="text-blue-600 hover:text-blue-600/80 font-medium text-sm"
                >
                  重置密码
                </Link>
                {session?.user.sessionId && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 text-sm">你已经登录，可以</span>
                    <Link
                      href="/"
                      className="text-blue-600 hover:text-blue-600/80 font-medium text-sm"
                    >
                      返回首页
                    </Link>
                  </>
                )}
              </div>
            </div>
          </main>
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
