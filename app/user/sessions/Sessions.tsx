"use client";
import { z } from "zod";
import { useState } from "react";
import { UAParser } from "ua-parser-js";
import { disableAllSessions, disableSessions } from "../actions";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/core/ModalDialog";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { toast } from "@/hooks/use-toast";
import { getSessionsOutputSchema } from "@/shared/schemas/auth";

function Sessions({
  sessions,
}: {
  sessions: z.infer<typeof getSessionsOutputSchema>;
}) {
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutAll = async () => {
    setIsOpen(false);
    await disableAllSessions();
    toast({
      title: "当前设备已登出, 请重新登陆",
    });
  };

  return (
    <div className="w-full box-border rounded-xl border border-[#E4E7EC] pt-10 pb-16 px-8">
      <div className="w-full mb-6 overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>设备信息</th>
                <th>日期</th>
                <th>地点</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sessions.items.map((session) => (
                <tr key={session.id}>
                  <th>
                    <label>
                      <input
                        disabled={session.isCurrent}
                        onChange={() => {}}
                        type="checkbox"
                        className="checkbox"
                        checked={selectIds.includes(session.id)}
                        onClick={() => {
                          if (selectIds.includes(session.id)) {
                            setSelectIds(
                              selectIds.filter((id) => id !== session.id)
                            );
                          } else {
                            setSelectIds([...selectIds, session.id]);
                          }
                        }}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-2">
                      {session.isCurrent && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          当前设备
                        </span>
                      )}
                      <span>{`${UAParser(session.ua).browser.name}, ${
                        UAParser(session.ua).os.name
                      }`}</span>
                    </div>
                  </td>
                  <td>
                    {dayjs(session.lastActicveAt).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td>{`${session.city}, ${session.country}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap justify-between items-center mt-4">
        <Button
          className="btn btn-primary btn-sm"
          disabled={selectIds.length === 0}
          onClick={async () => {
            await disableSessions(selectIds);
            toast({
              title: "登出成功",
            });
          }}
        >
          登出已选项
        </Button>

        <ModalDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={<Button className="btn btn-primary btn-sm">登出全部</Button>}
          title="确认登出全部设备？"
          footer={
            <>
              <Dialog.Close asChild>
                <button className="h-9 rounded-md bg-white px-4 text-sm font-medium text-gray-900 shadow-sm focus:outline-none">
                  取消
                </button>
              </Dialog.Close>
              <button
                className="h-9 rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow-sm focus:outline-none"
                onClick={handleLogoutAll}
              >
                确认登出
              </button>
            </>
          }
        >
          <div className="text-gray-600">
            <span>
              此操作将登出所有设备，包括当前设备。您需要重新登录才能继续使用。
            </span>
          </div>
        </ModalDialog>
      </div>
    </div>
  );
}

export default Sessions;
