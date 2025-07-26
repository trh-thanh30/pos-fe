import React, { useState } from "react";
import InputPrimary from "../ui/InputPrimary";
import toast from "react-hot-toast";
import api from "@/services/api";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProductModalImport({
  productName,
  productId,
  setOpenModalImport,
  fetchProducts,
}: {
  productName: string;
  productId: string;
  setOpenModalImport: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => void;
}) {
  const [stockForm, setStockForm] = useState({
    qty: Number(0),
    note: String(""),
  });
  const [loading, setLoading] = useState(false);
  const handleChangeStockForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockForm({
      ...stockForm,
      [name]: name === "qty" ? Number(value) : value,
    });
  };
  const handleImportProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/stock/import", {
        ...stockForm,
        productId,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setOpenModalImport(false);
        setLoading(false);
        fetchProducts();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mt-12">
        <h1 className="text-2xl text-gray-900 font-medium">Import products</h1>
        <span className="text-sm font-medium text-gray-500">{productName}</span>
      </div>
      <form onSubmit={handleImportProduct} className="mt-9 space-y-4">
        <InputPrimary
          label="Product ID"
          disabled
          type="text"
          name="productId"
          required
          value={productId}
        />
        <InputPrimary
          type="number"
          required
          name="qty"
          onChange={handleChangeStockForm}
          placeholder="Enter quantity product import"
          label="Quantity"
        />
        <InputPrimary
          type="text"
          name="note"
          required
          onChange={handleChangeStockForm}
          placeholder="Enter note import"
          label="Note"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="border flex items-center border-orange-500 bg-orange-50 cursor-pointer text-orange-500 text-sm py-2 px-6 font-medium rounded-md ">
            {loading ? <LoadingSpinner size="sm" /> : "Import Product"}
          </button>
        </div>
      </form>
    </>
  );
}
