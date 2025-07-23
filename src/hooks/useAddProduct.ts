"use client";

import api from "@/services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddProduct({
  close,
  fetchProducts,
}: {
  close: () => void;
  fetchProducts: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    unit: "",
  });
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const maxFiles = 4;
      const fileArray = Array.from(files);
      if (fileArray.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} images.`);
        return;
      }
      setImages(fileArray);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("unit", formData.unit);
    images.forEach((image) => {
      data.append("images", image);
    });
    try {
      setLoading(true);
      const res = await api.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        setLoading(false);
        toast.success(res.data.message);
        close();
        fetchProducts();
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          unit: "",
        });
        setImages([]);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return {
    loading,
    images,
    formData,
    handleChangeFile,
    handleChange,
    setImages,
    handleAddProduct,
  };
}
