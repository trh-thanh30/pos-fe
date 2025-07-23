"use client";

import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/features/auth/authSlice";

import Image from "next/image";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import api from "@/services/api";
import Modal from "./Modal";
import ModalProfile from "../auth/ModalProfile";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default function AvatarUser({
  setIsOpenModalManageAccount,
  setOpenModalCart,
  setOpenModalOrder,
}: {
  setIsOpenModalManageAccount: (isOpen: boolean) => void;
  setOpenModalCart: (isOpen: boolean) => void;
  setOpenModalOrder: (isOpen: boolean) => void;
}) {
  const [openModalAccount, setOpenModalAccount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/logout");
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        dispatch(logout());
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    }
  };
  return (
    <>
      {user ? (
        <div className="relative group ">
          <Image
            src={user?.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300"
            width={28}
            height={28}
          />
          {user.isActive && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
          )}

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full translate-y-4 w-[372px] shadow-2xl  bg-white  rounded-md p-6
             opacity-0 group-hover:opacity-100 invisible group-hover:visible
             transition-all duration-300 z-50 ease-in-out">
            <div className="flex items-center gap-6">
              <Image
                src={user?.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="text-gray-800 text-sm font-medium">
                  {user.username}
                </p>
                <p className="text-gray-600 text-xs">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <button
                onClick={() => setOpenModalAccount(true)}
                className="flex text-sm font-semibold  text-gray-500 items-center gap-7 border-y border-gray-100 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <IoIosSettings size={16} />
                Manage Account
              </button>
              <button
                onClick={() => setOpenModalCart(true)}
                className="flex text-sm font-semibold  text-gray-500 items-center gap-7 border-y border-gray-100 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <IoCartSharp size={16} />
                Cart
              </button>
              <button
                onClick={() => setOpenModalOrder(true)}
                className="flex text-sm font-semibold  text-gray-500 items-center gap-7 border-y border-gray-100 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                <FaShoppingBag size={16} />
                My Orders
              </button>
              {user.role === "admin" && (
                <Link
                  href={"/dashboard"}
                  className="flex text-sm font-semibold  text-gray-500 items-center gap-7 border-y border-gray-100 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                  <MdDashboard size={16} />
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="flex text-sm font-semibold  text-red-500 items-center gap-7 py-4 cursor-pointer hover:bg-red-50 transition-colors duration-300">
                <PiSignOutFill size={16} />
                {loading ? <LoadingSpinner size="xs" /> : "  Sign Out"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpenModalManageAccount(true)}
          className="flex items-center font-medium gap-2 border border-gray-100 rounded-full py-2 px-4 hover:bg-gray-100 cursor-pointer transition-colors duration-300 text-gray-600 text-sm">
          <FiUser />
          Sign In
        </button>
      )}
      {openModalAccount && (
        <Modal
          size="xl"
          isOpen={openModalAccount}
          close={() => setOpenModalAccount(false)}>
          <ModalProfile close={() => setOpenModalAccount(false)} />
        </Modal>
      )}
    </>
  );
}
