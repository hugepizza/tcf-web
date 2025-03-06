import ChangeEmail from "./ChangeEmail";
import FirstBindEmail from "./FitstBindEmail";
import DisableSessions from "./DisableSessions";
import ChangePassword from "./ChangePassword";
import CopyableInput from "@/components/core/CopyableInput";
import { fetchQuery } from "@/lib/server-fetch";
import { z } from "zod";

const userInfoOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  isEmailChangedLimit: z.boolean(),
  isCurrentEmailVerifyReqiured: z.boolean(),
});

async function Profile() {
  const { data: userInfo } = await fetchQuery<
    z.infer<typeof userInfoOutputSchema>
  >({
    path: "/users",
  });
  if (!userInfo) {
    return <></>;
  }
  return (
    <div className="flex flex-col md:gap-4 md:flex-row rounded-xl w-full border-[#E4E7EC] border-[1px] pt-10 pb-16 px-8">
      <div className="grow mb-8 md:mb-0">
        <h1 className="text-sm font-bold text-[#58667E]">用户信息</h1>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm font-medium text-[#101010]">卡号</p>
          <CopyableInput
            className="input input-bordered h-12 focus:outline-none"
            value={userInfo.username}
          />
          <p className="text-sm font-medium text-[#101010]">Email</p>
          {userInfo.email ? (
            <ChangeEmail
              currentEmail={userInfo.email!}
              isChangeable={!userInfo.isEmailChangedLimit}
              isCurrentEmailVerifyReqiured={
                !userInfo.isCurrentEmailVerifyReqiured
              }
            />
          ) : (
            <FirstBindEmail />
          )}
        </div>
      </div>
      <div className="w-full md:w-1/4">
        <h1 className="text-sm font-bold text-[#58667E]">帐号操作</h1>
        <div className="mt-4 space-y-2">
          <ChangePassword currentEmail={userInfo.email} />
          <DisableSessions />
        </div>
      </div>
    </div>
  );
}

export default Profile;
