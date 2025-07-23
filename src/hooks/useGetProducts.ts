"use client";
import { IPagination } from "@/components/ui/Pagination";
import api from "@/services/api";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  sku: string;
  price: number;
  stock: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}
export default function useGetProducts(searchOnly?: { searchOnly: boolean }) {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    sort: "",
  });
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>();
  const [isPending, startTransition] = useTransition();
  const [debouncedSearch] = useDebounce(query.search, 500);
  const handleSetPage = (page: number) => {
    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        page,
      }));
    });
  };

  const handleSetSort = (sort: string) => {
    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        sort,
      }));
    });
  };
  const handleSetSearch = (search: string) => {
    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        search,
      }));
    });
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/products?page=${query.page}&limit=${query.limit}&search=${debouncedSearch}&sort=${query.sort}`
      );
      if (res.status === 200) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (searchOnly) {
      if (debouncedSearch.trim().length > 0) {
        fetchProducts();
      } else {
        setProducts([]);
      }
    } else {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.limit, query.page, query.sort, debouncedSearch]);

  return {
    products,
    pagination,
    loading,
    setQuery,
    fetchProducts,
    query,
    handleSetPage,
    isPending,
    handleSetSort,
    handleSetSearch,
    debouncedSearch,
  };
}
