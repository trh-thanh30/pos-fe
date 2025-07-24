"use client";
import React, { useEffect, useState } from "react";
import order_img from "@/../public/box_icon.adbf0891.svg";
import Image from "next/image";
import { IProduct } from "@/hooks/useGetProducts";
import api from "@/services/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";
import Link from "next/link";
export interface IOrderItem {
  _id: string;
  productId: IProduct;
  name: string;
  qty: number;
  price: number;
}
export interface IOrder {
  _id: string;
  items: IOrderItem[];
  total: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function ModalOrders({ close }: { close: () => void }) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openOrderDetails, setOpenOrderDetails] = useState<IOrder | null>(null);
  const handleGetOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      if (res.status === 200) {
        setLoading(false);
        setOrders(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOrders();
  }, []);

  console.log(openOrderDetails);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-10 h-[200px]">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <>
          <div className="mt-10">
            <h1 className="text-lg text-gray-700 font-medium mb-6">
              My Orders
            </h1>
            {orders.length > 0 &&
              orders.map((order, index) => (
                <div key={index} className="p-4 border-y border-y-gray-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 max-w-80">
                      <Image
                        src={order_img}
                        alt="order"
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-medium text-gray-900">
                          {order.items
                            .map((item) => `${item.name} x ${item.qty}`)
                            .join(", ")}
                        </h2>
                        <span className="text-xs text-gray-600 font-medium">
                          Items : {order.items.length}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {order.total.toLocaleString("vnd", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <div className="flex flex-col gap-1 text-sm font-medium text-gray-900">
                      <span>Method : COD </span>
                      <span>Date : {order.createdAt.slice(0, 10)} </span>
                      <span>Payment : Pending</span>
                    </div>
                    <button
                      onClick={() => {
                        setOpenOrderDetails(order);
                      }}
                      className="text-sm text-orange-500 font-medium hover:cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {openOrderDetails && (
        <Modal
          size="4xl"
          isOpen={!!openOrderDetails}
          close={() => setOpenOrderDetails(null)}>
          <>
            <div className="my-10 flex items-center justify-between">
              <h1 className="text-2xl text-gray-900 font-medium">
                Order Details
              </h1>
              <span className="text-sm font-medium text-gray-400">
                Items: {openOrderDetails.items.length}
              </span>
            </div>
            {openOrderDetails.items.map((item, index) => (
              <Link
                href={`/products/${item.productId._id}`}
                key={index}
                className="flex my-4 bg-gray-100 justify-between items-center hover:bg-gray-200 p-2 rounded-md transition-colors duration-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  {item && item.productId.images[0] && (
                    <Image
                      src={item.productId.images[0]}
                      alt={item.name}
                      width={112}
                      height={112}
                      className="w-28 h-28 object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-900">
                      {item.name} x {item.qty}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {item.productId.sku}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {(item.productId.price * item.qty).toLocaleString("vn")}
                </span>
              </Link>
            ))}
          </>
        </Modal>
      )}
    </>
  );
}
