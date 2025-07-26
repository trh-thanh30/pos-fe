import React, { useEffect, useMemo, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { IOrder } from "../orders/ModalOrders";
import api from "@/services/api";
import { BsEye } from "react-icons/bs";
import { IoPrint } from "react-icons/io5";

export default function DashOrder() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const handleGetOrders = async () => {
    try {
      const res = await api.get("/orders/admin");
      if (res.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOrders();
  }, []);
  const totalOrdersPrice = useMemo(() => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }, [orders]);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order Management
          </h1>
          <span className="text-xs font-medium text-gray-400">
            View and manage all store orders
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="border cursor-pointer hover:bg-gray-200 duration-300 transition-all rounded-md border-gray-300 py-2 px-6 text-sm font-medium text-gray-500">
            Refresh
          </button>
          <button className="border cursor-pointer hover:bg-gray-200 duration-300 transition-all rounded-md border-gray-300 py-2 px-6 text-sm font-medium text-gray-500">
            Export CSV
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="flex items-center gap-3 bg-white p-4 rounded-md">
          <HiShoppingCart
            size={38}
            className="p-2 text-blue-500 rounded-full bg-blue-50"
          />
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-600">
              Total Orders
            </span>
            <span className="text-sm font-medium text-gray-900">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-md">
          <TiTick
            size={38}
            className="p-2 text-green-500 rounded-full bg-green-50"
          />
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-600">
              Success Orders
            </span>
            <span className="text-sm font-medium text-gray-900">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-md">
          <BiDollar
            size={38}
            className="p-2 text-green-500 rounded-full bg-green-50"
          />
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-600">
              Total Price
            </span>
            <span className="text-sm font-medium text-gray-900">
              {totalOrdersPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 mt-12">
        <table className="table-fixed w-full overflow-hidden">
          <thead className="text-gray-900 text-sm text-left">
            <tr>
              <th className="w-[20%] px-4 py-3 font-medium truncate">
                Orders ID
              </th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                Customer
              </th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                Total Items
              </th>
              <th className="px-4 py-3 font-medium truncate">Total Price</th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                Created At
              </th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500 text-left">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-500/20 text-xs font-medium text-gray-600">
                <td className="px-4 py-3 ">{order._id}</td>
                <td className="px-4 py-3 ">{order.createdBy.email}</td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3 ">
                  {order.total.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-4 py-3  ">{order.createdAt.slice(0, 10)}</td>
                <td className="px-4 py-3 flex items-center gap-4">
                  <BsEye size={18} className=" text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <IoPrint size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
