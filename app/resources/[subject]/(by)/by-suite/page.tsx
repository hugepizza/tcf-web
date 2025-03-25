import { apiUrl } from "@/lib/api";

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

async function ResourcesPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { subject } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 12;

  const response = await fetch(
    apiUrl(
      `/resources/by-suite?subject=${subject.toUpperCase()}&page=${currentPage}&pageSize=${itemsPerPage}`
    )
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
    <>
      <div className="grow overflow-y-scroll px-2 sm:px-10 py-4 sm:py-10 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.data.items.map((item, index) => (
            <SuitItem
              key={item.id}
              suit={item}
              index={index + 1}
              questionCount={item.questionCount}
              duration={item.duration}
              subject={subject.toUpperCase()}
            />
          ))}
        </div>
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
