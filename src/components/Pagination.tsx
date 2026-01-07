import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 0) return null;

  // Generate page numbers with dots
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let last: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (last !== null) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <>
      {Number(totalPages) !== 1 && (
        <nav
          className="inline-flex items-center justify-center space-x-1 mt-6"
          aria-label="Pagination Navigation"
        >
          {/* Prev Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md border border-[#2A2F45] bg-[#0F172A] text-[#AEB9E1] 
          hover:bg-[#1E293B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition 
          ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            aria-label="Previous Page"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Page Numbers */}
          {pages.map((page, idx) =>
            page === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-3 py-2 select-none text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`px-4 py-2 rounded-md border text-sm font-medium focus:outline-none 
              focus:ring-2 focus:ring-[#38B6FF] transition 
              ${
                currentPage === page
                  ? "bg-[#38B6FF] border-[#38B6FF] text-white cursor-default"
                  : "border-[#2A2F45] bg-[#0F172A] text-[#AEB9E1] hover:bg-[#1E293B] hover:border-[#38B6FF] hover:text-white"
              }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md border border-[#2A2F45] bg-[#0F172A] text-[#AEB9E1] 
          hover:bg-[#1E293B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition 
          ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
            aria-label="Next Page"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
};

export default Pagination;
