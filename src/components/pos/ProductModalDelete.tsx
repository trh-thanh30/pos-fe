import React from "react";
import { SlClose } from "react-icons/sl";

export default function ProductModalDelete({
  productId,
  setOpenModalDeleteProduct,
  handleDeleteProduct,
}: {
  productId: string;
  setOpenModalDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteProduct: (id: string) => void;
}) {
  return (
    <div className="mt-10 flex flex-col items-center">
      <SlClose size={50} className="text-red-500" />
      <span className="text-2xl text-gray-900 font-medium mt-4">
        Confirm product deletion
      </span>
      <div className="flex flex-col font-medium mt-2 text-sm text-gray-500 text-center">
        <span> Are you sure you want to delete this product?</span>
        <span>This action cannot be undone.</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setOpenModalDeleteProduct(false)}
          className="border border-orange-500 bg-orange-50 cursor-pointer text-orange-500 text-sm py-2 px-6 font-medium rounded-md ">
          Cancel
        </button>
        <button
          onClick={() => handleDeleteProduct(productId)}
          className="border bg-orange-500 hover:opacity-90 duration-300 transition-opacity cursor-pointer text-white text-sm py-2 px-6 font-medium rounded-md">
          Confirm
        </button>
      </div>
    </div>
  );
}
