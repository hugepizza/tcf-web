import { apiUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import SuitItem from "./SuitItem";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import NavItem from "@/components/Header/Universal/NavItem";
import { Subject } from "@/shared/enum";
import { AlignLeft } from "lucide-react";

async function ResourcesPage({
  params,
  searchParams,
}: {
  params: Promise<{ by: string; subject: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { by, subject } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 10;

  if (by !== "by-suit") {
    notFound();
  }
  const response = await fetch(
    apiUrl(`/resources/${by}?subject=${subject.toUpperCase()}`)
  );
  const data = (await response.json()) as {
    data: {
      items: any[];
      total: number;
    };
  };

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
    <div className="gap-3 h-full flex flex-col">
      <div className="border-b-[1px] border-[#F2F2F2] px-3 py-4 flex flex-row items-center justify-start bg-white">
        <div className="h-12 flex flex-row items-center justify-start">
          <div className="flex flex-row items-center justify-center gap-2 text-lg font-semibold">
            <AlignLeft className="w-6 h-6" />
            {subject === Subject.READING.toLocaleLowerCase() ? "阅读" : "听力"}
          </div>
          <div className="w-8" />
          <NavItem text="按套题分组" path="/resources/by-suit" active={true} />
        </div>
      </div>

      <div className="grow overflow-y-scroll px-10 py-2">
        <Table className="bg-white grow">
          <TableBody>
            {data.data.items.map((item, index) => (
              <SuitItem key={item.id} suit={item} index={index + 1} />
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
    </div>
  );
}

export default ResourcesPage;
