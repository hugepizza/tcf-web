"use client";
import toast, { Toaster } from "react-hot-toast";
import { disableAllSessions } from "../actions";

function DisableSessions() {
  return (
    <>
      <p
        className="link-primary cursor-pointer"
        onClick={() => {
          toast.promise(disableAllSessions(), {
            loading: "正在登出...",
            success: () => {
              return "当前设备已登出, 请重新登陆";
            },
            error: "Failed to disable sessions",
          });
        }}
      >
        登出所有设备
      </p>
      <Toaster />
    </>
  );
}

export default DisableSessions;
