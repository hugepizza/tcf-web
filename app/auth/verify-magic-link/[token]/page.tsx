"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useParams } from "next/navigation";

function VerifyMagicLinkPage() {
  const params = useParams();
  console.log("params", params.token);

  const [text, setText] = useState("verifying magic link...");
  useEffect(() => {
    signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      magicLinkToken: params.token,
      loginType: "magic_link",
    }).then((res) => {
      if (!res?.error) {
        setText("magic link verified, redirecting...");
        redirect("/");
      } else {
        setText("magic link verification failed");
      }
    });
  });

  return <div>{text}</div>;
}

export default VerifyMagicLinkPage;
