"use client";
import useGetProducts, { IProduct } from "@/hooks/useGetProducts";
import api from "@/services/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const { products, loading } = useGetProducts();
  const user = useSelector((state: RootState) => state.auth.user);
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${productId}`);
      if (res.status === 200) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const handleAddToCart = async () => {
    try {
      const res = await api.post("/cart", {
        productId: product._id,
        userId: user?._id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-2 px-5 lg:px-16 xl:px-20">
          <div className="rounded-md p-4 bg-gray-50 w-full h-full">
            {product.images && (
              <Image
                src={product.images[0]}
                alt="thumbnail"
                width={320}
                height={312}
                className="w-[320px] h-[312px] object-cover "
              />
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            {product.images &&
              product.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 p-2">
                  <Image
                    src={image}
                    width={80}
                    height={80}
                    alt="thumbnail"
                    className="w-full h-full object-cover hover:scale-105 duration-300 transition-all cursor-pointer"
                  />
                </div>
              ))}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-700">
            {product.name}
          </h1>
          <div className="flex items-center gap-1 mt-4">
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <span className="text-base text-gray-600 ml-2">(4.5)</span>
          </div>
          <p className="text-base text-gray-600 font-medium mt-3">
            {product.description}
          </p>
          <h2 className="text-3xl font-semibold text-gray-700 mt-4">
            {product.price?.toLocaleString("vn", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
          <hr className="border border-gray-300 my-6" />
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-10">
              <span className="text-base text-gray-600 font-medium">Unit</span>
              <span className="text-base text-gray-400 font-medium">
                {product.unit}
              </span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-base text-gray-600 font-medium">Sku</span>
              <span className="text-base text-gray-400 font-medium">
                {product.sku}
              </span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-base text-gray-600 font-medium">Stock</span>
              <span className="text-base text-gray-400 font-medium">
                {product.stock}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="py-3 px-5 cursor-pointer font-medium rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-300 w-full">
              Add to cart
            </button>
            <button className="py-3 px-5 cursor-pointer font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 w-full">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <h2 className="mt-32 text-3xl  text-center text-gray-700 font-semibold">
        Featured <span className="text-orange-500">Products</span>
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-28 h-0.5 bg-orange-600 mt-2 mb-10"></div>
      </div>
      <ProductList products={products} loading={loading} />
    </>
  );
}
