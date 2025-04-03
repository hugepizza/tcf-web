"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";
import { DeleteOne } from "./Delete";
import { GradeTag } from "./Tag";
import { Subject } from "@/shared/enum";

function PracticeItem({
  score,
  index,
  date,
  suiteName,
  practiceMode,
  practiceId,
  subject,
}: {
  score: number | null;
  index: number;
  date: string;
  suiteName: string;
  practiceMode: string;
  practiceId: string;
  subject: Subject;
}) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="flex flex-row gap-[10px] hover:bg-[#FFF4EB] group duration-300 items-center justify-between">
        <div className="flex flex-row gap-[10px] items-center">
          <div className="font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-[#F2F2F2] text-[#8C8C8C] group-hover:bg-[#FF2442] group-hover:text-white duration-300">
            {index}
          </div>
          <Link href={`/practice/${practiceId}`}>{suiteName}</Link>
        </div>
        <div className="flex flex-row gap-[10px] items-center">
          <div>{dayjs(date).format("YYYY-MM-DD")}</div>
          <GradeTag score={score} practiceId={practiceId} subject={subject} />
          <DeleteOne practiceId={practiceId} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default PracticeItem;
