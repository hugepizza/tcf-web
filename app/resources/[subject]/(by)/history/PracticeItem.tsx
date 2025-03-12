"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";

function PracticeItem({
  score,
  index,
  date,
  suiteName,
  practiceMode,
  practiceId,
}: {
  score: number | null;
  index: number;
  date: string;
  suiteName: string;
  practiceMode: string;
  practiceId: string;
}) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="flex flex-row gap-[10px] hover:bg-[#FFF4EB] group duration-300 items-center justify-between">
        <div className="flex flex-row gap-[10px] items-center">
          <div className="font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-[#F2F2F2] text-[#8C8C8C] group-hover:bg-[#FF2442] group-hover:text-white duration-300">
            {index}
          </div>
          <div>{suiteName}</div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div>{dayjs(date).format("YYYY-MM-DD")}</div>
          {score ? (
            <div>{score}</div>
          ) : (
            <Link href={`/practice/${practiceId}`}>
              <div>继续答题</div>
            </Link>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default PracticeItem;
