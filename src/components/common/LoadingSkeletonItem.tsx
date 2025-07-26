import React from "react";

export default function LoadingSkeletonItem() {
  return Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="animate-pulse">
      <div className="relative w-fit">
        <div className="p-5 bg-gray-100 rounded-md">
          <div className="w-48 h-48 bg-gray-300 rounded-md" />
        </div>

        <div className="absolute top-2 right-2 bg-white p-2 rounded-full">
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
        </div>

        <div className="mt-2 space-y-2">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-3 bg-gray-300 rounded" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-300 rounded" />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="w-16 h-4 bg-gray-300 rounded" />
            <div className="w-20 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ));
}
