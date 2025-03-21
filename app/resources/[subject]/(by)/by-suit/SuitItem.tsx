"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { startPracticeBySuit } from "./actions";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { BookOpen, Headphones } from "lucide-react";

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
  const description = `题目数量:${questionCount} • ${Math.floor(
    duration / 60
  )}分钟`;
  return (
    <div
      onClick={() => startPracticeBySuit(suit.id)}
      className="cursor-pointer p-6 rounded-xl hover:bg-red-50 hover:border-red-200 duration-200 border border-gray-200 min-h-[160px] group bg-white flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3">
        {/* 圆形图标部分 */}
        <div className="rounded-full bg-gray-100 text-gray-800 group-hover:bg-red-500 group-hover:text-white w-10 h-10 flex items-center justify-center font-medium text-lg duration-200">
          {index}
        </div>

        {/* 根据subject显示不同图标 */}
        {subject === "READING" ? (
          <BookOpen className="w-4 h-4" />
        ) : subject === "LISTENING" ? (
          <Headphones className="w-4 h-4" />
        ) : null}

        {/* 标题文本 */}
        <div className="text-lg font-medium text-gray-800">{suit.name}</div>

        {/* 描述文本 */}
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </div>
  );
}

export default SuitItem;
