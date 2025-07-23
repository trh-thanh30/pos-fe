"use client";
import useGetProducts from "@/hooks/useGetProducts";
import React, { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "../ui/Pagination";

export default function Products({
  hasPagination,
  hasSort,
}: {
  hasPagination?: boolean;
  hasSort?: boolean;
}) {
  const [valueSort, setValueSort] = useState<string>("");
  const {
    pagination,
    handleSetPage,
    isPending,
    products,
    handleSetSort,
    loading,
  } = useGetProducts();

  return (
    <>
      {hasSort && (
        <div className=" flex items-center justify-between mt-16 mb-10">
          <h1 className="text-2xl text-gray-800 font-medium">
            All products
            <div className="w-28 h-0.5   bg-orange-600 mt-1"></div>
          </h1>

          <select
            value={valueSort}
            onChange={(e) => {
              setValueSort(e.target.value);
              handleSetSort(e.target.value);
            }}
            className="text-xs text-gray-600 font-medium border border-gray-300 py-2 px-6 outline-none rounded-md cursor-pointer"
            name=""
            id="">
            <option defaultChecked value="asc">
              Sort by date (new to old)
            </option>
            <option value="desc">Sort by date (old to new)</option>
            <option value="price-asc">Sort by price (low to high)</option>
            <option value="price-desc">Sort by price (high to low)</option>
            <option value="stock-asc">Sort by stock (low to high)</option>
            <option value="stock-desc">Sort by stock (high to low)</option>
          </select>
        </div>
      )}
      <ProductList products={products} loading={loading} />
      {hasPagination ? (
        <>
          {pagination && (
            <div className="flex items-center justify-center mt-14 mb-8">
              <Pagination
                pagination={pagination}
                onPageChange={handleSetPage}
                isPending={isPending}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
