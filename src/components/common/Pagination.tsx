import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // how many pages around current

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1); // first page always

    if (currentPage > delta + 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - (delta + 1)) {
      pages.push("...");
    }

    pages.push(totalPages); // last page always
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev button */}
      <button
        className="px-3 py-2 rounded-lg bg-white dark:bg-dropdown hover:scale-105 disabled:opacity-50 cursor-pointer"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BiChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`dots-${idx}`}
            className="px-3 py-2 text-gray-500 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(Number(page))}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              currentPage === page
                ? "bg-primary text-white shadow-md"
                : "bg-white dark:bg-dropdown hover:scale-105"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next button */}
      <button
        className="px-3 py-2 rounded-lg bg-white dark:bg-dropdown hover:scale-105 disabled:opacity-50 cursor-pointer"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BiChevronRight size={18} />
      </button>
    </div>
  );
}
