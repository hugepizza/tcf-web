"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { startPracticeBySuit } from "./actions";

function SuitItem({
  suit,
  index,
}: {
  suit: { id: string; name: string };
  index: number;
}) {
  return (
    <TableRow
      onClick={() => startPracticeBySuit(suit.id)}
      className="cursor-pointer"
    >
      <TableCell className="flex flex-row gap-2 hover:bg-[#FFF4EB] group duration-300 items-center">
        <div className="font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-[#F2F2F2] text-[#8C8C8C] group-hover:bg-[#FF2442] group-hover:text-white duration-300">
          {index}
        </div>
        {suit.name}
      </TableCell>
    </TableRow>
  );
}

export default SuitItem;
