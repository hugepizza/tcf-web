"use client";

import { emailRegexSafe } from "@/shared/schemas/base-schema";
import { useState } from "react";
import { bindEmailWithPassword, sendVerificationCode } from "./actions";
import toast from "react-hot-toast";
import ModalMaster from "@/components/modal/modal-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function BindEmailWithPasswordModal({
  account,
  password,
}: {
  account: string;
  password: string;
}) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    try {
      await sendVerificationCode(email);
      startCountdown();
    } catch (e) {
      throw e;
    }
  };
  const { push } = useRouter();

  return (
    <ModalMaster id="verify_bind_email_with_password_modal">
      <div className="">
        <div className="p-5">
          <h3 className="text-lg font-medium text-black-500">绑定邮箱</h3>
          <p className="text-black-400 text-sm mb-4">
            您的账号存在安全风险，为了保障您的正常使用，请绑定邮箱。
          </p>
          <div className="space-y-4">
            <div className="relative flex items-center gap-2">
              <Input
                type="text"
                onClick={(e) => e.stopPropagation()}
                className="input h-12 input-bordered border-black-200 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="输入邮箱"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Button
                variant="outline"
                className="btn-sm h-12 min-w-[80px] border-black-200 whitespace-nowrap shrink-0"
                disabled={!emailRegexSafe.test(email) || countdown > 0}
                onClick={() => {
                  toast.promise(handleSendOTP(), {
                    loading: `发送验证码到${email}...`,
                    success: () => {
                      if (document) {
                        (
                          document.getElementById(
                            "verify_bind_email_with_password_modal"
                          ) as HTMLDialogElement
                        ).showModal();
                      }
                      return "发送成功";
                    },
                    error: (e) => `${e}`,
                  });
                }}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>

            <Input
              className="input h-12 input-bordered border-black-200 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={verificationCode}
              placeholder="输入验证码"
              onChange={(e) => setVerificationCode(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-black-200 bg-black-50 p-5">
          <form method="dialog" className="w-full flex justify-between">
            <Button variant="outline" className="btn-sm">
              取消
            </Button>
            <Button
              className="btn btn-primary btn-sm"
              onClick={(event) => {
                event.preventDefault();
                toast.promise(
                  bindEmailWithPassword(
                    email,
                    account,
                    password,
                    verificationCode
                  ),
                  {
                    loading: "验证中...",
                    success: () => {
                      if (document) {
                        (
                          document.getElementById(
                            "verify_bind_email_with_password_modal"
                          ) as HTMLDialogElement
                        ).close();
                      }
                      push("/auth/login");
                      return "验证成功, 请重新登录";
                    },
                    error: (e) => `${e}`,
                  }
                );
              }}
            >
              验证
            </Button>
          </form>
        </div>
      </div>
    </ModalMaster>
  );
}

export default BindEmailWithPasswordModal;
