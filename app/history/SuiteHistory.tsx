import dayjs from "dayjs";
import { getSuiteHistory } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowRightCircle, ChevronRight, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
function SuiteHistory({ suiteId }: { suiteId: string }) {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["suite-history", suiteId, currentPage, itemsPerPage],
    queryFn: () => getSuiteHistory({ currentPage, itemsPerPage, suiteId }),
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  if (!data?.data) return null;

  const totalPages = Math.ceil(data.data.total / itemsPerPage);
  console.log("totalPages", JSON.stringify(data.data));
  // Generate page numbers to show
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Always show first page
    items.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range to show up to maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (currentPage <= totalPages / 2) {
        endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);
      } else {
        startPage = Math.max(2, endPage - maxVisiblePages + 2);
      }
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push("ellipsis1");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push("ellipsis2");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  return (
    <div className="w-full h-full flex flex-col px-2 overflow-y-scroll">
      {data.data.items.map((item) => (
        <div
          key={item.practiceId}
          className="flex justify-center flex-col gap-4 py-4 border-b border-gray-200"
        >
          <div
            key={item.practiceId}
            className="flex flex-row w-full h-full justify-between"
          >
            <div className="flex flex-row gap-2 items-center">
              {item.submittedAt ? (
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    <span className="text-gray-500">已完成 </span>
                    <span className="text-gray-900 font-bold">
                      {item.score}分
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">未完成</span>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div>{dayjs(item.createdAt).format("YYYY-MM-DD")}</div>
              <ChevronRight
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  router.push(`/practice/${item.practiceId}`);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="w-full px-4 py-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {generatePaginationItems().map((pageNum, index) => (
              <PaginationItem key={`${pageNum}-${index}`}>
                {pageNum === "ellipsis1" || pageNum === "ellipsis2" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === pageNum}
                    onClick={() =>
                      setCurrentPage(parseInt(pageNum.toString(), 10))
                    }
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default SuiteHistory;
