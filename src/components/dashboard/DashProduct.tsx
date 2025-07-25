"use client";
import Image from "next/image";
import React, { useState } from "react";
import thumbImg from "@/../public/thumb_img.png";
import Modal from "../common/Modal";
import FormModalAddProduct from "../form/FormModalAddProduct";
import LoadingSpinner from "../common/LoadingSpinner";
import Pagination from "../ui/Pagination";
import useGetProducts from "@/hooks/useGetProducts";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import ProductModalDelete from "../pos/ProductModalDelete";
import ProductModalImport from "../pos/ProductModalImport";
import ProductModalExport from "../pos/ProductModalExport";

export default function DashProduct() {
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [openModalAddProduct, setOpenModalAddProduct] =
    useState<boolean>(false);
  const [openModalDeleteProduct, setOpenModalDeleteProduct] =
    useState<boolean>(false);
  const [openModalImport, setOpenModalImport] = useState<boolean>(false);
  const [openModalExport, setOpenModalExport] = useState<boolean>(false);
  const {
    products,
    pagination,
    loading,
    fetchProducts,
    handleSetPage,
    isPending,
  } = useGetProducts();

  const { handleDeleteProduct } = useDeleteProduct({
    fetchProducts,
    setOpenModalDeleteProduct,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">
          Products Manage
        </h1>
        <button
          onClick={() => setOpenModalAddProduct(true)}
          className="text-white cursor-pointer bg-orange-600 px-6 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm">
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <LoadingSpinner size="md" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-lg text-gray-900 font-normal">
          No Products
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 mt-12">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Until
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Stock
                  </th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-500/20 text-xs font-medium text-gray-600">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="w-fit rounded p-2">
                        {product.images.length > 0 && (
                          <Image
                            src={product.images[0] || thumbImg}
                            alt="thumbnail"
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-base text-gray-700">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {product.sku}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">{product.unit}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-4 py-3 max-sm:hidden ">
                      <div className="flex items-start flex-col gap-1 ">
                        <button
                          onClick={() => {
                            setOpenModalDeleteProduct(true);
                            setProductId(product._id);
                          }}
                          className="text-slate-400 hover:text-red-600 transition-colors hover:cursor-pointer">
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setOpenModalImport(true);
                            setProductName(product.name);
                            setProductId(product._id);
                          }}
                          className="text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer">
                          Import
                        </button>
                        <button
                          onClick={() => {
                            setOpenModalExport(true);
                            setProductName(product.name);
                            setProductId(product._id);
                          }}
                          className="text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer">
                          Export
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-12">
            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handleSetPage}
                isPending={isPending}
              />
            )}
          </div>
        </>
      )}

      {/* DELETE PRODUCT */}
      {openModalDeleteProduct && (
        <Modal
          size="md"
          isOpen={openModalDeleteProduct}
          close={() => setOpenModalDeleteProduct(false)}>
          <ProductModalDelete
            setOpenModalDeleteProduct={setOpenModalDeleteProduct}
            handleDeleteProduct={handleDeleteProduct}
            productId={productId}
          />
        </Modal>
      )}

      {/* ADD PRODUCT */}
      {openModalAddProduct && (
        <Modal
          size="xl"
          isOpen={openModalAddProduct}
          close={() => setOpenModalAddProduct(false)}>
          <FormModalAddProduct close={() => setOpenModalAddProduct(false)} />
        </Modal>
      )}

      {/* IMPORT PRODUCT */}
      {openModalImport && (
        <Modal
          size="xl"
          isOpen={openModalImport}
          close={() => setOpenModalImport(false)}>
          <ProductModalImport
            productName={productName}
            productId={productId}
            setOpenModalImport={setOpenModalImport}
            fetchProducts={fetchProducts}
          />
        </Modal>
      )}

      {/* EXPORT PRODUCT */}
      {openModalExport && (
        <Modal
          size="xl"
          isOpen={openModalExport}
          close={() => setOpenModalExport(false)}>
          <ProductModalExport
            productName={productName}
            productId={productId}
            setOpenModalExport={setOpenModalExport}
            fetchProducts={fetchProducts}
          />
        </Modal>
      )}
    </>
  );
}
