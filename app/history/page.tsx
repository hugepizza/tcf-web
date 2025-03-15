import { apiUrl } from "@/lib/api";
import PracticeItem from "./PracticeItem";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody } from "@/components/ui/table";
import { fetchQuery } from "@/lib/server-fetch";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import HeaderServer from "@/components/Header/Universal";
import { deletePractice } from "./actions";
import { DeleteAll } from "./Delete";
async function ResourcesPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page, status } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 10;

  const data = await fetchQuery<{
    items: {
      practiceId: string;
      suiteName: string;
      practiceMode: string;
      createdAt: string;
      score: number | null;
    }[];
    total: number;
  }>({
    path: `/practices/history?page=${currentPage}&pageSize=${itemsPerPage}&status=${status}`,
  });
  if (data.error) {
    notFound();
  }

  const totalPages = Math.ceil(data.data.total / itemsPerPage);

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
    <>
      <HeaderServer />
      <div className="grow overflow-y-scroll px-4 sm:px-16 py-2 gap-4">
        <div className="h-8" />
        <div className="text-4xl font-bold">答题历史</div>
        <div className="h-8" />
        <div className="flex flex-row gap-2 justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger defaultChecked asChild value="all">
                <Link href="?status=all">全部记录</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="in_progress">
                <Link href="?status=in_progress">未完成作答</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <DeleteAll disabled={data.data.items.length === 0} />
        </div>
        <Table className="bg-white grow">
          <TableBody>
            {data.data.items.map((item, index) => (
              <PracticeItem
                key={item.practiceId}
                practiceId={item.practiceId}
                score={item.score}
                index={index + 1}
                date={item.createdAt}
                suiteName={item.suiteName}
                practiceMode={item.practiceMode}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full px-4 py-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
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
                    href={`?page=${pageNum}`}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages ? `?page=${currentPage + 1}` : "#"
                }
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
    </>
  );
}

export default ResourcesPage;
