"use client";
import React from "react";
import ProductItem from "./ProductItem";
import { IProduct } from "@/hooks/useGetProducts";
import LoadingSkeletonItem from "../common/LoadingSkeletonItem";

export default function ProductList({
  products,
  loading,
}: {
  products: IProduct[];
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-5 gap-4  ">
      {loading ? (
        <>
          <LoadingSkeletonItem />
        </>
      ) : (
        <>
          {products?.length > 0 && (
            <>
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
