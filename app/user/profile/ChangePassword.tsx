"use client";
import { sendVerificationCode } from "@/app/auth/login/actions";
import { emailRegexSafe } from "@/shared/schemas/base-schema";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { bindEmail, changePassword } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function ChangePassword({ currentEmail }: { currentEmail: string | null }) {
  return (
    <div>
      <p
        className="link-primary cursor-pointer"
        onClick={() => {
          if (!currentEmail) {
            (
              document.getElementById("bind_email_modal") as HTMLDialogElement
            ).showModal();
          } else {
            (
              document.getElementById(
                "change_password_modal"
              ) as HTMLDialogElement
            ).showModal();
          }
        }}
      >
        修改密码
      </p>
      <BindEmailModal />
      <ChangePasswordModal currentEmail={currentEmail} />
    </div>
  );
}

export default ChangePassword;

export function BindEmailModal() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendOTP = () => {
    toast.promise(sendVerificationCode(email), {
      loading: `发送验证码到${email}...`,
      success: () => {
        setCountdown(60);
        return "发送成功";
      },
      error: (e) => `${e}`,
    });
  };

  return (
    <dialog
      id="bind_email_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">需要先绑定邮箱</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1 focus:outline-none focus:ring-0"
              placeholder="输入邮箱"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value: string) => setOtp(value)}
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
            <button
              className="btn btn-primary w-32"
              disabled={countdown > 0}
              onClick={handleSendOTP}
            >
              {countdown > 0 ? `${countdown}s` : "发送验证码"}
            </button>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-primary btn-sm"
              disabled={!emailRegexSafe.test(email) || otp.length !== 6}
              onClick={(event) => {
                event.preventDefault();
                toast.promise(bindEmail(email, otp), {
                  loading: "绑定中...",
                  success: () => {
                    (
                      document.getElementById(
                        "bind_email_modal"
                      ) as HTMLDialogElement
                    ).close();
                    (
                      document.getElementById(
                        "change_password_modal"
                      ) as HTMLDialogElement
                    ).showModal();
                    return "绑定成功";
                  },
                  error: (e) => `${e}`,
                });
              }}
            >
              确认绑定
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export function ChangePasswordModal({
  currentEmail,
}: {
  currentEmail: string | null;
}) {
  const [otp, setOtp] = useState(""); // 验证码
  const [password, setPassword] = useState(""); // 密码
  const [repeatPassword, setRepeatPassword] = useState(""); // 重复密码
  const [countdown, setCountdown] = useState(0); // 倒计时
  const [showPassword, setShowPassword] = useState(false); // 是否显示密码
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // 是否显示重复密码
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendOTP = () => {
    if (!currentEmail) return;
    toast.promise(sendVerificationCode(currentEmail), {
      loading: "发送验证码邮件...",
      success: () => {
        setCountdown(60);
        return "验证码发送成功";
      },
      error: "Failed to send verification code",
    });
  };

  return (
    <dialog
      id="change_password_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box p-0">
        <div className="p-5">
          <h3 className="mb-3 text-lg font-medium text-gray-1200">修改密码</h3>
          <div className="space-y-4 mt-4">
            <div className="relative">
              <Input
                className={`input input-bordered w-full h-12 pr-10 transition-opacity duration-300 ${
                  showPassword ? "opacity-100" : "opacity-70"
                }`}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="输入密码 (至少6位,最多24位)"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input
                className={`input input-bordered w-full h-12 pr-10 transition-opacity duration-300 ${
                  showRepeatPassword ? "opacity-100" : "opacity-70"
                }`}
                value={repeatPassword}
                type={showRepeatPassword ? "text" : "password"}
                placeholder="重复密码"
                onChange={(e) => setRepeatPassword(e.currentTarget.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value: string) => setOtp(value)}
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
              <Button
                className="btn btn-primary w-32"
                disabled={countdown > 0}
                onClick={handleSendOTP}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
          </div>
        </div>
        <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-[#E9E9E9] bg-[#F3F4F6] p-5">
          <form method="dialog" className="w-full flex justify-between">
            <Button
              variant="outline"
              className="btn-sm"
              onClick={() => {
                (
                  document.getElementById(
                    "change_password_modal"
                  ) as HTMLDialogElement
                ).close();
              }}
            >
              返回
            </Button>
            <Button
              className="btn btn-primary btn-sm"
              disabled={
                otp.length !== 6 ||
                password.length < 6 ||
                password.length > 24 ||
                password !== repeatPassword
              }
              onClick={(event) => {
                event.preventDefault();
                toast.promise(changePassword(password, otp), {
                  loading: "修改中...",
                  success: () => {
                    (
                      document.getElementById(
                        "change_password_modal"
                      ) as HTMLDialogElement
                    ).close();
                    return "修改成功";
                  },
                  error: (e) => `${e}`,
                });
              }}
            >
              确认修改
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
