import React from "react";

export default function DashAnalytics() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Control panel
          </h1>
          <span className="text-xs font-medium text-gray-400">
            Overview of store operations
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Updated at: {new Date().toLocaleString()}
        </span>
      </div>
    </>
  );
}
