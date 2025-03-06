"use client";

import { emailRegexSafe } from "@/shared/schemas/base-schema";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import { changeEmail, verifyCurrentEmail } from "../actions";
import toast, { Toaster } from "react-hot-toast";
import { sendVerificationCode } from "@/app/auth/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ChangeEmail({
  currentEmail,
  isChangeable,
  isCurrentEmailVerifyReqiured,
}: {
  currentEmail: string;
  isChangeable: boolean;
  isCurrentEmailVerifyReqiured: boolean;
}) {
  const [editing, setEditing] = useState(!isCurrentEmailVerifyReqiured);
  const [newEmail, setnewEmail] = useState("");

  const handleSendCurrentEmailOTP = async () => {
    try {
      await sendVerificationCode(currentEmail);
      if (document) {
        (
          document.getElementById("verify_email_modal") as HTMLDialogElement
        ).showModal();
      }
      toast.success("发送成功");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleSendNewEmailOTP = async () => {
    try {
      await sendVerificationCode(currentEmail);
      if (document) {
        (
          document.getElementById("verify_new_email_modal") as HTMLDialogElement
        ).showModal();
      }
      toast.success("发送成功");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="relative">
      <label
        className={`h-12 flex rounded-lg items-center focus:outline-none focus:ring-0 ${
          editing ? "" : "bg-[#F8F8F8]"
        }`}
      >
        <Input
          type="text"
          onClick={(e) => e.stopPropagation()}
          className="border-none h-12"
          disabled={!editing}
          placeholder="输入新邮箱"
          onChange={(e) => setnewEmail(e.target.value)}
          value={editing ? newEmail : currentEmail || "No email"}
        />
        {isChangeable &&
          (editing ? (
            <Button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm transition-colors"
              disabled={!emailRegexSafe.test(newEmail)}
              onClick={() => {
                if (document) {
                  (
                    document.getElementById(
                      "send_new_email_confirm_modal"
                    ) as HTMLDialogElement
                  ).showModal();
                }
              }}
            >
              发送验证码邮件
            </Button>
          ) : (
            <PenIcon
              className="cursor-pointer text-gray-500 mr-3"
              size={16}
              onClick={() => {
                if (document) {
                  (
                    document.getElementById(
                      "send_current_email_confirm_modal"
                    ) as HTMLDialogElement
                  ).showModal();
                }
              }}
            />
          ))}
        <VerifyCurrentEmailModal onVerified={() => setEditing(true)} />
        <VerifyNewEmailModal
          email={newEmail}
          onVerified={() => setEditing(false)}
        />

        {/* 当前邮箱验证码确认对话框 */}
        <dialog
          id="send_current_email_confirm_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box p-0">
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#111827]">修改邮箱</h3>
              <p className="py-4 text-[#6B7280]">
                修改邮箱需要先发送验证码到当前邮箱 {currentEmail} ，请确认发送。
              </p>
            </div>
            <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-[#E9E9E9] bg-[#F3F4F6] p-5">
              <form method="dialog" className="w-full flex justify-between">
                <Button
                  variant="outline"
                  className="btn-sm"
                  onClick={() => {
                    (
                      document.getElementById(
                        "send_current_email_confirm_modal"
                      ) as HTMLDialogElement
                    ).close();
                  }}
                >
                  取消
                </Button>
                <Button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (document) {
                      (
                        document.getElementById(
                          "send_current_email_confirm_modal"
                        ) as HTMLDialogElement
                      ).close();
                    }
                    toast.promise(handleSendCurrentEmailOTP(), {
                      loading: "发送验证码到当前邮箱中...",
                      success: null,
                      error: null,
                    });
                  }}
                >
                  确认发送
                </Button>
              </form>
            </div>
          </div>
        </dialog>

        {/* 新邮箱验证码确认对话框 */}
        <dialog
          id="send_new_email_confirm_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box p-0">
            <div className="p-5">
              <h3 className="text-lg font-medium">确认发送验证码</h3>
              <p className="py-4">确定要发送验证码到新邮箱 {newEmail} 吗？</p>
            </div>
            <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-[#E9E9E9] bg-[#F3F4F6] p-5">
              <form method="dialog" className="flex justify-between w-full">
                <Button variant="outline">取消</Button>
                <Button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    if (document) {
                      (
                        document.getElementById(
                          "send_new_email_confirm_modal"
                        ) as HTMLDialogElement
                      ).close();
                    }
                    toast.promise(handleSendNewEmailOTP(), {
                      loading: `发送验证码到${newEmail}...`,
                      success: null,
                      error: null,
                    });
                  }}
                >
                  确认发送
                </Button>
              </form>
            </div>
          </div>
        </dialog>

        <Toaster />
      </label>
    </div>
  );
}

export default ChangeEmail;

function VerifyCurrentEmailModal({ onVerified }: { onVerified: () => void }) {
  const [otp, setOtp] = useState("");
  return (
    <dialog
      id="verify_email_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box p-0">
        <div className="p-5">
          <h3 className="mb-3 text-lg font-medium">当前邮箱验证码</h3>
          <p className="text-[#6B7280] mb-4">
            请在下方输入框内输入当前邮箱收到的验证码
          </p>
          <Input value={otp} onChange={(e) => setOtp(e.currentTarget.value)} />
        </div>
        <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-[#E9E9E9] bg-[#F3F4F6] p-5">
          <form method="dialog" className="w-full flex justify-between">
            <Button variant="outline">取消</Button>
            <Button
              className=""
              onClick={(event) => {
                event.preventDefault();
                toast.promise(verifyCurrentEmail(otp), {
                  loading: "验证中...",
                  success: () => {
                    if (document) {
                      (
                        document.getElementById(
                          "verify_email_modal"
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
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

function VerifyNewEmailModal({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState("");
  return (
    <dialog
      id="verify_new_email_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box p-0">
        <div className="p-5">
          <h3 className="mb-3 text-lg font-medium">{`输入${email}收到的验证码`}</h3>
          <p className="text-[#6B7280] mb-4">
            请在下方输入框内输入新邮箱收到的验证码
          </p>
          <Input value={otp} onChange={(e) => setOtp(e.currentTarget.value)} />
        </div>
        <div className="modal-action mt-4 flex justify-between rounded-b-xl border-t border-[#E9E9E9] bg-[#F3F4F6] p-5">
          <form method="dialog">
            <Button
              className=""
              onClick={(event) => {
                event.preventDefault();
                toast.promise(changeEmail(email, otp), {
                  loading: "验证中...",
                  success: () => {
                    if (document) {
                      (
                        document.getElementById(
                          "verify_new_email_modal"
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
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
