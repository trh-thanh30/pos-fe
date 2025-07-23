import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IProduct } from "@/hooks/useGetProducts";
import Link from "next/link";
import { truncText } from "@/utils";
export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <div className="relative w-fit">
        <div className="p-5 bg-gray-100 rounded-md">
          {product.images.length > 0 && product.images[0] && (
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.images[0]}
                width={192}
                height={192}
                alt="thumbnail"
                className="w-48 h-48 object-cover  hover:cursor-pointer hover:scale-105 transition-all du-"
              />
            </Link>
          )}
        </div>

        <div className="absolute top-2 right-2 bg-white p-2 rounded-full text-base text-gray-900">
          <CiHeart />
        </div>
        <h1 className="text-left text-base font-medium text-gray-900 mt-2">
          {truncText(product.name, 24)}
        </h1>
        <p className="text-xs text-gray-500 mt-1">{product.unit}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">4.5</span>
          <FaStar className="text-yellow-400 text-xs" />
          <FaStar className="text-yellow-400 text-xs" />
          <FaStar className="text-yellow-400 text-xs" />
          <FaStar className="text-yellow-400 text-xs" />
          <FaStar className="text-yellow-400 text-xs" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-base font-medium text-gray-900">
            {product.price.toLocaleString("vn")}đ
          </h2>
          <Link
            href={`/products/${product._id}`}
            className="text-xs hover:bg-gray-100 transition-colors duration-300  cursor-pointer text-gray-500 py-1 px-3 rounded-full border border-gray-300">
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
