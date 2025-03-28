"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { startPracticeBySuit } from "./actions";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { BookOpen, Headphones } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SuiteHistory from "@/app/history/SuiteHistory";
import { useState } from "react";

function SuitItem({
  suit,
  index,
  questionCount,
  duration,

  subject,
}: {
  suit: { id: string; name: string };
  index: number;
  questionCount: number;
  duration: number;

  subject: string;
}) {
  const [showHistory, setShowHistory] = useState(false);
  const description = `题目数量:${questionCount} • ${Math.floor(
    duration / 60
  )}分钟`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full cursor-pointer p-6 rounded-xl hover:border-blue-200 duration-200 border border-gray-200 min-h-[160px] group bg-white hover:bg-gradient-to-b hover:from-[#5b22ff]/5 hover:to-[#2d68ff]/5 flex flex-col gap-3 overflow-hidden">
          <div className="flex flex-col gap-3 relative z-10">
            {/* 图标部分 */}
            <div className="flex justify-between items-center">
              {/* 圆形图标部分 */}
              <div className="rounded-full bg-gray-100 text-gray-800 group-hover:bg-blue-500 group-hover:text-white w-10 h-10 flex items-center justify-center font-medium text-lg duration-200">
                {index}
              </div>

              {/* 根据subject显示不同图标 */}
              <div className="flex items-center gap-1 text-gray-500">
                {subject === "READING" ? (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">écrite</span>
                  </>
                ) : subject === "LISTENING" ? (
                  <>
                    <Headphones className="w-4 h-4" />
                    <span className="text-sm">orale</span>
                  </>
                ) : null}
              </div>
            </div>

            {/* 标题文本 */}
            <div className="text-lg font-medium text-gray-800">{suit.name}</div>

            {/* 描述文本 */}
            <div className="text-sm text-gray-400">{description}</div>

            {/* 新增按钮组 */}
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className=" rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center cursor-pointer bg-gradient-to-b from-[#5081FF] to-[#2D68FF] text-white hover:text-white border-none shadow-[0_1px_4px_rgba(13,34,71,0.17),inset_0_0_0_1px_rgb(45,104,255),inset_0_0_0_2px_rgba(255,255,255,0.1)]"
              >
                开始做题
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className=" rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center cursor-pointer bg-gradient-to-b from-white/[.105] to-white/[.15] backdrop-blur-[20px] text-gray-600 hover:text-gray-800 border border-gray-200/75"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: "rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                }}
              >
                <Link href={`/answers/${suit.id}`}>答案</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        {!showHistory && (
          <>
            <DialogTitle className="hidden"></DialogTitle>
            {/* 新增的对话框内容 */}
            <div className="absolute rounded-t-lg inset-0 bg-gradient-to-b from-[#efe6fb] via-[#efe6fb] to-transparent pointer-events-none -z-10" />

            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>

            {/* 新增的可滚动内容区域 */}
            <div className="flex-1 overflow-y-auto">
              {/* 顶部图片和标题 */}
              <header className="flex flex-col items-center font-bold w-full">
                {subject === "READING" ? (
                  <BookOpen className="h-10 md:h-12 mt-6 md:mt-14 mb-2 md:mb-8 text-gray-800" />
                ) : subject === "LISTENING" ? (
                  <Headphones className="h-10 md:h-12 mt-6 md:mt-14 mb-2 md:mb-8 text-gray-800" />
                ) : subject === "WRITING" ? (
                  <AcademicCapIcon className="h-10 md:h-12 mt-6 md:mt-14 mb-2 md:mb-8 text-gray-800" />
                ) : null}

                <h2 className="md:mt-2 md:text-2xl text-gray-800 font-medium">
                  {suit.name}
                </h2>
              </header>

              {/* 考试信息部分 */}
              <section className="mt-10 mb-12">
                <div className="hidden md:flex shrink-0 py-4 px-6 bg-white border-y border-dashed border-gray-200 max-w-xl mx-auto text-sm">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-600">题目类型</p>
                    <p className="font-bold text-gray-900">
                      {subject} • 计时练习
                    </p>
                  </div>
                  <div className="space-y-1 ml-auto">
                    <p className="font-medium text-gray-600">题目数量和时长</p>
                    <p className="font-bold text-gray-900">{description}</p>
                  </div>
                </div>
              </section>

              {/* 考试说明部分 */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-5 mb-8">
                <div className="flex items-start gap-3">
                  <img
                    src="https://d15gkqt2d16c1n.cloudfront.net/testprep/static/icons/task.svg"
                    alt="task"
                    className="h-5 md:h-6 mt-0.5"
                  />
                  <div className="max-w-md space-y-1">
                    <p className="font-bold text-gray-900">考试范围</p>
                    <p className="text-gray-600">
                      此次测试只包含{subject}
                      部分的问题，你需要在限时中完成作答。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src="https://d15gkqt2d16c1n.cloudfront.net/testprep/static/icons/logoutInstructions.svg"
                    alt="logout"
                    className="h-5 md:h-6 mt-0.5"
                  />
                  <div className="max-w-md space-y-1">
                    <p className="font-bold text-gray-900">中途暂停</p>
                    <p className="text-gray-600">
                      你可以中途退出练习，退出期间时间不会继续计算，你可以在做题记录中随时返回本次练习。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src="https://d15gkqt2d16c1n.cloudfront.net/testprep/static/icons/documentText.svg"
                    alt="document"
                    className="h-5 md:h-6 mt-0.5"
                  />
                  <div className="max-w-md space-y-1">
                    <p className="font-bold text-gray-900">答案解析</p>
                    <p className="text-gray-600">
                      完成测试后，你可以查看详细的答案解析和测试报告。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src="https://d15gkqt2d16c1n.cloudfront.net/testprep/static/icons/lampCharge.svg"
                    alt="question type"
                    className="h-5 md:h-6 mt-0.5"
                  />
                  <div className="max-w-md space-y-1">
                    <p className="font-bold text-gray-900">题目类型</p>
                    <p className="text-gray-600">
                      所有题目均为选择题，类型只有单选，越靠后的题目难度越高，单位记分也越大。
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {showHistory && (
          <>
            <DialogTitle>历史记录</DialogTitle>
            <SuiteHistory suiteId={suit.id} />
          </>
        )}

        {/* 新增的底部按钮区域 */}
        <div className="flex justify-center gap-3 mt-auto pt-4 border-t bg-white">
          <form
            className="flex gap-3"
            action={() => startPracticeBySuit(suit.id)}
          >
            <Button
              type="submit"
              className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 text-md"
            >
              开始练习
            </Button>

            {!showHistory ? (
              <Button
                type="button"
                variant="outline"
                className=" text-gray-600 px-8 py-2 rounded-md text-md"
                onClick={() => setShowHistory(true)}
              >
                历史记录
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className=" text-gray-600 px-8 py-2 rounded-md text-md"
                onClick={() => setShowHistory(false)}
              >
                返回
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuitItem;
