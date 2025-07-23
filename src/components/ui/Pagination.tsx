import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pageSize: number;
}

export default function Pagination({
  pagination,
  onPageChange,
  isPending,
}: {
  pagination: IPagination;
  onPageChange: (page: number) => void;
  isPending: boolean;
}) {
  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      onPageChange(pagination.currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (pagination.currentPage > 1) {
      onPageChange(pagination.currentPage - 1);
    }
  };
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i < pagination.totalPages + 1; i++) {
      pages.push(1);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePrev}
        disabled={pagination.currentPage === 1 || isPending}
        className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-300
          disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer">
        <BsArrowLeft />
      </button>
      <div className="flex items-center gap-2">
        {generatePageNumbers().map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={pagination.currentPage === index + 1 || isPending}
            className={`w-4 h-4 p-4 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center text-sm rounded-full  transition-colors duration-300
            ${
              pagination.currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={pagination.currentPage === pagination.totalPages || isPending}
        className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-300
          disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer">
        <BsArrowRight />
      </button>
    </div>
  );
}
