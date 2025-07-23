import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useGetProducts from "@/hooks/useGetProducts";
import { truncText } from "@/utils";
import LoadingSpinner from "../common/LoadingSpinner";
export default function InputSearch() {
  const { products, handleSetSearch, query, loading, debouncedSearch } =
    useGetProducts({
      searchOnly: true,
    });
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const handleOpenDropDown = () => setIsOpenDropdown(true);
  const handleCloseDropDown = () => setIsOpenDropdown(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCloseDropDown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        onClick={handleOpenDropDown}
        onChange={(e) => handleSetSearch(e.target.value)}
        value={query.search}
        type="search"
        placeholder="Search something..."
        className="border font-medium border-gray-300 w-72 py-2 px-6 rounded-md outline-none text-xs   text-gray-600 placeholder:text-gray-400"
      />
      <>
        <div
          className={`absolute  translate-y-2 z-10 duration-300 transition-all w-full bg-white rounded-md shadow-2xl opacity-0 invisible  shadow-white h-fit ${
            isOpenDropdown && "opacity-100 visible"
          }`}>
          {debouncedSearch.trim() === "" ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-gray-900 font-medium">
              Please type something...
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 p-2 w-full">
                {loading ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      <>
                        {products.map((product) => (
                          <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            className="flex items-center gap-3 w-full hover:bg-gray-100 duration-300 transition-colors p-2">
                            <div className="p-2 rounded-md bg-white">
                              {product.images.length > 0 &&
                                product.images[0] && (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={42}
                                    height={42}
                                    className="object-cover"
                                  />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex items-center justify-between w-full">
                                <h1 className="text-sm text-gray-800 font-medium">
                                  {truncText(product.name, 16)}
                                </h1>
                                <h2 className="text-sm text-gray-800 font-medium">
                                  {product.price.toLocaleString("vn")}đ
                                </h2>
                              </div>
                              <span className="text-xs text-gray-500">
                                Stock:{" "}
                                <span className="font-medium ">
                                  {product.stock}
                                </span>
                              </span>
                            </div>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-[200px] text-sm text-gray-900 font-medium">
                        No products found
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}
