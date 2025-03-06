import { DefaultSession, User, Session } from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { apiUrl } from "@/lib/api";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

// 扩展 `User` 类型
declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    sessionId: string;
  }
  interface Session {
    user: { sessionId: string; id: string } & DefaultSession["user"];
  }
}

function getCookieValue(cookieStr: string, key: string): string | null {
  const match = cookieStr.match(new RegExp(`${key}=([^;]+)`));
  return match ? match[1] : null;
}

// export class CustomAuthError extends AuthorizeError {
//   code: number;

//   constructor(message?: string, code?: number) {
//     super(message);
//     this.code = code || 200;
//   }
// }

const authConfig: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "User Name",
      credentials: {
        account: {
          label: "用户名/邮箱",
          type: "text",
        },
        password: { label: "密码", type: "password" },
        verificationCode: { label: "验证码", type: "text" },
        magicLinkToken: { label: "Magic Link Token", type: "text" },
        loginType: {},
      },

      async authorize(credentials) {
        const {
          account,
          loginType,
          verificationCode,
          password,
          magicLinkToken,
        } = credentials || {};

        if (!account && loginType !== "magic_link") {
          throw new Error("Login account cannot be empty");
        }
        const path =
          loginType == "verification_code"
            ? "/auth/user/sign-in-by-email"
            : loginType == "magic_link"
            ? "/auth/user/sign-in-by-magic-link"
            : loginType == "2fa"
            ? "/auth/user/sign-in-by-2fa"
            : "/auth/user/sign-in";
        console.log("path", path);

        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              account,
              verificationCode,
              password,
              token: magicLinkToken,
            }),
          };

          const response = await fetch(apiUrl(path), options);
          const cookie = response.headers.get("set-cookie");
          const sessionId = getCookieValue(cookie || "", "sessionId") || "";

          if (response.status === 200) {
            const res = await response.json();
            if (res.code && res.code !== 200) {
              return { error: `${res.code}`, sessionId: "", id: "" };
            }
            const userInfo = {
              id: res.data?.userId,
              name: res.data?.userAlias,
              sessionId,
            };
            return userInfo;
          } else {
            throw new Error("request failed");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", //sigin page
    error: "/auth/login",
  },
  callbacks: {
    async signIn({ user }: { user: User & { error?: string } }) {
      if (user?.error) {
        throw new Error(user.error);
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.name = user.name;
        token.sessionId = user.sessionId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.name = token.name;
      session.user.sessionId = token.sessionId as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default authConfig;
