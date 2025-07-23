"use client";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function useDeleteProduct({
  fetchProducts,
  setOpenModalDeleteProduct,
}: {
  fetchProducts: () => void;
  setOpenModalDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchProducts();
        setOpenModalDeleteProduct(false);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return {
    handleDeleteProduct,
  };
}
