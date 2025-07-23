"use client";
import React, { useRef } from "react";
import upload_img from "@/../public/upload_img.png";
import Image from "next/image";
import InputPrimary from "../ui/InputPrimary";
import { CgClose } from "react-icons/cg";
import LoadingSpinner from "../common/LoadingSpinner";
import useAddProduct from "@/hooks/useAddProduct";
import useGetProducts from "@/hooks/useGetProducts";
export default function FormModalAddProduct({ close }: { close: () => void }) {
  const { fetchProducts } = useGetProducts();
  const {
    loading,
    images,
    handleChangeFile,
    handleAddProduct,
    handleChange,
    setImages,
  } = useAddProduct({ close, fetchProducts });
  const ref = useRef<HTMLInputElement>(null);
  const handleRemoveImage = (index: number) => {
    setImages((prevImage) => prevImage.filter((_, i) => i !== index));
  };
  return (
    <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-gray-800 font-medium text-sm">
          Product Image
        </label>
        <div className="flex items-center gap-4">
          <Image
            src={upload_img}
            alt="upload"
            className="max-w-24 object-cover border-dotted border-gray-100 mt-2 cursor-pointer hover:border-gray-300 transition-colors duration-300"
            onClick={() => ref.current?.click()}
          />
          <input
            onChange={handleChangeFile}
            type="file"
            hidden
            ref={ref}
            multiple
            accept="image/*"
          />
          {images.length > 0 && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full">
                    <CgClose />
                  </button>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`product-image-${index}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <InputPrimary
        onChange={handleChange}
        label="Product Name"
        placeholder="Enter product name"
        type="text"
        name="name"
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-gray-800 font-medium text-sm">
          Product Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          onChange={handleChange}
          className="border outline-none border-gray-200 text-xs font-medium text-gray-800 placeholder:text-sm placeholder:text-gray-400 p-4"
          placeholder="Enter product description"></textarea>
      </div>
      <div>
        <div className="flex items-center gap-3 w-full">
          <div className="w-full">
            <InputPrimary
              placeholder="Enter price"
              onChange={handleChange}
              name="price"
              label="Price"
              type="number"
            />
          </div>
          <div className="w-full">
            <InputPrimary
              name="stock"
              placeholder="Enter stock"
              onChange={handleChange}
              label="Stock"
              type="number"
            />
          </div>
          <div className="w-full">
            <InputPrimary
              placeholder="Enter unit"
              onChange={handleChange}
              name="unit"
              label="Unit"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end ">
        <button
          disabled={loading}
          type="submit"
          className="py-2 px-6 flex items-center bg-orange-500 text-white rounded-md text-sm disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer">
          {loading ? <LoadingSpinner size="sm" /> : "Add Product"}
        </button>
      </div>
    </form>
  );
}
