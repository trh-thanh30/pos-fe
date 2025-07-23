import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import api from "@/services/api";
import toast from "react-hot-toast";
import { IProduct } from "@/hooks/useGetProducts";
import LoadingSpinner from "../common/LoadingSpinner";
export interface ICartItem {
  _id: string;
  productId: IProduct;
  userId: string;
  qty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function ModalCart({ close }: { close: () => void }) {
  const [carts, setCarts] = useState<ICartItem[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const handleGetCarts = async () => {
    try {
      const res = await api.get("/cart");
      if (res.status === 200) {
        setCarts(res.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleUpdateQtyCartItem = async (productId: string, qty: number) => {
    try {
      const res = await api.patch("/cart", {
        productId,
        qty,
      });
      if (res.status === 200) {
        handleGetCarts();
        toast.success(res.data.message);
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCartItem = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      if (res.status === 200) {
        handleGetCarts();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCarts();
  }, []);
  const totalPrice = useMemo(() => {
    return carts.reduce(
      (total, item) => total + item.productId.price * item.qty,
      0
    );
  }, [carts]);
  const handlePlaceOrder = async () => {
    try {
      setLoadingOrder(true);
      const items = carts.map((cart) => ({
        productId: cart.productId._id,
        qty: cart.qty,
      }));
      const res = await api.post("/orders", {
        items,
      });
      if (res.status === 201) {
        setLoadingOrder(false);
        setCarts([]);
        close();
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoadingOrder(false);
      console.log(error);
    }
  };

  return (
    <>
      {carts.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl font-bold">Your cart is empty</p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-slate-500">
              Your <span className="text-orange-500">Cart</span>
            </h1>
            <span className="text-lg font-medium text-gray-400">
              {carts.length} Items
            </span>
          </div>
          <hr className="border border-gray-200 my-6" />
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Stock
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, index) => (
                  <tr key={index}>
                    <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                      <div className="p-2 bg bg-gray-200 rounded-md">
                        {cart.productId.images.length > 0 &&
                          cart.productId.images[0] && (
                            <Image
                              loading="lazy"
                              src={cart.productId.images[0]}
                              alt="thumbnail"
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover"
                            />
                          )}
                      </div>
                      <div className="flex flex-col gap-1 text-left">
                        <h2 className="text-sm text-gray-900 font-medium">
                          {cart.productId.name}
                        </h2>
                        <button
                          onClick={() =>
                            handleDeleteCartItem(cart.productId._id)
                          }
                          className="text-sm text-orange-500 cursor-pointer w-fit">
                          Remove
                        </button>
                      </div>
                    </td>
                    <td className="py-4 md:px-4 px-1 font-medium text-gray-600">
                      {cart.productId.price.toLocaleString("vn", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="py-4 md:px-4 px-1 font-medium text-gray-600">
                      {cart.productId.stock}
                    </td>
                    <td className="py-4 md:px-4 px-1">
                      <div className="flex items-center gap-1 ">
                        <button
                          disabled={cart.qty <= 1}
                          onClick={() =>
                            handleUpdateQtyCartItem(
                              cart.productId._id,
                              cart.qty - 1
                            )
                          }
                          className=" text-gray-400 disabled:cursor-not-allowed  disabled:opacity-50 not-disabled:hover:text-gray-600 cursor-pointer duration-300 transition-colors">
                          <FaCaretLeft size={26} />
                        </button>
                        <input
                          value={cart.qty}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateQtyCartItem(
                              cart.productId._id,
                              Number(e.target.value)
                            )
                          }
                          type="number"
                          className="w-10 text-sm border border-gray-200 outline-none text-gray-600 font-medium text-center appearance-none"
                        />
                        <button
                          onClick={() =>
                            handleUpdateQtyCartItem(
                              cart.productId._id,
                              cart.qty + 1
                            )
                          }
                          disabled={cart.qty >= cart.productId.stock}
                          className=" text-gray-400 disabled:cursor-not-allowed  disabled:opacity-50 not-disabled:hover:text-gray-600 cursor-pointer duration-300 transition-colors">
                          <FaCaretRight size={26} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 md:px-4 px-1 font-medium text-gray-600">
                      {(Number(cart.productId.price) * cart.qty).toLocaleString(
                        "vn",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-100 p-6 mt-4">
            <span className="text-2xl text-gray-900 font-medium">
              Order Summary
            </span>
            <hr className="border border-gray-200 my-4" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600 text-base">
                  Price
                </span>
                <span className="font-medium text-gray-800 text-base">
                  {totalPrice.toLocaleString("vn", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600 text-base">
                  Shipping Fee
                </span>
                <span className="font-medium text-gray-800 text-base">
                  Free
                </span>
              </div>
            </div>
            <hr className="border border-gray-200 my-4" />
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-900">Total</span>
              <span className="text-xl font-medium text-gray-900">
                {totalPrice.toLocaleString("vn", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3 mt-4 font-medium text-sm flex items-center justify-center bg-orange-500 cursor-pointer text-white outline-none">
              {loadingOrder ? <LoadingSpinner size="sm" /> : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
