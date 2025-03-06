"use client";

import { emailRegexSafe } from "@/shared/schemas/base-schema";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendVerificationCode } from "@/app/auth/login/actions";
import { bindEmail } from "../actions";

function FirstBindEmail() {
  const [email, setEmail] = useState("");
  return (
    <label
      className={`input input-bordered  flex items-center gap-2 focus:outline-none focus:ring-0 `}
    >
      <input
        type="text"
        onClick={(e) => e.stopPropagation()}
        className="grow  focus:outline-none focus:ring-0"
        placeholder="输入邮箱"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button
        className="btn btn-primary btn-sm"
        disabled={!emailRegexSafe.test(email)}
        onClick={() => {
          toast.promise(sendVerificationCode(email), {
            loading: `发送验证码到${email}...`,
            success: () => {
              if (document) {
                (
                  document.getElementById(
                    "verify_first_bind_email_modal"
                  ) as HTMLDialogElement
                ).showModal();
              }
              return "发送成功";
            },
            error: (e) => `${e}`,
          });
        }}
      >
        发送验证码邮件
      </button>
      <VerifyFirstBindEmailModal email={email} onVerified={() => {}} />
    </label>
  );
}

export default FirstBindEmail;

function VerifyFirstBindEmailModal({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState("");
  return (
    <dialog
      id="verify_first_bind_email_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{`输入${email}收到的验证码`}</h3>
        <input value={otp} onChange={(e) => setOtp(e.currentTarget.value)} />
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn"
              onClick={(event) => {
                event.preventDefault();
                toast.promise(bindEmail(email, otp), {
                  loading: "验证中...",
                  success: () => {
                    if (document) {
                      (
                        document.getElementById(
                          "verify_first_bind_email_modal"
                        ) as HTMLDialogElement
                      ).close();
                    }
                    onVerified();
                    return "验证成功";
                  },
                  error: (e) => `${e}`,
                });
              }}
            >
              验证
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
